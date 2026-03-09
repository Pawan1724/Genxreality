'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Total scroll height for the hero (in vh units)
const HERO_SCROLL_HEIGHT = '600vh';

interface FrameData {
    sequence1: { count: number; files: string[]; basePath: string };
    sequence2: { count: number; files: string[]; basePath: string };
}

export default function HeroFrameAnimation() {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const stickyRef = useRef<HTMLDivElement>(null);

    // Refs for animation state (avoid re-renders)
    const seq1ImagesRef = useRef<HTMLImageElement[]>([]);
    const seq2ImagesRef = useRef<HTMLImageElement[]>([]);
    const currentFrameRef = useRef({ seq: 1, index: 0 });
    const animFrameRef = useRef<number>(0);
    const [isReady, setIsReady] = useState(false);

    // Overlay refs
    const titleOverlayRef = useRef<HTMLDivElement>(null);
    const blurOverlayRef = useRef<HTMLDivElement>(null);
    const textOverlayRef = useRef<HTMLDivElement>(null);
    const blackOverlayRef = useRef<HTMLDivElement>(null);

    // Draw function
    const drawFrame = useCallback((seq: number, index: number) => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const images = seq === 1 ? seq1ImagesRef.current : seq2ImagesRef.current;
        const clampedIndex = Math.max(0, Math.min(index, images.length - 1));
        const img = images[clampedIndex];

        if (!img || !img.complete || img.naturalWidth === 0) return;

        // Use CSS pixel dimensions (context is already scaled by dpr via setTransform)
        const dpr = window.devicePixelRatio || 1;
        const cssW = canvas.width / dpr;
        const cssH = canvas.height / dpr;

        // Clear the full canvas in CSS coordinate space
        ctx.clearRect(0, 0, cssW, cssH);

        // Calculate object-fit: contain sizing to center the image
        const imgW = img.naturalWidth;
        const imgH = img.naturalHeight;

        const scale = Math.min(cssW / imgW, cssH / imgH);
        const scaledW = imgW * scale;
        const scaledH = imgH * scale;
        const offsetX = (cssW - scaledW) / 2;
        const offsetY = (cssH - scaledH) / 2;

        ctx.drawImage(img, offsetX, offsetY, scaledW, scaledH);
        currentFrameRef.current = { seq, index: clampedIndex };
    }, []);

    // Resize canvas for high-DPI
    const resizeCanvas = useCallback(() => {
        const canvas = canvasRef.current;
        const sticky = stickyRef.current;
        if (!canvas || !sticky) return;

        const dpr = window.devicePixelRatio || 1;
        const rect = sticky.getBoundingClientRect();

        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        canvas.style.width = `${rect.width}px`;
        canvas.style.height = `${rect.height}px`;

        const ctx = canvas.getContext('2d');
        if (ctx) {
            ctx.scale(dpr, dpr);
            // Fix: reset and scale properly
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        }

        // Redraw current frame
        const { seq, index } = currentFrameRef.current;
        drawFrame(seq, index);
    }, [drawFrame]);

    // Load all frames
    useEffect(() => {
        let cancelled = false;

        async function loadFrames() {
            try {
                const res = await fetch('/api/frames');
                const data: FrameData = await res.json();

                // Create image objects for both sequences
                const loadImage = (src: string): Promise<HTMLImageElement> => {
                    return new Promise((resolve, reject) => {
                        const img = new Image();
                        img.onload = () => resolve(img);
                        img.onerror = reject;
                        img.src = src;
                    });
                };

                // Load all frames concurrently
                const seq1Promises = data.sequence1.files.map(f =>
                    loadImage(`${data.sequence1.basePath}/${f}`)
                );
                const seq2Promises = data.sequence2.files.map(f =>
                    loadImage(`${data.sequence2.basePath}/${f}`)
                );

                const [seq1Images, seq2Images] = await Promise.all([
                    Promise.all(seq1Promises),
                    Promise.all(seq2Promises),
                ]);

                if (cancelled) return;

                seq1ImagesRef.current = seq1Images;
                seq2ImagesRef.current = seq2Images;

                setIsReady(true);
            } catch (err) {
                console.error('Failed to load frame images:', err);
            }
        }

        loadFrames();
        return () => { cancelled = true; };
    }, []);

    // Setup canvas, resize listener, and GSAP ScrollTrigger
    useEffect(() => {
        if (!isReady) return;

        // Initial canvas setup
        resizeCanvas();
        drawFrame(1, 0);

        // Resize listener
        window.addEventListener('resize', resizeCanvas);

        const container = containerRef.current;
        const titleOverlay = titleOverlayRef.current;
        const blurOverlay = blurOverlayRef.current;
        const textOverlay = textOverlayRef.current;

        const blackOverlay = blackOverlayRef.current;
        if (!container || !titleOverlay || !blurOverlay || !textOverlay || !blackOverlay) return;

        // Master ScrollTrigger
        const st = ScrollTrigger.create({
            trigger: container,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.5,
            onUpdate: (self) => {
                const progress = self.progress; // 0 → 1

                // --- Phase 1: Title (0% → 5%) ---
                // Blur overlay fades from 20px blur to 0
                if (progress < 0.05) {
                    const p = progress / 0.05; // 0→1 within this phase
                    const blurVal = 20 * (1 - p);
                    blurOverlay.style.backdropFilter = `blur(${blurVal}px)`;
                    (blurOverlay.style as any).webkitBackdropFilter = `blur(${blurVal}px)`;
                    blurOverlay.style.opacity = '1';
                    titleOverlay.style.opacity = `${1 - p}`;
                    textOverlay.style.opacity = '0';
                    drawFrame(1, 0);
                    return;
                }

                // Hide blur after phase 1
                blurOverlay.style.backdropFilter = 'blur(0px)';
                (blurOverlay.style as any).webkitBackdropFilter = 'blur(0px)';
                blurOverlay.style.opacity = '0';
                titleOverlay.style.opacity = '0';

                // --- Phase 2: Sequence 1 (5% → 40%) ---
                if (progress < 0.40) {
                    const p = (progress - 0.05) / 0.35; // 0→1 within this phase
                    const frameIndex = Math.floor(p * (seq1ImagesRef.current.length - 1));
                    textOverlay.style.opacity = '0';
                    drawFrame(1, frameIndex);
                    return;
                }

                // --- Phase 3: Black screen + text (40% → 65%) ---
                // Sub-phases: 40-45% black fades in, 45-55% text visible, 55-60% text fades out, 60-65% black fades out
                if (progress < 0.65) {
                    const p = (progress - 0.40) / 0.25; // 0→1 within this phase

                    // Draw last frame of seq1 (behind black overlay)
                    drawFrame(1, seq1ImagesRef.current.length - 1);

                    if (p < 0.20) {
                        // 0-20%: Black fades in
                        const blackP = p / 0.20;
                        blackOverlay.style.opacity = `${blackP}`;
                        textOverlay.style.opacity = '0';
                    } else if (p < 0.40) {
                        // 20-40%: Text fades in over black
                        blackOverlay.style.opacity = '1';
                        const textP = (p - 0.20) / 0.20;
                        textOverlay.style.opacity = `${textP}`;
                    } else if (p < 0.70) {
                        // 40-70%: Text fully visible
                        blackOverlay.style.opacity = '1';
                        textOverlay.style.opacity = '1';
                    } else if (p < 0.85) {
                        // 70-85%: Text fades out
                        blackOverlay.style.opacity = '1';
                        const textOutP = (p - 0.70) / 0.15;
                        textOverlay.style.opacity = `${1 - textOutP}`;
                    } else {
                        // 85-100%: Black fades out, revealing seq2 first frame
                        const blackOutP = (p - 0.85) / 0.15;
                        blackOverlay.style.opacity = `${1 - blackOutP}`;
                        textOverlay.style.opacity = '0';
                        // Start showing seq2 first frame behind the fading black
                        drawFrame(2, 59);
                    }
                    return;
                }

                // Hide overlays
                textOverlay.style.opacity = '0';
                blackOverlay.style.opacity = '0';

                // --- Phase 4: Sequence 2 (65% → 100%), starting from frame 60 ---
                const SEQ2_START_FRAME = 59;
                const p = (progress - 0.65) / 0.35; // 0→1 within this phase
                const remainingFrames = seq2ImagesRef.current.length - 1 - SEQ2_START_FRAME;
                const frameIndex = SEQ2_START_FRAME + Math.floor(p * remainingFrames);
                drawFrame(2, frameIndex);
            },
        });

        // Dispatch a custom event so navbar knows to hide
        const navEvent = new CustomEvent('heroScrollProgress', { detail: { active: true } });
        window.dispatchEvent(navEvent);

        const currentAnimFrame = animFrameRef.current;

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            st.kill();
            if (currentAnimFrame) cancelAnimationFrame(currentAnimFrame);
        };
    }, [isReady, resizeCanvas, drawFrame]);

    return (
        <div
            ref={containerRef}
            className="relative"
            style={{ height: HERO_SCROLL_HEIGHT }}
            id="hero-frame-animation"
        >
            {/* Sticky viewport */}
            <div
                ref={stickyRef}
                className="sticky top-0 w-full h-screen overflow-hidden"
                style={{ zIndex: 20 }}
            >
                {/* Canvas */}
                <canvas
                    ref={canvasRef}
                    className="absolute inset-0 w-full h-full"
                    style={{ background: '#000' }}
                />

                {/* Blur overlay (phase 1) */}
                <div
                    ref={blurOverlayRef}
                    className="absolute inset-0 z-10"
                    style={{
                        backdropFilter: 'blur(20px)',
                        WebkitBackdropFilter: 'blur(20px)',
                        background: 'rgba(0,0,0,0.3)',
                    }}
                />

                {/* Title overlay (phase 1) */}
                <div
                    ref={titleOverlayRef}
                    className="absolute inset-0 z-20 flex items-center justify-center px-6"
                >
                    <div className="text-center max-w-5xl mx-auto">
                        <h1
                            className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-tight"
                            style={{
                                background: 'linear-gradient(180deg, #fff 0%, rgba(255,255,255,0.6) 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                            }}
                        >
                            GenXReality
                        </h1>
                        <p className="mt-4 text-lg sm:text-xl md:text-2xl text-white/80 font-medium max-w-3xl mx-auto leading-relaxed">
                            Making AR/VR Accessible and Affordable for All
                        </p>
                        <div className="mt-10 animate-bounce">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto text-white/50">
                                <path d="M12 5v14M19 12l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Animated black overlay with particles (phase 3) */}
                <div
                    ref={blackOverlayRef}
                    className="absolute inset-0"
                    style={{ opacity: 0, zIndex: 15 }}
                >
                    {/* Base dark background */}
                    <div className="absolute inset-0 bg-black" />

                    {/* Subtle grid pattern */}
                    <div
                        className="absolute inset-0"
                        style={{
                            backgroundImage: `
                                linear-gradient(rgba(0,255,65,0.03) 1px, transparent 1px),
                                linear-gradient(90deg, rgba(0,255,65,0.03) 1px, transparent 1px)
                            `,
                            backgroundSize: '60px 60px',
                        }}
                    />

                    {/* Floating glowing orbs */}
                    <div className="absolute inset-0 overflow-hidden">
                        {/* Orb 1 - large, slow */}
                        <div
                            className="absolute rounded-full"
                            style={{
                                width: '400px', height: '400px',
                                background: 'radial-gradient(circle, rgba(0,255,65,0.15) 0%, rgba(0,255,65,0.05) 40%, transparent 70%)',
                                top: '10%', left: '15%',
                                animation: 'floatOrb1 12s ease-in-out infinite',
                            }}
                        />
                        {/* Orb 2 - medium */}
                        <div
                            className="absolute rounded-full"
                            style={{
                                width: '300px', height: '300px',
                                background: 'radial-gradient(circle, rgba(0,143,17,0.2) 0%, rgba(0,143,17,0.05) 40%, transparent 70%)',
                                bottom: '15%', right: '10%',
                                animation: 'floatOrb2 10s ease-in-out infinite',
                            }}
                        />
                        {/* Orb 3 - small accent */}
                        <div
                            className="absolute rounded-full"
                            style={{
                                width: '200px', height: '200px',
                                background: 'radial-gradient(circle, rgba(0,255,65,0.1) 0%, transparent 60%)',
                                top: '50%', left: '60%',
                                animation: 'floatOrb3 8s ease-in-out infinite',
                            }}
                        />

                        {/* Animated particles — deterministic positions to avoid SSR hydration mismatch */}
                        {[
                            { s: 3, l: 5, t: 12, o: 0.4, d: 8, dl: 0.2 },
                            { s: 5, l: 22, t: 78, o: 0.7, d: 10, dl: 1.5 },
                            { s: 2, l: 45, t: 33, o: 0.5, d: 7, dl: 3.1 },
                            { s: 4, l: 67, t: 55, o: 0.6, d: 12, dl: 0.8 },
                            { s: 3, l: 88, t: 21, o: 0.3, d: 9, dl: 2.4 },
                            { s: 5, l: 12, t: 90, o: 0.8, d: 11, dl: 4.0 },
                            { s: 2, l: 34, t: 65, o: 0.4, d: 6, dl: 1.2 },
                            { s: 4, l: 56, t: 8, o: 0.7, d: 13, dl: 3.5 },
                            { s: 3, l: 78, t: 42, o: 0.5, d: 8, dl: 0.6 },
                            { s: 5, l: 91, t: 71, o: 0.6, d: 10, dl: 2.8 },
                            { s: 2, l: 15, t: 50, o: 0.3, d: 7, dl: 4.5 },
                            { s: 4, l: 38, t: 18, o: 0.8, d: 11, dl: 1.0 },
                            { s: 3, l: 60, t: 85, o: 0.4, d: 9, dl: 3.3 },
                            { s: 5, l: 82, t: 30, o: 0.7, d: 12, dl: 0.4 },
                            { s: 2, l: 8, t: 60, o: 0.5, d: 6, dl: 2.0 },
                            { s: 4, l: 28, t: 95, o: 0.6, d: 13, dl: 4.2 },
                            { s: 3, l: 50, t: 15, o: 0.3, d: 8, dl: 1.8 },
                            { s: 5, l: 72, t: 48, o: 0.8, d: 10, dl: 3.7 },
                            { s: 2, l: 95, t: 75, o: 0.4, d: 7, dl: 0.9 },
                            { s: 4, l: 42, t: 38, o: 0.7, d: 11, dl: 2.6 },
                        ].map((p, i) => (
                            <div
                                key={i}
                                className="absolute rounded-full"
                                style={{
                                    width: `${p.s}px`,
                                    height: `${p.s}px`,
                                    background: i % 3 === 0 ? '#00ff41' : 'rgba(0,255,65,0.5)',
                                    left: `${p.l}%`,
                                    top: `${p.t}%`,
                                    opacity: p.o,
                                    animation: `particleFloat ${p.d}s ease-in-out infinite`,
                                    animationDelay: `${p.dl}s`,
                                }}
                            />
                        ))}
                    </div>

                    {/* Vignette effect */}
                    <div
                        className="absolute inset-0"
                        style={{
                            background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.6) 100%)',
                        }}
                    />

                    {/* CSS Keyframes */}
                    <style>{`
                        @keyframes floatOrb1 {
                            0%, 100% { transform: translate(0, 0) scale(1); }
                            25% { transform: translate(30px, -40px) scale(1.05); }
                            50% { transform: translate(-20px, 20px) scale(0.95); }
                            75% { transform: translate(15px, 30px) scale(1.03); }
                        }
                        @keyframes floatOrb2 {
                            0%, 100% { transform: translate(0, 0) scale(1); }
                            33% { transform: translate(-40px, -30px) scale(1.08); }
                            66% { transform: translate(25px, 15px) scale(0.92); }
                        }
                        @keyframes floatOrb3 {
                            0%, 100% { transform: translate(0, 0); }
                            50% { transform: translate(-35px, 25px); }
                        }
                        @keyframes particleFloat {
                            0%, 100% { transform: translateY(0) translateX(0); opacity: 0.3; }
                            25% { opacity: 0.8; }
                            50% { transform: translateY(-30px) translateX(15px); opacity: 0.5; }
                            75% { opacity: 0.9; }
                        }
                    `}</style>
                </div>

                {/* Interstitial text overlay (phase 3) */}
                <div
                    ref={textOverlayRef}
                    className="absolute inset-0 z-20 flex items-center justify-center px-6"
                    style={{ opacity: 0 }}
                >
                    <div className="text-center max-w-4xl mx-auto p-8 md:p-12">
                        <h2
                            className="text-2xl sm:text-3xl md:text-5xl font-bold tracking-tighter mb-6"
                            style={{
                                background: 'linear-gradient(180deg, #fff 0%, rgba(255,255,255,0.7) 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                            }}
                        >
                            Bridging the Digital Divide with Accessible VR Technology
                        </h2>
                        <p className="text-base sm:text-lg text-white/70 mb-6 leading-relaxed">
                            We saw firsthand how high costs and limited accessibility were preventing VR from reaching its full potential. We are committed to democratizing access to immersive learning experiences and unlocking new use cases for VR across diverse sectors.
                        </p>
                        <p className="text-sm sm:text-base text-white/50 leading-relaxed">
                            VR technology should be accessible and versatile, not just confined to gaming. By reducing costs and ensuring flexibility, we can unlock new opportunities in education, healthcare, and professional training.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

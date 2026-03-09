
import { NextResponse } from 'next/server';
import { GoogleGenAI } from "@google/genai";
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'API key not found' }, { status: 500 });
    }
    const keyPrefix = apiKey.substring(0, 5) + "...";
    console.log("API Key found:", keyPrefix);

    const ai = new GoogleGenAI({ apiKey });

    console.log("Generating logo...");
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            text: 'A futuristic, minimalist VR headset logo, white on a transparent background, high quality, vector style, flat design, icon only',
          },
        ],
      },
    });

    const candidate = response.candidates?.[0];
    if (!candidate || !candidate.content) {
      return NextResponse.json({ error: 'No valid content found in candidates' }, { status: 500 });
    }

    for (const part of candidate.content.parts || []) {
      if (part.inlineData) {
        const base64Data = part.inlineData.data;
        const buffer = Buffer.from(base64Data, 'base64');
        const filePath = path.join(process.cwd(), 'public', 'logo.png');
        fs.writeFileSync(filePath, buffer);
        console.log(`Logo saved to ${filePath}`);
        return NextResponse.json({ success: true, path: filePath });
      }
    }

    return NextResponse.json({ error: 'No image data found' }, { status: 500 });
  } catch (error) {
    console.error("Error generating logo:", error);
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || process.env.GEMINI_API_KEY;
    const keyPrefix = apiKey ? apiKey.substring(0, 5) + "..." : "none";
    return NextResponse.json({ error: 'Internal Server Error', details: String(error), keyPrefix }, { status: 500 });
  }
}

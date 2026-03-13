import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";
import path from "path";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: "Prompt required" }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "GEMINI_API_KEY missing" },
        { status: 500 }
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);

    // Note: Ensure your model supports "IMAGE" output. 
    // gemini-1.5-flash-002 or newer is usually required for multimodal generation.
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });

    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `Generate a minimal logo for ${prompt}. Return only the image.`,
            },
          ],
        },
      ],
      generationConfig: {
        // @ts-ignore - Some SDK versions have strict types for responseModalities
        responseModalities: ["TEXT", "IMAGE"],
      },
    });

    const response = await result.response;
    const parts = response?.candidates?.[0]?.content?.parts;

    if (!parts) {
      throw new Error("No response parts received from Gemini");
    }

    let savedPath: string | null = null;

    for (const part of parts) {
      // 1. Check if inlineData and data exist
      // 2. Assign to a constant to "narrow" the type for TypeScript
      if (part.inlineData && part.inlineData.data) {
        const base64Data: string = part.inlineData.data;

        const buffer = Buffer.from(base64Data, "base64");

        // Ensure the path is correct for a Next.js environment
        const filePath = path.join(process.cwd(), "public", "logo.png");

        fs.writeFileSync(filePath, buffer);

        savedPath = "/logo.png";
      }
    }

    if (!savedPath) {
      return NextResponse.json(
        { error: "No image data found in the model response" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      logo: `${savedPath}?t=${Date.now()}`, // Added timestamp to bust browser cache
    });
  } catch (error: any) {
    console.error("Logo Generation Error:", error);

    return NextResponse.json(
      { error: error.message || "Logo generation failed" },
      { status: 500 }
    );
  }
}

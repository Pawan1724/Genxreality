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
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });

    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [{ text: `Generate a minimal logo for ${prompt}. Return only the image.` }],
        },
      ],
      generationConfig: {
        // @ts-ignore - The SDK types might not recognize this yet
        responseModalities: ["TEXT", "IMAGE"],
      },
    });

    const response = await result.response;
    const parts = response?.candidates?.[0]?.content?.parts;

    if (!parts) {
      throw new Error("No response parts received");
    }

    let savedPath: string | null = null;

    for (const part of parts) {
      // THE FIX: Check for the nested data property
      if (part.inlineData && part.inlineData.data) {
        
        // Use 'as string' to force TypeScript to match the Buffer overload
        const base64Data = part.inlineData.data as string;

        const buffer = Buffer.from(base64Data, "base64");

        const publicDir = path.join(process.cwd(), "public");
        
        // Ensure directory exists during build/runtime
        if (!fs.existsSync(publicDir)) {
          fs.mkdirSync(publicDir, { recursive: true });
        }

        const filePath = path.join(publicDir, "logo.png");
        fs.writeFileSync(filePath, buffer);

        savedPath = "/logo.png";
      }
    }

    if (!savedPath) {
      return NextResponse.json(
        { error: "Image data not found in response" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      logo: `${savedPath}?t=${Date.now()}`,
    });

  } catch (error: any) {
    console.error("Build Error Debug:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}

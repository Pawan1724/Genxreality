import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";
import path from "path";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const prompt: string | undefined = body?.prompt;

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
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
          parts: [
            {
              text: `Generate a clean minimal logo for: ${prompt}. Return only the image.`,
            },
          ],
        },
      ],
      generationConfig: {
        responseModalities: ["TEXT", "IMAGE"],
      },
    });

    const response = result.response;

    const parts = response?.candidates?.[0]?.content?.parts;

    if (!parts) {
      return NextResponse.json(
        { error: "No image returned from model" },
        { status: 500 }
      );
    }

    let logoPath: string | null = null;

    for (const part of parts) {
      const base64Data = part.inlineData?.data;

      if (!base64Data) continue;

      const buffer = Buffer.from(base64Data, "base64");

      const filePath = path.join(process.cwd(), "public", "logo.png");

      fs.writeFileSync(filePath, buffer);

      logoPath = "/logo.png";
    }

    if (!logoPath) {
      return NextResponse.json(
        { error: "Image generation failed" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      logo: logoPath,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Logo generation failed" },
      { status: 500 }
    );
  }
}

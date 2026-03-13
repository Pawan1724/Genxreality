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
          parts: [
            {
              text: `Generate a minimal logo for ${prompt}. Return only the image.`,
            },
          ],
        },
      ],
      generationConfig: {
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
      if (part.inlineData?.data) {
        const base64Data = part.inlineData.data;

        const buffer = Buffer.from(base64Data as string, "base64");

        const filePath = path.join(process.cwd(), "public", "logo.png");

        fs.writeFileSync(filePath, buffer);

        savedPath = "/logo.png";
      }
    }

    if (!savedPath) {
      return NextResponse.json(
        { error: "Image not generated" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      logo: savedPath,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Logo generation failed" },
      { status: 500 }
    );
  }
}

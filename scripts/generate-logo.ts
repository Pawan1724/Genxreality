
import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from 'fs';
import path from 'path';

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || process.env.GEMINI_API_KEY;
console.log("API Key present:", apiKey ? "Yes" : "No");

const ai = new GoogleGenAI({ apiKey: apiKey });

async function generateLogo() {
  try {
    console.log("Generating logo with gemini-2.5-flash-image...");
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            text: 'A futuristic, minimalist VR headset logo, white on a transparent background, high quality, vector style, flat design, icon only',
          },
        ],
      },
      // gemini-2.5-flash-image does not support imageConfig with aspectRatio/imageSize in the same way, 
      // or at least the error might be related to the model.
      // Let's remove imageConfig for now as it's optional or defaults to 1:1.
    });

    console.log("Response received.");
    const candidate = response.candidates?.[0];
    if (!candidate) {
        console.error("No candidates found");
        return;
    }

    for (const part of candidate.content.parts) {
      if (part.inlineData) {
        const base64Data = part.inlineData.data;
        const buffer = Buffer.from(base64Data, 'base64');
        const filePath = path.join(process.cwd(), 'public', 'logo.png');
        fs.writeFileSync(filePath, buffer);
        console.log(`Logo saved to ${filePath}`);
        return;
      }
    }
    console.error("No image data found in response");
  } catch (error) {
    console.error("Error generating logo:", error);
  }
}

generateLogo();

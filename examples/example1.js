import { GoogleGenAI } from "@google/genai";
import * as fs from "node:fs";

async function main() {

  console.log(process.env.GEMINI_API_KEY);
  // const ai = new GoogleGenAI({ apiKey: "YOUR_API_KEY" });
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

  const prompt =
    // "Create a photorealistic image of an orange cat with a green eyes, sitting on a couch.";
    "Create a photorealistic image of an cute cat that is white with pink bow, it's a baby kitten, in a comfi cute house. It has a collar with a heart, super cute";

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-image-preview",
    contents: prompt,
  });
  for (const part of response.candidates[0].content.parts) {
    if (part.text) {
      console.log(part.text);
    } else if (part.inlineData) {
      const imageData = part.inlineData.data;
      const buffer = Buffer.from(imageData, "base64");
      fs.writeFileSync("cat.png", buffer);
    }
  }
}

main();
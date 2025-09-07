import { GoogleGenAI } from "@google/genai";
import * as fs from "node:fs";

async function main() {

  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

  // Check if lunch.jpg exists, if not create it
  if (!fs.existsSync("lunch.jpg")) {
    console.log("lunch.jpg not found, generating vintage lunch image...");
    
    // Generate a vintage lunch image
    const vintagePrompt = "Create a black and white vintage photograph from the 1930s showing construction workers having lunch on a steel beam high above a city. The image should look aged, grainy, and historic like the famous 'Lunch atop a Skyscraper' photograph.";
    
    const vintageResponse = await ai.models.generateContent({
      model: "gemini-2.5-flash-image-preview",
      contents: vintagePrompt,
    });
    
    for (const part of vintageResponse.candidates[0].content.parts) {
      if (part.inlineData) {
        const imageData = part.inlineData.data;
        const buffer = Buffer.from(imageData, "base64");
        fs.writeFileSync("lunch.jpg", buffer);
        console.log("Generated lunch.jpg");
        break;
      }
    }
  }

  // Now proceed with the restoration
  const imageData = fs.readFileSync("lunch.jpg");
  const base64Image = imageData.toString("base64");

  const prompt = [
    { text: "Restore and colorize this vintage image. Add realistic colors, remove grain and damage, enhance clarity while maintaining the historic feel." },
    {
      inlineData: {
        mimeType: "image/jpeg",
        data: base64Image,
      },
    },
  ];

  console.log("Restoring and colorizing the vintage image...");
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
      fs.writeFileSync("lunch-restored.png", buffer);
      console.log("Restored image saved as lunch-restored.png");
    }
  }
}

main();

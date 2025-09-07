import { GoogleGenAI } from "@google/genai";
import * as fs from "node:fs";

async function main() {

  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

  // Generate girl.png if it doesn't exist
  if (!fs.existsSync("girl.png")) {
    console.log("girl.png not found, generating girl image...");
    
    const girlPrompt = "Create a photorealistic image of a young woman with a friendly smile, wearing casual clothes, standing against a plain white background. Studio portrait style with good lighting.";
    
    const girlResponse = await ai.models.generateContent({
      model: "gemini-2.5-flash-image-preview",
      contents: girlPrompt,
    });
    
    for (const part of girlResponse.candidates[0].content.parts) {
      if (part.inlineData) {
        const imageData = part.inlineData.data;
        const buffer = Buffer.from(imageData, "base64");
        fs.writeFileSync("girl.png", buffer);
        console.log("Generated girl.png");
        break;
      }
    }
  }

  // Generate tshirt.png if it doesn't exist
  if (!fs.existsSync("tshirt.png")) {
    console.log("tshirt.png not found, generating t-shirt image...");
    
    const tshirtPrompt = "Create a clean product photo of a colorful graphic t-shirt laid flat on a white background. The t-shirt should have an interesting design or pattern. High quality product photography style.";
    
    const tshirtResponse = await ai.models.generateContent({
      model: "gemini-2.5-flash-image-preview",
      contents: tshirtPrompt,
    });
    
    for (const part of tshirtResponse.candidates[0].content.parts) {
      if (part.inlineData) {
        const imageData = part.inlineData.data;
        const buffer = Buffer.from(imageData, "base64");
        fs.writeFileSync("tshirt.png", buffer);
        console.log("Generated tshirt.png");
        break;
      }
    }
  }

  // Now proceed with combining the images
  const imageData1 = fs.readFileSync("girl.png");
  const base64Image1 = imageData1.toString("base64");
  
  const imageData2 = fs.readFileSync("tshirt.png");
  const base64Image2 = imageData2.toString("base64");

  const prompt = [
    { text: "Make the girl wear this t-shirt. Replace her current top with the t-shirt from the second image. Keep the background and her pose unchanged. Make it look natural and realistic." },
    {
      inlineData: {
        mimeType: "image/png",
        data: base64Image1,
      },
    },
    {
      inlineData: {
        mimeType: "image/png",
        data: base64Image2,
      },
    },
  ];

  console.log("Combining images - making the girl wear the t-shirt...");
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
      fs.writeFileSync("girl-with-tshirt.png", buffer);
      console.log("Combined image saved as girl-with-tshirt.png");
    }
  }
}

main();

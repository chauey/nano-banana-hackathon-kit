import { GoogleGenAI } from "@google/genai";
import * as fs from "node:fs";

async function main() {

  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

  const chat = ai.chats.create({model: "gemini-2.5-flash-image-preview"});
  
  const imageData = fs.readFileSync("cat.png");
  const base64Image = imageData.toString("base64");

  console.log("Starting conversational image editing...");

  // First message: Change the cat to a bengal cat
  const response1 = await chat.sendMessage({
    message: [
      { text: "Change the cat to a bengal cat, leave everything else the same." },
      {
        inlineData: {
          mimeType: "image/png",
          data: base64Image,
        },
      },
    ]
  });
  
  // Save first response
  for (const part of response1.candidates[0].content.parts) {
    if (part.text) {
      console.log("Response 1:", part.text);
    } else if (part.inlineData) {
      const imageData = part.inlineData.data;
      const buffer = Buffer.from(imageData, "base64");
      fs.writeFileSync("cat-bengal.png", buffer);
      console.log("Bengal cat image saved as cat-bengal.png");
    }
  }

  // Second message: Add a party hat
  const response2 = await chat.sendMessage({
    message: "The cat should wear a funny party hat"
  });
  
  // Save second response
  for (const part of response2.candidates[0].content.parts) {
    if (part.text) {
      console.log("Response 2:", part.text);
    } else if (part.inlineData) {
      const imageData = part.inlineData.data;
      const buffer = Buffer.from(imageData, "base64");
      fs.writeFileSync("cat-bengal-hat.png", buffer);
      console.log("Bengal cat with party hat saved as cat-bengal-hat.png");
    }
  }

}

main();

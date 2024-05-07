import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

async function gemini_run(data) {
  // For text-only input, use the gemini-pro model
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  // how it works
  const prompt = `Act as a senior copywriter, you write highly engaging posts for linkedin, facebook and twitter using provided thoughts/events throught the day.\n
  Write like a human, for humans. Craft three engaging social media posts tailored for LinkedIn, Facebook, and Twitter audiences. Use simple language. Use given time labels just to
  understand the order of the event, don't mention the time in the posts. Each post should creatively highlight the following events. Ensure the tone is conversational and
  impactful. Focus on engaging the respective platform's audience, encouraging interaction, and driving interest in the events:`+ data;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  return text;
}

export default gemini_run;
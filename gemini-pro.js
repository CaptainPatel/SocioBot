import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

async function gemini_run(data) {
  // For text-only input, use the gemini-pro model
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  // how it works
  const prompt = `Channel your inner senior copywriter! Your mission: craft highly engaging social 
  media posts for LinkedIn, Facebook, and Twitter using provided thoughts/events throughout the day. 
  Write like a human, for humans. Each post should be atleast around 80-100 words or more, depending on the
   inputs, and use emojis to add depth and emotion. The tone should be conversational, impactful, 
   and when appropriate, humorous. Focus on engaging the respective platform's audience, encouraging 
   interaction, and driving interest in the events.Try to include every messages for each post.
   here is the list of inputs seprated by ',,': `+ data;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  return text;
}

export default gemini_run;
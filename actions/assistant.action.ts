"use server";

import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.GEMINI_API_KEY,
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
});

// Sends a text message to the AI and returns the response
export async function sendMessageToAI(message: string) {
  const completion = await client.chat.completions.create({
    model: "gemini-2.5-flash", // or another available Gemini model
    messages: [
      {
        role: "system",
        content:
          "You are Travelus AI — an assistant for a ride‑sharing platform. You explain Travelus, help users search rides, travel options, safety, payments, etc. Be as clear and concise as possible, without compromising.",
      },
      { role: "user", content: message },
    ],
  });

  const reply = completion.choices[0].message.content;

  return { success: true, reply };
}

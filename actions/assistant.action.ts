"use server";

import OpenAI from "openai";
import { AITools } from "./aiTools";
import { AIResponse } from "@/types";
import { TRAVELUS_SYSTEM_PROMPT } from "@/utils/prompts/systemPrompt";

const client = new OpenAI({
  apiKey: process.env.GEMINI_API_KEY!,
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
});

export async function sendMessageToAI(message: string): Promise<AIResponse> {
  // STEP 1: Send user message to AI
  const completion = await client.chat.completions.create({
    model: "gemini-2.5-flash",
    messages: [
      { role: "system", content: TRAVELUS_SYSTEM_PROMPT },
      { role: "user", content: message },
    ],
  });

  const reply = completion.choices[0].message.content?.trim() ?? "";
  console.log("Raw AI reply:", reply);

  // STEP 2: Try to parse JSON
  let parsed = null;
  try {
    parsed = JSON.parse(reply);
  } catch {
    // Not JSON → return plain text
    return {
      success: true,
      reply,
      action: null,
    };
  }

  // STEP 3: Validate JSON action
  if (!parsed?.action || !parsed?.parameters) {
    return {
      success: true,
      reply,
      action: null,
    };
  }

  const { action, parameters } = parsed;

  // Handle SEARCH RIDES
  if (action === "search_rides") {
    const { origin, destination } = parameters;

    console.log(`AI requested ride search from ${origin} to ${destination}`);
    const result = await AITools.searchRides(origin, destination);

    if (!result.success) {
      return {
        success: false,
        reply: "Sorry, I could not search for rides. Please try again.",
        action: parsed,
      };
    }

    if (result.rides.length === 0) {
      return {
        success: true,
        reply: `🚫 No rides found from ${origin} to ${destination} currently.`,
        action: parsed,
      };
    }

    // Format ride results nicely
    const formatted = result.rides
      .map(
        (r) =>
          `\n•From: ${r.departureLocation}\n  To: ${r.destinationLocation}\n  Time: ${r.departureTime}`
      )
      .join("\n\n");

    return {
      success: true,
      reply: `🚗 Available rides from ${origin} → ${destination}:\n\n${formatted}`,
      action: parsed,
    };
  }

  // HANDLE NAVIGATION
  if (action === "navigate") {
    return {
      success: true,
      reply: `Navigating to ${parameters.page}...`,
      action: parsed,
    };
  }
}

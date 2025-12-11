"use server";

import OpenAI from "openai";
import { AIResponse } from "@/types";
import { TRAVELUS_SYSTEM_PROMPT } from "@/utils/prompts/systemPrompt";
import { searchRides } from "./aiTools";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

export async function sendMessageToAI(
  userMessage: string,
  conversationHistory: { role: "user" | "assistant"; content: string }[]
): Promise<AIResponse> {
  // STEP 1: Send user message to AI
  const messagesForAI = [
    { role: "system", content: TRAVELUS_SYSTEM_PROMPT },
    ...conversationHistory
      .filter((msg) => typeof msg.content === "string")
      .map((msg) => ({
        role: msg.role,
        content: msg.content!,
      })),
    { role: "user", content: userMessage },
  ];

  try {
    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: messagesForAI,
    });

    const reply = completion.choices[0].message?.content.trim() || "";
    console.log("Raw AI reply:", reply);

    // STEP 2: Try to parse JSON
    let parsed: any = null;
    try {
      parsed = JSON.parse(reply);
    } catch {
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
      const result = await searchRides(origin, destination);

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

      return {
        success: true,
        reply: "found_rides",
        rides: result.rides,
        action: { ...parsed, rides: result.rides },
      };
    }

    // Handle NAVIGATION
    if (action === "navigate") {
      return {
        success: true,
        reply: `Navigating to ${parameters.page}...`,
        action: parsed,
      };
    }

    // Default fallback
    return { success: true, reply, action: parsed };
  } catch (err) {
    console.error("AI request error:", err);
    return {
      success: false,
      reply: "⚠️ Something went wrong while contacting AI. Please try again.",
      action: null,
    };
  }
}

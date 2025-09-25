"use server";

import { createClient } from "@/lib/supabase/server";

// Purpose: Save the retrieved FCM token to the database
export async function saveFcmToken(token: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("notification_subscriptions")
    .upsert({ endpoint: token });

  if (error) {
    console.log("Error saving FCM token:", error);
    return { success: false, error: error.message };
  }

  return { success: true, message: "FCM Token saved successfully" };
}

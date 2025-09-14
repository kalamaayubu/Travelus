// Get user by email with admin privileges
import supabaseAdmin from "@/lib/supabase/supabaseAdmin"

export async function getUserByEmail(email: string) {
  const { data, error } = await supabaseAdmin
    .from("profiles")
    .select("*")
    .eq("email", email)
    .single()

  if (error) {
    // If you want stricter error handling:
    if (error.code !== "PGRST116") {
      throw error // PGRST116 = no rows found
    }
    return null
  }

  return data
}

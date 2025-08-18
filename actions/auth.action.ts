"use server";

import { createClient } from "@/lib/supabase/server";
import { LoginFormData, SignupFormData } from "@/types";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// Signup action for user registration
export async function signup(data: SignupFormData) {
  try {
    const supabase = await createClient();
    console.log("Signup Data:", data);

    // Step 1: Sign up user
    const { data: signupData, error: authError } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
            name: data.name
        }
      }
    });

    if (authError) {
        console.error("Signup Error:", authError);
      return {
        success: false,
        error: authError.message,
      };
    }

    console.log("Signup Response:", signupData);
    return {
      success: true,
      user: signupData.user,
      message: "Signup successful. Check your email for verification.",
    };
  } catch (err) {
    console.error("Server Action Error:", err);
    return {
      success: false,
      error: "Internal Server Error",
    };
  }
}


// Login action for user authentication
export async function login(formData: LoginFormData) {
  const supabase = await createClient()
  const cookieStore = await cookies()

  const { data, error } = await supabase.auth.signInWithPassword({ 
    email: formData.email, 
    password: formData.password 
})

  if (error) {
    console.error("Error logging in:", error.stack)
    return { success: false, error: error.message }
  }

  // Fetch the user's role after successful login
  const { data: profileData, error: profileError } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", data.user.id)
    .single()

  if (profileError) {
    console.error("Error fetching profile:", profileError.message)
    return { success: false, error: "Could not fetch user profile." }
  }

    // If the profile data contains a role, set it in the authState cookie
  if (profileData?.role) {
        cookieStore.set(
            "authState",
            encodeURIComponent(JSON.stringify({ role: profileData.role, isAuthenticated: true })),
            { httpOnly: true, path: "/" }
        );
  }

  // Role based redirection
  const role = profileData.role
  let redirectUrl: string = "/";
  if (role === "rider") redirectUrl = "/rider/available-rides"
  if (role === "driver") redirectUrl = "/driver/rides"
  if (role === "admin") redirectUrl = "/admin/dashboard"

  // If successful, manually set cookies if needed
  const { access_token, refresh_token } = data.session

  // The access token
  cookieStore.set("sb-access-token", access_token, {
    path: "/",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 5, // Five hours
  })

  // The refresh token
  cookieStore.set("sb-refresh-token", refresh_token, {
    path: "/",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  })

  // Response object to the client
  return {
    success: true,
    role: profileData.role,
    user: data.user,
    redirectUrl,
    message: "Successfully logged in",
  }
}


// Logout action to clear session and cookies
export async function logout() {
  const supabase = await createClient();

  // Sign out the user
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error("Error logging out:", error.message);
    return { success: false, error: "Failed to log out." };
  }

  // Clear manual cookies
  const cookieStore = await cookies();
  cookieStore.delete("authState");

  return { success: true, message: "Successfully logged out." };
}

// Function to check if the user is authenticated
export async function getSession() {
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();
  return session;
}
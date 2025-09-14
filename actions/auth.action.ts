"use server";

import { createClient } from "@/lib/supabase/server";
import supabaseAdmin from "@/lib/supabase/supabaseAdmin";
import { LoginFormData, SignupFormData } from "@/types";
import { cookies } from "next/headers";

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
            name: data.name,
            role: data.role
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
      message: "Successful. Check your email for verification.",
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
  if (role === "rider") redirectUrl = "/available-rides"
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

  console.log('USER:', data.user)

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

  // Clear manual cookies
  const cookieStore = await cookies();
  cookieStore.delete("authState");

  // Sign out the user
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error("Error logging out:", error.message);
    return { success: false, error: "Failed to log out." };
  }

  return { success: true, message: "Successfully logged out." };
}

// Function to check if the user is authenticated
export async function getSession() {
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();
  return session;
}


// Forgot password action to send reset email
export async function forgotPassword(email: string) {
  const supabase = await createClient();

  // Get the base URL dynamically for appropriate redirection
  const baseUrl = process.env.NODE_ENV === 'production'
      ? 'https://travelusapp.netlify.app'
      : 'http://localhost:3000';

  const { error: sendEmailError  } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${baseUrl}/auth/reset-password`
  })

  if (sendEmailError) {
    console.error("Error sending reset email:", sendEmailError.message);
    return { success: false, error: sendEmailError.message };
  }

  console.log("Password reset email sent to:", email);
  return { success: true, message: "If your email is registered, you’ll receive a password reset link shortly." };
}


// Reset password action to update the password
export async function resetPassword(newPassword: string ) {
  const supabase = await createClient();
  
  // Optional: Log current session to verify auth status
  const { data: sessionData, error: sessionError } = await supabase.auth.getSession();

  if (sessionError || !sessionData.session) {
    return {
      success: false,
      error: 'No active session found. Please use the reset link from your email again.',
    };
  }

  // Update the password for the current user
  const { error: updateError } = await supabase.auth.updateUser({
    password: newPassword,
  });

  if (updateError) {
    console.error('Error updating password:', updateError.message);
    return {
      success: false,
      error: updateError.message,
    };
  }

  return {
    success: true,
    message: 'Password updated successfully. You can now log in with your new password.',
  };
}

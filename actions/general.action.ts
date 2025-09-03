'use server'

import { createClient } from "@/lib/supabase/server"
import { FeedbackFormData, WaitlistFormData } from "@/types"

export async function joinWaitlist(data: WaitlistFormData) {
    const supabase = await createClient()

    const { error } = await supabase
        .from('waitlist')
        .insert([{ email: data.email }])

    if (error?.code === "23505") {
        return { success: true, message: "You're already on the waitlist 🎉"}
    }

    if (error) {
        console.log('Error joining waitlist:', error.message)
        return { success: false, error: error.message }
    }

    return { success: true, message: 'Congratulations, you were successfully added'}
}


export async function sendFeedback(data: FeedbackFormData) {
    const supabase = await createClient()

    const { error } = await supabase
        .from("feedback")
        .insert([{
            name: data.name,
            email: data.email,
            content: data.content
        }])

    if (error) {
        console.log('Error sending feedback:', error.message)
        return { success: false, error: error.message }
    }

    return { success: true, message: 'Your feedback was successfully recorded 🎉'}
}
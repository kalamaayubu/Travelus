'use server'

import { resend } from "./resendConfig";

type SendEmailProps = {
  to: string[];
  subject: string;
  message: string;
};

export async function sendEmail({ to, subject, message }: SendEmailProps) {
  try {
    const { data, error } = await resend.emails.send({
      from: "Travelus <onboarding@resend.dev>", // Sandbox sender
      to,
      subject,
      html: `<p>${message}</p>`,
    });

    if (error) {
      console.error("Error sending email:", error.message);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (error: any) {
    console.error("Error sending email:", error);
    return { success: false, error: error.message };
  }
}
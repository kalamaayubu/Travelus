"use server";

import { EmailProps } from "@/types";
import { Resend } from "resend";

export default async function sendEmail(emailData: EmailProps) {
  const resend = new Resend(process.env.RESEND_API_KEY);

  const { data, error } = await resend.emails.send({
    from: "onboarding@resend.dev",
    to: emailData.to,
    subject: emailData.subject,
    html: emailData.body,
  });

  if (error) {
    console.error("ERROR SENDING EMAIL", error);
    return { success: false, error: error.message };
  }

  console.log(data);
  return {
    success: true,
    message: `Congratulations, your email with id ${data.id} is send.`,
  };
}

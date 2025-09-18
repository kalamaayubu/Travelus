import { sendEmail } from "@/lib/resend/email.action";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { to, subject, message } = body;
    console.log(body)

    if (!to || !subject || !message) {
      console.error('Missing required fields')
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    const result = await sendEmail({ to, subject, message });
    return NextResponse.json(result);
  } catch (err: any) {
    console.error("API ERROR:", err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}

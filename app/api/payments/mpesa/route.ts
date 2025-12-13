import { initiateMpesaSTKPush } from "@/actions/payment.action";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { phoneNumber, amount } = await req.json();

    if (!phoneNumber || !amount) {
      return NextResponse.json(
        { success: false, message: "Missing phoneNumber or amount" },
        { status: 400 }
      );
    }

    const result = await initiateMpesaSTKPush({
      phoneNumber,
      amount,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("STK API error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}

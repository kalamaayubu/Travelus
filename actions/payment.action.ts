"use server";

import { getMpesaAccessToken, getTimestamp } from "@/lib/mpesa/mpesa";
import axios from "axios";

export async function initiateMpesaSTKPush({
  phoneNumber,
  amount,
}: {
  phoneNumber: string;
  amount: number;
}) {
  try {
    const accessToken = await getMpesaAccessToken();
    const timestamp = getTimestamp();

    const password = Buffer.from(
      `${process.env.MPESA_SHORTCODE}${process.env.MPESA_PASSKEY}${timestamp}`
    ).toString("base64");

    const payload = {
      BusinessShortCode: 174379,
      Password:
        "MTc0Mzc5YmZiMjc5ZjlhYTliZGJjZjE1OGU5N2RkNzFhNDY3Y2QyZTBjODkzMDU5YjEwZjc4ZTZiNzJhZGExZWQyYzkxOTIwMjUxMjEzMTQzMjIz",
      Timestamp: timestamp,
      TransactionType: "CustomerPayBillOnline",
      Amount: amount,
      PartyA: phoneNumber,
      PartyB: 174379,
      PhoneNumber: phoneNumber,
      CallBackURL:
        "https://tend-reduce-shore-cultures.trycloudflare.com/api/mpesa/callback",
      AccountReference: "Test",
      TransactionDesc: "Test",
    };

    const response = await axios.post(
      "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
      payload,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    return {
      success: true,
      data: response.data,
    };
  } catch (error: any) {
    console.error("M-Pesa STK Push Error:", error);

    return {
      success: false,
      error: error?.response?.data || "STK Push failed",
    };
  }
}

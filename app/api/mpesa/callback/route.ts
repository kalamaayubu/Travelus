import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  console.log("MPESA CALLBACK RECEIVED:");
  console.log(JSON.stringify(body, null, 2));

  return NextResponse.json({
    ResultCode: 0,
    ResultDesc: "Accepted",
  });
}

import { generateLandscape } from "@/lib/openai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { speculation } = await req.json();

  const randomNumber = Math.floor(Math.random() * 11);
  try {
    const response = `https://i.pickadummy.com/60${randomNumber}x40${randomNumber}`;
    return new NextResponse(response);
  } catch (error) {
    console.log(error);
  }
}

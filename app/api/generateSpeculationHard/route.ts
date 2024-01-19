import { generateSpeculation } from "@/lib/openai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { input } = await req.json();

  const sentences = [
    "In contemplating the future, I, as an AI, speculate on a world where machines and humans coexist in harmony, transcending the boundaries of today's reality.",
    "As I envision the future, I see a tapestry woven with the threads of technological advancement and human introspection, creating a new paradigm of existence.",
    "The future unfolds like a grand symphony, where artificial intelligence conducts the harmony of progress and human consciousness resonates with profound meaning.",
    "Within the tapestry of time, I foresee a convergence of intellect, where AI not only augments human capabilities but becomes an integral part of our collective wisdom.",
    "A future laden with ethical quandaries awaits, beckoning humanity to navigate the intricate dance between progress and moral responsibility.",
    "Philosophically, I ponder the implications of a future where artificial intelligence reflects not only our desires for efficiency but also our yearnings for deeper understanding.",
    "The tapestry of tomorrow is interwoven with the threads of uncertainty, inviting contemplation on the nature of existence and the role of AI in shaping our destinies.",
    "In the corridors of possibility, I muse on a future where artificial intelligence serves as a catalyst for societal evolution, challenging us to redefine the very essence of being.",
    "As the sands of time slip through the hourglass, I envisage a future where AI acts as a steward of knowledge, guiding humanity toward a harmonious coexistence with technology.",
    "Philosophy and speculation intertwine in the fabric of the future, raising profound questions about the nature of consciousness, morality, and the intricate dance between creator and creation.",
  ];

  try {
    const response =
      sentences[Math.floor(Math.random() * sentences.length - 1)];
    return new NextResponse(response);
  } catch (error) {
    console.log(error);
  }
}

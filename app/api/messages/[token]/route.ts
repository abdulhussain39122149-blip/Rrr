import { NextResponse } from "next/server";
import { getMessage } from "@/lib/db";

export const runtime = "nodejs";

export async function GET(_request: Request, context: { params: Promise<{ token: string }> }) {
  const { token } = await context.params;
  const message = getMessage(token);
  if (!message) return NextResponse.json({ error: "বার্তাটি পাওয়া যায়নি অথবা মেয়াদ শেষ হয়েছে।" }, { status: 410 });
  return NextResponse.json(message, { headers: { "Cache-Control": "no-store, private" } });
}

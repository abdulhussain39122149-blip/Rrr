import { randomBytes } from "node:crypto";
import { NextResponse } from "next/server";
import { insertMessage } from "@/lib/db";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const body = await request.json();
  const allowed = new Set([300, 3600, 86400, 604800]);
  if (!body.ciphertext || !body.iv || !allowed.has(body.expiresIn)) return NextResponse.json({ error: "অনুরোধটি সঠিক নয়।" }, { status: 400 });
  const now = Date.now();
  const token = randomBytes(32).toString("base64url");
  insertMessage({ token, ciphertext: body.ciphertext, iv: body.iv, expiresAt: now + body.expiresIn * 1000 });
  return NextResponse.json({ token, expiresAt: now + body.expiresIn * 1000 }, { status: 201 });
}

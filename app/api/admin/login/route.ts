import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { createSession, isRateLimited, recordAttempt, clearAttempts } from "@/lib/auth";
import { loginSchema } from "@/lib/validation";

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") ?? "local";

  if (isRateLimited(ip)) {
    return NextResponse.json({ error: "Too many attempts. Try again later." }, { status: 429 });
  }

  const body = await req.json().catch(() => null);
  const parsed = loginSchema.safeParse(body);
  if (!parsed.success) {
    recordAttempt(ip);
    return NextResponse.json({ error: "Invalid input." }, { status: 400 });
  }

  const { username, password } = parsed.data;
  const expectedUser = process.env.ADMIN_USERNAME;
  const expectedHash = process.env.ADMIN_PASSWORD_HASH;

  if (!expectedUser || !expectedHash) {
    return NextResponse.json({ error: "Admin account not configured." }, { status: 500 });
  }

  const userOk = username === expectedUser;
  const passOk = await bcrypt.compare(password, expectedHash);

  if (!userOk || !passOk) {
    recordAttempt(ip);
    return NextResponse.json({ error: "Invalid credentials." }, { status: 401 });
  }

  clearAttempts(ip);
  await createSession();
  return NextResponse.json({ ok: true });
}

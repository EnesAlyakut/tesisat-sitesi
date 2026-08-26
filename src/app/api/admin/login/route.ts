import { NextResponse } from "next/server";
import { ADMIN_COOKIE, createAdminToken, credentialsMatch, sameOrigin } from "@/lib/admin-auth";

const attempts = new Map<string, { count: number; resetAt: number }>();
const WINDOW_MS = 15 * 60 * 1000;

export async function POST(request: Request) {
  if (!sameOrigin(request)) return NextResponse.json({ error: "Geçersiz istek." }, { status: 403 });

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  const now = Date.now();
  const record = attempts.get(ip);
  if (record && record.resetAt > now && record.count >= 6) {
    return NextResponse.json({ error: "Çok fazla deneme yapıldı. Daha sonra tekrar deneyin." }, { status: 429 });
  }

  const body = await request.json().catch(() => ({})) as { username?: string; password?: string };
  try {
    if (!credentialsMatch(body.username?.trim() ?? "", body.password ?? "")) {
      attempts.set(ip, { count: record && record.resetAt > now ? record.count + 1 : 1, resetAt: now + WINDOW_MS });
      return NextResponse.json({ error: "Kullanıcı adı veya şifre hatalı." }, { status: 401 });
    }
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Admin yapılandırması eksik." }, { status: 503 });
  }

  attempts.delete(ip);
  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_COOKIE, createAdminToken(), {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8,
  });
  return response;
}

import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { isAdmin, sameOrigin } from "@/lib/admin-auth";
import { getCmsContent, saveCmsContent } from "@/lib/cms";

export async function GET() {
  if (!(await isAdmin())) return NextResponse.json({ error: "Yetkisiz." }, { status: 401 });
  return NextResponse.json(await getCmsContent());
}

export async function PUT(request: Request) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Yetkisiz." }, { status: 401 });
  if (!sameOrigin(request)) return NextResponse.json({ error: "Geçersiz istek." }, { status: 403 });
  try {
    const content = await saveCmsContent(await request.json());
    revalidatePath("/", "layout");
    return NextResponse.json({ ok: true, content });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "İçerik kaydedilemedi." }, { status: 400 });
  }
}

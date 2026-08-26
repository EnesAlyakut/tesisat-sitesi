import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { isAdmin, sameOrigin } from "@/lib/admin-auth";
import type { Service } from "@/data/types";
import { getServices, saveServices } from "@/lib/services-server";

/** Minimal validation – ensures the value looks like a Service object. */
function isValidService(v: unknown): v is Service {
  if (typeof v !== "object" || v === null) return false;
  const s = v as Record<string, unknown>;
  return (
    typeof s.slug === "string" &&
    s.slug.length > 0 &&
    typeof s.title === "string" &&
    typeof s.shortTitle === "string" &&
    typeof s.icon === "string" &&
    typeof s.summary === "string" &&
    typeof s.metaTitle === "string" &&
    typeof s.metaDescription === "string" &&
    typeof s.h1 === "string" &&
    typeof s.intro === "string" &&
    typeof s.featured === "boolean" &&
    Array.isArray(s.blocks) &&
    Array.isArray(s.faq) &&
    Array.isArray(s.related) &&
    Array.isArray(s.equipment)
  );
}

/** GET – return the full services array. */
export async function GET() {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const services = await getServices();
    return NextResponse.json(services);
  } catch {
    return NextResponse.json(
      { error: "Failed to read services" },
      { status: 500 },
    );
  }
}

/** PUT – replace the entire services array. */
export async function PUT(request: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!sameOrigin(request)) {
    return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
  }

  try {
    const body = await request.json();

    if (!Array.isArray(body)) {
      return NextResponse.json(
        { error: "Body must be an array of services" },
        { status: 400 },
      );
    }

    for (const item of body) {
      if (!isValidService(item)) {
        return NextResponse.json(
          { error: `Invalid service object: ${JSON.stringify(item).slice(0, 120)}` },
          { status: 400 },
        );
      }
    }

    const services = body as Service[];
    await saveServices(services);
    revalidatePath("/", "layout");
    return NextResponse.json({ ok: true, services });
  } catch {
    return NextResponse.json(
      { error: "Failed to update services" },
      { status: 500 },
    );
  }
}

/** POST – append a single service to the array. */
export async function POST(request: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!sameOrigin(request)) {
    return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
  }

  try {
    const body = await request.json();

    if (!isValidService(body)) {
      return NextResponse.json(
        { error: "Invalid service object" },
        { status: 400 },
      );
    }

    const services = await getServices();

    if (services.some((s) => s.slug === body.slug)) {
      return NextResponse.json(
        { error: `Service with slug "${body.slug}" already exists` },
        { status: 409 },
      );
    }

    services.push(body);
    await saveServices(services);
    revalidatePath("/", "layout");
    return NextResponse.json({ ok: true, services });
  } catch {
    return NextResponse.json(
      { error: "Failed to create service" },
      { status: 500 },
    );
  }
}

/** DELETE – remove a service by slug. */
export async function DELETE(request: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!sameOrigin(request)) {
    return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
  }

  try {
    const { slug } = await request.json();

    if (typeof slug !== "string" || slug.length === 0) {
      return NextResponse.json(
        { error: "Missing or invalid slug" },
        { status: 400 },
      );
    }

    const services = await getServices();
    const index = services.findIndex((s) => s.slug === slug);

    if (index === -1) {
      return NextResponse.json(
        { error: `Service "${slug}" not found` },
        { status: 404 },
      );
    }

    services.splice(index, 1);
    await saveServices(services);
    revalidatePath("/", "layout");
    return NextResponse.json({ ok: true, services });
  } catch {
    return NextResponse.json(
      { error: "Failed to delete service" },
      { status: 500 },
    );
  }
}

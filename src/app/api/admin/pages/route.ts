import { promises as fs } from 'node:fs';
import path from 'node:path';
import { NextResponse } from 'next/server';
import { isAdmin, sameOrigin } from '@/lib/admin-auth';

// Directory where markdown pages are stored. Adjust as needed.
const pagesDir = path.join(process.cwd(), 'data', 'pages');

// Ensure the directory exists.
async function ensureDir() {
  await fs.mkdir(pagesDir, { recursive: true });
}

// Helper to get the file path for a given slug.
function pagePath(slug: string) {
  // Sanitize slug to prevent path traversal.
  const safeSlug = slug.replace(/[^a-zA-Z0-9_-]/g, '-');
  return path.join(pagesDir, `${safeSlug}.md`);
}

/** GET list of pages or a specific page content */
export async function GET(request: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug');

  await ensureDir();

  if (slug) {
    // Return content of a single page.
    try {
      const content = await fs.readFile(pagePath(slug), 'utf-8');
      return NextResponse.json({ slug, content });
    } catch {
      return NextResponse.json({ error: 'Page not found' }, { status: 404 });
    }
  } else {
    // Return list of slugs.
    const files = await fs.readdir(pagesDir);
    const slugs = files.filter((f) => f.endsWith('.md')).map((f) => f.replace(/\.md$/, ''));
    return NextResponse.json({ pages: slugs });
  }
}

/** POST create a new page */
export async function POST(request: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  if (!sameOrigin(request)) {
    return NextResponse.json({ error: 'Invalid origin' }, { status: 403 });
  }
  const { slug, content } = await request.json();
  if (!slug) {
    return NextResponse.json({ error: 'Missing slug' }, { status: 400 });
  }
  await ensureDir();
  const filePath = pagePath(slug);
  try {
    await fs.writeFile(filePath, content ?? '', 'utf-8');
    return NextResponse.json({ ok: true, slug });
  } catch {
    return NextResponse.json({ error: 'Failed to create page' }, { status: 500 });
  }
}

/** PUT update an existing page */
export async function PUT(request: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  if (!sameOrigin(request)) {
    return NextResponse.json({ error: 'Invalid origin' }, { status: 403 });
  }
  const { slug, content } = await request.json();
  if (!slug) {
    return NextResponse.json({ error: 'Missing slug' }, { status: 400 });
  }
  await ensureDir();
  const filePath = pagePath(slug);
  try {
    await fs.writeFile(filePath, content ?? '', 'utf-8');
    return NextResponse.json({ ok: true, slug });
  } catch {
    return NextResponse.json({ error: 'Failed to update page' }, { status: 500 });
  }
}

/** DELETE remove a page */
export async function DELETE(request: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  if (!sameOrigin(request)) {
    return NextResponse.json({ error: 'Invalid origin' }, { status: 403 });
  }
  const { slug } = await request.json();
  if (!slug) {
    return NextResponse.json({ error: 'Missing slug' }, { status: 400 });
  }
  await ensureDir();
  const filePath = pagePath(slug);
  try {
    await fs.unlink(filePath);
    return NextResponse.json({ ok: true, slug });
  } catch {
    return NextResponse.json({ error: 'Failed to delete page' }, { status: 500 });
  }
}

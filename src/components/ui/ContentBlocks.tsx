import Reveal from "./Reveal";
import type { ContentBlock } from "@/data/types";

function renderTextWithLinks(text: string) {
  const parts: (string | React.JSX.Element)[] = [];
  const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }
    const label = match[1];
    const href = match[2];
    parts.push(
      <a
        key={`${match.index}-${href}`}
        href={href}
        className="font-semibold text-copper-600 underline decoration-copper-300 underline-offset-4 transition hover:text-copper-700 hover:decoration-copper-600"
      >
        {label}
      </a>
    );
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return parts.length > 0 ? parts : text;
}

/** Hizmet ve kurumsal sayfaların metin gövdesi. SEO uyumlu iç linkleme ve H2/H3 hiyerarşisi. */
export default function ContentBlocks({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <div className="space-y-12">
      {blocks.map((block, i) => (
        <Reveal key={block.heading} delay={i * 40} as="section">
          <h2 className="text-2xl font-bold leading-snug text-ink sm:text-3xl">
            {block.heading}
          </h2>

          {block.body.map((p, pIndex) => (
            <p key={pIndex} className="mt-4 text-[1.02rem] leading-[1.8] text-ink-soft">
              {renderTextWithLinks(p)}
            </p>
          ))}

          {block.bullets && (
            <ul className="mt-6 space-y-3">
              {block.bullets.map((b, bIndex) => (
                <li key={bIndex} className="flex gap-3.5 text-[0.98rem] leading-relaxed text-ink-soft">
                  <span
                    aria-hidden="true"
                    className="mt-2.5 size-2 shrink-0 rounded-full bg-copper-500"
                  />
                  <span>{renderTextWithLinks(b)}</span>
                </li>
              ))}
            </ul>
          )}
        </Reveal>
      ))}
    </div>
  );
}

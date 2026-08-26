import type { ReactNode } from "react";
import Reveal from "./Reveal";

interface Props {
  children: ReactNode;
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  lead?: ReactNode;
  /** Baslik blogunu ortalar. */
  centered?: boolean;
  className?: string;
  /** Bolum ust cizgisi — akici gecis icin. */
  divider?: boolean;
  /**
   * Zemin tonu. Bolumler arasinda degisimli kullanildiginda sayfa
   * tek duze bir alan olmaktan cikar, okunabilir bantlara ayrilir.
   */
  tone?: "base" | "alt";
  as?: "section" | "div";
}

export default function Section({
  children,
  id,
  eyebrow,
  title,
  lead,
  centered = false,
  className = "",
  divider = false,
  tone = "base",
  as: Tag = "section",
}: Props) {
  const isAlt = tone === "alt";

  return (
    <Tag
      id={id}
      className={`relative py-20 md:py-28 ${
        isAlt ? "border-y border-line bg-canvas-200" : ""
      } ${className}`}
    >
      {divider && !isAlt && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-line-strong to-transparent"
        />
      )}

      <div className="container-x">
        {(eyebrow || title || lead) && (
          <Reveal className={`mb-11 max-w-3xl md:mb-14 ${centered ? "mx-auto text-center" : ""}`}>
            {eyebrow && (
              <p className={`eyebrow mb-4 ${centered ? "justify-center" : ""}`}>
                <span aria-hidden="true" className="h-px w-7 bg-copper-500" />
                {eyebrow}
              </p>
            )}
            {title && (
              <h2 className="text-3xl leading-[1.14] sm:text-4xl md:text-[2.9rem]">{title}</h2>
            )}
            {lead && (
              <p className="mt-5 text-[1.02rem] leading-relaxed text-ink-soft md:text-[1.12rem]">
                {lead}
              </p>
            )}
          </Reveal>
        )}
        {children}
      </div>
    </Tag>
  );
}

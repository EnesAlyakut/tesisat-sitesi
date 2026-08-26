import type { IconName } from "@/data/types";

/**
 * Teknik cizim estetiginde, tek renk (currentColor) ikon seti.
 * Tumu 24x24 grid uzerinde stroke tabanlidir.
 */
const paths: Record<IconName, React.ReactNode> = {
  leak: (
    <>
      <path d="M3 8h11a3 3 0 0 1 3 3v2" />
      <path d="M17 5h4v6h-4z" />
      <path d="M9 12v3" />
      <path d="M9 18.5a1.6 1.6 0 1 0 0-3 1.6 1.6 0 0 0 0 3Z" />
    </>
  ),
  thermal: (
    <>
      <rect x="3" y="5" width="18" height="12" rx="2" />
      <path d="M8 21h8" />
      <path d="M12 17v4" />
      <circle cx="12" cy="11" r="2.5" />
    </>
  ),
  drain: (
    <>
      <circle cx="12" cy="12" r="7" />
      <path d="M12 5v14M5 12h14M7.5 7.5l9 9M16.5 7.5l-9 9" />
    </>
  ),
  camera: (
    <>
      <path d="M3 17c4-6 8-9 13-9" />
      <circle cx="18.5" cy="7.5" r="3" />
      <path d="M3 14v6h6" />
    </>
  ),
  robot: (
    <>
      <rect x="4" y="8" width="16" height="10" rx="2" />
      <path d="M12 8V4" />
      <circle cx="12" cy="3" r="1.4" />
      <path d="M9 13h.01M15 13h.01" />
    </>
  ),
  pipe: (
    <>
      <path d="M3 9h7a2 2 0 0 1 2 2v3a2 2 0 0 0 2 2h7" />
      <path d="M3 6v6M21 13v6" />
    </>
  ),
  bath: (
    <>
      <path d="M3 12h18v3a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4z" />
      <path d="M6 12V6a2 2 0 0 1 4 0" />
      <path d="M6 19v2M18 19v2" />
    </>
  ),
  emergency: (
    <>
      <path d="M12 3 2.5 20h19z" />
      <path d="M12 9v5M12 17h.01" />
    </>
  ),
  flush: (
    <>
      <rect x="6" y="3" width="12" height="7" rx="1.5" />
      <path d="M8 10v4a4 4 0 0 0 4 4h4" />
    </>
  ),
  toilet: (
    <>
      <path d="M7 3h8v5H7z" />
      <path d="M6 8h12l-1.5 6a4 4 0 0 1-3.8 3h-1.4a4 4 0 0 1-3.8-3z" />
      <path d="M10 17v4h5" />
    </>
  ),
  faucet: (
    <>
      <path d="M4 13h5a3 3 0 0 0 3-3V7" />
      <path d="M9 4h6v3H9z" />
      <path d="M4 13v3h5v-3" />
      <path d="M18 11v4a2 2 0 0 1-2 2h-1" />
    </>
  ),
  radiator: (
    <>
      <rect x="4" y="5" width="16" height="12" rx="2" />
      <path d="M8 7v8M12 7v8M16 7v8" />
      <path d="M7 20v-3M17 20v-3" />
    </>
  ),
};

export default function ServiceIcon({
  name,
  className = "",
  size = 24,
}: {
  name: IconName;
  className?: string;
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      {paths[name]}
    </svg>
  );
}

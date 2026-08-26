import { win } from "../sceneUtils";

/**
 * PIS SU TESISATI
 * ------------------------------------------------------------------
 * Gercek bir atik su sisteminin butun parcalari:
 *   düşey kolon (pimaş) → kat branşmanları (eğimli) → sifonlar
 *   → temizleme kapağı → bina çıkışı → rögar
 *   → kolonun çatıdan çıkan havalandırma ucu
 *
 * Havalandirma, sifonlarin su kilidinin emilmesini onler; gercek
 * projelerde kolon her zaman catidan disari cikar.
 *
 * Branşmanlar duz degil, akisi saglayacak egimle cizilmistir (~%2).
 */

/** Lavabo/evye altindaki P-sifon (su kilidi) */
function Trap({ x, top, out }: { x: number; top: number; out: number }) {
  return (
    <path
      className="trap"
      d={`M${x} ${top}v18a13 13 0 0 0 26 0v-6a13 13 0 0 1 13-13h${out - x - 39}`}
    />
  );
}

export default function DrainSystem() {
  return (
    <>
      {/* ============================ 1) DUSEY KOLON (PIMAS) — Ø100 */}
      <g className="drain-stack">
        <path className="draw" pathLength={1} style={win(0.65, 0.686)} d="M486 700V196" />
        <text x="452" y="580" textAnchor="middle" className="pipe-tag" transform="rotate(-90 452 580)">
          PİS SU KOLONU
        </text>
      </g>

      {/* ============================ 2) CATIDAN CIKAN HAVALANDIRMA */}
      <g className="vent" style={win(0.672, 0.696)}>
        <path className="vent-pipe" d="M486 196v-38" />
        <path className="vent-cap" d="M470 158h32l-6-12h-20z" />
        <text x="486" y="136" textAnchor="middle" className="pipe-tag">HAVALANDIRMA</text>
      </g>

      {/* ============================ 3) UST KAT BRANSMANI (egimli) */}
      <g className="drain-branch">
        <path className="draw" pathLength={1} style={win(0.66, 0.69)} d="M486 410 322 400" />
        {/* Klozet cikisi */}
        <path className="draw" pathLength={1} style={win(0.666, 0.692)} d="M424 420v-14" />
      </g>
      {/* Ust kat lavabo sifonu */}
      <g className="traps" style={win(0.67, 0.694)}>
        <Trap x={322} top={362} out={400} />
      </g>

      {/* ============================ 4) ZEMIN KAT BRANSMANLARI (egimli) */}
      <g className="drain-branch">
        {/* Mutfak tarafi — sagdan kolona */}
        <path className="draw" pathLength={1} style={win(0.664, 0.694)} d="M880 598 500 612" />
        {/* Banyo tarafi — soldan kolona */}
        <path className="draw" pathLength={1} style={win(0.668, 0.696)} d="M472 614 340 604" />
        {/* Dus suzgeci */}
        <path className="draw" pathLength={1} style={win(0.672, 0.698)} d="M348 628v-24" />
      </g>

      {/* Zemin kat sifonlari */}
      <g className="traps" style={win(0.674, 0.7)}>
        <Trap x={444} top={568} out={610} />
        <Trap x={856} top={576} out={600} />
      </g>

      {/* ============================ 5) TEMIZLEME KAPAGI */}
      <g className="cleanout" style={win(0.678, 0.702)}>
        <rect x="470" y="646" width="32" height="24" rx="3" className="cleanout-body" />
        <path d="M478 652v12M494 652v12" className="cleanout-mark" />
        <text x="430" y="666" textAnchor="end" className="pipe-tag">TEMİZLEME</text>
      </g>

      {/* ============================ 6) BINA CIKISI VE ROGAR */}
      <g className="drain-out">
        <path className="draw" pathLength={1} style={win(0.68, 0.71)} d="M486 700v14h550" />
      </g>
      <g className="manhole" style={win(0.69, 0.716)}>
        <rect x="1036" y="640" width="68" height="96" className="manhole-body" />
        <path d="M1030 640h80" className="manhole-cover" />
        <text x="1070" y="762" textAnchor="middle" className="pipe-tag">RÖGAR</text>
      </g>
    </>
  );
}

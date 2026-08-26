import { win } from "../sceneUtils";

/**
 * TEMIZ SU TESISATI — kolektorlu sistem
 * ------------------------------------------------------------------
 * Gercek bir konut tesisatinin montaj sirasi:
 *   şebeke girişi → sayaç kutusu → ana kesme vanası → kolon (şaft)
 *   → zemin kat kolektörü → armatür hatları → kombi
 *   → sıcak su kolonu → üst kat kolektörü → üst kat armatür hatları
 *
 * Kolektorlu sistemde her armature AYRI hat gider; ara ek yeri
 * bulunmaz. Bu yuzden hatlar kolektorden tek tek cikar.
 *
 * Cap kademesi: ana giris > kolon > kolektor cikisi > armatur hatti
 */

/** Boru kelepcesi (sabitleme) isareti */
function Clamps({
  from,
  to,
  y,
  step = 90,
  vertical = false,
  x = 0,
}: {
  from: number;
  to: number;
  y?: number;
  step?: number;
  vertical?: boolean;
  x?: number;
}) {
  const marks: string[] = [];
  for (let v = from + step; v < to; v += step) {
    marks.push(vertical ? `M${x - 7} ${v}h14` : `M${v} ${(y ?? 0) - 7}v14`);
  }
  return <path className="clamp" d={marks.join("")} />;
}

export default function SupplySystem() {
  return (
    <>
      {/* ============================================ 1) SEBEKE GIRISI */}
      <g className="pipe-main">
        <path className="draw" pathLength={1} style={win(0.2, 0.226)} d="M0 684h174" />
      </g>

      {/* ============================================ 2) SU SAYACI KUTUSU */}
      <g className="meter" style={win(0.218, 0.246)}>
        <rect x="170" y="652" width="66" height="64" rx="4" className="meter-box" />
        <path d="M170 664h66" className="meter-lid" />
        <circle cx="203" cy="690" r="12" className="meter-dial" />
        <path d="M203 690v-8" className="meter-needle" />
        <text x="203" y="742" textAnchor="middle" className="pipe-tag">SAYAÇ</text>
      </g>

      {/* Sayactan binaya — temel duvarindan kovanla gecer */}
      <g className="pipe-main">
        <path className="draw" pathLength={1} style={win(0.234, 0.264)} d="M236 684h272" />
        <Clamps from={360} to={508} y={684} step={64} />
      </g>
      <text x="6" y="670" className="pipe-tag" style={win(0.206, 0.232)}>
        ŞEBEKE GİRİŞİ
      </text>

      {/* ============================================ 3) ANA KESME VANASI */}
      <g className="valve" style={win(0.252, 0.276)}>
        <path d="M312 670v28l26-28v28z" className="valve-body" />
        <path d="M325 668v-14M313 654h24" className="valve-stem" />
        <text x="325" y="742" textAnchor="middle" className="pipe-tag">ANA VANA</text>
      </g>

      {/* ============================================ 4) KOLON (SAFT ICI) */}
      <g className="pipe-riser">
        <path className="draw" pathLength={1} style={win(0.27, 0.304)} d="M508 684V514" />
        <Clamps from={514} to={684} x={508} step={60} vertical />
      </g>

      {/* ======================================= 5) ZEMIN KAT KOLEKTORU */}
      <g className="manifold" style={win(0.3, 0.328)}>
        <rect x="486" y="476" width="62" height="42" rx="6" className="manifold-body" />
        <path
          d="M486 486h-10M486 496h-10M486 506h-10M548 486h10M548 496h10M548 506h10"
          className="manifold-out"
        />
        <text x="517" y="466" textAnchor="middle" className="pipe-tag">
          KAT KOLEKTÖRÜ
        </text>
      </g>

      {/* ==================== 6) ZEMIN KAT SOGUK SU HATLARI (kolektorden) */}
      <g className="pipe-branch pipe-cold">
        {/* Duş */}
        <path className="draw" pathLength={1} style={win(0.322, 0.348)} d="M476 486H348v-34" />
        {/* Lavabo */}
        <path className="draw" pathLength={1} style={win(0.33, 0.356)} d="M476 496h-28v44" />
        {/* Mutfak evyesi */}
        <path className="draw" pathLength={1} style={win(0.338, 0.366)} d="M558 486h310v50" />
        {/* Kombi beslemesi */}
        <path className="draw" pathLength={1} style={win(0.346, 0.372)} d="M558 496h354v28" />
      </g>

      {/* ============================================ 7) KOMBI SICAK CIKISI */}
      <g className="pipe-branch pipe-hot">
        <path className="draw" pathLength={1} style={win(0.362, 0.386)} d="M940 524v-18H558" />
      </g>

      {/* ==================== 8) ZEMIN KAT SICAK SU HATLARI (kolektorden) */}
      <g className="pipe-branch pipe-hot">
        <path className="draw" pathLength={1} style={win(0.376, 0.4)} d="M476 506H362v-40" />
        <path className="draw" pathLength={1} style={win(0.382, 0.404)} d="M476 512h-14v28" />
        <path className="draw" pathLength={1} style={win(0.386, 0.408)} d="M558 506h324v30" />
      </g>

      {/* ==================== 9) UST KATA CIKAN KOLONLAR (soguk + sicak) */}
      <g className="pipe-riser pipe-cold">
        <path className="draw" pathLength={1} style={win(0.352, 0.382)} d="M498 476V338" />
      </g>
      <g className="pipe-riser pipe-hot">
        <path className="draw" pathLength={1} style={win(0.392, 0.414)} d="M536 476V338" />
      </g>

      {/* ============================================ 10) UST KAT KOLEKTORU */}
      <g className="manifold" style={win(0.398, 0.42)}>
        <rect x="486" y="300" width="62" height="38" rx="6" className="manifold-body" />
        <path d="M486 310h-10M486 320h-10M486 330h-10" className="manifold-out" />
      </g>

      {/* ==================== 11) UST KAT ARMATUR HATLARI */}
      <g className="pipe-branch pipe-cold">
        {/* Gomme rezervuar */}
        <path className="draw" pathLength={1} style={win(0.408, 0.426)} d="M476 310h-8v22" />
        {/* Lavabo soguk */}
        <path className="draw" pathLength={1} style={win(0.412, 0.428)} d="M476 320H326v16" />
      </g>
      <g className="pipe-branch pipe-hot">
        <path className="draw" pathLength={1} style={win(0.416, 0.432)} d="M476 330H340v6" />
      </g>

      {/* ============================================ 12) DIRSEK BAGLANTILARI */}
      <g className="joint">
        <circle cx="508" cy="684" r="9" style={win(0.29, 0.306)} />
        <circle cx="348" cy="486" r="6" style={win(0.342, 0.354)} />
        <circle cx="448" cy="496" r="6" style={win(0.35, 0.362)} />
        <circle cx="868" cy="486" r="6" style={win(0.358, 0.37)} />
        <circle cx="912" cy="496" r="6" style={win(0.366, 0.376)} />
        <circle cx="362" cy="506" r="5.5" style={win(0.394, 0.404)} />
        <circle cx="882" cy="506" r="5.5" style={win(0.4, 0.41)} />
        <circle cx="326" cy="320" r="5.5" style={win(0.422, 0.432)} />
      </g>
    </>
  );
}

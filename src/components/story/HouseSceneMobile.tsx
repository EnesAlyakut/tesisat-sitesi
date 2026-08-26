import { win, window2, crossDown } from "./sceneUtils";

/**
 * MOBIL SAHNE
 * ------------------------------------------------------------------
 * Masaustunun kucultulmus hali DEGILDIR; telefon icin ayri, kompakt ve
 * genis-alcak bir kompozisyondur. Boylece sahne ekranin ust bolgesine
 * sigar, metin paneli alt bolgeyi kullanir ve ikisi cakismaz.
 *
 * Tesisat sirasi masaustuyle ayni mantikta ilerler:
 *   şebeke girişi → sayaç → ana vana → kolon → kolektör
 *   → soğuk hat → inişler → kombi → sıcak hat
 *
 * Mobilde bilincli olarak sadelestirildi: daha az armatur, daha az
 * inis, daha az partikul.
 */
export default function HouseSceneMobile() {
  return (
    <svg
      viewBox="0 0 400 348"
      className="story-svg"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <pattern id="mrs-hatch-m" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="6" stroke="var(--color-navy-600)" strokeWidth="1" strokeOpacity="0.26" />
        </pattern>
        <pattern id="mrs-soil-m" width="13" height="13" patternUnits="userSpaceOnUse">
          <path d="M0 9h3M6 3h3M3 6h1" stroke="var(--color-navy-600)" strokeWidth="1.2" strokeOpacity="0.3" strokeLinecap="round" />
        </pattern>
        <radialGradient id="mrs-heat-m">
          <stop offset="0%" stopColor="var(--color-alert-400)" stopOpacity="0.75" />
          <stop offset="100%" stopColor="var(--color-alert-500)" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="mrs-wet-m">
          <stop offset="0%" stopColor="var(--color-aqua-500)" stopOpacity="0.4" />
          <stop offset="100%" stopColor="var(--color-aqua-500)" stopOpacity="0" />
        </radialGradient>
      </defs>

      <g className="cam" style={window2(0.06, 0.18, 0.92, 1) as never}>
        <g className="cam-leak" style={window2(0.54, 0.6, 0.63, 0.69) as never}>

          {/* Zemin */}
          <g className="ln-soft">
            <path className="draw" pathLength={1} style={win(0.015, 0.06)} d="M8 300h384" />
          </g>

          {/* Dogal zemin taramasi */}
          <g className="soil" style={win(0.05, 0.085)}>
            <rect x="0" y="300" width="60" height="48" fill="url(#mrs-soil-m)" />
            <rect x="350" y="300" width="50" height="48" fill="url(#mrs-soil-m)" />
            <rect x="60" y="336" width="290" height="12" fill="url(#mrs-soil-m)" />
          </g>

          {/* Doseme kesiti */}
          <g className="slab" style={win(0.1, 0.16)}>
            <rect x="60" y="300" width="290" height="10" fill="url(#mrs-hatch-m)" />
            <rect x="60" y="300" width="290" height="10" className="slab-edge" />
          </g>

          {/* Ev kabugu */}
          <g className="ln-house">
            <path className="draw" pathLength={1} style={win(0.065, 0.115)} d="M44 96 205 34l161 62" />
            <path className="draw" pathLength={1} style={win(0.085, 0.14)} d="M60 96v204h290V96" />
            <path className="draw" pathLength={1} style={win(0.115, 0.155)} d="M60 118h290" />
          </g>

          {/* Kiremit dokusu */}
          <g className="tiles" style={win(0.13, 0.17)}>
            {Array.from({ length: 7 }, (_, i) => {
              const t = (i + 1) / 8;
              const x = 44 + (205 - 44) * t;
              const y = 96 + (34 - 96) * t;
              return <path key={`ml${i}`} d={`M${x} ${y}l4 5`} />;
            })}
            {Array.from({ length: 7 }, (_, i) => {
              const t = (i + 1) / 8;
              const x = 205 + (366 - 205) * t;
              const y = 34 + (96 - 34) * t;
              return <path key={`mr${i}`} d={`M${x} ${y}l-4 5`} />;
            })}
          </g>

          {/* Saft ve bolme duvari */}
          <g className="ln-wall">
            <rect x="86" y="118" width="26" height="182" fill="url(#mrs-hatch-m)" className="shaft-fill" style={win(0.15, 0.19)} />
            <path className="draw" pathLength={1} style={win(0.15, 0.19)} d="M86 118v182M112 118v182" />
            <path className="draw" pathLength={1} style={win(0.14, 0.18)} d="M228 118v182M236 118v182" />
          </g>

          <g className="lbl">
            <text x="170" y="140" textAnchor="middle" style={win(0.16, 0.195)}>BANYO</text>
            <text x="294" y="140" textAnchor="middle" style={win(0.17, 0.2)}>MUTFAK</text>
          </g>

          {/* Armaturler */}
          <g className="ln-fix">
            {/* Dus teknesi + baslik */}
            <path className="draw" pathLength={1} style={win(0.165, 0.2)} d="M130 268h64l-5 18h-54z" />
            <path className="draw" pathLength={1} style={win(0.17, 0.2)} d="M152 210h20l-3 7h-14z" />
            {/* Evye */}
            <path className="draw" pathLength={1} style={win(0.18, 0.212)} d="M248 232h64M258 232v22h44v-22" />
            {/* Kombi */}
            <path className="draw" pathLength={1} style={win(0.19, 0.218)} d="M300 122h44v54h-44z" />
            <path className="draw" pathLength={1} style={win(0.195, 0.222)} d="M310 146h24M310 156h24" />
            <text x="322" y="114" textAnchor="middle" className="fix-tag" style={win(0.195, 0.222)}>KOMBİ</text>
          </g>

          {/* --- 1) Sebeke girisi --- */}
          <g className="pipe-main">
            <path className="draw" pathLength={1} style={win(0.2, 0.24)} d="M4 324h95" />
          </g>
          <text x="6" y="312" className="pipe-tag" style={win(0.214, 0.244)}>ŞEBEKE</text>

          {/* --- 2) Sayac --- */}
          <g className="meter" style={win(0.234, 0.258)}>
            <rect x="26" y="312" width="34" height="24" rx="3" className="meter-body" />
            <circle cx="43" cy="324" r="7" className="meter-dial" />
            <path d="M43 324v-4" className="meter-needle" />
          </g>

          {/* --- 3) Ana vana --- */}
          <g className="valve" style={win(0.252, 0.274)}>
            <path d="M72 316v16l15-16v16z" className="valve-body" />
          </g>

          {/* --- 4) Kolon --- */}
          <g className="pipe-riser">
            <path className="draw" pathLength={1} style={win(0.27, 0.308)} d="M99 324V162" />
          </g>

          {/* --- 5) Kolektor --- */}
          <g className="manifold" style={win(0.302, 0.328)}>
            <rect x="82" y="132" width="38" height="30" rx="4" className="manifold-body" />
            <path d="M120 141h8M120 153h8" className="manifold-out" />
          </g>

          {/* --- 6) Soguk ana hat --- */}
          <g className="pipe-header pipe-cold">
            <path className="draw" pathLength={1} style={win(0.324, 0.362)} d="M128 141h194" />
          </g>

          {/* --- 7) Soguk inisler — sicak hatti kopru yaylariyla keser --- */}
          <g className="pipe-branch pipe-cold">
            <path className="draw" pathLength={1} style={win(0.34, 0.364)} d={crossDown(162, 141, 188, 210, 6)} />
            <path className="draw" pathLength={1} style={win(0.352, 0.376)} d={crossDown(268, 141, 188, 228, 6)} />
          </g>

          {/* --- 8) Kombi soguk beslemesi --- */}
          <g className="pipe-branch pipe-cold">
            <path className="draw" pathLength={1} style={win(0.368, 0.388)} d="M322 141v-19" />
          </g>

          {/* --- 9) Sicak ana hat --- */}
          <g className="pipe-header pipe-hot">
            <path className="draw" pathLength={1} style={win(0.388, 0.414)} d="M322 176v12H150" />
          </g>

          {/* --- 10) Sicak inisler --- */}
          <g className="pipe-branch pipe-hot">
            <path className="draw" pathLength={1} style={win(0.402, 0.42)} d="M176 188v22" />
            <path className="draw" pathLength={1} style={win(0.41, 0.426)} d="M284 188v40" />
          </g>

          {/* --- 11) Dirsekler --- */}
          <g className="joint">
            <circle cx="99" cy="324" r="6" style={win(0.29, 0.308)} />
            <circle cx="99" cy="141" r="5" style={win(0.318, 0.334)} />
            <circle cx="162" cy="141" r="4.5" style={win(0.352, 0.366)} />
            <circle cx="268" cy="141" r="4.5" style={win(0.362, 0.376)} />
            <circle cx="322" cy="141" r="4.5" style={win(0.378, 0.392)} />
            <circle cx="322" cy="188" r="4.5" style={win(0.4, 0.412)} />
          </g>

          {/* ==================================================== SU AKISI */}
          <g className="flow flow-cold">
            <path className="flow-line" pathLength={1} style={win(0.42, 0.454)} d="M4 324h95V162" />
            <path className="flow-line" pathLength={1} style={win(0.448, 0.48)} d="M128 141h194" />
            <path className="flow-line" pathLength={1} style={win(0.472, 0.496)} d={crossDown(162, 141, 188, 210, 6)} />
            <path className="flow-line" pathLength={1} style={win(0.48, 0.506)} d={crossDown(268, 141, 188, 228, 6)} />
          </g>
          <g className="flow flow-hot">
            <path className="flow-line" pathLength={1} style={win(0.496, 0.52)} d="M322 176v12H150" />
            <path className="flow-line" pathLength={1} style={win(0.514, 0.534)} d="M176 188v22" />
            <path className="flow-line" pathLength={1} style={win(0.522, 0.54)} d="M284 188v40" />
          </g>

          <g className="jet">
            <path pathLength={1} style={window2(0.5, 0.516, 0.905, 0.94)} d="M162 218v46" />
            <path pathLength={1} style={window2(0.512, 0.528, 0.905, 0.94)} d="M276 232v16" />
          </g>

          {/* ================================================== SU KACAGI */}
          <g className="leak" style={window2(0.54, 0.566, 0.862, 0.895) as never}>
            <ellipse cx="222" cy="168" rx="46" ry="32" fill="url(#mrs-wet-m)" className="wet" style={win(0.552, 0.615)} />
            <circle cx="222" cy="141" r="4.5" className="leak-dot" />
            <circle cx="222" cy="148" r="3" className="drop d1" />
            <circle cx="222" cy="148" r="3" className="drop d2" />
          </g>

          <g className="target" style={window2(0.606, 0.632, 0.868, 0.9) as never}>
            <circle cx="222" cy="141" r="32" fill="url(#mrs-heat-m)" className="heat" />
            <circle cx="222" cy="141" r="19" className="ring" />
            <text x="222" y="100" textAnchor="middle" className="tag">KAÇAK</text>
          </g>

          {/* Evye sifonu (su kilidi) */}
          <g className="traps" style={win(0.676, 0.702)}>
            <path className="trap" d="M270 254v12a9 9 0 0 0 18 0v-4a9 9 0 0 1 9-9h14" />
          </g>

          {/* Catidan cikan havalandirma */}
          <g className="vent" style={win(0.672, 0.698)}>
            <path className="vent-pipe" d="M99 141V62" />
            <path className="vent-cap" d="M88 62h22l-4-9h-14z" />
          </g>

          {/* ================================================ GIDER HATTI */}
          <g className="drain">
            <path className="draw" pathLength={1} style={win(0.65, 0.682)} d="M322 282H76v22" />
            <path className="draw" pathLength={1} style={win(0.662, 0.688)} d="M162 286v-4M284 254v28" />
          </g>

          <g className="drain-flow" style={window2(0.668, 0.686, 0.7, 0.716) as never}>
            <path className="flow-line drain-dir" pathLength={1} d="M322 282H76" />
          </g>

          <g className="clog" style={window2(0.68, 0.706, 0.738, 0.758) as never}>
            <path d="M186 276c9-5 20 4 30-2s17 3 26-2v12c-11 5-19-3-28 2s-19-5-28 2z" className="clog-mass" />
          </g>

          <g className="robot" style={window2(0.706, 0.72, 0.756, 0.774) as never}>
            <g className="robot-move-m" style={win(0.708, 0.754)}>
              <circle cx="0" cy="282" r="7" className="robot-head" />
              <path d="M-30 282h26" className="robot-cable" />
            </g>
          </g>

          <g className="drain-flow" style={window2(0.756, 0.774, 0.958, 0.99) as never}>
            <path className="flow-line drain-dir" pathLength={1} d="M322 282H76v22" />
          </g>
        </g>
      </g>
    </svg>
  );
}

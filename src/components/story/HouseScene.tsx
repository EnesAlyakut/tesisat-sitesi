import { win, window2 } from "./sceneUtils";
import HouseStructure from "./scene/HouseStructure";
import SupplySystem from "./scene/SupplySystem";
import DrainSystem from "./scene/DrainSystem";

/**
 * EV + TESISAT SAHNESI (MASAUSTU)
 * ------------------------------------------------------------------
 * Iki katli bir villanin gercek mimari kesiti uzerinde tesisatin
 * bastan sona kurulmasi. Butun ogeler `--p` (0 → 1 scroll ilerlemesi)
 * degiskenine baglidir; her ogenin zaman penceresi `win()` / `window2()`
 * ile verilir ve CSS `--lp` (yerel ilerleme) olarak hesaplar.
 *
 * Animasyon yalnizca transform, opacity ve stroke-dashoffset uzerinden
 * calisir; layout etkileyen hicbir ozellik degistirilmez.
 *
 * Sahne uc modulden olusur:
 *   HouseStructure — temel, doseme, duvar, cati, merdiven, dogramalar
 *   SupplySystem   — sayac, ana vana, kolon, kolektorler, sicak/soguk hatlar
 *   DrainSystem    — pimas kolonu, sifonlar, havalandirma, rogar
 */
export function HouseSceneDesktop() {
  return (
    <svg
      viewBox="0 58 1120 838"
      className="story-svg"
      role="img"
      aria-label="İki katlı bir evin mimari kesit çizimi üzerinde şebeke girişi, su sayacı, ana vana, tesisat şaftındaki kolon ve kat kolektörleriyle temiz su tesisatının döşenmesi, kombiden dönen sıcak su hattı, boruların içinden su akışı, duvar içindeki su kaçağının termal kamerayla tespiti, pis su kolonundaki tıkanıklığın robot spiralle açılması ve hattın kamerayla kontrol edilmesi aşamalarını gösteren teknik animasyon."
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        {/* Beton kesiti */}
        <pattern id="mrs-concrete" width="9" height="9" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="9" stroke="var(--color-navy-600)" strokeWidth="1" strokeOpacity="0.2" />
        </pattern>
        {/* Duvar / saft kesiti — daha sik tarama */}
        <pattern id="mrs-hatch-dense" width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="5" stroke="var(--color-navy-600)" strokeWidth="1" strokeOpacity="0.26" />
        </pattern>
        {/* Dogal zemin */}
        <pattern id="mrs-soil" width="16" height="16" patternUnits="userSpaceOnUse">
          <path d="M0 12h4M8 4h4M4 8h1M12 12h1" stroke="var(--color-navy-600)" strokeWidth="1.4" strokeOpacity="0.3" strokeLinecap="round" />
        </pattern>
        {/* Blokaj / cakil */}
        <pattern id="mrs-gravel" width="14" height="14" patternUnits="userSpaceOnUse">
          <circle cx="4" cy="5" r="2" fill="var(--color-navy-600)" fillOpacity="0.2" />
          <circle cx="11" cy="10" r="2.4" fill="var(--color-navy-600)" fillOpacity="0.16" />
        </pattern>
        {/* Baca tuglasi */}
        <pattern id="mrs-brick" width="18" height="10" patternUnits="userSpaceOnUse">
          <path d="M0 0h18M0 5h18M9 0v5M0 5v5M18 5v5" stroke="var(--color-copper-600)" strokeWidth="1" strokeOpacity="0.3" />
        </pattern>

        <linearGradient id="mrs-scan" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--color-alert-400)" stopOpacity="0" />
          <stop offset="50%" stopColor="var(--color-alert-400)" stopOpacity="0.5" />
          <stop offset="100%" stopColor="var(--color-alert-400)" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="mrs-wet">
          <stop offset="0%" stopColor="var(--color-aqua-500)" stopOpacity="0.42" />
          <stop offset="100%" stopColor="var(--color-aqua-500)" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="mrs-heat">
          <stop offset="0%" stopColor="var(--color-alert-400)" stopOpacity="0.7" />
          <stop offset="100%" stopColor="var(--color-alert-500)" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Kamera katmanlari — ic ice gecen gruplar sirayla yakinlasip uzaklasir */}
      <g className="cam" style={window2(0.06, 0.2, 0.92, 1) as never}>
        <g className="cam-leak" style={window2(0.54, 0.6, 0.63, 0.69) as never}>
          <g className="cam-drain" style={window2(0.65, 0.71, 0.84, 0.9) as never}>

            <HouseStructure />
            <SupplySystem />

            {/* ==================================== SU AKISI (0.42 – 0.54) */}
            <g className="flow flow-cold">
              {/* Şebekeden kolona */}
              <path className="flow-line" pathLength={1} style={win(0.42, 0.452)} d="M0 684h508V514" />
              {/* Zemin kat armatür hatları */}
              <path className="flow-line" pathLength={1} style={win(0.45, 0.474)} d="M476 486H348v-34" />
              <path className="flow-line" pathLength={1} style={win(0.456, 0.478)} d="M476 496h-28v44" />
              <path className="flow-line" pathLength={1} style={win(0.462, 0.484)} d="M558 486h310v50" />
              {/* Üst kata çıkan kolon ve hatlar */}
              <path className="flow-line" pathLength={1} style={win(0.468, 0.492)} d="M498 476V338" />
              <path className="flow-line" pathLength={1} style={win(0.482, 0.502)} d="M476 320H326v16" />
              <path className="flow-line" pathLength={1} style={win(0.488, 0.506)} d="M476 310h-8v22" />
            </g>

            <g className="flow flow-hot">
              {/* Kombiden dönen sıcak su */}
              <path className="flow-line" pathLength={1} style={win(0.496, 0.518)} d="M940 524v-18H558" />
              <path className="flow-line" pathLength={1} style={win(0.51, 0.528)} d="M476 506H362v-40" />
              <path className="flow-line" pathLength={1} style={win(0.516, 0.532)} d="M476 512h-14v28" />
              <path className="flow-line" pathLength={1} style={win(0.52, 0.536)} d="M558 506h324v30" />
              <path className="flow-line" pathLength={1} style={win(0.526, 0.54)} d="M536 476V338" />
            </g>

            {/* Armatürlerden akan su */}
            <g className="jet">
              <path pathLength={1} style={window2(0.478, 0.494, 0.905, 0.94)} d="M348 476v122" />
              <path pathLength={1} style={window2(0.486, 0.502, 0.905, 0.94)} d="M452 528v18" />
              <path pathLength={1} style={window2(0.494, 0.51, 0.905, 0.94)} d="M868 516v26" />
            </g>

            {/* ============================ SU KACAGI (0.54 – 0.65)
                Kaçak, mutfağa giden soğuk su hattının duvar içi bölümünde. */}
            <g className="leak" style={window2(0.54, 0.566, 0.862, 0.895) as never}>
              <ellipse cx="700" cy="524" rx="86" ry="58" fill="url(#mrs-wet)" className="wet" style={win(0.552, 0.615)} />
              <circle cx="700" cy="486" r="5" className="leak-dot" />
              <circle cx="700" cy="494" r="3.4" className="drop d1" />
              <circle cx="700" cy="494" r="3.4" className="drop d2" />
              <circle cx="700" cy="494" r="3.4" className="drop d3" />
            </g>

            {/* Termal tarama bandı */}
            <g className="scan" style={window2(0.572, 0.59, 0.628, 0.648) as never}>
              <rect x="540" y="0" width="360" height="130" fill="url(#mrs-scan)" className="scan-band" style={win(0.572, 0.642)} />
              <path d="M540 65h360" className="scan-line" style={win(0.572, 0.642)} />
            </g>

            {/* Isı imzası + hedef işareti */}
            <g className="target" style={window2(0.606, 0.632, 0.868, 0.9) as never}>
              <circle cx="700" cy="486" r="46" fill="url(#mrs-heat)" className="heat" />
              <circle cx="700" cy="486" r="27" className="ring" />
              <path d="M700 446v14M700 512v14M660 486h14M726 486h14" className="ticks" />
              <text x="700" y="424" textAnchor="middle" className="tag">KAÇAK NOKTASI</text>
            </g>

            {/* ================================ PIS SU (0.65 – 0.76) */}
            <DrainSystem />

            <g className="drain-flow" style={window2(0.688, 0.704, 0.714, 0.728) as never}>
              <path className="flow-line drain-dir" pathLength={1} d="M880 598 500 612" />
            </g>

            {/* Kolon dibinde tıkanıklık */}
            <g className="clog" style={window2(0.7, 0.72, 0.746, 0.764) as never}>
              <path d="M476 636c8-10 20 4 30-6v26c-10 8-22-4-30 6z" className="clog-mass" />
            </g>

            {/* Robot spiral — bina çıkış hattından kolona doğru ilerler */}
            <g className="robot" style={window2(0.716, 0.73, 0.76, 0.776) as never}>
              <g className="robot-move" style={win(0.718, 0.756)}>
                <circle cx="0" cy="714" r="9" className="robot-head" />
                <path d="M46 714h-40" className="robot-cable" />
              </g>
            </g>

            <g className="drain-flow" style={window2(0.76, 0.778, 0.958, 0.99) as never}>
              <path className="flow-line drain-dir" pathLength={1} d="M880 598 500 612" />
              <path className="flow-line drain-dir" pathLength={1} d="M486 620v94h610" />
            </g>

            {/* ================== KAMERALI KONTROL (0.76 – 0.84) */}
            <g className="cam-probe" style={window2(0.768, 0.784, 0.838, 0.858) as never}>
              <g className="probe-move" style={win(0.77, 0.838)}>
                <circle cx="0" cy="714" r="10" className="probe-head" />
                <path d="M0 714 34 702M0 714l34 24" className="probe-beam" />
              </g>
            </g>
          </g>

          {/* ================= CIHAZ EKRANI (sabit — kamera disinda) */}
          <g className="monitor" style={window2(0.772, 0.79, 0.844, 0.868) as never}>
            <rect x="896" y="84" width="206" height="150" rx="12" className="mon-body" />
            <rect x="908" y="96" width="182" height="110" rx="7" className="mon-screen" />
            <path d="M908 151h182" className="mon-scanline" />
            <circle cx="999" cy="151" r="30" className="mon-pipe" />
            <circle cx="999" cy="151" r="17" className="mon-pipe-in" />
            <path d="M980 165c10-6 23 4 35-4" className="mon-defect" />
            <text x="999" y="224" textAnchor="middle" className="mon-label">
              HAT İÇİ GÖRÜNTÜ
            </text>
          </g>
        </g>
      </g>
    </svg>
  );
}

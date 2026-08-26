import { win } from "../sceneUtils";

/**
 * YAPI KABUGU — iki katli villa kesiti
 * ------------------------------------------------------------------
 * Gercek bir mimari kesit projesinin sirasiyla insa edilir:
 *   arazi → temel → blokaj → doseme → duvarlar → kat dosemesi
 *   → ust kat duvarlari → cati makasi → kiremit → baca
 *   → ic bolmeler ve tesisat safti → merdiven → dogramalar → donatim
 *
 * Kot duzlemi (viewBox 0 0 1280 880):
 *   ±0.00  zemin kat bitmis doseme      y = 628
 *   +3.00  ust kat bitmis doseme        y = 424
 *   catı mahyası                        y = 148
 *   dogal zemin                          y = 640
 */

/** Merdiven basamak profili — 12 basamak, rıht 17 / basış 16.7 */
function stairPath(x0: number, y0: number, steps = 12, rise = 17, going = 16.7) {
  let d = `M${x0} ${y0}`;
  for (let i = 0; i < steps; i++) d += `v-${rise}h${going}`;
  return d;
}

export default function HouseStructure() {
  return (
    <>
      {/* ============================================ ARAZI VE DOGAL ZEMIN */}
      <g className="ln-soft">
        <path className="draw" pathLength={1} style={win(0.04, 0.075)} d="M0 640h1280" />
      </g>
      <g className="soil" style={win(0.05, 0.085)}>
        <rect x="0" y="640" width="210" height="240" fill="url(#mrs-soil)" />
        <rect x="1030" y="640" width="250" height="240" fill="url(#mrs-soil)" />
        <rect x="210" y="740" width="820" height="140" fill="url(#mrs-soil)" />
      </g>

      {/* ==================================================== TEMEL VE BLOKAJ */}
      <g className="foundation" style={win(0.062, 0.098)}>
        {/* Temel tabani */}
        <rect x="210" y="700" width="820" height="40" fill="url(#mrs-concrete)" />
        <rect x="210" y="700" width="820" height="40" className="struct-edge" />
        {/* Temel duvarlari */}
        <rect x="240" y="640" width="52" height="60" fill="url(#mrs-concrete)" />
        <rect x="240" y="640" width="52" height="60" className="struct-edge" />
        <rect x="948" y="640" width="62" height="60" fill="url(#mrs-concrete)" />
        <rect x="948" y="640" width="62" height="60" className="struct-edge" />
      </g>

      {/* Blokaj (cakil dolgu) */}
      <g className="fill-gravel" style={win(0.078, 0.108)}>
        <rect x="292" y="662" width="656" height="38" fill="url(#mrs-gravel)" />
      </g>

      {/* ================================================= ZEMIN KAT DOSEMESI */}
      <g className="slab" style={win(0.088, 0.122)}>
        <rect x="250" y="628" width="740" height="34" fill="url(#mrs-concrete)" />
        <rect x="250" y="628" width="740" height="34" className="struct-edge" />
        {/* Sap + kaplama cizgisi */}
        <path className="draw" pathLength={1} style={win(0.1, 0.13)} d="M250 628h740" />
      </g>

      {/* ==================================================== DIS DUVARLAR */}
      <g className="ln-house">
        <path className="draw" pathLength={1} style={win(0.105, 0.145)} d="M250 628V268M272 628V268" />
        <path className="draw" pathLength={1} style={win(0.112, 0.152)} d="M968 628V268M990 628V268" />
      </g>

      {/* ==================================================== KAT DOSEMESI */}
      <g className="slab" style={win(0.128, 0.158)}>
        <rect x="250" y="424" width="740" height="30" fill="url(#mrs-concrete)" />
        <rect x="250" y="424" width="740" height="30" className="struct-edge" />
      </g>

      {/* Tavan cizgisi (ust kat) */}
      <g className="ln-wall">
        <path className="draw" pathLength={1} style={win(0.142, 0.172)} d="M272 268h696" />
      </g>

      {/* ======================================================== CATI */}
      <g className="roof">
        {/* Makas — dis ve ic yuzey */}
        <path className="draw roof-line" pathLength={1} style={win(0.152, 0.19)} d="M196 300 620 148l424 152" />
        <path className="draw roof-line" pathLength={1} style={win(0.16, 0.196)} d="M196 324 620 172l424 152" />
        {/* Saçak kapaklari */}
        <path className="draw" pathLength={1} style={win(0.172, 0.198)} d="M196 300v24M1044 300v24" />
        {/* Mahya */}
        <path className="draw" pathLength={1} style={win(0.174, 0.198)} d="M604 156h32" />
      </g>

      {/* Kiremit dokusu — makas boyunca kisa cizgiler */}
      <g className="tiles" style={win(0.176, 0.206)}>
        {Array.from({ length: 15 }, (_, i) => {
          const t = (i + 1) / 16;
          const x = 196 + (620 - 196) * t;
          const y = 300 + (148 - 300) * t;
          return <path key={`tl${i}`} d={`M${x} ${y}l6 8`} />;
        })}
        {Array.from({ length: 15 }, (_, i) => {
          const t = (i + 1) / 16;
          const x = 620 + (1044 - 620) * t;
          const y = 148 + (300 - 148) * t;
          return <path key={`tr${i}`} d={`M${x} ${y}l-6 8`} />;
        })}
      </g>

      {/* Baca */}
      <g className="chimney" style={win(0.19, 0.216)}>
        <rect x="740" y="112" width="44" height="98" fill="url(#mrs-brick)" />
        <rect x="740" y="112" width="44" height="98" className="struct-edge" />
        <rect x="732" y="100" width="60" height="14" className="chimney-cap" />
      </g>

      {/* ======================================= IC BOLMELER VE TESISAT SAFTI */}
      <g className="ln-wall">
        {/* Hol / mutfak bolmesi (kapi bosluklu) */}
        <path className="draw" pathLength={1} style={win(0.186, 0.212)} d="M774 424v104M786 424v104" />
        <path className="draw" pathLength={1} style={win(0.19, 0.214)} d="M774 528h12" />
      </g>

      {/* Tesisat safti — tum katlari gecen taramali dusey kanal */}
      <g className="shaft" style={win(0.196, 0.224)}>
        <rect x="470" y="268" width="78" height="360" fill="url(#mrs-hatch-dense)" />
      </g>
      <g className="ln-wall">
        <path className="draw" pathLength={1} style={win(0.196, 0.224)} d="M470 628V268M548 628V268" />
      </g>

      {/* ======================================================== MERDIVEN */}
      <g className="stairs" style={win(0.2, 0.232)}>
        <path className="draw stair-steps" pathLength={1} d={stairPath(566, 628)} />
        <path className="stair-soffit" d="M566 628 766 424" />
        <path className="stair-rail" d="M584 596 776 400" />
      </g>

      {/* ======================================================== DOGRAMALAR */}
      <g className="window" style={win(0.206, 0.236)}>
        {/* Mutfak penceresi */}
        <rect x="812" y="452" width="76" height="66" className="win-frame" />
        <path d="M850 452v66M812 485h76" className="win-mullion" />
        <path d="M806 518h88" className="win-sill" />
        {/* Zemin kat banyo penceresi */}
        <rect x="300" y="462" width="52" height="44" className="win-frame" />
        <path d="M326 462v44" className="win-mullion" />
        <path d="M294 506h64" className="win-sill" />
        {/* Ust kat oda penceresi */}
        <rect x="596" y="300" width="80" height="68" className="win-frame" />
        <path d="M636 300v68M596 334h80" className="win-mullion" />
        <path d="M590 368h92" className="win-sill" />
        {/* Ust kat banyo penceresi */}
        <rect x="300" y="300" width="52" height="42" className="win-frame" />
        <path d="M326 300v42" className="win-mullion" />
        <path d="M294 342h64" className="win-sill" />
      </g>

      {/* ==================================================== DONATIM / MOBILYA */}
      <g className="ln-fix">
        {/* --- ZEMIN KAT: BANYO --- */}
        {/* Dus teknesi */}
        <path className="draw" pathLength={1} style={win(0.212, 0.24)} d="M292 604h112l-6 24h-100z" />
        {/* Dus basligi ve kolu */}
        <path className="draw" pathLength={1} style={win(0.214, 0.242)} d="M348 452v14M332 466h32l-4 10h-24z" />
        {/* Lavabo — tezgah, kurna, ayak */}
        <path className="draw" pathLength={1} style={win(0.216, 0.244)} d="M420 540h62M426 540l5 28h44l5-28" />
        <path className="draw" pathLength={1} style={win(0.218, 0.246)} d="M442 568v60h18v-60" />
        {/* Lavabo bataryasi */}
        <path className="draw" pathLength={1} style={win(0.219, 0.247)} d="M452 540v-16h-12" />

        {/* --- ZEMIN KAT: MUTFAK --- */}
        {/* Tezgah */}
        <path className="draw" pathLength={1} style={win(0.22, 0.248)} d="M800 536h150v12H800z" />
        {/* Alt dolaplar */}
        <path className="draw" pathLength={1} style={win(0.222, 0.25)} d="M800 548v80h150v-80M875 548v80" />
        <path className="draw" pathLength={1} style={win(0.224, 0.251)} d="M860 580h8M883 580h8" />
        {/* Evye teknesi */}
        <path className="draw" pathLength={1} style={win(0.226, 0.252)} d="M836 548h64v28h-64z" />
        {/* Evye bataryasi */}
        <path className="draw" pathLength={1} style={win(0.227, 0.253)} d="M868 536v-24h-16" />
        {/* Kombi */}
        <path className="draw" pathLength={1} style={win(0.228, 0.254)} d="M896 448h60v76h-60z" />
        <path className="draw" pathLength={1} style={win(0.229, 0.255)} d="M908 470h36M908 484h36" />

        {/* --- UST KAT: BANYO --- */}
        {/* Klozet — hazne, ayak, gomme rezervuar */}
        <path className="draw" pathLength={1} style={win(0.23, 0.256)} d="M396 364h56l-6 52h-44z" />
        <path className="draw" pathLength={1} style={win(0.231, 0.257)} d="M410 416h30v8h-30z" />
        <path className="draw" pathLength={1} style={win(0.232, 0.258)} d="M456 312h22v60h-22z" />
        {/* Ust kat lavabo */}
        <path className="draw" pathLength={1} style={win(0.233, 0.259)} d="M300 336h62M306 336l5 26h42l5-26" />
        <path className="draw" pathLength={1} style={win(0.234, 0.26)} d="M320 362v62h18v-62" />

        {/* --- UST KAT: YATAK ODASI --- */}
        <path className="draw" pathLength={1} style={win(0.235, 0.261)} d="M712 404h188v20H712z" />
        <path className="draw" pathLength={1} style={win(0.236, 0.262)} d="M724 384h164v20H724z" />
        <path className="draw" pathLength={1} style={win(0.237, 0.263)} d="M890 356h14v68h-14z" />
      </g>

      {/* ======================================================== ETIKETLER */}
      <g className="lbl">
        <text x="366" y="500" textAnchor="middle" style={win(0.216, 0.244)}>BANYO</text>
        <text x="640" y="500" textAnchor="middle" style={win(0.218, 0.246)}>HOL</text>
        <text x="874" y="420" textAnchor="middle" style={win(0.22, 0.248)}>MUTFAK</text>
        <text x="366" y="296" textAnchor="middle" style={win(0.232, 0.258)}>BANYO</text>
        <text x="800" y="296" textAnchor="middle" style={win(0.234, 0.26)}>YATAK ODASI</text>
        <text
          x="509"
          y="596"
          textAnchor="middle"
          transform="rotate(-90 509 596)"
          style={win(0.2, 0.228)}
        >
          TESİSAT ŞAFTI
        </text>
      </g>

      {/* ==================================================== KOT ISARETLERI */}
      <g className="levels" style={win(0.24, 0.268)}>
        <path className="lvl-line" d="M990 628h96M990 424h96M1044 148h42" />
        <path className="lvl-mark" d="M1064 620l8 8-8 8-8-8z" />
        <path className="lvl-mark" d="M1064 416l8 8-8 8-8-8z" />
        <text x="1080" y="624" className="lvl-tag">±0.00</text>
        <text x="1080" y="420" className="lvl-tag">+3.00</text>
        <text x="1092" y="144" className="lvl-tag">MAHYA</text>
      </g>
    </>
  );
}

// v3.tsx — reusable components from the "Kiraye ki Dukaan · Ep.08" reel
// (black + crimson editorial style). Extracted component-by-component.
import React from "react";
import { useCurrentFrame } from "remotion";
import { A, Line, useDraw } from "../primitives";
import { C, FONT_SANS, FONT_SERIF } from "../theme";

const Sans: React.CSSProperties = { fontFamily: FONT_SANS };

// ---------------------------------------------------------------------------
// HeaderTag — tiny editorial caption ("note 08", "final · K-08", "fig. 05")
// ---------------------------------------------------------------------------
export const HeaderTag: React.FC<{ text: string; x?: number; y?: number; right?: string; delay?: number; color?: string }> = ({ text, x = 46, y = 68, right, delay = 0, color = "#111111" }) => (
  <A x={x} y={y} kind="fade" delay={delay}>
    <span style={{ ...Sans, fontSize: 15, fontWeight: 600, color, whiteSpace: "nowrap" }}>{text}</span>
    {right && <span style={{ ...Sans, position: "absolute", right: -(720 - x - 90), fontSize: 15, fontWeight: 600, color, whiteSpace: "nowrap" }}>{right}</span>}
  </A>
);

// ---------------------------------------------------------------------------
// AgencyHeader — two-line agency label + episode meta row
// ---------------------------------------------------------------------------
export const AgencyHeader: React.FC<{
  agency?: string; presents?: string; episode?: string; right?: string; delay?: number;
}> = ({ agency = "alpha agency", presents = "presents", episode = "ep. 08", right = "shopify · pakistan", delay = 0 }) => (
  <>
    <A x={46} y={61} kind="fade" delay={delay}>
      <span style={{ ...Sans, fontSize: 15, color: "#111111", whiteSpace: "nowrap" }}>{agency}</span>
    </A>
    <A x={46} y={82} kind="fade" delay={delay + 2}>
      <span style={{ ...Sans, fontSize: 15, color: "#111111", whiteSpace: "nowrap" }}>{presents}</span>
    </A>
    <A x={46} y={188} kind="fade" delay={delay + 4}>
      <span style={{ ...Sans, fontSize: 15, color: "#111111", whiteSpace: "nowrap" }}>{episode}</span>
    </A>
    <A wide x={648} y={188} kind="fade" delay={delay + 4}>
      <span style={{ ...Sans, fontSize: 15, color: "#111111", whiteSpace: "nowrap" }}>{right}</span>
    </A>
  </>
);

// ---------------------------------------------------------------------------
// SeriesTitle — bold uppercase two-line series title ("KIRAYE / KI DUKAAN")
// ---------------------------------------------------------------------------
export const SeriesTitle: React.FC<{ lines: [string, string]; x?: number; y?: number; size?: number; delay?: number }> = ({ lines, x = 74, y = 103, size = 34, delay = 0 }) => (
  <A wide x={x + 80} y={y} kind="up" delay={delay}>
    <div style={{ ...Sans, fontSize: size, fontWeight: 800, color: "#111111", lineHeight: 1.1, textTransform: "uppercase" }}>
      {lines.map((l) => <div key={l}>{l}</div>)}
    </div>
  </A>
);

// ---------------------------------------------------------------------------
// NumberBadge — circled numeral ("8" in a black ring)
// ---------------------------------------------------------------------------
export const NumberBadge: React.FC<{ n: string; cx?: number; cy?: number; delay?: number }> = ({ n, cx = 628, cy = 81, delay = 0 }) => (
  <A wide x={cx} y={cy} kind="pop" delay={delay}>
    <span style={{ width: 56, height: 56, borderRadius: "50%", border: "2px solid #111111", display: "inline-flex", alignItems: "center", justifyContent: "center", ...Sans, fontSize: 22, fontWeight: 800, color: "#111111" }}>{n}</span>
  </A>
);

// ---------------------------------------------------------------------------
// CheckerSticker — black/white checkerboard square badge
// ---------------------------------------------------------------------------
export const CheckerSticker: React.FC<{ x: number; y: number; s?: number; delay?: number }> = ({ x, y, s = 60, delay = 0 }) => (
  <A wide x={x} y={y} kind="pop" delay={delay}>
    <div style={{
      width: s, height: s, border: "2px solid #111111",
      background: "repeating-conic-gradient(#111111 0% 25%, #FFFFFF 0% 50%)",
      backgroundSize: `${s / 5}px ${s / 5}px`,
    }} />
  </A>
);

// ---------------------------------------------------------------------------
// Barcode — vertical bars + tiny caption
// ---------------------------------------------------------------------------
export const Barcode: React.FC<{ x?: number; y?: number; w?: number; h?: number; caption?: string; delay?: number; seed?: number }> = ({ x = 215, y = 1150, w = 60, h = 40, caption = "0 0 8", delay = 0, seed = 7 }) => {
  const bars: number[] = [];
  let n = seed;
  for (let i = 0; i < 42; i++) { n = (n * 9301 + 49297) % 233280; bars.push(1 + (n % 3)); }
  return (
    <A wide x={x} y={y} kind="fade" delay={delay}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
        <div style={{ display: "flex", gap: 1.5, height: h, background: "#FFFFFF", padding: 3 }}>
          {bars.map((bw, i) => <span key={i} style={{ width: bw * 0.7, background: "#111111" }} />)}
        </div>
        <span style={{ ...Sans, fontSize: 9, color: "#555555", letterSpacing: 2 }}>{caption}</span>
      </div>
    </A>
  );
};

// ---------------------------------------------------------------------------
// AccentCircle — solid accent disc + dotted orbit ring + optional sticker
// ---------------------------------------------------------------------------
export const AccentCircle: React.FC<{ cx?: number; cy?: number; r?: number; color?: string; delay?: number }> = ({ cx = 287, cy = 645, r = 212, color = C.crimson, delay = 0 }) => {
  const p = useDraw(delay, 30);
  return (
    <>
      <svg width={720} height={1280} viewBox="0 0 720 1280" style={{ position: "absolute", left: 0, top: 0, overflow: "visible" }}>
        <circle cx={cx} cy={cy} r={r + 63} fill="none" stroke={C.orbitPink} strokeWidth={2} strokeDasharray="1 9" strokeLinecap="round"
          opacity={p} transform={`rotate(${p * 30} ${cx} ${cy})`} />
      </svg>
      <A wide x={cx} y={cy} kind="pop" delay={delay}>
        <div style={{ width: r * 2, height: r * 2, borderRadius: "50%", background: `radial-gradient(circle at 50% 45%, ${color} 0%, #B8016B 100%)` }} />
      </A>
    </>
  );
};

// ---------------------------------------------------------------------------
// TiledWordmark — giant low-contrast tiled rows bleeding off the edges
// ---------------------------------------------------------------------------
export const TiledWordmark: React.FC<{ word?: string; y?: number; delay?: number; size?: number }> = ({ word = "KIRAYE", y = 970, delay = 0, size = 250 }) => (
  <>
    <A wide x={360} y={y} kind="fade" delay={delay}>
      <span style={{ ...Sans, fontSize: size, fontWeight: 900, color: C.wallCrack, letterSpacing: -2, whiteSpace: "nowrap" }}>{word}</span>
    </A>
    <A wide x={360 - 150} y={y + 200} kind="fade" delay={delay + 4}>
      <span style={{ ...Sans, fontSize: size, fontWeight: 900, color: C.wallCrack, letterSpacing: -2, whiteSpace: "nowrap" }}>{word}</span>
    </A>
  </>
);

// ---------------------------------------------------------------------------
// GlossyOrb — glossy 3D sphere accent (silver, top-right)
// ---------------------------------------------------------------------------
export const GlossyOrb: React.FC<{ cx?: number; cy?: number; d?: number; delay?: number }> = ({ cx = 656, cy = 90, d = 34, delay = 0 }) => (
  <A wide x={cx} y={cy} kind="pop" delay={delay}>
    <div style={{ width: d, height: d, borderRadius: "50%", background: "radial-gradient(circle at 32% 30%, #FFFFFF 0%, #E0E0E0 45%, #9A9A9A 100%)", boxShadow: "0 3px 8px rgba(0,0,0,0.25)" }} />
  </A>
);

// ---------------------------------------------------------------------------
// ParticleField — scattered soft bokeh dots (dark scenes)
// ---------------------------------------------------------------------------
export const ParticleField: React.FC<{ count?: number; seed?: number }> = ({ count = 30, seed = 42 }) => {
  const dots: { cx: number; cy: number; r: number; o: number }[] = [];
  let n = seed;
  for (let i = 0; i < count; i++) {
    n = (n * 9301 + 49297) % 233280; const cx = n % 720;
    n = (n * 9301 + 49297) % 233280; const cy = n % 1280;
    n = (n * 9301 + 49297) % 233280; const r = 4 + (n % 12);
    n = (n * 9301 + 49297) % 233280; const o = 0.2 + (n % 60) / 100;
    dots.push({ cx, cy, r, o });
  }
  return (
    <svg width={720} height={1280} viewBox="0 0 720 1280" style={{ position: "absolute", left: 0, top: 0, overflow: "visible" }}>
      {dots.map((d, i) => <circle key={i} cx={d.cx} cy={d.cy} r={d.r} fill="#E8E8E8" opacity={d.o} style={{ filter: "blur(3px)" }} />)}
    </svg>
  );
};

// ---------------------------------------------------------------------------
// OrderCard — white order/notification card with label/value field rows
// ---------------------------------------------------------------------------
export const OrderCard: React.FC<{
  x?: number; y?: number; w?: number; id?: string;
  fields?: { label: string; value: string }[]; delay?: number;
}> = ({ x = 360, y = 550, w = 426, id = "NEW ORDER · #1043", fields = [
  { label: "Naam", value: "Sara Ahmed" },
  { label: "Number", value: "03•• ••• •••" },
  { label: "Email", value: "sara@gmail.com" },
], delay = 0 }) => (
  <A wide x={x} y={y} kind="up" delay={delay}>
    <div style={{ width: w, background: "#FFFFFF", borderRadius: 16, padding: "14px 20px", boxShadow: "0 0 40px rgba(255,255,255,0.18)", textAlign: "left" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#2ED573", display: "inline-block" }} />
        <span style={{ ...Sans, fontSize: 17, fontWeight: 800, color: "#111111", letterSpacing: 2 }}>{id}</span>
      </div>
      <div style={{ height: 1, background: "#EEEEEE", margin: "10px 0" }} />
      {fields.map((f) => (
        <div key={f.label} style={{ marginBottom: 8 }}>
          <div style={{ ...Sans, fontSize: 14, color: "#888888" }}>{f.label}</div>
          <div style={{ ...Sans, fontSize: 26, fontWeight: 800, color: "#111111", marginTop: 1 }}>{f.value}</div>
        </div>
      ))}
    </div>
  </A>
);

// ---------------------------------------------------------------------------
// DatabaseCylinder — stacked discs with glowing red seams + red base glow
// ---------------------------------------------------------------------------
export const DatabaseCylinder: React.FC<{ cx?: number; y?: number; scale?: number; delay?: number }> = ({ cx = 360, y = 900, scale = 1, delay = 0 }) => {
  const frame = useCurrentFrame();
  const p = useDraw(delay, 25);
  const pulse = 0.75 + 0.25 * Math.abs(Math.sin(frame / 18));
  const w = 200 * scale, h = 62 * scale, slices = 6;
  const topY = y - (h * slices) / 2;
  return (
    <svg width={720} height={1280} viewBox="0 0 720 1280" style={{ position: "absolute", left: 0, top: 0, overflow: "visible" }} opacity={p}>
      <ellipse cx={cx} cy={y + (h * slices) / 2 + 30 * scale} rx={w * 0.75} ry={26 * scale} fill="#E0284F" opacity={0.3 * pulse} style={{ filter: "blur(10px)" }} />
      {Array.from({ length: slices }).map((_, i) => {
        const cy = topY + i * h + h / 2;
        return (
          <g key={i}>
            <rect x={cx - w / 2} y={cy - h / 2} width={w} height={h} fill={i % 2 ? "#C6C2C4" : "#DAD6D8"} />
            <ellipse cx={cx} cy={cy + h / 2} rx={w / 2} ry={h / 2} fill={i % 2 ? "#B5B1B4" : "#C6C2C4"} />
            {i < slices - 1 && <ellipse cx={cx} cy={cy + h / 2} rx={w / 2} ry={h / 2} fill="none" stroke="#E0284F" strokeWidth={2 * scale} opacity={0.6} />}
          </g>
        );
      })}
      <ellipse cx={cx} cy={topY + h / 2 - h / 2} rx={w / 2} ry={h / 2} fill="#EDEBEC" stroke="#C6C2C4" strokeWidth={1} />
    </svg>
  );
};

// ---------------------------------------------------------------------------
// Storefront — "KIRAYE PE" sign, sun, pillars, roller shutter, shelves
// Flat vector illustration, modular pieces (sign, pillars, slats, cubes).
// ---------------------------------------------------------------------------
export const Storefront: React.FC<{ delay?: number }> = ({ delay = 0 }) => {
  const p = useDraw(delay, 20);
  const cubes1 = ["#151515", C.crimson, "#E8E6E4", "#9A9A9A", "#151515", C.crimson, "#E8E6E4", "#151515"];
  const cubes2 = ["#F5F5F5", "#6A6A6A", "#151515", C.crimson, "#E8E6E4", "#6A6A6A", "#151515"];
  return (
    <svg width={720} height={1280} viewBox="0 0 720 1280" style={{ position: "absolute", left: 0, top: 0, overflow: "visible" }} opacity={p}>
      {/* sun + halo */}
      <circle cx={360} cy={663} r={270} fill="none" stroke="#C8C8C8" strokeWidth={1} opacity={0.7} />
      <path d="M150 663 A210 210 0 0 1 570 663 Z" fill={C.crimson} />
      {/* interior */}
      <rect x={85} y={733} width={550} height={437} fill="#D8D8D8" />
      {/* sign board */}
      <rect x={14} y={584} width={692} height={149} fill="#FFFFFF" stroke="#111111" strokeWidth={4} />
      <text x={360} y={683} textAnchor="middle" fontSize={58} fontWeight={800} fill="#111111" fontFamily={FONT_SANS} letterSpacing={2}>KIRAYE PE</text>
      {/* pillars */}
      <rect x={11} y={735} width={69} height={445} fill="#111111" />
      <rect x={640} y={735} width={68} height={445} fill="#111111" />
      {/* roller shutter slats */}
      {[745, 774, 803].map((y) => (
        <rect key={y} x={85} y={y} width={550} height={24} fill="#C9C9C9" stroke="#A8A8A8" strokeWidth={1} />
      ))}
      <rect x={312} y={803} width={96} height={11} fill="#111111" />
      {/* shelves */}
      {[850, 962].map((y) => (
        <rect key={y} x={142} y={y} width={436} height={8} fill="#B8B8B8" />
      ))}
      {cubes1.map((c, i) => <rect key={`a${i}`} x={160 + i * 52} y={820} width={40} height={30} fill={c} />)}
      {cubes2.map((c, i) => <rect key={`b${i}`} x={160 + i * 52} y={918} width={40} height={44} fill={c} />)}
      <rect x={85} y={1135} width={550} height={35} fill="#6A6A6A" />
      <rect x={0} y={1170} width={720} height={55} fill="#2B2B2B" />
    </svg>
  );
};

// ---------------------------------------------------------------------------
// ApniDoor — red circle + dotted ring + arched door + tilted "APNI" banner
// ---------------------------------------------------------------------------
export const ApniDoor: React.FC<{ delay?: number }> = ({ delay = 0 }) => (
  <>
    <svg width={720} height={1280} viewBox="0 0 720 1280" style={{ position: "absolute", left: 0, top: 0, overflow: "visible" }}>
      <circle cx={360} cy={700} r={285} fill="none" stroke={C.crimson} strokeWidth={2.5} strokeDasharray="1 12" strokeLinecap="round" />
    </svg>
    <A wide x={360} y={700} kind="pop" delay={delay}>
      <div style={{ width: 466, height: 466, borderRadius: "50%", background: `radial-gradient(circle at 50% 45%, #E4233C 0%, ${C.crimson} 70%)`, position: "relative" }}>
        {/* arched door */}
        <div style={{ position: "absolute", left: 133, top: 86, width: 200, height: 314, background: "#D9D9D9", borderRadius: "100px 100px 12px 12px", padding: 8, boxSizing: "border-box" }}>
          <div style={{ width: "100%", height: "100%", background: "linear-gradient(180deg,#E8E8E8,#C8C8C8)", borderRadius: "92px 92px 8px 8px" }} />
        </div>
        {/* APNI banner */}
        <div style={{ position: "absolute", left: 158, top: 181, width: 150, height: 61, background: C.crimson, transform: "rotate(4deg)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 10px rgba(0,0,0,0.2)" }}>
          <span style={{ ...Sans, fontSize: 34, fontWeight: 800, color: "#FFFFFF", letterSpacing: 1 }}>APNI</span>
        </div>
      </div>
    </A>
  </>
);

// ---------------------------------------------------------------------------
// FollowPill — "+ Follow karein" translucent CTA sticker over headline
// ---------------------------------------------------------------------------
export const FollowPill: React.FC<{ y?: number; delay?: number }> = ({ y = 260, delay = 0 }) => (
  <A wide x={360} y={y} kind="pop" delay={delay}>
    <span style={{ ...Sans, fontSize: 34, fontWeight: 800, color: "#FFFFFF", background: "rgba(85,85,85,0.85)", padding: "18px 60px", borderRadius: 99, whiteSpace: "nowrap", display: "inline-block" }}>+ Follow karein</span>
  </A>
);

// ---------------------------------------------------------------------------
// EmblemLockup — agency logo lockup (arcs + spear + crosshair + wordmark)
// Defaults match the Alpha Agency ref; pass your own brand props to reuse.
// ---------------------------------------------------------------------------
export const EmblemLockup: React.FC<{
  x?: number; y?: number; dark?: boolean; brandA?: string; brandB?: string; tagline?: string; delay?: number;
}> = ({ x = 360, y = 616, dark = true, brandA = "ALPHA", brandB = "AGENCY", tagline = "WEBSITES · SHOPIFY · REDESIGN", delay = 0 }) => {
  const fg = dark ? "#FFFFFF" : "#111111";
  return (
    <A wide x={x} y={y} kind="fade" delay={delay}>
      <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
        <svg width={108} height={127} viewBox="0 0 115 135" style={{ overflow: "visible" }}>
          <path d="M20 28 A55 55 0 0 0 20 107" stroke={fg} strokeWidth={14} fill="none" strokeLinecap="round" />
          <path d="M95 28 A55 55 0 0 1 95 107" stroke={fg} strokeWidth={14} fill="none" strokeLinecap="round" />
          <path d="M57.5 4 L65 34 L57.5 44 L50 34 Z" fill={fg} />
          <path d="M36 22 L48 40 M79 22 L67 40" stroke={fg} strokeWidth={7} strokeLinecap="round" />
          <line x1={57.5} y1={44} x2={57.5} y2={118} stroke={fg} strokeWidth={6} />
          <line x1={4} y1={62} x2={111} y2={62} stroke={fg} strokeWidth={3} />
        </svg>
        <div>
          <div style={{ ...Sans, fontSize: 48, fontWeight: 900, color: fg, lineHeight: 1 }}>{brandA}</div>
          <div style={{ ...Sans, fontSize: 22, fontWeight: 500, color: fg, letterSpacing: 14, marginTop: 6 }}>{brandB}</div>
        </div>
      </div>
      <div style={{ textAlign: "center", ...Sans, fontSize: 16, color: dark ? "#8A8A8A" : "#555555", letterSpacing: 4, marginTop: 26 }}>{tagline}</div>
    </A>
  );
};

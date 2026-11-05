// v2.tsx — reusable components from the Alpha Agency "Customer aaya" reel
// (peach #F9E0D0 + orange #F26B1D + black, 4-step carousel). Extracted
// component-by-component; each is prop-driven and settles to a final state.
import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { A, Line, useDraw, clamp } from "../primitives";
import { C, FONT_SANS, FONT_SERIF } from "../theme";

const Sans: React.CSSProperties = { fontFamily: FONT_SANS };
const Serifi: React.CSSProperties = { fontFamily: FONT_SERIF, fontStyle: "italic" };

// ---------------------------------------------------------------------------
// StepIndicator — "01 02 03 04" mono numerals + dots, active = orange
// ---------------------------------------------------------------------------
export const StepIndicator: React.FC<{ y?: number; steps?: number; active?: number; delay?: number }> = ({ y = 95, steps = 4, active = 0, delay = 0 }) => (
  <A wide x={360} y={y} kind="fade" delay={delay}>
    <div style={{ display: "flex", gap: 44, alignItems: "flex-start" }}>
      {Array.from({ length: steps }).map((_, i) => (
        <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5 }}>
          <span style={{ ...Sans, fontSize: 16, fontWeight: 600, letterSpacing: 1, color: i === active ? C.darkBrown : "#8A6F5E" }}>
            {String(i + 1).padStart(2, "0")}
          </span>
          <span style={{ width: i === active ? 9 : 5, height: i === active ? 9 : 5, borderRadius: "50%", background: i === active ? C.orange : "#3A2A20" }} />
        </div>
      ))}
    </div>
  </A>
);

// ---------------------------------------------------------------------------
// PillBadge — orange gradient pill with white bold text + soft shadow
// ---------------------------------------------------------------------------
export const PillBadge: React.FC<{ x?: number; y: number; text: string; delay?: number; size?: number }> = ({ x = 160, y = 160, text, delay = 0, size = 26 }) => (
  <A wide x={x} y={y} kind="pop" delay={delay}>
    <span style={{
      ...Sans, fontSize: size, fontWeight: 800, color: "#FFFFFF", whiteSpace: "nowrap",
      background: "linear-gradient(180deg,#F78842,#E05F14)",
      padding: "14px 34px", borderRadius: 99, boxShadow: "0 8px 20px rgba(240,106,26,0.35)",
      display: "inline-block",
    }}>{text}</span>
  </A>
);

// ---------------------------------------------------------------------------
// HeadlinePair — heavy line + regular line (v2 lockup, left-aligned stack)
// ---------------------------------------------------------------------------
export const HeadlinePair: React.FC<{
  y: number; heavy: string; regular: string; size?: number; delay?: number;
}> = ({ y, heavy, regular, size = 52, delay = 0 }) => (
  <>
    <Line y={y} kind="up" delay={delay}><span style={{ ...Sans, fontSize: size, fontWeight: 800, color: "#1C100A", letterSpacing: -1 }}>{heavy}</span></Line>
    <Line y={y + size * 1.32} kind="up" delay={delay + 6}><span style={{ ...Sans, fontSize: size, color: "#4A3A30" }}>{regular}</span></Line>
  </>
);

// ---------------------------------------------------------------------------
// BodyCopy — small muted description block under the headline
// ---------------------------------------------------------------------------
export const BodyCopy: React.FC<{ y: number; text: string; delay?: number; width?: number }> = ({ y, text, delay = 0, width = 640 }) => (
  <A wide x={360} y={y} kind="fade" delay={delay}>
    <div style={{ width, ...Sans, fontSize: 20, color: "#6B5A4E", lineHeight: 1.45 }}>{text}</div>
  </A>
);

// ---------------------------------------------------------------------------
// SpeechBubble — white rounded bubble with tail (shopkeeper line)
// ---------------------------------------------------------------------------
export const SpeechBubble: React.FC<{ x?: number; y?: number; text: string; delay?: number }> = ({ x = 348, y = 668, text, delay = 0 }) => (
  <A wide x={x} y={y} kind="pop" delay={delay}>
    <div style={{ position: "relative", background: "#FFFFFF", borderRadius: 14, padding: "14px 22px", boxShadow: "0 6px 18px rgba(0,0,0,0.12)" }}>
      <span style={{ ...Sans, fontSize: 22, fontWeight: 800, color: "#111111", whiteSpace: "nowrap" }}>{text}</span>
      <div style={{ position: "absolute", left: 30, bottom: -9, width: 18, height: 18, background: "#FFFFFF", transform: "rotate(45deg)", borderBottomRightRadius: 5 }} />
    </div>
  </A>
);

// ---------------------------------------------------------------------------
// PriceTag — tilted white tag "Rs 8,500" + orange band + hole
// ---------------------------------------------------------------------------
export const PriceTag: React.FC<{ x?: number; y?: number; amount?: string; delay?: number; rot?: number; scale?: number }> = ({ x = 130, y = 1180, amount = "8,500", delay = 0, rot = -24, scale = 1 }) => (
  <A wide x={x} y={y} kind="pop" delay={delay} rot={rot}>
    <div style={{ transform: `scale(${scale})`, width: 150, height: 96, background: "#FFFFFF", borderRadius: 8, boxShadow: "0 10px 24px rgba(0,0,0,0.18)", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", left: 12, top: 12 }}>
        <div style={{ ...Sans, fontSize: 16, fontWeight: 700, color: "#1C100A" }}>Rs</div>
        <div style={{ ...Sans, fontSize: 30, fontWeight: 900, color: "#1C100A", marginTop: 2 }}>{amount}</div>
      </div>
      <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 34, background: C.orange, transform: "skewX(-18deg) translateX(10px)" }} />
      <div style={{ position: "absolute", left: -6, top: 8, width: 12, height: 12, borderRadius: "50%", background: "#F9E0D0", border: "2px solid #DDDDDD" }} />
    </div>
  </A>
);

// ---------------------------------------------------------------------------
// BlurBgWord — giant blurred background word (decipherable fragment)
// ---------------------------------------------------------------------------
export const BlurBgWord: React.FC<{ y?: number; text?: string; color?: string; delay?: number }> = ({ y = 1215, text = "DUKAAN", color = "#F78842", delay = 0 }) => (
  <A wide x={360} y={y} kind="fade" delay={delay}>
    <span style={{ ...Sans, fontSize: 150, fontWeight: 900, color, letterSpacing: 4, opacity: 0.55, filter: "blur(6px)" }}>{text}</span>
  </A>
);

// ---------------------------------------------------------------------------
// NextButton — black circle with white right arrow
// ---------------------------------------------------------------------------
export const NextButton: React.FC<{ x?: number; y?: number; delay?: number; size?: number }> = ({ x = 360, y = 1215, delay = 0, size = 44 }) => (
  <A wide x={x} y={y} kind="pop" delay={delay}>
    <span style={{ width: size, height: size, borderRadius: "50%", background: "#111111", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
      <svg width={size * 0.5} height={size * 0.5} viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth={3} strokeLinecap="round"><path d="M4 12 H19 M13 6 L19 12 L13 18" /></svg>
    </span>
  </A>
);

// ---------------------------------------------------------------------------
// RingCircles — concentric thin circles around the centerpiece
// ---------------------------------------------------------------------------
export const RingCircles: React.FC<{ cx?: number; cy?: number; radii?: number[]; color?: string; delay?: number }> = ({ cx = 360, cy = 700, radii = [220, 260, 300], color = "#B8A08E", delay = 0 }) => {
  const p = useDraw(delay, 30);
  return (
    <svg width={720} height={1280} viewBox="0 0 720 1280" style={{ position: "absolute", left: 0, top: 0, overflow: "visible" }}>
      {radii.map((r, i) => (
        <circle key={r} cx={cx} cy={cy} r={r} fill="none" stroke={color} strokeWidth={1.5} opacity={0.55 - i * 0.1}
          pathLength={1} strokeDasharray={1} strokeDashoffset={1 - p} />
      ))}
    </svg>
  );
};

// ---------------------------------------------------------------------------
// ConnectorAnnotation — dot + elbow leader line + mono label (draws on)
// Points: starts at label, runs toward (tx,ty). direction: "right" | "left".
// Replicated from "AUTO / REMINDER", "CHECKOUT / DATA SAVED", "website".
// ---------------------------------------------------------------------------
export const ConnectorAnnotation: React.FC<{
  label: string; x: number; y: number; tx: number; ty: number;
  color?: string; delay?: number; align?: "left" | "right";
}> = ({ label, x, y, tx, ty, color = C.orange, delay = 0, align = "left" }) => {
  const p = useDraw(delay, 20);
  const mid = (x + tx) / 2 + (align === "left" ? 30 : -30);
  const pts = align === "left"
    ? `M${x + 8} ${y} H${mid} V${ty} H${tx}`
    : `M${x - 8} ${y} H${mid} V${ty} H${tx}`;
  return (
    <svg width={720} height={1280} viewBox="0 0 720 1280" style={{ position: "absolute", left: 0, top: 0, overflow: "visible" }}>
      <circle cx={x} cy={y} r={6} fill={color} />
      <circle cx={tx} cy={ty} r={6} fill={color} />
      <path d={pts} stroke={color} strokeWidth={3} fill="none" strokeLinecap="round"
        pathLength={1} strokeDasharray={1} strokeDashoffset={1 - p} />
      <text x={x} y={y - 14} textAnchor="middle" fontSize={17} fontWeight={800} fill={color}
        fontFamily={FONT_SANS} letterSpacing={1} opacity={p}>{label}</text>
    </svg>
  );
};

// ---------------------------------------------------------------------------
// NotificationCard — lock-screen style notification (app icon + title + sub)
// ---------------------------------------------------------------------------
export const NotificationCard: React.FC<{ x?: number; y?: number; w?: number; title?: string; sub?: string; app?: string; delay?: number }> = ({ x = 467, y = 735, w = 313, title = "Aapka order adhoora reh gaya", sub = "Leather tote abhi bhi cart mein hai \u2192", app = "YB", delay = 0 }) => (
  <A wide x={x} y={y} kind="up" delay={delay}>
    <div style={{ width: w, background: "#FFFFFF", borderRadius: 16, padding: "12px 16px", boxShadow: "0 8px 24px rgba(0,0,0,0.25)", display: "flex", gap: 12, alignItems: "flex-start", textAlign: "left" }}>
      <span style={{ width: 44, height: 44, borderRadius: 10, background: C.orange, color: "#FFFFFF", display: "inline-flex", alignItems: "center", justifyContent: "center", fontFamily: FONT_SANS, fontWeight: 900, fontSize: 16 }}>{app}</span>
      <span style={{ flex: 1 }}>
        <span style={{ ...Sans, fontSize: 12, color: "#8A8A8A", letterSpacing: 1, display: "block" }}>YOURBRAND · now</span>
        <span style={{ ...Sans, fontSize: 16, fontWeight: 800, color: "#111111", display: "block", marginTop: 2, whiteSpace: "nowrap" }}>{title}</span>
        <span style={{ ...Sans, fontSize: 13, color: "#555555", display: "block", marginTop: 2, whiteSpace: "nowrap" }}>{sub}</span>
      </span>
    </div>
  </A>
);

// ---------------------------------------------------------------------------
// DebitCard — tilted black payment card with gold chip + number dots
// ---------------------------------------------------------------------------
export const DebitCard: React.FC<{ x?: number; y?: number; delay?: number; rot?: number; scale?: number }> = ({ x = 90, y = 1170, delay = 0, rot = -18, scale = 1 }) => (
  <A wide x={x} y={y} kind="pop" delay={delay} rot={rot}>
    <div style={{ transform: `scale(${scale})`, width: 220, height: 135, background: "#151515", borderRadius: 14, boxShadow: "0 12px 28px rgba(0,0,0,0.3)", position: "relative", overflow: "hidden" }}>
      <span style={{ position: "absolute", left: 18, top: 14, color: C.orange, fontWeight: 900, fontSize: 15, fontFamily: FONT_SANS }}>PAY</span>
      <span style={{ position: "absolute", left: 18, top: 62, width: 36, height: 26, background: "#E8B33C", borderRadius: 4 }}>
        <span style={{ position: "absolute", inset: 4, border: "1.5px solid #B8892A", borderRadius: 2 }} />
      </span>
      <span style={{ position: "absolute", left: 18, bottom: 16, color: "#888888", fontSize: 12, letterSpacing: 3, fontFamily: FONT_SANS }}>•••• •••• •••• 2026</span>
      <div style={{ position: "absolute", right: -30, top: -30, width: 110, height: 110, borderRadius: "50%", background: "rgba(242,107,29,0.25)" }} />
    </div>
  </A>
);

// ---------------------------------------------------------------------------
// PuzzlePair — black + orange interlocking jigsaw pieces (website x customer)
// Simplified flat SVG: two pieces with tab/notch, interlocked.
// ---------------------------------------------------------------------------
export const PuzzlePair: React.FC<{ cx?: number; cy?: number; scale?: number; delay?: number }> = ({ cx = 360, cy = 690, scale = 1, delay = 0 }) => {
  const p = useDraw(delay, 18);
  const off = (1 - p) * -160;
  return (
    <svg width={720} height={1280} viewBox="0 0 720 1280" style={{ position: "absolute", left: 0, top: 0, overflow: "visible" }}>
      <g transform={`translate(${cx - 200 * scale} ${cy - 200 * scale}) scale(${scale})`} opacity={p}>
      {/* black piece (left) */}
      <path d={`
        M20 120 V40 a20 20 0 0 1 20 -20 h80 a20 20 0 0 0 20 -20 a20 20 0 0 1 20 20 h60 v40
        a20 20 0 0 1 20 20 a20 20 0 0 0 -20 20 v40 h-60 v10
        a20 20 0 0 1 -20 20 a20 20 0 0 1 -20 -20 v-10 H40 a20 20 0 0 0 -20 20 Z
      `} fill="#151515" transform={`translate(${off} 0)`} />
      {/* orange piece (right) */}
      <path d={`
        M240 220 V140 a20 20 0 0 1 20 -20 h80 a20 20 0 0 1 20 20 a20 20 0 0 1 20 -20 h60
        v80 a20 20 0 0 0 20 20 a20 20 0 0 1 -20 20 v80 h-60 v-10
        a20 20 0 0 1 -20 20 a20 20 0 0 1 -20 -20 v-10 H260 a20 20 0 0 0 -20 20 Z
      `} fill={C.orange} transform={`translate(${-off} 0)`} />
      </g>
    </svg>
  );
};

// ---------------------------------------------------------------------------
// BagIllustration — simplified orange shopping bag with handle
// ---------------------------------------------------------------------------
export const BagIllustration: React.FC<{ x?: number; y?: number; s?: number; delay?: number; rot?: number }> = ({ x = 620, y = 1130, s = 150, delay = 0, rot = 8 }) => (
  <A wide x={x} y={y} kind="pop" delay={delay} rot={rot}>
    <svg width={s} height={s * 1.15} viewBox="0 0 120 138">
      <path d="M28 38 h64 l6 92 a6 6 0 0 1 -6 6 H28 a6 6 0 0 1 -6 -6 Z" fill={C.orange} />
      <path d="M42 38 a18 18 0 0 1 36 0" fill="none" stroke="#151515" strokeWidth={5} strokeLinecap="round" />
      <rect x={22} y={30} width={76} height={12} rx={4} fill="#FFFFFF" />
    </svg>
  </A>
);

// ---------------------------------------------------------------------------
// IsoShopFloor — simplified isometric shop platform: floor, back shelves,
// counter, entry frame, cube products, pawn figures, floor labels.
// 2D iso projection (30°). Keep the scene behind other elements.
// ---------------------------------------------------------------------------
export const IsoShopFloor: React.FC<{ cx?: number; cy?: number; w?: number; d?: number; fill?: string; delay?: number }> = ({ cx = 360, cy = 760, w = 380, d = 320, fill = C.floorCream, delay = 0 }) => {
  const p = useDraw(delay, 25);
  const ox = cx - w / 2, oy = cy - d / 2;
  // iso corners (30 deg): top diamond shifted up
  const top = `${cx},${oy}`;
  const right = `${ox + w},${oy + d * 0.28}`;
  const bottom = `${cx},${oy + d}`;
  const left = `${ox},${oy + d * 0.28}`;
  const label = (x: number, y: number, t: string) => (
    <text x={x} y={y} fontSize={13} fontWeight={700} fill="#B8A88F" fontFamily={FONT_SANS} letterSpacing={2}>{t}</text>
  );
  const cubes = [
    { x: ox + 40, y: oy + 40, c: C.cubeOrange }, { x: ox + 85, y: oy + 40, c: C.cubeCream },
    { x: ox + 130, y: oy + 40, c: "#151515" }, { x: ox + 40, y: oy + 85, c: C.cubeCream },
    { x: ox + 85, y: oy + 85, c: C.cubeOrange }, { x: ox + w - 110, y: oy + 60, c: C.cubeCream },
    { x: ox + w - 65, y: oy + 60, c: "#151515" },
  ];
  return (
    <svg width={720} height={1280} viewBox="0 0 720 1280" style={{ position: "absolute", left: 0, top: 0, overflow: "visible" }} opacity={p}>
      <polygon points={`${top} ${right} ${bottom} ${left}`} fill={fill} stroke="#D8CBB2" strokeWidth={2} />
      <polygon points={`${left} ${bottom} ${bottom} ${oy + d + 16} ${left} ${oy + d * 0.28 + 16}`} fill="#E8DFCB" />
      <polygon points={`${bottom} ${right} ${right} ${oy + d + 16} ${bottom} ${oy + d + 16}`} fill="#DED3BB" />
      {/* back shelves */}
      <rect x={ox + 20} y={oy + 22} width={w * 0.44} height={16} fill="#D8CBB2" />
      <rect x={ox + 20} y={oy + 70} width={w * 0.44} height={16} fill="#D8CBB2" />
      {cubes.map((k, i) => <rect key={i} x={k.x} y={k.y} width={18} height={18} rx={3} fill={k.c} />)}
      {/* counter */}
      <polygon points={`${ox + w - 150},${oy + d * 0.42} ${ox + w - 30},${oy + d * 0.42} ${ox + w - 30},${oy + d * 0.42 + 70} ${ox + w - 150},${oy + d * 0.42 + 70}`} fill="#151515" />
      <polygon points={`${ox + w - 150},${oy + d * 0.42} ${ox + w - 110},${oy + d * 0.36} ${ox + w - 110},${oy + d * 0.36 + 70} ${ox + w - 150},${oy + d * 0.42 + 70}`} fill="#2A2A2A" />
      {/* entry frame */}
      <rect x={ox + 30} y={oy + d * 0.55} width={54} height={70} fill="none" stroke="#151515" strokeWidth={4} />
      {/* pawn figures */}
      <g fill="#151515"><circle cx={ox + 120} cy={oy + d * 0.62} r={9} /><rect x={ox + 111} y={oy + d * 0.62 + 8} width={18} height={26} rx={8} /></g>
      <g fill={C.orange}><circle cx={ox + 180} cy={oy + d * 0.7} r={9} /><rect x={ox + 171} y={oy + d * 0.7 + 8} width={18} height={26} rx={8} /></g>
      {label(ox + 34, oy + d * 0.55 + 92, "ENTRY")}
      {label(ox + w - 160, oy + d * 0.42 + 92, "COUNTER")}
    </svg>
  );
};

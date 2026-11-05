// v1.tsx — reusable components extracted from the "Aapne apni dukaan pe
// lakhon lagaye" reference reel (720x1280, Inter + Instrument Serif).
// Every component is animation-ready: it plays its entrance via `delay`
// and settles into the final resting state. Rendered at 30fps.
import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig, spring } from "remotion";
import { A, Line, Pill, useDraw, clamp } from "../primitives";
import { C, FONT_SANS, FONT_SERIF } from "../theme";

const Sans: React.CSSProperties = { fontFamily: FONT_SANS };
const Serifi: React.CSSProperties = { fontFamily: FONT_SERIF, fontStyle: "italic" };

// ---------------------------------------------------------------------------
// KineticTitle — two-weight headline lockup (heavy line + regular line)
// The signature lockup of the reel: first line heavy black, second line
// regular (often green italic serif). Always one line each — use Line.
// ---------------------------------------------------------------------------
export const KineticTitle: React.FC<{
  y: number; heavy: string; regular: string; size?: number;
  heavyColor?: string; regularColor?: string; serif?: boolean; delay?: number;
}> = ({ y, heavy, regular, size = 54, heavyColor = C.ink, regularColor = C.ink, serif = false, delay = 0 }) => (
  <>
    <Line y={y} kind="pop" delay={delay}><span style={{ ...Sans, fontSize: size, fontWeight: 800, color: heavyColor, letterSpacing: -1 }}>{heavy}</span></Line>
    <Line y={y + size * 1.35} kind="pop" delay={delay + 8}>
      <span style={serif ? { ...Serifi, fontSize: size, color: regularColor } : { ...Sans, fontSize: size, color: regularColor }}>{regular}</span>
    </Line>
  </>
);

// ---------------------------------------------------------------------------
// MoneyBundle — one "Rs" cash bundle (cream note + green band + oval)
// ---------------------------------------------------------------------------
export const Bundle: React.FC<{ x: number; y: number; delay: number; w?: number; h?: number }> = ({ x, y, delay, w = 150, h = 62 }) => (
  <A x={x} y={y} kind="pop" delay={delay}>
    <div style={{ width: w, height: h, background: "#F5F6EF", borderRadius: 10, boxShadow: "0 6px 14px rgba(0,0,0,0.10)", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", left: 14, top: 0, bottom: 0, width: 38, background: "#1E8A22" }} />
      <div style={{ position: "absolute", inset: 5, border: "1.5px dashed #9CCB96", borderRadius: 7 }} />
      <span style={{ ...Serifi, position: "absolute", left: 20, top: "50%", transform: "translateY(-50%)", color: "#1E8A22", fontSize: 26 }}>Rs</span>
      <div style={{ position: "absolute", right: 16, top: "50%", transform: "translateY(-50%)", width: 44, height: 30, border: "2px solid #8CC88A", borderRadius: "50%" }} />
    </div>
  </A>
);

// MoneyStack — the 6-bundle pyramid (1 top, 2 mid, 3 bottom), centered.
export const MoneyStack: React.FC<{ cx?: number; cy?: number; delay?: number }> = ({ cx = 360, cy = 30, delay = 30 }) => (
  <>
    <Bundle x={cx} y={cy + 844} delay={delay} />
    <Bundle x={cx - 79} y={cy + 891} delay={delay + 7} /><Bundle x={cx + 53} y={cy + 896} delay={delay + 13} />
    <Bundle x={cx - 134} y={cy + 956} delay={delay + 20} /><Bundle x={cx - 1} y={cy + 964} delay={delay + 26} /><Bundle x={cx + 114} y={cy + 946} delay={delay + 32} />
  </>
);

// ---------------------------------------------------------------------------
// Hexagon — black pointy-top hex with green corner accents + white icon
// ---------------------------------------------------------------------------
export const Hex: React.FC<{ cx: number; cy: number; delay: number; icon: "copy" | "people" | "phone" }> = ({ cx, cy, delay, icon }) => (
  <A x={cx} y={cy} kind="pop" delay={delay}>
    <svg width={166} height={190} viewBox="-83 -95 166 190" style={{ overflow: "visible" }}>
      <polygon points="0,-95 83,-47.5 83,47.5 0,95 -83,47.5 -83,-47.5" fill="#161616" />
      <g stroke="#22C322" strokeWidth={7} strokeLinecap="round">
        <line x1={-70} y1={59} x2={-45} y2={76} />
        <line x1={45} y1={76} x2={70} y2={59} />
        <line x1={-26} y1={88} x2={26} y2={88} />
      </g>
      <g stroke="#FFFFFF" strokeWidth={4} fill="none" strokeLinecap="round">
        {icon === "copy" && <>
          <rect x={-28} y={-18} width={34} height={34} rx={6} />
          <rect x={-6} y={-30} width={34} height={34} rx={6} />
        </>}
        {icon === "people" && <>
          <circle cx={-14} cy={-12} r={10} /><circle cx={14} cy={-12} r={10} />
          <path d="M-30 26 A30 24 0 0 1 30 26" />
        </>}
        {icon === "phone" && <>
          <rect x={-16} y={-28} width={32} height={56} rx={6} />
          <circle cx={0} cy={2} r={14} />
          <line x1={0} y1={2} x2={0} y2={-8} /><line x1={0} y1={2} x2={7} y2={5} />
        </>}
      </g>
    </svg>
  </A>
);

// ---------------------------------------------------------------------------
// Person — crowd icon glyph (green by default, black = highlighted customer)
// ---------------------------------------------------------------------------
export const Person: React.FC<{ color: string; size?: number }> = ({ color, size = 42 }) => (
  <svg width={size} height={size * 52 / 42} viewBox="0 0 42 52"><circle cx={21} cy={13} r={11} fill={color} /><path d="M6 50 C6 32 13 26 21 26 C29 26 36 32 36 50 Z" fill={color} /></svg>
);

// ---------------------------------------------------------------------------
// QMark — outlined question mark with hollow square dot, green stroke
// ---------------------------------------------------------------------------
export const QMark: React.FC<{ x: number; y: number; delay: number; size?: number }> = ({ x, y, delay, size = 98 }) => (
  <A x={x} y={y} kind="pop" delay={delay}>
    <svg width={size} height={size * 145 / 98} viewBox="0 0 98 145">
      <text x={49} y={112} textAnchor="middle" fontSize={128} fontWeight={800} fill="none" stroke="#1A8A0A" strokeWidth={4.5} fontFamily={FONT_SANS}>?</text>
      <rect x={40} y={120} width={18} height={18} fill="none" stroke="#1A8A0A" strokeWidth={4} />
    </svg>
  </A>
);

// ---------------------------------------------------------------------------
// Chip — feature pill with green icon circle (zigzag benefit callouts)
// ---------------------------------------------------------------------------
const BoltIco: React.FC<{ s: number }> = ({ s }) => (
  <svg width={s} height={s} viewBox="0 0 16 16"><path d="M9 1 L3.5 9 H7 L6 15 L12.5 6.5 H9 Z" fill="#F5C518" /></svg>
);
const CheckIco: React.FC<{ s: number }> = ({ s }) => (
  <svg width={s} height={s} viewBox="0 0 18 18"><path d="M3 9.5 L7 13 L15 4" stroke="#FFFFFF" strokeWidth={3} fill="none" strokeLinecap="round" /></svg>
);
export const Chip: React.FC<{ x: number; y: number; label: string; icon: "check" | "bolt" | "dot" | "spark"; delay: number }> = ({ x, y, label, icon, delay }) => (
  <A wide x={x} y={y} kind="pop" delay={delay}>
    <div style={{ display: "flex", alignItems: "center", gap: 12, background: "#FFFFFF", borderRadius: 27, padding: "10px 22px 10px 10px", boxShadow: "0 6px 16px rgba(0,0,0,0.08)" }}>
      <span style={{ width: 34, height: 34, borderRadius: "50%", background: icon === "spark" ? "transparent" : "#1E8A1E", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, color: "#FFFFFF" }}>
        {icon === "check" && <CheckIco s={18} />}
        {icon === "bolt" && <BoltIco s={16} />}
        {icon === "dot" && <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#FFFFFF" }} />}
        {icon === "spark" && <span style={{ fontSize: 24 }}>✨</span>}
      </span>
      <span style={{ ...Sans, fontSize: 21, fontWeight: 500, color: "#111111", whiteSpace: "nowrap" }}>{label}</span>
    </div>
  </A>
);

// ---------------------------------------------------------------------------
// SealBadge — circular "LIMITED PROJECTS / EVERY MONTH" seal with star
// ---------------------------------------------------------------------------
export const SealBadge: React.FC<{ x?: number; y?: number; delay?: number; r?: number }> = ({ x = 360, y = 1025, delay = 0, r = 100 }) => (
  <A x={x} y={y} kind="pop" delay={delay}>
    <svg width={r * 2} height={r * 2} viewBox="0 0 200 200" style={{ overflow: "visible" }}>
      <defs>
        <path id="ringTop" d="M42 100 A58 58 0 0 1 142 100" fill="none" />
        <path id="ringBot" d="M42 100 A58 58 0 0 0 142 100" fill="none" />
      </defs>
      <circle cx={100} cy={100} r={76} fill="#0E8A0E" />
      <text fontSize={13.5} fontWeight={700} fill="#FFFFFF" fontFamily={FONT_SANS} letterSpacing={2}>
        <textPath href="#ringTop" startOffset="50%" textAnchor="middle">LIMITED PROJECTS</textPath>
      </text>
      <text fontSize={13.5} fontWeight={700} fill="#FFFFFF" fontFamily={FONT_SANS} letterSpacing={2}>
        <textPath href="#ringBot" startOffset="50%" textAnchor="middle">EVERY MONTH</textPath>
      </text>
      <circle cx={100} cy={100} r={48} fill="none" stroke="#FFFFFF" strokeOpacity={0.6} strokeWidth={1.5} />
      <polygon points="100,80 105.9,93.8 120.9,94.4 109.2,103.4 113.1,117.6 100,109.4 86.9,117.6 90.8,103.4 79.1,94.4 94.1,93.8" fill="#FFFFFF" />
    </svg>
  </A>
);

// ---------------------------------------------------------------------------
// CommentInput — keyword pill with radio circle + typed text + send button
// ---------------------------------------------------------------------------
export const CommentInput: React.FC<{ y?: number; delay?: number; keyword?: string }> = ({ y = 801, delay = 34, keyword = "SHOWROOM" }) => {
  const frame = useCurrentFrame();
  const chars = Math.max(0, Math.min(keyword.length, Math.floor((frame - (delay + 10)) / 3)));
  const cursorOn = frame % 20 < 12;
  return (
    <Line y={y} kind="up" delay={delay}>
      <div style={{ display: "inline-block", width: 534, height: 73, background: "#FFFFFF", borderRadius: 36, boxShadow: "0 4px 12px rgba(0,0,0,0.08)", position: "relative", textAlign: "left" }}>
        <div style={{ position: "absolute", left: 20, top: 16, width: 40, height: 40, borderRadius: "50%", border: "2.5px solid #1A8A1A" }} />
        <div style={{ position: "absolute", left: 90, top: 21, display: "flex", alignItems: "center", height: 30 }}>
          <span style={{ ...Sans, fontSize: 24, fontWeight: 800, color: "#111111", letterSpacing: 1 }}>{keyword.slice(0, chars)}</span>
          <span style={{ width: 2, height: 28, background: "#1A8A1A", marginLeft: 3, opacity: cursorOn ? 1 : 0 }} />
        </div>
        <div style={{ position: "absolute", right: 14, top: 10, width: 54, height: 54, borderRadius: "50%", background: "#178A17", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width={26} height={26} viewBox="0 0 26 26"><path d="M4 22 L23 13 L4 4 L8.5 11.5 L23 13 L8.5 14.5 Z" fill="#FFFFFF" /></svg>
        </div>
      </div>
    </Line>
  );
};

// ---------------------------------------------------------------------------
// PhoneStorefront — black phone with a detailed home-decor store site.
// Flow layout: sections stack, never overlap. Used in S07/S09.
// ---------------------------------------------------------------------------
const Vase: React.FC<{ s: number; tone: string }> = ({ s, tone }) => (
  <svg width={s} height={s} viewBox="0 0 40 40">
    <path d="M16 4 h8 v6 c5 4 7 9 7 14 c0 7 -5 12 -11 12 s-11 -5 -11 -12 c0 -5 2 -10 7 -14 Z" fill={tone} opacity={0.85} />
    <rect x={14} y={1} width={12} height={4} rx={2} fill={tone} />
  </svg>
);
const Star5: React.FC<{ s: number }> = ({ s }) => (
  <span style={{ display: "inline-flex", gap: 1 }}>
    {[0, 1, 2, 3, 4].map((i) => (
      <svg key={i} width={s} height={s} viewBox="0 0 20 20"><polygon points="10,1 12.4,6.8 18.6,7.4 14,11.4 15.4,17.5 10,14.2 4.6,17.5 6,11.4 1.4,7.4 7.6,6.8" fill="#E8B33C" /></svg>
    ))}
  </span>
);
const CartIco: React.FC<{ s: number }> = ({ s }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="#111111" strokeWidth={2}>
    <path d="M5 8 h14 l-1.2 11 a2 2 0 0 1 -2 1.8 H8.2 a2 2 0 0 1 -2 -1.8 Z" /><path d="M8.5 8 V6.5 a3.5 3.5 0 0 1 7 0 V8" />
  </svg>
);
const ShieldIco: React.FC<{ s: number }> = ({ s }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="#21463A" strokeWidth={2}><path d="M12 3 l7 2.5 V11 c0 4.5 -3 7.5 -7 9 c-4 -1.5 -7 -4.5 -7 -9 V5.5 Z" /><path d="M9.5 11.5 l2 2 4 -4" /></svg>
);
const LeafIco: React.FC<{ s: number }> = ({ s }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="#21463A" strokeWidth={2}><path d="M5 19 C5 10 11 5 20 4 c-1 9 -5 15 -13 15 Z" /><path d="M5 19 C8 15 12 11 18 8" /></svg>
);
const TruckIco: React.FC<{ s: number }> = ({ s }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="#21463A" strokeWidth={2}><path d="M3 7 h11 v9 H3 Z M14 10 h4 l3 3.5 V16 h-7" /><circle cx={7} cy={17.5} r={1.8} /><circle cx={17} cy={17.5} r={1.8} /></svg>
);
const PlayIco: React.FC<{ s: number }> = ({ s }) => (
  <svg width={s} height={s} viewBox="0 0 24 24"><circle cx={12} cy={12} r={10} fill="rgba(255,255,255,0.9)" /><path d="M10 8.5 L16 12 L10 15.5 Z" fill="#21463A" /></svg>
);

export const MiniSite: React.FC<{ w: number; h: number }> = ({ w, h }) => {
  const dark = "#21463A";
  const grads = [
    "linear-gradient(140deg,#EFE7D8,#DCCDB0)", "linear-gradient(140deg,#E8DFD2,#C9B895)",
    "linear-gradient(140deg,#F0E9DA,#D9C7A8)", "linear-gradient(140deg,#E9E2D6,#CDBFA5)",
    "linear-gradient(140deg,#EFE9DC,#DCCFB2)", "linear-gradient(140deg,#E7E0D2,#CFC2A8)",
  ];
  const tones = ["#A98F63", "#8A6F45", "#B59B72", "#977C4F", "#AD9166", "#927C52"];
  const fs = (f: number) => Math.max(4, w * f);
  const pad = Math.round(w * 0.045);
  const gap = Math.round(w * 0.05);
  const H2: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div style={{ textAlign: "center", fontSize: fs(0.044), fontWeight: 800, color: "#111111", marginTop: gap }}>{children}</div>
  );
  const prods = [["Ceramic Vase", "₹899"], ["Wall Mirror", "₹1,499"], ["Table Lamp", "₹1,199"], ["Cushion Set", "₹649"], ["Clock Decor", "₹999"], ["Plant Pot", "₹449"]];
  return (
    <div style={{ width: w, height: h, background: "#FFFFFF", overflow: "hidden", fontFamily: FONT_SANS, display: "flex", flexDirection: "column", padding: pad, boxSizing: "border-box", gap: gap }}>
      <div style={{ display: "flex", alignItems: "center", gap: w * 0.03 }}>
        <span style={{ fontSize: fs(0.05), fontWeight: 900, color: dark, letterSpacing: 0.5 }}>DECO<span style={{ color: "#2E9A2E" }}>RA</span></span>
        <span style={{ flex: 1 }} />
        {["Home", "Shop", "About"].map((t) => <span key={t} style={{ fontSize: fs(0.032), fontWeight: 600, color: "#333333" }}>{t}</span>)}
        <CartIco s={fs(0.045)} />
      </div>
      <div style={{ display: "flex", gap: w * 0.02 }}>
        {grads.map((g, i) => <div key={i} style={{ flex: 1, height: w * 0.16, background: g, borderRadius: 3, display: "flex", alignItems: "center", justifyContent: "center" }}><Vase s={w * 0.1} tone={tones[i]} /></div>)}
      </div>
      <div style={{ background: `linear-gradient(120deg, ${dark} 55%, #2C5A48)`, display: "flex", alignItems: "center", padding: w * 0.04, gap: w * 0.04 }}>
        <div style={{ display: "flex", gap: w * 0.03 }}>
          <div style={{ width: w * 0.18, height: w * 0.3, background: "linear-gradient(150deg,#EFE7D8,#D9C7A4)", borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center" }}><Vase s={w * 0.13} tone="#8A6F45" /></div>
          <div style={{ width: w * 0.18, height: w * 0.3, background: "linear-gradient(150deg,#E4D9C6,#C7A984)", borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center" }}><Vase s={w * 0.13} tone="#977C4F" /></div>
        </div>
        <div>
          <div style={{ fontSize: fs(0.052), fontWeight: 800, color: "#FFFFFF", lineHeight: 1.3 }}>SHOP THE BEST<br />HOME DECOR<br />PRODUCTS</div>
          <div style={{ fontSize: fs(0.028), color: "rgba(255,255,255,0.75)", marginTop: 3 }}>Explore premium homeware &amp; bath essentials.</div>
          <span style={{ display: "inline-block", marginTop: 6, background: "#2E9A2E", color: "#FFFFFF", fontSize: fs(0.031), fontWeight: 700, padding: "3px 10px", borderRadius: 99 }}>Shop Now</span>
        </div>
      </div>
      <H2>Best Selling Products</H2>
      {[0, 1].map((r) => (
        <div key={r} style={{ display: "flex", gap: w * 0.05, marginTop: gap * 0.6 }}>
          {[0, 1, 2].map((c) => {
            const i = r * 3 + c;
            return (
              <div key={prods[i][0]} style={{ flex: 1 }}>
                <div style={{ height: w * 0.22, background: grads[i], borderRadius: 3, display: "flex", alignItems: "center", justifyContent: "center" }}><Vase s={w * 0.14} tone={tones[i]} /></div>
                <div style={{ fontSize: fs(0.03), fontWeight: 600, color: "#111111", marginTop: 3, whiteSpace: "nowrap" }}>{prods[i][0]}</div>
                <div style={{ fontSize: fs(0.028), fontWeight: 700, color: "#2E9A2E", whiteSpace: "nowrap" }}>{prods[i][1]}</div>
              </div>
            );
          })}
        </div>
      ))}
      <div style={{ display: "flex", alignItems: "center", marginTop: gap }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: fs(0.042), fontWeight: 800, color: "#111111", whiteSpace: "nowrap" }}>About Us – Best Home Decor Store</div>
          <div style={{ fontSize: fs(0.029), color: "#555555", marginTop: 2 }}>Handcrafted decor for modern Indian homes.</div>
        </div>
        <span style={{ background: "#2E9A2E", color: "#FFFFFF", fontSize: fs(0.028), fontWeight: 700, padding: "3px 9px", borderRadius: 99, marginLeft: w * 0.04, whiteSpace: "nowrap" }}>Read More</span>
      </div>
      <H2>Why Choose Us</H2>
      <div style={{ display: "flex", gap: w * 0.03, marginTop: gap * 0.6 }}>
        {[{ i: <TruckIco s={fs(0.048)} />, t: "Free Ship" }, { i: <ShieldIco s={fs(0.048)} />, t: "Secure Pay" }, { i: <LeafIco s={fs(0.048)} />, t: "Premium" }, { i: <PlayIco s={fs(0.043)} />, t: "Returns" }].map((f) => (
          <div key={f.t} style={{ flex: 1, border: `1px solid ${dark}`, borderRadius: 6, padding: `${fs(0.02)}px 0`, display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
            {f.i}<span style={{ fontSize: fs(0.026), fontWeight: 600, color: "#111111", whiteSpace: "nowrap" }}>{f.t}</span>
          </div>
        ))}
      </div>
      <H2>What Our Customers Say</H2>
      <div style={{ background: dark, display: "flex", gap: 5, padding: 6, marginTop: gap * 0.6 }}>
        {[0, 1, 2].map((i) => (
          <div key={i} style={{ flex: 1, background: "#FFFFFF", borderRadius: 5, padding: 4, display: "flex", flexDirection: "column", gap: 2 }}>
            <Star5 s={fs(0.03)} />
            <div style={{ fontSize: fs(0.024), color: "#333333", lineHeight: 1.2 }}>“Great quality, fast delivery.”</div>
            <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
              <span style={{ width: fs(0.046), height: fs(0.046), borderRadius: "50%", background: "#C9B895", display: "inline-block" }} />
              <span style={{ fontSize: fs(0.024), fontWeight: 700, color: "#111111" }}>{["Ananya", "Rohan", "Priya"][i]}</span>
            </div>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", gap: 3, justifyContent: "center", marginTop: gap * 0.4 }}>
        <span style={{ width: 10, height: 3, background: dark, borderRadius: 2 }} />
        <span style={{ width: 4, height: 3, background: "#BBBBBB", borderRadius: 2 }} />
        <span style={{ width: 4, height: 3, background: "#BBBBBB", borderRadius: 2 }} />
      </div>
      <H2>Our Blogs</H2>
      <div style={{ display: "flex", gap: w * 0.03, marginTop: gap * 0.6 }}>
        {["5 styling tips", "Vastu for decor", "Small spaces", "Festive ready"].map((t, i) => (
          <div key={t} style={{ flex: 1 }}>
            <div style={{ height: w * 0.16, background: grads[i], borderRadius: 3, display: "flex", alignItems: "center", justifyContent: "center" }}><Vase s={w * 0.09} tone={tones[i]} /></div>
            <div style={{ fontSize: fs(0.025), fontWeight: 600, color: "#111111", marginTop: 2, whiteSpace: "nowrap" }}>{t}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const Phone: React.FC<{ x: number; y: number; w: number; h: number; delay: number }> = ({ x, y, w, h, delay }) => (
  <A x={x} y={y} kind="up" delay={delay}>
    <div style={{ width: w, height: h, background: "#111111", borderRadius: 38, padding: 8, boxSizing: "border-box", boxShadow: "0 10px 30px rgba(0,0,0,0.18)" }}>
      <div style={{ width: "100%", height: "100%", borderRadius: 30, overflow: "hidden" }}>
        <MiniSite w={w - 16} h={h - 16} />
      </div>
    </div>
  </A>
);

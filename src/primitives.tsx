import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { C, FONT_SANS, FONT_SERIF, H, W } from "./theme";

export const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

// ---------- global fonts + reset, rendered once per composition ----------
export const GlobalCss: React.FC = () => (
  <style>{`
    @font-face { font-family: '${FONT_SANS}'; src: url('${staticFile("fonts/Inter-Var.ttf")}') format('truetype'); font-weight: 100 900; font-style: normal; font-display: block; }
    @font-face { font-family: '${FONT_SERIF}'; src: url('${staticFile("fonts/InstrumentSerif-Regular.ttf")}') format('truetype'); font-weight: 400; font-style: normal; font-display: block; }
    @font-face { font-family: '${FONT_SERIF}'; src: url('${staticFile("fonts/InstrumentSerif-Italic.ttf")}') format('truetype'); font-weight: 400; font-style: italic; font-display: block; }
    * { margin: 0; padding: 0; box-sizing: border-box; }
  `}</style>
);

// ---------- background ----------
export const Bg: React.FC<{
  top?: string; bottom?: string; centerGlow?: boolean;
  glow?: { x: number; y: number; r: number; color?: string; opacity?: number };
}> = (p) => (
  <AbsoluteFill
    style={{ background: `linear-gradient(180deg, ${p.top ?? C.bgTop} 0%, ${p.bottom ?? C.bgEdge} 100%)` }}
  >
    {p.centerGlow !== false && (
      <div style={{
        position: "absolute", inset: 0,
        background: `radial-gradient(circle at 50% 42%, ${C.bgCenter} 0%, rgba(252,253,251,0) 62%)`,
      }} />
    )}
    {p.glow && (
      <div style={{
        position: "absolute",
        left: p.glow.x - p.glow.r, top: p.glow.y - p.glow.r,
        width: p.glow.r * 2, height: p.glow.r * 2, borderRadius: "50%",
        background: `radial-gradient(circle, ${p.glow.color ?? C.glowGreen} 0%, rgba(191,232,186,0) 70%)`,
        opacity: p.glow.opacity ?? 0.5, filter: "blur(28px)",
      }} />
    )}
  </AbsoluteFill>
);

// ---------- decorative rings ----------
export const BlurRing: React.FC<{ cx: number; cy: number; r: number; color?: string; width?: number; blur?: number; opacity?: number }> = (p) => (
  <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ position: "absolute", left: 0, top: 0, overflow: "visible" }}>
    <circle cx={p.cx} cy={p.cy} r={p.r} fill="none" stroke={p.color ?? C.arc}
      strokeWidth={p.width ?? 40} opacity={p.opacity ?? 0.6} style={{ filter: `blur(${p.blur ?? 16}px)` }} />
  </svg>
);

export const ThinArc: React.FC<{ cx: number; cy: number; r: number; color?: string; width?: number; opacity?: number }> = (p) => (
  <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ position: "absolute", left: 0, top: 0, overflow: "visible" }}>
    <circle cx={p.cx} cy={p.cy} r={p.r} fill="none" stroke={p.color ?? C.arcThin}
      strokeWidth={p.width ?? 2} opacity={p.opacity ?? 0.7} />
  </svg>
);

// ---------- animated wrapper: positions children centered at (x,y) ----------
// `wide`: full-canvas-width container (flex-centered) — use for wide children
// (chips, pills) that would hit the shrink-to-fit limit when centered at x.
export const A: React.FC<{
  x: number; y: number; delay?: number; kind?: "pop" | "fade" | "up" | "none";
  dur?: number; from?: number; opacity?: number; rot?: number; wide?: boolean; children: React.ReactNode;
}> = (p) => {
  const frame = useCurrentFrame();
  const fps = useVideoConfig().fps;
  const d = p.delay ?? 0;
  let opacity = 1, scale = 1, ty = 0;
  if (p.kind === "pop") {
    const s = spring({ frame: frame - d, fps, config: { damping: 13, stiffness: 240, mass: 0.85 } });
    scale = interpolate(s, [0, 1], [p.from ?? 0.4, 1], clamp);
    opacity = interpolate(s, [0, 0.6], [0, 1], clamp);
  } else if (p.kind === "up") {
    const f = interpolate(frame - d, [0, p.dur ?? 18], [0, 1], clamp);
    ty = interpolate(f, [0, 1], [26, 0]);
    opacity = f;
  } else if (p.kind === "fade") {
    opacity = interpolate(frame - d, [0, p.dur ?? 14], [0, 1], clamp);
  }
  if (p.opacity !== undefined) opacity *= p.opacity;
  if (p.wide) {
    return (
      <div style={{
        position: "absolute", left: 0, top: p.y, width: W, display: "flex", justifyContent: "center",
        transform: `translateY(-50%) translateY(${ty}px) scale(${scale}) rotate(${p.rot ?? 0}deg)`,
        opacity, transformOrigin: "center",
      }}>
        <div style={{ transform: `translateX(${p.x - W / 2}px)` }}>{p.children}</div>
      </div>
    );
  }
  return (
    <div style={{
      position: "absolute", left: p.x, top: p.y,
      transform: `translate(-50%,-50%) translateY(${ty}px) scale(${scale}) rotate(${p.rot ?? 0}deg)`,
      opacity, transformOrigin: "center",
    }}>{p.children}</div>
  );
};

// ---------- full-width centered text line (no wrap, no shrink-to-fit bug) ----------
// use for any headline/caption text that must sit on ONE line centered on the canvas.
export const Line: React.FC<{
  y: number; delay?: number; kind?: "pop" | "up" | "fade" | "none";
  dur?: number; from?: number; opacity?: number; children: React.ReactNode;
}> = (p) => {
  const frame = useCurrentFrame();
  const fps = useVideoConfig().fps;
  const d = p.delay ?? 0;
  let opacity = 1, scale = 1, ty = 0;
  if (p.kind === "pop") {
    const s = spring({ frame: frame - d, fps, config: { damping: 13, stiffness: 240, mass: 0.85 } });
    scale = interpolate(s, [0, 1], [p.from ?? 0.4, 1], clamp);
    opacity = interpolate(s, [0, 0.6], [0, 1], clamp);
  } else if (p.kind === "up") {
    const f = interpolate(frame - d, [0, p.dur ?? 18], [0, 1], clamp);
    ty = interpolate(f, [0, 1], [26, 0]);
    opacity = f;
  } else if (p.kind === "fade") {
    opacity = interpolate(frame - d, [0, p.dur ?? 14], [0, 1], clamp);
  }
  if (p.opacity !== undefined) opacity *= p.opacity;
  return (
    <div style={{
      position: "absolute", left: 0, top: p.y, width: W,
      transform: `translateY(-50%) translateY(${ty}px) scale(${scale})`,
      opacity, transformOrigin: "center 50%",
      textAlign: "center", whiteSpace: "nowrap",
    }}>{p.children}</div>
  );
};

// ---------- text ----------
export const T: React.FC<{
  x: number; y: number; size: number; color: string;
  weight?: number; serif?: boolean; italic?: boolean;
  align?: "left" | "center" | "right"; tracking?: number; lh?: number;
  opacity?: number; style?: React.CSSProperties; children: React.ReactNode;
}> = (p) => (
  <div style={{
    position: "absolute", left: p.x, top: p.y, transform: "translate(-50%,-50%)",
    fontFamily: p.serif ? FONT_SERIF : FONT_SANS,
    fontStyle: p.italic ? "italic" : "normal",
    fontSize: p.size, fontWeight: p.weight ?? 400, color: p.color,
    textAlign: p.align ?? "center", letterSpacing: p.tracking ?? 0,
    lineHeight: p.lh ?? 1.2, whiteSpace: "pre-line", opacity: p.opacity ?? 1,
    ...p.style,
  }}>{p.children}</div>
);

// ---------- word-by-word reveal ----------
export const WordReveal: React.FC<{
  x: number; y: number; text: string; size: number; color: string; weight?: number;
  serif?: boolean; italic?: boolean; start: number; stagger?: number; per?: number;
  align?: "left" | "center" | "right";
}> = (p) => {
  const frame = useCurrentFrame();
  const words = p.text.split(" ");
  // measure-free centered word row
  return (
    <div style={{ position: "absolute", left: 0, top: p.y, width: W, transform: "translateY(-50%)", display: "flex", flexWrap: "nowrap", justifyContent: p.align === "left" ? "flex-start" : p.align === "right" ? "flex-end" : "center", whiteSpace: "nowrap", paddingLeft: p.align === "left" ? 20 : 0, paddingRight: p.align === "right" ? 20 : 0 }}>
      {words.map((w, i) => {
        const f = interpolate(frame - (p.start + i * (p.stagger ?? 4)), [0, p.per ?? 10], [0, 1], clamp);
        return (
          <span key={i} style={{
            fontFamily: p.serif ? FONT_SERIF : FONT_SANS, fontStyle: p.italic ? "italic" : "normal",
            fontSize: p.size, fontWeight: p.weight ?? 400, color: p.color, lineHeight: 1.2,
            opacity: f, transform: `translateY(${interpolate(f, [0, 1], [14, 0])}px)`, marginRight: "0.28em",
          }}>{w}</span>
        );
      })}
    </div>
  );
};

// ---------- viewfinder corner brackets ----------
export const Viewfinder: React.FC<{ cx: number; cy: number; size: number; color?: string; arm?: number; stroke?: number }> = (p) => {
  const s = p.size / 2, a = p.arm ?? 22, st = p.stroke ?? 3, c = p.color ?? C.green;
  const corner = (x: number, y: number, bx: number, by: number) => (
    <div key={`${x}-${y}`} style={{
      position: "absolute", left: x, top: y, width: a, height: a,
      borderTop: by < 0 ? `${st}px solid ${c}` : undefined,
      borderBottom: by > 0 ? `${st}px solid ${c}` : undefined,
      borderLeft: bx < 0 ? `${st}px solid ${c}` : undefined,
      borderRight: bx > 0 ? `${st}px solid ${c}` : undefined,
    }} />
  );
  return (
    <div style={{ position: "absolute", left: p.cx - s, top: p.cy - s, width: p.size, height: p.size }}>
      {corner(0, 0, -1, -1)}{corner(p.size - a, 0, 1, -1)}{corner(0, p.size - a, -1, 1)}{corner(p.size - a, p.size - a, 1, 1)}
    </div>
  );
};

// ---------- 4-point sparkle ----------
export const Sparkle: React.FC<{ x: number; y: number; size: number; color: string; delay?: number; twinkle?: boolean }> = (p) => {
  const frame = useCurrentFrame();
  const delay = p.delay ?? 0;
  const s = spring({ frame: frame - delay, fps: useVideoConfig().fps, config: { damping: 10, stiffness: 200, mass: 0.7 } });
  const tw = p.twinkle ? 0.72 + 0.28 * Math.abs(Math.sin((frame - delay) / 9)) : 1;
  const scale = interpolate(s, [0, 1], [0, 1], clamp) * tw;
  const sz = p.size;
  const d = `M ${sz / 2} 0 C ${sz * 0.44} ${sz * 0.3} ${sz * 0.7} ${sz * 0.44} ${sz} ${sz / 2} C ${sz * 0.7} ${sz * 0.56} ${sz * 0.56} ${sz * 0.7} ${sz / 2} ${sz} C ${sz * 0.3} ${sz * 0.56} ${sz * 0.44} ${sz * 0.7} 0 ${sz / 2} C ${sz * 0.44} ${sz * 0.3} ${sz * 0.3} ${sz * 0.44} ${sz / 2} 0 Z`;
  return (
    <div style={{ position: "absolute", left: p.x, top: p.y, transform: `translate(-50%,-50%) scale(${scale})` }}>
      <svg width={sz} height={sz} viewBox={`0 0 ${sz} ${sz}`} style={{ overflow: "visible" }}><path d={d} fill={p.color} /></svg>
    </div>
  );
};

// ---------- draw-on progress hook for SVG strokes ----------
export const useDraw = (delay: number, dur: number) => {
  const frame = useCurrentFrame();
  return interpolate(frame - delay, [0, dur], [0, 1], clamp);
};

// ---------- hand-drawn ellipse (draw-on) ----------
export const HandEllipse: React.FC<{ cx: number; cy: number; rx: number; ry: number; color: string; width?: number; delay: number; dur: number; rot?: number }> = (p) => {
  const prog = useDraw(p.delay, p.dur);
  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ position: "absolute", left: 0, top: 0, overflow: "visible" }}>
      <ellipse cx={p.cx} cy={p.cy} rx={p.rx} ry={p.ry} fill="none" stroke={p.color} strokeWidth={p.width ?? 3.5}
        pathLength={1} strokeDasharray={1} strokeDashoffset={1 - prog}
        strokeLinecap="round" transform={`rotate(${p.rot ?? 0} ${p.cx} ${p.cy})`} />
    </svg>
  );
};

// ---------- pill ----------
export const Pill: React.FC<{
  x: number; y: number; w: number; h: number; fill: string; border?: string; borderW?: number;
  text: string; textColor: string; size?: number; weight?: number; shadow?: string; radius?: number;
}> = (p) => (
  <div style={{
    position: "absolute", left: p.x - p.w / 2, top: p.y - p.h / 2, width: p.w, height: p.h,
    background: p.fill, border: p.border ? `${p.borderW ?? 3}px solid ${p.border}` : undefined,
    borderRadius: p.radius ?? p.h / 2, boxShadow: p.shadow, display: "flex", alignItems: "center", justifyContent: "center",
  }}>
    <span style={{ fontFamily: FONT_SANS, fontSize: p.size ?? 30, fontWeight: p.weight ?? 400, color: p.textColor }}>{p.text}</span>
  </div>
);

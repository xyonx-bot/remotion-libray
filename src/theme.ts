// theme.ts — design tokens for the reel component library.
// Two art directions live here: v1 (green/off-white, white + green) and
// v2 (peach/orange, agency carousel). Pass the palette your scene uses.
export const W = 720;
export const H = 1280;
export const FPS = 30;

export const C = {
  // v1 — off-white + green fintech-ish
  bgTop: "#F6F8F5",
  bgEdge: "#EFF3ED",
  bgCenter: "#FCFDFB",
  ink: "#111111",
  gray: "#555555",
  graySoft: "#5C5C5C",
  green: "#1B8A1B",
  greenDeep: "#0F8A0A",
  greenBright: "#1DB61D",
  greenText: "#1E9A2E",
  arc: "#CDEBC6",
  arcThin: "#8BD98A",
  mint: "#E9F4E6",
  panelGray: "#F1F1F1",
  card: "#FAFAFA",
  border: "#E6E6E6",
  glowGreen: "#BFE8BA",
  gold: "#D9B25E",

  // v2 — peach + orange agency
  peach: "#F9E0D0",
  peachSoft: "#F8DCC8",
  orange: "#F26B1D",
  orangeDeep: "#E05F14",
  darkBrown: "#2B1A12",
  floorCream: "#F4EBDD",
  cubeOrange: "#F78842",
  cubeCream: "#F5EFE3",
};

export const FONT_SANS = "InterVar";
export const FONT_SERIF = "InstrumentSerif";
export const FONT_MONO = "InterVar"; // use Inter with tracking for mono-ish labels

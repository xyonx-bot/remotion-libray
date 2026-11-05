// examples.tsx — one demo composition per reusable component.
// `remotion preview src/index.tsx` and click any comp to play it.
import React from "react";
import { AbsoluteFill } from "remotion";
import { GlobalCss, Bg, Line } from "./primitives";
import { C, W, H, FONT_SANS, FONT_SERIF } from "./theme";
import { StepIndicator, PillBadge, HeadlinePair, SpeechBubble, PriceTag, BlurBgWord, NextButton, RingCircles, ConnectorAnnotation, NotificationCard, DebitCard, PuzzlePair, BagIllustration, IsoShopFloor } from "./components/v2";
import { MoneyStack, Hex, Chip, SealBadge, CommentInput, Phone } from "./components/v1";
import { AgencyHeader, SeriesTitle, NumberBadge, AccentCircle, CheckerSticker, Barcode, TiledWordmark, GlossyOrb, ParticleField, OrderCard, DatabaseCylinder, Storefront, ApniDoor, FollowPill, EmblemLockup, HeaderTag } from "./components/v3";

const V2Scene: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <AbsoluteFill style={{ width: W, height: H, overflow: "hidden", background: C.peach }}>
    <GlobalCss />
    {children}
  </AbsoluteFill>
);

export const DemoStepIndicator: React.FC = () => (
  <V2Scene>
    <StepIndicator active={1} delay={5} />
    <PillBadge y={170} text="Offline" delay={10} />
    <HeadlinePair y={290} heavy="Dukaan hoti," regular="toh aap usay rok lete." delay={15} />
  </V2Scene>
);

export const DemoSpeechPrice: React.FC = () => (
  <V2Scene>
    <StepIndicator active={0} delay={5} />
    <PillBadge y={170} text="Dukaan" delay={8} />
    <IsoShopFloor delay={10} />
    <SpeechBubble x={348} y={640} text="Sir, koi masla?" delay={40} />
    <BlurBgWord y={1220} delay={15} />
    <PriceTag delay={25} />
    <NextButton delay={45} />
  </V2Scene>
);

export const DemoNotification: React.FC = () => (
  <V2Scene>
    <StepIndicator active={1} delay={5} />
    <PillBadge y={170} text="Sahi website" delay={8} />
    <HeadlinePair y={290} heavy="Website usay khud" regular="yaad dilati hai:" delay={12} />
    <Phone x={471} y={830} w={368} h={737} delay={25} />
    <ConnectorAnnotation label="AUTO REMINDER" x={90} y={588} tx={330} ty={700} align="left" delay={45} />
    <ConnectorAnnotation label="CHECKOUT DATA SAVED" x={105} y={953} tx={300} ty={860} color="#2B1A12" align="left" delay={55} />
    <DebitCard delay={20} />
    <PriceTag x={110} y={1200} delay={28} />
    <BlurBgWord y={1230} text="WEBSITE" delay={15} />
  </V2Scene>
);

export const DemoPuzzle: React.FC = () => (
  <V2Scene>
    <StepIndicator active={2} delay={5} />
    <RingCircles cy={700} delay={5} />
    <PuzzlePair cy={700} delay={15} />
    <DebitCard x={90} y={1160} delay={30} />
    <BagIllustration x={620} y={1140} delay={35} />
    <BlurBgWord y={1230} text="WEBSITE" delay={15} />
  </V2Scene>
);

export const DemoV1: React.FC = () => (
  <AbsoluteFill style={{ width: W, height: H, overflow: "hidden" }}>
    <GlobalCss />
    <Bg />
    <MoneyStack delay={5} />
    <Hex cx={228} cy={570} delay={20} icon="copy" />
    <Hex cx={492} cy={570} delay={30} icon="people" />
    <Chip x={162} y={1010} label="Custom design" icon="check" delay={40} />
    <Chip x={560} y={1010} label="Fast loading" icon="bolt" delay={48} />
    <SealBadge y={290} delay={55} />
    <CommentInput y={1160} delay={60} />
  </AbsoluteFill>
);

const V3Scene: React.FC<{ children: React.ReactNode; bg?: string }> = ({ children, bg = "#ECEAE7" }) => (
  <AbsoluteFill style={{ width: W, height: H, overflow: "hidden", background: bg }}>
    <GlobalCss />
    {children}
  </AbsoluteFill>
);

export const DemoV3Header: React.FC = () => (
  <V3Scene>
    <HeaderTag text="final · K-08" />
    <AgencyHeader delay={5} />
    <SeriesTitle lines={["KIRAYE", "KI DUKAAN"]} y={240} delay={10} />
    <NumberBadge n="8" delay={15} />
    <GlossyOrb delay={20} />
    <AccentCircle delay={25} />
    <CheckerSticker x={590} y={630} delay={35} />
    <Barcode delay={40} />
  </V3Scene>
);

export const DemoV3Profile: React.FC = () => (
  <V3Scene>
    <HeaderTag text="note 08" />
    <GlossyOrb delay={5} />
    <ParticleField />
    <AccentCircle cx={287} cy={645} delay={10} />
    <CheckerSticker x={590} y={630} delay={25} />
    {/* Instagram profile phone (rotated) — simplified static frame */}
    <Phone x={360} y={1000} w={330} h={640} delay={20} />
  </V3Scene>
);

export const DemoV3Storefront: React.FC = () => (
  <V3Scene bg="#E6E4E1">
    <HeaderTag text="fig. 05" right="ref · K-08" delay={5} />
    <Line y={280} kind="up" delay={10}><span style={{ fontFamily: FONT_SANS, fontSize: 60, fontWeight: 800, color: "#111111" }}>Dukaan kiraye ki ho,</span></Line>
    <Storefront delay={20} />
    <Barcode x={110} y={1218} delay={40} />
  </V3Scene>
);

export const DemoV3Order: React.FC = () => (
  <V3Scene bg="#000000">
    <HeaderTag text="order" color="#FFFFFF" delay={5} />
    <OrderCard y={550} delay={15} />
    <DatabaseCylinder y={1000} delay={25} />
  </V3Scene>
);

export const DemoV3Door: React.FC = () => (
  <V3Scene bg="#E8E6E4">
    <HeaderTag text="final · K-08" delay={5} />
    <CheckerSticker x={627} y={80} delay={5} />
    <Line y={205} kind="fade" delay={10}><span style={{ fontFamily: FONT_SERIF, fontStyle: "italic", fontSize: 34, color: "#555555" }}>aur ab</span></Line>
    <Line y={295} kind="fade" delay={13}><span style={{ fontFamily: FONT_SANS, fontSize: 86, fontWeight: 900, color: "#3A3A3A", filter: "blur(2px)" }}>apni dukaan</span></Line>
    <FollowPill y={260} delay={30} />
    <ApniDoor delay={20} />
    <Barcode x={166} y={1020} delay={40} />
  </V3Scene>
);

export const DemoV3Tiled: React.FC = () => (
  <V3Scene bg="#000000">
    <HeaderTag text="note 08" color="#FFFFFF" delay={5} />
    <GlossyOrb delay={5} />
    <Line y={330} kind="fade" delay={10}><span style={{ fontFamily: FONT_SANS, fontSize: 34, color: "#8C8C8C" }}>Followers</span></Line>
    <TiledWordmark delay={15} />
  </V3Scene>
);

export const DemoEmblem: React.FC = () => (
  <V3Scene bg="#000000">
    <EmblemLockup y={640} delay={10} />
  </V3Scene>
);

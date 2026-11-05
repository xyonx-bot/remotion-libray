// examples.tsx — one demo composition per reusable component.
// `remotion preview src/index.tsx` and click any comp to play it.
import React from "react";
import { AbsoluteFill } from "remotion";
import { GlobalCss, Bg } from "./primitives";
import { C, W, H } from "./theme";
import { StepIndicator, PillBadge, HeadlinePair, SpeechBubble, PriceTag, BlurBgWord, NextButton, RingCircles, ConnectorAnnotation, NotificationCard, DebitCard, PuzzlePair, BagIllustration, IsoShopFloor } from "./components/v2";
import { MoneyStack, Hex, Chip, SealBadge, CommentInput, Phone } from "./components/v1";

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

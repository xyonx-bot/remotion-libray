// index.tsx — registers the demo/example compositions.
// Copy components from src/components and primitives into your own project.
import React from "react";
import { Composition, registerRoot } from "remotion";
import { DemoStepIndicator, DemoSpeechPrice, DemoNotification, DemoPuzzle, DemoV1 } from "./examples";
import { W, H, FPS } from "./theme";

export const RemotionRoot: React.FC = () => (
  <>
    <Composition id="StepIndicator" component={DemoStepIndicator} durationInFrames={150} fps={FPS} width={W} height={H} />
    <Composition id="SpeechAndPrice" component={DemoSpeechPrice} durationInFrames={180} fps={FPS} width={W} height={H} />
    <Composition id="NotificationPhone" component={DemoNotification} durationInFrames={210} fps={FPS} width={W} height={H} />
    <Composition id="Puzzle" component={DemoPuzzle} durationInFrames={180} fps={FPS} width={W} height={H} />
    <Composition id="V1Garage" component={DemoV1} durationInFrames={240} fps={FPS} width={W} height={H} />
  </>
);

export default RemotionRoot;
registerRoot(RemotionRoot);

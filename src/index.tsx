// index.tsx — registers the demo/example compositions.
// Copy components from src/components and primitives into your own project.
import React from "react";
import { Composition, registerRoot } from "remotion";
import { DemoStepIndicator, DemoSpeechPrice, DemoNotification, DemoPuzzle, DemoV1, DemoV3Header, DemoV3Profile, DemoV3Storefront, DemoV3Order, DemoV3Door, DemoV3Tiled, DemoEmblem } from "./examples";
import { W, H, FPS } from "./theme";

export const RemotionRoot: React.FC = () => (
  <>
    <Composition id="StepIndicator" component={DemoStepIndicator} durationInFrames={150} fps={FPS} width={W} height={H} />
    <Composition id="SpeechAndPrice" component={DemoSpeechPrice} durationInFrames={180} fps={FPS} width={W} height={H} />
    <Composition id="NotificationPhone" component={DemoNotification} durationInFrames={210} fps={FPS} width={W} height={H} />
    <Composition id="Puzzle" component={DemoPuzzle} durationInFrames={180} fps={FPS} width={W} height={H} />
    <Composition id="V1Garage" component={DemoV1} durationInFrames={240} fps={FPS} width={W} height={H} />
    <Composition id="V3Header" component={DemoV3Header} durationInFrames={180} fps={FPS} width={W} height={H} />
    <Composition id="V3Profile" component={DemoV3Profile} durationInFrames={180} fps={FPS} width={W} height={H} />
    <Composition id="V3Storefront" component={DemoV3Storefront} durationInFrames={200} fps={FPS} width={W} height={H} />
    <Composition id="V3Order" component={DemoV3Order} durationInFrames={210} fps={FPS} width={W} height={H} />
    <Composition id="V3Door" component={DemoV3Door} durationInFrames={200} fps={FPS} width={W} height={H} />
    <Composition id="V3Tiled" component={DemoV3Tiled} durationInFrames={180} fps={FPS} width={W} height={H} />
    <Composition id="Emblem" component={DemoEmblem} durationInFrames={120} fps={FPS} width={W} height={H} />
  </>
);

export default RemotionRoot;
registerRoot(RemotionRoot);

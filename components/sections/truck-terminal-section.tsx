import {
  truckTerminalBlocks,
  truckTerminalEyebrow,
  truckTerminalHeading,
  truckTerminalIntro,
  truckTerminalVideoPoster,
  truckTerminalVideoSrc,
  truckTerminalVideoTitle,
} from "@/lib/site-content";
import { TerminalSection } from "@/components/sections/terminal-section";

export function TruckTerminalSection() {
  return (
    <TerminalSection
      id="truck-terminal"
      eyebrow={truckTerminalEyebrow}
      heading={truckTerminalHeading}
      intro={truckTerminalIntro}
      blocks={truckTerminalBlocks}
      videoSrc={truckTerminalVideoSrc}
      videoTitle={truckTerminalVideoTitle}
      videoPoster={truckTerminalVideoPoster}
    />
  );
}

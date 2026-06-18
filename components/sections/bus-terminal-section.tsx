import {
  busTerminalBlocks,
  busTerminalEyebrow,
  busTerminalHeading,
  busTerminalIntro,
  busTerminalVideoPoster,
  busTerminalVideoSrc,
  busTerminalVideoTitle,
} from "@/lib/site-content";
import { TerminalSection } from "@/components/sections/terminal-section";

export function BusTerminalSection() {
  return (
    <TerminalSection
      id="bus-terminal"
      eyebrow={busTerminalEyebrow}
      heading={busTerminalHeading}
      intro={busTerminalIntro}
      blocks={busTerminalBlocks}
      videoSrc={busTerminalVideoSrc}
      videoTitle={busTerminalVideoTitle}
      videoPoster={busTerminalVideoPoster}
    />
  );
}

import {
  busTerminalBlocks,
  busTerminalEyebrow,
  busTerminalHeading,
  busTerminalIntro,
  busTerminalVideoId,
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
      videoId={busTerminalVideoId}
      videoTitle={busTerminalVideoTitle}
    />
  );
}

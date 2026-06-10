import {
  busTerminalBlocks,
  busTerminalEyebrow,
  busTerminalHeading,
  busTerminalIntro,
  busTerminalDriveFileId,
  busTerminalVideoPoster,
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
      driveFileId={busTerminalDriveFileId}
      videoTitle={busTerminalVideoTitle}
      videoPoster={busTerminalVideoPoster}
    />
  );
}

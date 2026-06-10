import {
  truckTerminalBlocks,
  truckTerminalEyebrow,
  truckTerminalHeading,
  truckTerminalIntro,
  truckTerminalDriveFileId,
  truckTerminalVideoPoster,
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
      driveFileId={truckTerminalDriveFileId}
      videoTitle={truckTerminalVideoTitle}
      videoPoster={truckTerminalVideoPoster}
    />
  );
}

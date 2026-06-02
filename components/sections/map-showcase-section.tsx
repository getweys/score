import Image from "next/image";
import { mapSectionImage } from "@/lib/site-content";

export function MapShowcaseSection() {
  return (
    <section
      id="m9-map"
      className="relative w-full scroll-mt-20 border-t border-brand-green/15 bg-surface-green"
    >
      <Image
        src={mapSectionImage}
        alt="Karachi–Hyderabad Motorway M-9 route map"
        width={1920}
        height={1080}
        className="block h-auto w-full"
        sizes="100vw"
        priority
      />
    </section>
  );
}

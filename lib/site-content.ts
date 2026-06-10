/** Verbatim homepage copy and asset paths from score.com.pk reference. */

export const topBarTaglineDesktop =
  "SCORE, is a subsidiary of FWO, has been delivering construction and rehabilitation services of Motorway M9.";

export const topBarTaglineMobile = "SCORE, is a subsidiary of FWO";

export const phoneDisplay = "021-37188215";
export const emailDisplay = "info@score.com.pk";

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "About Us", href: "/about" },
  { label: "Our Team", href: "/team" },
  { label: "Financial Statements", href: "/financial" },
  { label: "Contact Us", href: "/contact" },
] as const;

export const heroTitleLine1 = "Connecting People,";
export const heroTitleLine2 = "Empowering Futures";

export const heroLead =
  "SCORE Pvt Ltd, a subsidiary of FWO, has delivered top-tier Motorway construction and rehabilitation services since 2015.";

export const heroCaption = topBarTaglineMobile;

export const heroImage = "/images/10.png";
export const heroVideoSrc = "/videos/15secvideo.mp4";

/** Full-width video showcase (below hero). */
export const mapSectionImage = "/images/map.png";
export const mapSectionYoutubeVideoId = "YNAn4fI7-34";
export const mapSectionYoutubeTitle = "SCORE M-9 Motorway video";

export function mapSectionYoutubeEmbedUrl(autoplay = true) {
  const params = new URLSearchParams({
    autoplay: autoplay ? "1" : "0",
    mute: autoplay ? "1" : "0",
    playsinline: "1",
    rel: "0",
    modestbranding: "1",
    controls: "0",
    fs: "0",
    iv_load_policy: "3",
    disablekb: "1",
  });
  return `https://www.youtube.com/embed/${mapSectionYoutubeVideoId}?${params.toString()}`;
}

export const projectHeading = "Karachi – Hyderabad Motorway (M-9) Project";

export const projectBody =
  "The Karachi – Hyderabad Motorway (M-9) is a Six Lane, 136 KM long Motorway that connects two major cities Karachi & Hyderabad of Sindh province. The project is open for traffic and is the first project in Sindh province of its kind. The project includes the construction of several bridges, underpasses, interchanges, service road, fence and provision of ETTM/ITS facility. It will bring enormous economic benefit to the less developed parts of the country. Hyderabad – Karachi, a four Lane Express Way was converted into six Lane Motorway. Project activities were undertaken on BOT basis for 25 years with an estimated cost of Rs 44.20 Bn. The project was smoothly executed despite being flooded by heavy traffic connecting Karachi, an economic hub of Pakistan, with rest of the country. With construction of M-9 as per standard specifications, travelling time between Karachi and Hyderabad has considerably reduced from 120-150 to 75-90 mins ensuring safety protocols.";

/** Projects section UI (reference layout): eyebrow label. */
export const projectSectionEyebrow = "Projects";

/** Large showcase title beside the eyebrow (reference-style headline). */
export const projectShowcaseHeading =
  "Built on trust, backed by experience, driven by quality — committed to safety and precision for a better journey on M-9.";

/** Short lead under the showcase title. */
export const projectShowcaseLead =
  "SCORE is a team of motorway professionals entrusted with operating and maintaining the Karachi–Hyderabad corridor. We combine FWO-backed engineering, intelligent tolling, and disciplined maintenance to protect commuters and keep Sindh’s first six-lane motorway running at its best — from minor repairs to full rehabilitation.";

export const projectShowcaseHighlights = [
  "Built on trust & reliability",
  "Skilled across build, operate & maintain",
  "Fast response, every kilometre",
] as const;

export const projectShowcaseImage = "/images/1000x800.jpeg";

/** Key M-9 figures for the projects showcase. */
export const projectStats = [
  { value: "136", unit: "KM", label: "Six-lane corridor" },
  { value: "25", unit: "Years", label: "BOT concession" },
  { value: "11", unit: "", label: "Interchanges" },
  { value: "75–90", unit: "Min", label: "Travel time saved" },
] as const;

export const projectReadMoreHref = "https://score.com.pk/about-us/";

export const heroSlides = [
  "/images/14.jpeg",
  "/images/n51-1024x682-1.jpg",
  "/images/n2-1024x682-1.jpg",
] as const;

/** Layby promo video (YouTube embed). */
export const laybyYoutubeVideoId = "AeTv38kW8Lc";
export const laybyYoutubeTitle = "Layby area promotional video";

export function laybyYoutubeEmbedUrl(autoplay = true) {
  const params = new URLSearchParams({
    autoplay: autoplay ? "1" : "0",
    mute: autoplay ? "1" : "0",
    loop: "1",
    playlist: laybyYoutubeVideoId,
    playsinline: "1",
    rel: "0",
    modestbranding: "1",
    controls: "0",
    fs: "0",
    iv_load_policy: "3",
    disablekb: "1",
  });
  return `https://www.youtube.com/embed/${laybyYoutubeVideoId}?${params.toString()}`;
}

export const projectCarouselImages = [
  "/images/1.png",
  "/images/2.png",
  "/images/3.png",
  "/images/4.png",
  "/images/5.png",
  "/images/6.png",
  "/images/7.png",
  "/images/8.png",
  "/images/9.png",
] as const;

export const responsibilitiesHeading = "Our Responsibilities";

export const responsibilitiesEyebrow = "Services";

export const responsibilitiesIntro =
  "SCORE primarily focuses on safe, sustainable highway construction and maintenance, delivering effective, reliable solutions.";

export const mtagBannerImage = "/images/Score-Banner.jpg.jpeg";

export const mtagEyebrow = "Motorway M-Tag";

export const mtagHeading = "No Entry for Vehicles Without M-Tag After June 15";

export const mtagDeadlineBanner =
  "No Entry for Vehicles Without M-Tag on Motorways After June 15, 2026";

export const mtagIntroParagraphs = [
  "No M-Tag, no entry on motorways from June 15, 2026. Get your tag now to avoid fines and delays at toll plazas.",
] as const;

export const mtagHowToHeading = "Get Your M-Tag Today";

export const mtagHowToBody =
  "Visit your nearest Customer Care Centre or Drive-Through Booth with:";

export const mtagRequiredDocuments = [
  "Original CNIC",
  "Vehicle Registration Book or Smart Card",
] as const;

export const mtagBenefitsHeading = "Key Benefits";

export const mtagBenefitsIntro = "";

export const mtagBenefits = [
  "Avoid waiting at toll plazas",
  "Smooth, fast & hassle-free travel",
  "No additional toll tax",
  "Less congestion and pollution",
] as const;

export const mtagNotice = "Maintain sufficient M-Tag balance to avoid penalties at toll plazas.";

export const mtagRechargeHeading = "Recharge Online";

export const mtagRechargeIntro = "";

export const mtagRechargeOptions = [
  "One Network",
  "JazzCash",
  "EasyPaisa",
  "UPaisa",
] as const;

export const mtagRechargePartners = [
  { name: "One Network", logo: "/images/one-network-logo.png" },
  { name: "JazzCash", logo: "/images/jazzcash-logo.png" },
  { name: "EasyPaisa", logo: "/images/easypaisa-logo.png" },
  { name: "UPaisa", logo: "/images/Upaisa-Logo.png" },
] as const;

export const mtagHelplineText = "For help and registration guidance:";

export const servicesPageHeroImage = "/images/14.jpeg";

export const weighStationEyebrow = "Smart Infrastructure";

export const weighStationHeading = "Karachi Smart Weigh Station";

export const weighStationIntro =
  "SCORE, FWO has transformed the Karachi Weigh Station into a modern five-lane smart facility. Previously operating with only two lanes, the weigh station faced severe congestion, long queues, and slow processing on a daily basis.";

export const weighStationParagraphs = [
  "Using advanced weigh-in-motion technology, vehicles are screened and processed within seconds without unnecessary delays.",
  "The upgraded system enables instant axle load detection, automated fine processing, and seamless M-Tag integration.",
  "With the complete process finalized in approximately 30 seconds, the facility significantly reduces congestion and improves transparency.",
] as const;

export const weighStationTagline =
  "A smarter system delivering faster mobility, efficient traffic flow, and stronger infrastructure management.";

export const weighStationHighlights = [
  {
    label: "5 Lanes",
    description: "Upgraded from two lanes to a modern five-lane smart facility",
  },
  {
    label: "Weigh-in-Motion",
    description: "Advanced screening with seconds-level processing",
  },
  {
    label: "M-Tag Ready",
    description: "Instant axle detection, automated fines, and seamless integration",
  },
  {
    label: "~30 Seconds",
    description: "End-to-end process time for faster, transparent flow",
  },
] as const;

export const weighStationVideoSrc = "/images/video.mp4";

export interface ResponsibilityCard {
  iconSrc: string;
  number: string;
  title: string;
  body: string;
}

export const responsibilityCards: ResponsibilityCard[] = [
  {
    iconSrc: "/images/Icon-3-01-1024x1024.png",
    number: "1",
    title: "Tolling Operation",
    body: "The State-of-the-Art Tolling System features Prepaid M-Tag, Video Tolling, and ETTM for seamless and efficient travel. CCTV Monitoring ensures security and real-time traffic oversight.",
  },
  {
    iconSrc: "/images/Icon-1-01-1024x1024.png",
    number: "2",
    title: "Routine Repair Work",
    body: "Under the provisions of the CA, SCORE is required to design, construct, operate and maintain the BOT Project for the concession period. SCORE, at its own expenses undertake repair / maintenance of BOT Project.",
  },
  {
    iconSrc: "/images/Icon-2-01-1024x1024.png",
    number: "3",
    title: "Row Management",
    body: "Coordination with civil administrations enables timely damage reporting, traffic management, and accident coverage. Advanced tolling systems help safeguard assets, prevent unauthorized activities, and support anti-encroachment efforts.",
  },
  {
    iconSrc: "/images/Icon-4-01-1024x1024.png",
    number: "4",
    title: "Plantation & Road Cleaning",
    body: "New plantation, trimming, watering, and hoeing enhance roadside greenery and aesthetics. Median cleaning, road cleanliness, garbage collection, and rainwater removal ensure a tidy and safe environment.",
  },
];

export const teamHeading = "Our Team";

export const teamEyebrow = "Leadership";

export const teamSubheading = "Meet team of SCORE";

export interface TeamMember {
  imageSrc: string;
  name: string;
  role: string;
}

export const boardOfDirectors: TeamMember[] = [
  {
    imageSrc: "/images/DG-FWO-Web-Icon-Image-1-1.webp",
    name: "Engineer Abdul Sami",
    role: "Chairman",
  },
  {
    imageSrc: "/images/Adnan-Akhtar-Ali.jpg",
    name: "Engineer Adnan Akhtar Ali",
    role: "CEO/Director",
  },
  {
    imageSrc: "/images/Shahzad-Anjum-Ansari.jpg",
    name: "Engineer Shahzad Anjum Ansari",
    role: "Director",
  },
  {
    imageSrc: "/images/Sohail-Safdar.jpg",
    name: "Engineer Sohail Safdar",
    role: "Independent Director",
  },
];

export const companyManagement: TeamMember[] = [
  {
    imageSrc: "/images/Adnan-Akhtar-Ali.jpg",
    name: "Engineer Adnan Akhtar Ali",
    role: "CEO/Director",
  },
  {
    imageSrc: "/images/Untitled-1-min.jpg",
    name: "Khalid Baig",
    role: "Chief Operating Officer (COO)",
  },
  {
    imageSrc: "/images/CFO-Syed-Hasan-Atif.jpg",
    name: "Syed Hasan Atif",
    role: "Chief Financial Officer (CFO)",
  },
  {
    imageSrc: "/images/Muhammad-Adil.jpg",
    name: "Muhammad Adil",
    role: "Company Secretary (CS)",
  },
];

/** All unique members for homepage one-grid section */
export const teamMembers: TeamMember[] = [
  ...boardOfDirectors,
  ...companyManagement.filter((m) => !boardOfDirectors.some((b) => b.name === m.name)),
];

export const teamPageHeroImage = "/images/14.jpeg";

export const aboutHeroImage = "/images/14.jpeg";

export const aboutHeroSubtitle =
  "Construction, operation & maintenance of the Karachi–Hyderabad Motorway (M-9)";

export const aboutEyebrow = "About Us";

export const aboutHeading = "We Are Leading International Company In The World";

export const aboutParagraphs = [
  "Superhighway Construction Operation & Rehabilitation Engineering (SCORE Pvt Ltd) was incorporated as a private limited company as per SECP regulations in 2015. SCORE is a Special Project Company (SPC) with registered office based in Karachi, Sindh and is wholly owned subsidiary of Frontier Works Organization (FWO). The company is formed for the purpose of construction, operation and maintenance of Karachi-Hyderabad Motorway (M-9), which connects Karachi to Hyderabad via 6 lane 136 KM road having 11 interchanges.",
  "The Project was awarded to SCORE Pvt Ltd in year 2015 under the Public Private Partnership (PPP) regime on BOT basis. Sponsors of the company is Frontier Works Organization (FWO). The company has entered into a concession agreement for a period of 25 years with National Highway Authority (NHA). SCORE (Pvt.) Ltd. will operate and manage this road till the year 2040 and then will be transferred to NHA. During this period, besides routine maintenance, two asphaltic overlays will be provided after 10- and 20- years intervals respectively.",
] as const;

export const aboutServicesCtaLabel = "Our Services";
export const aboutServicesCtaHref = "/services";

export const aboutPillarsEyebrow = "Our purpose";
export const aboutPillarsHeading = "Objective, vision & mission";

export interface AboutPillar {
  title: string;
  body: string;
  icon: "objective" | "vision" | "mission";
}

export const aboutPillars: AboutPillar[] = [
  {
    icon: "objective",
    title: "Objective",
    body: "To ensure safe, efficient, and reliable connectivity between Karachi and Hyderabad through top-tier motorway construction and management.",
  },
  {
    icon: "vision",
    title: "Vision",
    body: "To set new benchmarks in infrastructure excellence, fostering sustainable growth and enhancing national connectivity.",
  },
  {
    icon: "mission",
    title: "Mission",
    body: "To operate and maintain the M-9 Motorway with the highest standards of safety, service, and sustainability, contributing to Pakistan's infrastructure development.",
  },
];

export const ceoMessageParagraphs = [
  "Superhighway Construction Operation and Rehabilitation Engineering (SCORE) Pvt Ltd has been entrusted with the vital task of transforming and maintaining one of Pakistan’s most significant transportation corridors – The M9 Motorway.",
  "In line with our commitment to advancing the country’s infrastructure, SCORE embarked on the monumental task of converting the Superhighway into the M-9 Motorway. This project was undertaken as part of a long-term concession agreement, and is aimed to enhancing connectivity, improving safety standards, and facilitating smooth transit for commuters between Karachi and Hyderabad. The role in maintaining and operating this key infrastructure to ensuring that it serves as a reliable artery for the country’s economic growth and mobility.",
  "The intelligent tolling system (M-Tag) is an RFID-based system designed to streamline toll payments, reduce traffic congestion, and enhance efficiency on Motorway M9. As part of this initiative, all vehicles using the M9 will be required to have an M-Tag for smooth and hassle-free passage and contribute towards the overall facilitation for commuters.",
  "At SCORE, we understand that this project is not just about building and maintaining roads; it is about enabling progress, supporting communities, and fostering national development.",
] as const;

export const ceoMessageEyebrow = "Leadership";

export const ceoMessageHeading = "CEO Message";

export const ceoMessageSignature = "-Adnan Akhter Ali";

export const contactHeading = "Contact Us";

export const contactEyebrow = "Get in touch";

export const contactIntro =
  "Your input helps us enhance our services and create a better experience for everyone.";

export const contactAddress =
  "Zenith Plaza 10th Floor, Precinct – 1, Near Tauheed Square, Bahria Town Karachi";

export const contactEmergencyNumber = "1313";

export const contactFax = "021-37188216";

export const contactOfficeHours = "09:00 AM to 06:00 PM";

/** Google Maps embed — Zenith Plaza / SCORE office, Bahria Town Karachi */
export const contactMapEmbedUrl =
  "https://maps.google.com/maps?q=Zenith+Plaza+FWO+SCORE+Office+Bahria+Town+Karachi&z=14&output=embed";

export const contactPageHeroImage = "/images/14.jpeg";

export interface ContactDetailItem {
  label: string;
  value: string;
  href?: string;
}

export const contactDetails: ContactDetailItem[] = [
  { label: "Address", value: contactAddress },
  { label: "Phone", value: phoneDisplay, href: `tel:${phoneDisplay.replace(/-/g, "")}` },
  { label: "Emergency Number", value: contactEmergencyNumber, href: "tel:1313" },
  { label: "Fax", value: contactFax, href: `tel:${contactFax.replace(/-/g, "")}` },
  { label: "Email", value: emailDisplay, href: `mailto:${emailDisplay}` },
  { label: "Office Timing", value: contactOfficeHours },
];

export const financialPageHeroImage = "/images/14.jpeg";
export const financialViewMoreHref = "/financial";

export const financialHeading = "Financial Statements";

export const financialEyebrow = "Reports";

export const financialIntro =
  "Audited financial statements and disclosures for shareholders and the public.";

export interface FinancialRow {
  title: string;
  downloadHref: string;
  previewHref: string;
}

export const financialRows: FinancialRow[] = [
  {
    title: "Company’s Financial Report – FY 2024-25",
    downloadHref:
      "https://score.com.pk/wp-content/uploads/2026/03/Audited-Account-FY-2024-25-for-web-site.pdf",
    previewHref:
      "https://score.com.pk/wp-content/uploads/2026/03/Audited-Account-FY-2024-25-for-web-site.pdf",
  },
  {
    title: "Company’s Financial Report – 30 June 2024",
    downloadHref:
      "https://score.com.pk/wp-content/uploads/2025/04/Signed-SCORE-Financial-Statement-\u2013-30-June-2024.pdf",
    previewHref:
      "https://score.com.pk/wp-content/uploads/2025/04/Signed-SCORE-Financial-Statement-\u2013-30-June-2024.pdf",
  },
  {
    title: "Company’s Financial Report – 30 June 2023",
    downloadHref:
      "https://score.com.pk/wp-content/uploads/2025/04/Signed-SCORE-Financial-Statement-30-June-2023.pdf",
    previewHref:
      "https://score.com.pk/wp-content/uploads/2025/04/Signed-SCORE-Financial-Statement-30-June-2023.pdf",
  },
  {
    title: "Company’s Financial Report – 30 June 2022",
    downloadHref:
      "https://score.com.pk/wp-content/uploads/2025/04/Signed-SCORE-Financial-Statement-30-June-2022.pdf",
    previewHref:
      "https://score.com.pk/wp-content/uploads/2025/04/Signed-SCORE-Financial-Statement-30-June-2022.pdf",
  },
  {
    title: "Company’s Financial Report – 30 June 2021",
    downloadHref:
      "https://score.com.pk/wp-content/uploads/2025/04/Signed-SCORE-Financial-Statement-30-June-2021.pdf",
    previewHref:
      "https://score.com.pk/wp-content/uploads/2025/04/Signed-SCORE-Financial-Statement-30-June-2021.pdf",
  },
];

export const laybyEyebrow = "Commercial";

export const laybyHeading = "Layby - Space available for Rent";

export const laybyBody =
  "Looking for a strategic location for your business? Our layby areas are situated along the key Location at M9 Motorway. Golden opportunities are available for businesses and investors. Perfect for retail, fuel stations, rest stops, or service centers, these spots ensure high visibility and foot traffic from daily travelers.";

/** Truck Terminal (M-9 commercial opportunity). */
export const truckTerminalEyebrow = "Commercial Opportunity";
export const truckTerminalHeading = "Truck Terminal on M-9 Motorway";
export const truckTerminalIntro =
  "SCORE, in coordination with NHA, invites contractors, investors, and logistics operators to establish modern truck terminal facilities along the M-9 — one of Pakistan's busiest cargo corridors.";
export const truckTerminalBlocks = [
  {
    heading: "Site & Lease Terms",
    items: [
      "7 premium sites — 3 northbound, 4 southbound",
      "5–7 acres per site for heavy vehicle operations",
      "Land leased by SCORE on a per-acre monthly rental basis",
      "Development, operations, and management by the selected partner",
    ],
  },
  {
    heading: "Required Facilities",
    items: [
      "Digital entry and access control for fleet tracking",
      "Dedicated HTV parking with full CCTV coverage",
      "On-site workshop, driver rest areas, and AC mosques",
      "Restaurants, washrooms, and landscaped site beautification",
    ],
  },
  {
    heading: "Green Construction",
    items: [
      "No permanent concrete structures on allocated sites",
      "Prefabricated materials and modular layouts only",
    ],
  },
] as const;
export const truckTerminalVideoId = "e86k39nAt8A";
export const truckTerminalVideoTitle = "M-9 Truck Terminal promotional video";

/** Score Bus Terminal (Karachi intercity transport hub). */
export const busTerminalEyebrow = "Public Infrastructure";
export const busTerminalHeading = "SCORE Bus Terminal";
export const busTerminalIntro =
  "Approved by the Sindh Government with FWO, the Score Bus Terminal on M-9 helps bridge Karachi's intercity transport gap — designed to serve demand beyond the city's existing legal bus facility.";
export const busTerminalBlocks = [
  {
    heading: "Location & Layout",
    items: [
      "4.4 km from Al-Asif Square on the M-9 Motorway",
      "Landscaped arrival hub with AC lounges, retail, and baggage belts",
      "Departure zone with ticketing, information desk, and public parking",
      "ATMs, prayer area, clean restrooms, and obstacle-free passenger paths",
    ],
  },
  {
    heading: "Sustainability",
    items: [
      "100% solar-powered lighting and digital systems",
      "Electric bus charging stations for Sindh's Red Electric Buses",
    ],
  },
  {
    heading: "Passenger & Operations",
    items: [
      "Food court and family zone with seating and amenities",
      "Cargo warehouse with 24/7 surveillance and admin block",
      "Bus maintenance workshop, first-aid centre, and driver facilities",
      "Mosque and dedicated driver restrooms near the exit gate",
    ],
  },
] as const;
export const busTerminalVideoId = "ovlZsyPB8qY";
export const busTerminalVideoTitle = "Score Bus Terminal promotional video";

export const footerLinks = [
  { label: "Company’s Policies", href: "https://score.com.pk/companys-policies/" },
  { label: "Privacy Policy", href: "https://score.com.pk/privacy-policy/" },
  { label: "Terms & Conditions", href: "https://score.com.pk/terms-of-use/" },
] as const;

export const footerTagline =
  "Superhighway Construction Operation and Rehabilitation Engineering — M-9 Motorway.";

export const footerCopyright = "© 2025 Score.com.pk. All rights reserved.";
export const footerCreditLabel = "Developed By ";
export const footerCreditName = "Getweys";
export const footerCreditHref = "https://www.getweys.com/";

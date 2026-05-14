/** Verbatim homepage copy and asset paths from score.com.pk reference. */

export const topBarTaglineDesktop =
  "SCORE, is a subsidiary of FWO, has been delivering construction and rehabilitation services of Motorway M9.";

export const topBarTaglineMobile = "SCORE, is a subsidiary of FWO";

export const phoneDisplay = "021-37188215";
export const emailDisplay = "info@score.com.pk";

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Our Services", href: "#services" },
  { label: "About Us", href: "#mission" },
  { label: "Our Team", href: "#team" },
  { label: "Financial Statements", href: "#financial" },
  { label: "Contact Us", href: "#contact" },
] as const;

export const heroTitleLine1 = "Connecting People,";
export const heroTitleLine2 = "Empowering Futures";

export const heroLead =
  "SCORE Pvt Ltd, a subsidiary of FWO, has delivered top-tier Motorway construction and rehabilitation services since 2015.";

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

export const projectReadMoreHref = "https://score.com.pk/about-us/";

export const heroSlides = [
  "/images/14.jpeg",
  "/images/n51-1024x682-1.jpg",
  "/images/n2-1024x682-1.jpg",
] as const;

/** Homepage promo clip (plays when scrolled into view). */
export const promoVideoFilename = "WhatsApp Video 2026-05-14 at 6.47.07 PM.mp4";
export const promoVideoSrc = `/images/${encodeURIComponent(promoVideoFilename)}`;

export const projectCarouselImages = [
  "/images/1.png",
  "/images/2.png",
  "/images/3.png",
  "/images/4.png",
  "/images/5.jpeg",
  "/images/6.jpeg",
  "/images/7.jpeg",
] as const;

export const responsibilitiesHeading = "Our Responsibilities";

export const responsibilitiesEyebrow = "Services";

export const responsibilitiesIntro =
  "SCORE primarily focuses on safe, sustainable highway construction and maintenance, delivering effective, reliable solutions.";

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

export const teamMembers: TeamMember[] = [
  {
    imageSrc: "/images/DG-FWO-Web-Icon-Image-1-1.webp",
    name: "Engineer Abdul Sami ",
    role: "Chairman",
  },
  {
    imageSrc: "/images/Adnan-Akhtar-Ali.jpg",
    name: "Engineer Adnan Akhtar Ali ",
    role: "CEO/Director",
  },
  {
    imageSrc: "/images/Shahzad-Anjum-Ansari.jpg",
    name: "Engineer Shahzad Anjum Ansari ",
    role: "Director",
  },
  {
    imageSrc: "/images/Sohail-Safdar.jpg",
    name: "Engineer Sohail Safdar ",
    role: "Independent Director",
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
    name: "Muhammad Adil ",
    role: "Company Secretary (CS)/DyCFO",
  },
];

export const missionParagraphs = [
  "Superhighway Construction Operation and Rehabilitation Engineering (SCORE) Pvt Ltd has been entrusted with the vital task of transforming and maintaining one of Pakistan’s most significant transportation corridors – The M9 Motorway.",
  "In line with our commitment to advancing the country’s infrastructure, SCORE embarked on the monumental task of converting the Superhighway into the M-9 Motorway. This project was undertaken as part of a long-term concession agreement, and is aimed to enhancing connectivity, improving safety standards, and facilitating smooth transit for commuters between Karachi and Hyderabad. The role in maintaining and operating this key infrastructure to ensuring that it serves as a reliable artery for the country’s economic growth and mobility.",
  "The intelligent tolling system (M-Tag) is an RFID-based system designed to streamline toll payments, reduce traffic congestion, and enhance efficiency on Motorway M9. As part of this initiative, all vehicles using the M9 will be required to have an M-Tag for smooth and hassle-free passage and contribute towards the overall facilitation for commuters.",
  "At SCORE, we understand that this project is not just about building and maintaining roads; it is about enabling progress, supporting communities, and fostering national development.",
] as const;

export const missionEyebrow = "Mission";

export const missionHeading = "Our Mission";

export const missionIntro =
  "Building and maintaining the corridor between Karachi and Hyderabad with engineering discipline, safety, and long-term stewardship.";

export const missionSignature = "-Adnan Akhter Ali";

export const contactHeading = "Contact Us";

export const contactEyebrow = "Get in touch";

export const contactIntro =
  "Your input helps us enhance our services and create a better experience for everyone.";

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

export const laybyHeading = "Layby - Space available for Rent";
export const laybyBody =
  "Looking for a strategic location for your business? Our layby areas are situated along the key Location at M9 Motorway. Golden opportunities are available for businesses and investors. Perfect for retail, fuel stations, rest stops, or service centers, these spots ensure high visibility and foot traffic from daily travelers.";

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

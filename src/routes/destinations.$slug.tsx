import { useEffect, useRef, useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteLayout, Reveal } from "@/components/site/SiteLayout";
import { Globe } from "lucide-react";

interface DestInfo {
  name: string;
  tagline: string;
  region: string;
  heroImage: string;
  overviewHeading: string;
  overview: string;
  costOfStudy: string;
  costOfStudyShort: string;
  costOfLiving: string;
  costOfLivingShort: string;
  rankingShort: string;
  workRightsShort: string;
  universities: { name: string; badge: string }[];
  visaOptions: { name: string; description: string }[];
  highlights: string[];
  funFact: string;
  funFactLabel: string;
}

const DESTINATION_DATA: Record<string, DestInfo> = {
  "united-kingdom": {
    name: "United Kingdom",
    tagline:
      "World-class education in the heart of history. Your journey to academic excellence begins here.",
    region: "EUROPEAN EXCELLENCE",
    heroImage:
      "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=2400&q=80",
    overviewHeading: "Where tradition meets future innovation",
    overview:
      "The United Kingdom is home to some of the world's oldest and most prestigious universities. From the historic spires of Oxford to the cutting-edge labs of Imperial College London, students benefit from a global perspective and a two-year post-study work visa.",
    costOfStudy: "£10,000 – £38,000 per year",
    costOfStudyShort: "£10k — £38k",
    costOfLiving: "£800 – £1,300 per month",
    costOfLivingShort: "£800 — £1,300",
    rankingShort: "8 Top 100",
    workRightsShort: "2 Year Post-Grad",
    universities: [
      { name: "University of Birmingham", badge: "RUSSELL GROUP" },
      { name: "Coventry University", badge: "MODERN" },
      { name: "Teesside University", badge: "DIGITAL" },
      { name: "University of Greenwich", badge: "LONDON" },
      { name: "Northumbria University", badge: "NEWCASTLE" },
      { name: "University of Hertfordshire", badge: "RISING" },
      { name: "University of Sunderland", badge: "MODERN" },
      { name: "University of East London", badge: "LONDON" },
      { name: "Middlesex University", badge: "LONDON" },
      { name: "Queen Mary University of London", badge: "RUSSELL GROUP" },
      { name: "Cardiff University", badge: "RUSSELL GROUP" },
      { name: "University of Liverpool", badge: "RUSSELL GROUP" },
      { name: "University of Leeds", badge: "RUSSELL GROUP" },
      { name: "University of Sheffield", badge: "RUSSELL GROUP" },
      { name: "BPP University", badge: "SPECIALIST" },
      { name: "Anglia Ruskin University", badge: "MODERN" },
      { name: "Cardiff Metropolitan University", badge: "MODERN" },
      { name: "University of Chester", badge: "MODERN" },
      { name: "De Montfort University", badge: "RISING" },
      { name: "University of East Anglia", badge: "TOP 25" },
      { name: "Edinburgh Napier University", badge: "MODERN" },
      { name: "Keele University", badge: "RISING" },
      { name: "University of Law", badge: "SPECIALIST" },
      { name: "Newcastle University", badge: "RUSSELL GROUP" },
      { name: "Sheffield Hallam University", badge: "MODERN" },
    ],
    visaOptions: [
      {
        name: "Graduate Route (2 Years)",
        description: "Stay in the UK for at least 2 years after completing your course.",
      },
      {
        name: "Skilled Worker Visa",
        description: "For long-term employment with a licensed employer.",
      },
      { name: "Global Talent Visa", description: "For leaders in academia, research, or arts." },
    ],
    highlights: [
      "Access to the world's top 3 universities",
      "Central location for European travel",
      "Strong job market for STEM graduates",
      "Diverse, multicultural society",
    ],
    funFactLabel: "Historical Insight",
    funFact:
      "The University of Oxford is the oldest university in the English-speaking world, with teaching dating back to 1096.",
  },
  canada: {
    name: "Canada",
    tagline:
      "Your gateway to North American success — welcoming, world-class, and full of opportunity.",
    region: "NORTH AMERICAN EXCELLENCE",
    heroImage:
      "https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=2400&q=80",
    overviewHeading: "Where opportunity meets natural wonder",
    overview:
      "Canada is known for its welcoming immigration policies, high-quality education system, and stunning landscapes. With multiple pathways to permanent residence, Canada is a top choice for international students seeking long-term success.",
    costOfStudy: "CAD 15,000 – CAD 35,000 per year",
    costOfStudyShort: "C$15k — C$35k",
    costOfLiving: "CAD 1,000 – CAD 1,800 per month",
    costOfLivingShort: "C$1k — C$1.8k",
    rankingShort: "5 Top 100",
    workRightsShort: "Up to 3 Years PGWP",
    universities: [
      { name: "University of Toronto", badge: "TOP 25" },
      { name: "University of British Columbia", badge: "TOP 40" },
      { name: "McGill University", badge: "TOP 50" },
      { name: "University of Waterloo", badge: "TECH LEADER" },
      { name: "University of Alberta", badge: "TOP 100" },
      { name: "McMaster University", badge: "TOP 100" },
    ],
    visaOptions: [
      {
        name: "Post-Graduation Work Permit",
        description: "Gain up to 3 years of Canadian work experience after graduation.",
      },
      {
        name: "Express Entry (PR)",
        description: "The primary system for skilled workers seeking permanent residence.",
      },
      {
        name: "Provincial Nominee Program",
        description: "Province-specific pathways for skilled graduates and workers.",
      },
    ],
    highlights: [
      "Clear pathway to permanent residence",
      "Affordable tuition compared to US/UK",
      "Safe & multicultural cities",
      "Public healthcare system",
    ],
    funFactLabel: "Geographic Wonder",
    funFact:
      "Canada has the longest coastline in the world at over 202,080 kilometers, bordering three oceans.",
  },
  australia: {
    name: "Australia",
    tagline:
      "Study, work, and thrive down under — world-class learning paired with an unmatched lifestyle.",
    region: "OCEANIA EXCELLENCE",
    heroImage:
      "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?auto=format&fit=crop&w=2400&q=80",
    overviewHeading: "Where global education meets a sunlit lifestyle",
    overview:
      "Australia offers a world-class education system paired with a relaxed, high-quality lifestyle. Globally ranked universities, strong post-study work rights, and a clear pathway to permanent residency make it a destination of choice.",
    costOfStudy: "AUD 20,000 – AUD 45,000 per year",
    costOfStudyShort: "A$20k — A$45k",
    costOfLiving: "AUD 1,200 – AUD 2,000 per month",
    costOfLivingShort: "A$1.2k — A$2k",
    rankingShort: "7 Top 100",
    workRightsShort: "Up to 4 Years",
    universities: [
      { name: "University of Melbourne", badge: "TOP 15" },
      { name: "University of Sydney", badge: "TOP 20" },
      { name: "Australian National University", badge: "TOP 30" },
      { name: "University of Queensland", badge: "TOP 45" },
      { name: "Monash University", badge: "TOP 50" },
      { name: "UNSW Sydney", badge: "TOP 20" },
    ],
    visaOptions: [
      {
        name: "Student Visa (Subclass 500)",
        description: "The primary route to study at an Australian institution.",
      },
      {
        name: "Temporary Graduate Visa (485)",
        description: "Live and work in Australia after graduating.",
      },
      {
        name: "Skilled Independent Visa (189)",
        description: "Permanent residence for skilled workers.",
      },
    ],
    highlights: [
      "Post-study work rights up to 4 years",
      "Pathway to permanent residency",
      "High standard of living",
      "Multicultural & welcoming society",
    ],
    funFactLabel: "Natural Wonder",
    funFact:
      "Australia is home to the Great Barrier Reef, the world's largest coral reef system, visible from space.",
  },
  "united-states": {
    name: "United States",
    tagline:
      "The land of academic excellence and opportunity — home to the world's most innovative universities.",
    region: "NORTH AMERICAN EXCELLENCE",
    heroImage:
      "https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?auto=format&fit=crop&w=2400&q=80",
    overviewHeading: "Where ambition meets infinite possibility",
    overview:
      "The United States offers an unmatched diversity of academic programs at world-renowned universities like Harvard, MIT, and Stanford. Known for research, innovation, and entrepreneurship, the US attracts more international students than any other country.",
    costOfStudy: "$20,000 – $60,000 per year",
    costOfStudyShort: "$20k — $60k",
    costOfLiving: "$1,200 – $2,500 per month",
    costOfLivingShort: "$1.2k — $2.5k",
    rankingShort: "30+ Top 100",
    workRightsShort: "Up to 3 Years OPT",
    universities: [
      { name: "Harvard University", badge: "TOP 1%" },
      { name: "Massachusetts Institute of Technology", badge: "TOP 1%" },
      { name: "Stanford University", badge: "TOP 1%" },
      { name: "Yale University", badge: "IVY LEAGUE" },
      { name: "Princeton University", badge: "IVY LEAGUE" },
      { name: "UC Berkeley", badge: "TOP 10" },
    ],
    visaOptions: [
      {
        name: "F-1 Student Visa",
        description: "The primary non-immigrant visa for academic study.",
      },
      { name: "OPT & STEM OPT", description: "Up to 3 years of post-study work in your field." },
      {
        name: "H-1B Work Visa",
        description: "Specialty occupation work visa for long-term employment.",
      },
    ],
    highlights: [
      "Top-ranked universities worldwide",
      "Flexible academic system",
      "Extensive research opportunities",
      "Innovation & entrepreneurship hub",
    ],
    funFactLabel: "Academic Scale",
    funFact:
      "The US is home to over 4,000 degree-granting institutions, more than any other country in the world.",
  },
  germany: {
    name: "Germany",
    tagline:
      "Tuition-free excellence in the heart of Europe — world-class engineering and global career access.",
    region: "EUROPEAN EXCELLENCE",
    heroImage:
      "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=2400&q=80",
    overviewHeading: "Where rigorous tradition meets industrial innovation",
    overview:
      "Germany is renowned for its tuition-free public university system, world-leading engineering programs, and a thriving economy. Many graduate programs are taught in English, with strong pathways into European careers.",
    costOfStudy: "€150 – €500 per semester (public)",
    costOfStudyShort: "€150 — €500/sem",
    costOfLiving: "€800 – €1,200 per month",
    costOfLivingShort: "€800 — €1.2k",
    rankingShort: "8 Top 100",
    workRightsShort: "18 Months Job Seeker",
    universities: [
      { name: "Technical University of Munich", badge: "TOP 40" },
      { name: "LMU Munich", badge: "TOP 60" },
      { name: "Heidelberg University", badge: "TOP 65" },
      { name: "Free University of Berlin", badge: "TOP 100" },
      { name: "RWTH Aachen University", badge: "ENGINEERING" },
      { name: "Humboldt University", badge: "TOP 130" },
    ],
    visaOptions: [
      {
        name: "Student Visa",
        description: "Primary visa to study at a recognized German institution.",
      },
      {
        name: "Job Seeker Visa",
        description: "Stay 18 months after graduation to find skilled employment.",
      },
      { name: "EU Blue Card", description: "Long-term residence for highly qualified workers." },
    ],
    highlights: [
      "Tuition-free public universities",
      "Strong engineering & tech programs",
      "Center of European travel",
      "Thriving job market",
    ],
    funFactLabel: "Academic Access",
    funFact:
      "Germany has over 400 public universities, most charging minimal administrative fees of under €500 per semester.",
  },
  ireland: {
    name: "Ireland",
    tagline:
      "EU access, global tech hub, and Celtic charm — your English-speaking gateway to Europe.",
    region: "EUROPEAN EXCELLENCE",
    heroImage:
      "https://images.unsplash.com/photo-1564959130747-897fb406b9af?auto=format&fit=crop&w=2400&q=80",
    overviewHeading: "Where global tech meets Celtic heritage",
    overview:
      "Ireland is a vibrant English-speaking EU country with a booming tech and pharmaceutical industry. Home to the European headquarters of Google, Apple, and Meta, it offers exceptional graduate career opportunities.",
    costOfStudy: "€10,000 – €25,000 per year",
    costOfStudyShort: "€10k — €25k",
    costOfLiving: "€900 – €1,500 per month",
    costOfLivingShort: "€900 — €1.5k",
    rankingShort: "2 Top 100",
    workRightsShort: "2 Year Graduate Stay",
    universities: [
      { name: "Trinity College Dublin", badge: "TOP 90" },
      { name: "University College Dublin", badge: "TOP 130" },
      { name: "University of Galway", badge: "TOP 300" },
      { name: "University College Cork", badge: "TOP 300" },
      { name: "Dublin City University", badge: "RISING" },
      { name: "University of Limerick", badge: "RISING" },
    ],
    visaOptions: [
      {
        name: "Student Visa",
        description: "Primary route for non-EU students at recognized institutions.",
      },
      {
        name: "Stamp 1G (Graduate Scheme)",
        description: "Stay up to 2 years after graduation to seek work.",
      },
      {
        name: "Critical Skills Permit",
        description: "Fast-track to long-term residency for skilled roles.",
      },
    ],
    highlights: [
      "English-speaking EU country",
      "Home to major tech HQs",
      "Post-study work up to 2 years",
      "Access to EU travel & work",
    ],
    funFactLabel: "Heritage Note",
    funFact:
      "Ireland has more than 30,000 castles and ruins, with Dublin Castle dating all the way back to 1204.",
  },
  europe: {
    name: "Europe",
    tagline:
      "Unlock endless opportunities across 27 countries — study in the heart of global innovation and culture.",
    region: "PAN-EUROPEAN EXCELLENCE",
    heroImage:
      "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=2400&q=80",
    overviewHeading: "Where diversity meets world-class education",
    overview:
      "Europe offers a rich tapestry of cultures, languages, and world-renowned universities. From tuition-free programs in Germany and the Nordic countries to prestigious institutions in France, Switzerland, and the Netherlands, Europe provides unparalleled access to quality education at affordable costs. With the Schengen visa, students can travel freely across member states, making it a truly borderless study destination.",
    costOfStudy: "€0 – €20,000 per year (varies by country)",
    costOfStudyShort: "€0 — €20k",
    costOfLiving: "€700 – €1,500 per month",
    costOfLivingShort: "€700 — €1.5k",
    rankingShort: "40+ Top 200",
    workRightsShort: "Varies by Country",
    universities: [
      { name: "University of Copenhagen", badge: "TOP 80" },
      { name: "ETH Zurich", badge: "TOP 10" },
      { name: "University of Amsterdam", badge: "TOP 60" },
      { name: "Sorbonne University", badge: "TOP 60" },
      { name: "University of Helsinki", badge: "TOP 100" },
      { name: "University of Vienna", badge: "TOP 150" },
    ],
    visaOptions: [
      {
        name: "Schengen Student Visa",
        description: "Study in most EU countries and travel freely across 27 member states.",
      },
      {
        name: "Post-Study Work Permit",
        description: "Many EU countries offer 6–24 months of post-graduation work rights.",
      },
      {
        name: "EU Blue Card",
        description: "Long-term residence for highly skilled professionals across the EU.",
      },
    ],
    highlights: [
      "Tuition-free or low-cost education in many countries",
      "Schengen visa allows travel across 27 countries",
      "Multicultural environment with diverse languages",
      "Strong social welfare and student benefits",
    ],
    funFactLabel: "Cultural Diversity",
    funFact:
      "Europe has over 200 languages spoken across its 44 countries, making it one of the most linguistically diverse regions in the world.",
  },
  dubai: {
    name: "Dubai",
    tagline:
      "Study in the city of the future — where world-class education meets limitless ambition.",
    region: "MIDDLE EAST EXCELLENCE",
    heroImage:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=2400&q=80",
    overviewHeading: "Where innovation meets global opportunity",
    overview:
      "Dubai has rapidly emerged as a premier education destination in the Middle East. Home to international branch campuses of top global universities, a tax-free lifestyle, and a thriving job market, Dubai offers students a unique blend of academic excellence and career opportunity. With its state-of-the-art infrastructure and safe environment, it is an ideal destination for international students.",
    costOfStudy: "AED 37,500 – AED 120,000 per year",
    costOfStudyShort: "AED 37.5k — AED 120k",
    costOfLiving: "AED 3,000 – AED 6,000 per month",
    costOfLivingShort: "AED 3k — AED 6k",
    rankingShort: "5 Top 500",
    workRightsShort: "2 Year Job Seeker",
    universities: [
      { name: "University of Dubai", badge: "ACCREDITED" },
      { name: "American University of Sharjah", badge: "TOP REGIONAL" },
      { name: "University of Wollongong in Dubai", badge: "AUS CAMPUS" },
      { name: "Heriot-Watt University Dubai", badge: "UK CAMPUS" },
      { name: "British University in Dubai", badge: "ACCREDITED" },
      { name: "Middlesex University Dubai", badge: "UK CAMPUS" },
    ],
    visaOptions: [
      {
        name: "Student Visa",
        description: "Sponsored by the university for full-time enrolled students.",
      },
      {
        name: "Post-Graduation Job Seeker Visa",
        description: "Stay up to 2 years after graduation to find employment.",
      },
      {
        name: "Golden Visa",
        description: "Long-term residency for outstanding students and professionals.",
      },
    ],
    highlights: [
      "Tax-free income and modern lifestyle",
      "International branch campuses of global universities",
      "Safe city with world-class infrastructure",
      "Growing job market across multiple sectors",
    ],
    funFactLabel: "Futuristic Vision",
    funFact:
      "Dubai is home to the world's tallest building, the Burj Khalifa, standing at 828 meters with 163 floors.",
  },
  singapore: {
    name: "Singapore",
    tagline:
      "Asia's global education powerhouse — where academic rigour meets multicultural harmony.",
    region: "ASIAN EXCELLENCE",
    heroImage:
      "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=2400&q=80",
    overviewHeading: "Where tradition meets cutting-edge innovation",
    overview:
      "Singapore is consistently ranked among the world's best education destinations. Home to globally top-ranked universities like NUS and NTU, this city-state offers a safe, clean, and highly efficient environment for international students. With English as the primary language of instruction and strong links to global industries, Singapore provides exceptional academic and career outcomes.",
    costOfStudy: "SGD 20,000 – SGD 50,000 per year",
    costOfStudyShort: "S$20k — S$50k",
    costOfLiving: "SGD 1,000 – SGD 2,000 per month",
    costOfLivingShort: "S$1k — S$2k",
    rankingShort: "2 Top 20",
    workRightsShort: "Up to 3 Years",
    universities: [
      { name: "National University of Singapore", badge: "TOP 10" },
      { name: "Nanyang Technological University", badge: "TOP 20" },
      { name: "Singapore Management University", badge: "SPECIALIST" },
      { name: "Singapore University of Technology and Design", badge: "INNOVATION" },
      { name: "James Cook University Singapore", badge: "AU CAMPUS" },
      { name: "Curtin Singapore", badge: "AU CAMPUS" },
    ],
    visaOptions: [
      {
        name: "Student Pass",
        description: "For full-time study at a recognised institution in Singapore.",
      },
      {
        name: "Graduate Employment Pass",
        description: "Work in Singapore after graduation with an employment pass.",
      },
      {
        name: "Permanent Residence Pathway",
        description: "Eligible to apply for PR after studying and working in Singapore.",
      },
    ],
    highlights: [
      "Globally top-ranked universities (NUS & NTU)",
      "English as the primary teaching language",
      "Strategic hub connecting East and West",
      "Highly safe and efficient urban environment",
    ],
    funFactLabel: "Urban Innovation",
    funFact:
      "Singapore is one of only three city-states in the world, and its Changi Airport has been voted the world's best airport multiple times.",
  },
  mauritius: {
    name: "Mauritius",
    tagline:
      "Discover the perfect blend of quality education and island paradise in the Indian Ocean.",
    region: "AFRICAN EXCELLENCE",
    heroImage:
      "https://images.unsplash.com/photo-1540202404-a2f29016b523?auto=format&fit=crop&w=2400&q=80",
    overviewHeading: "Where tropical beauty meets academic opportunity",
    overview:
      "Mauritius is fast becoming a preferred study destination for international students seeking quality education in a safe, English-speaking environment. With its multicultural society, affordable tuition, and growing knowledge economy, Mauritius offers a unique study experience. The country has strong ties with UK and European institutions, offering internationally recognised qualifications.",
    costOfStudy: "MUR 100,000 – MUR 400,000 per year",
    costOfStudyShort: "MUR 100k — MUR 400k",
    costOfLiving: "MUR 15,000 – MUR 30,000 per month",
    costOfLivingShort: "MUR 15k — MUR 30k",
    rankingShort: "Emerging Hub",
    workRightsShort: "2 Year Permit",
    universities: [
      { name: "University of Mauritius", badge: "TOP LOCAL" },
      { name: "University of Technology Mauritius", badge: "TECHNOLOGY" },
      { name: "Middlesex University Mauritius", badge: "UK CAMPUS" },
      { name: "Charles Telfair Institute", badge: "BUSINESS" },
      { name: "African Leadership College", badge: "LEADERSHIP" },
      { name: "Université des Mascareignes", badge: "PUBLIC" },
    ],
    visaOptions: [
      {
        name: "Student Visa",
        description: "For full-time study at a registered institution in Mauritius.",
      },
      {
        name: "Post-Study Work Permit",
        description: "Stay up to 2 years after graduation to gain professional experience.",
      },
      {
        name: "Permanent Residence",
        description: "Pathway to PR for graduates who secure long-term employment.",
      },
    ],
    highlights: [
      "English and French-speaking environment",
      "Affordable tuition and living costs",
      "Safe, stable, and multicultural society",
      "Recognised UK and European qualifications",
    ],
    funFactLabel: "Island Heritage",
    funFact:
      "Mauritius is home to the extinct Dodo bird and was the only known habitat of this famous flightless bird.",
  },
};

export const Route = createFileRoute("/destinations/$slug")({
  loader: ({ params: { slug } }) => {
    const dest = DESTINATION_DATA[slug];
    if (!dest) throw notFound();
    return dest;
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Destination — Av Edu" }] };
    return {
      meta: [
        { title: `${loaderData.name} — Study Abroad with Av Edu` },
        {
          name: "description",
          content: `Study, work, and immigrate to ${loaderData.name}. Tuition, cost of living, top universities, and visa pathways.`,
        },
        { property: "og:title", content: `${loaderData.name} — Av Edu` },
        { property: "og:description", content: loaderData.tagline },
        { property: "og:image", content: loaderData.heroImage },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:image", content: loaderData.heroImage },
      ],
    };
  },
  notFoundComponent: () => (
    <SiteLayout>
      <div className="mx-auto max-w-3xl px-6 py-32 text-center">
        <h1 className="font-serif text-5xl mb-4">Destination not found</h1>
        <p className="text-muted-foreground mb-8">
          We don't have a guide for this destination yet.
        </p>
        <Link
          to="/"
          className="inline-block border border-primary bg-primary px-10 py-4 text-[11px] uppercase tracking-[0.3em] text-primary-foreground transition-all duration-300 hover:bg-transparent hover:text-primary"
        >
          Back home
        </Link>
      </div>
    </SiteLayout>
  ),
  errorComponent: ({ error, reset }) => (
    <SiteLayout>
      <div className="mx-auto max-w-3xl px-6 py-32 text-center">
        <h1 className="font-serif text-4xl mb-4">Something went wrong</h1>
        <p className="text-muted-foreground mb-8">{error.message}</p>
        <button
          onClick={reset}
          className="inline-block border border-primary bg-primary px-10 py-4 text-[11px] uppercase tracking-[0.3em] text-primary-foreground transition-all duration-300 hover:bg-transparent hover:text-primary"
        >
          Try again
        </button>
      </div>
    </SiteLayout>
  ),
  component: DestinationDetail,
});

function DestinationDetail() {
  const dest = Route.useLoaderData() as DestInfo;

  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const [gridStyle, setGridStyle] = useState<React.CSSProperties>({});

  useEffect(() => {
    const measure = () => {
      if (leftRef.current && rightRef.current) {
        if (window.innerWidth >= 768) {
          const leftH = leftRef.current.scrollHeight;
          const rightH = rightRef.current.scrollHeight;
          setGridStyle({ maxHeight: Math.min(leftH, rightH) });
        } else {
          setGridStyle({});
        }
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [dest]);

  const stats = [
    { label: "Tuition / Year", value: dest.costOfStudyShort },
    { label: "Living Cost", value: dest.costOfLivingShort },
    { label: "Global Ranking", value: dest.rankingShort },
    { label: "Work Rights", value: dest.workRightsShort },
  ];

  return (
    <SiteLayout>
      {/* Hero */}
      <section className="relative h-[44vh] min-h-[320px] w-full overflow-hidden bg-black">
        <img
          src={dest.heroImage}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/60 to-black/80" />
        <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col items-center justify-center px-6 text-center">
          <p className="text-[10px] uppercase tracking-[0.45em] text-white/60">{dest.region}</p>
          <h1 className="mt-4 font-serif text-4xl font-light text-white sm:text-5xl md:text-6xl">
            {dest.name}
          </h1>
          <p className="mt-4 max-w-2xl text-sm tracking-wide text-white/80 sm:text-base">
            {dest.tagline}
          </p>
        </div>
      </section>

      {/* Stats Row */}
      <div className="relative z-10 mx-auto -mt-12 max-w-7xl px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px overflow-hidden rounded-xl border border-border bg-border shadow-xl">
          {stats.map((s) => (
            <div key={s.label} className="bg-white p-6 md:p-8">
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                {s.label}
              </p>
              <p className="mt-2 text-xl font-bold tracking-tight text-foreground">{s.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Overview + Highlights */}
      <section className="bg-white">
        <div className="pi-section">
          <div className="grid gap-6 md:gap-12 md:grid-cols-2">
            <div ref={leftRef}>
              <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
                Overview
              </p>
              <h2 className="mt-2 text-3xl font-bold text-gray-900">{dest.overviewHeading}</h2>
              <p className="mt-4 text-gray-600 leading-relaxed">{dest.overview}</p>
            </div>
            <div ref={rightRef}>
              <div className="rounded-2xl pt-0 md:pt-6">
                <h3 className="text-xl font-semibold text-gray-900">Key Highlights</h3>
                <ul className="mt-4 space-y-3">
                  {dest.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-3">
                      <span className="text-blue-600">→</span>
                      <span className="text-gray-700">{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fun Fact */}
      <section className="relative overflow-hidden bg-black">
        <div className="pi-section">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(30,80,180,0.10),transparent_60%)]" />
          <Reveal className="relative z-10 text-center max-w-3xl mx-auto">
            <Globe className="mx-auto h-10 w-10 text-white/60" />
            <p className="mt-4 text-xs uppercase tracking-[0.4em] text-white/60">
              {dest.funFactLabel}
            </p>
            <p className="mt-6 text-lg italic leading-relaxed text-white/90 sm:text-xl">
              "{dest.funFact}"
            </p>
          </Reveal>
        </div>
      </section>

      {/* Universities & Visa */}
      <section className="bg-[#fafafa]">
        <div className="pi-section">
          <Reveal className="mb-14 text-center">
            <p className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
              Academics & Immigration
            </p>
            <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
              Premier Institutions & Visa Pathways
            </h2>
          </Reveal>
          <div
            className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border border border-border rounded-xl overflow-hidden"
            style={gridStyle}
          >
            <div ref={leftRef} className="bg-white p-10 md:p-12 md:overflow-y-auto">
              <h3 className="text-2xl font-semibold mb-8">Leading Universities</h3>
              <div className="space-y-5">
                {dest.universities.map((u, i) => (
                  <div
                    key={u.name}
                    className="group flex items-center justify-between border-b border-border pb-4"
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-xs font-medium text-muted-foreground tabular-nums">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="font-medium group-hover:text-primary transition-colors">
                        {u.name}
                      </span>
                    </div>
                    <div className="text-xs font-bold text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                      {u.badge}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div ref={rightRef} className="bg-card p-10 md:p-12 md:overflow-y-auto">
              <h3 className="text-2xl font-semibold mb-8">Visa Options</h3>
              <div className="space-y-4">
                {dest.visaOptions.map((v) => (
                  <div
                    key={v.name}
                    className="rounded-xl border border-border bg-white p-6 shadow-sm"
                  >
                    <p className="font-bold">{v.name}</p>
                    <p className="text-sm text-muted-foreground mt-1">{v.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="w-full py-24"
        style={{
          backgroundImage: `linear-gradient(rgba(15,15,15,0.85), rgba(15,15,15,0.85)), url('${dest.heroImage}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <Reveal className="text-center pi-section">
          <p className="text-[10px] uppercase tracking-[0.45em] text-white/60">Get Started Today</p>
          <h2 className="mt-6 text-3xl font-semibold text-white sm:text-4xl md:text-5xl">
            Ready to start your {dest.name} journey?
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/80">
            Speak with our expert consultants today and receive a personalized roadmap for your{" "}
            {dest.name} education.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              to="/contact"
              className="inline-block border border-primary bg-primary px-12 py-4 text-[11px] uppercase tracking-[0.3em] text-primary-foreground transition-all duration-300 hover:bg-transparent hover:text-primary"
            >
              Book Free Consultation
            </Link>
            <Link
              to="/destinations"
              className="inline-block border border-white/30 px-12 py-4 text-[11px] uppercase tracking-[0.3em] text-white transition-all duration-300 hover:border-primary hover:text-primary"
            >
              Browse All Destinations
            </Link>
          </div>
          <div className="mx-auto mt-10 h-px w-16 bg-primary" />
        </Reveal>
      </section>
    </SiteLayout>
  );
}

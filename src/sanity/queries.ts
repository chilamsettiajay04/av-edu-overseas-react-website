import { cachedClientFetch } from "./client";

const heroSectionsQuery = `*[_type == "heroSection"] {
  "page": page,
  "slides": slides[]{
    image,
    heading,
    subtitle
  },
  overlayOpacity
}`;

export interface HeroSlide {
  image: string;
  heading?: string;
  subtitle?: string;
}

export interface HeroSection {
  page: string;
  slides: HeroSlide[];
  overlayOpacity?: number;
}

export async function getHeroSections(): Promise<HeroSection[]> {
  return cachedClientFetch(heroSectionsQuery);
}

const mainCtaQuery = `*[_type == "mainCta"][0]{
  label,
  heading,
  body,
  image,
  buttonText,
  buttonLink
}`;

export interface MainCta {
  label?: string;
  heading?: string;
  body?: string;
  image?: string;
  buttonText?: string;
  buttonLink?: string;
}

export async function getMainCta(): Promise<MainCta | null> {
  return cachedClientFetch(mainCtaQuery);
}

const servicesQuery = `*[_type == "service"] | order(service_sort_order asc) {
  service_icon_name,
  service_title,
  service_description,
  service_display_number,
  service_sort_order
}`;

const destinationsListQuery = `*[_type == "destination"] | order(destination_sort_order asc) {
  "name": destination_name,
  "slug": destination_slug.current,
  "desc": destination_tagline,
  "image": destination_hero_image_url
}`;

const destinationDetailQuery = `*[_type == "destination" && destination_slug.current == $slug][0]{
  "name": destination_name,
  "tagline": destination_tagline,
  "region": destination_region,
  "heroImage": destination_hero_image_url,
  "overviewHeading": destination_overview_heading,
  "overview": destination_overview_description,
  "costOfStudy": destination_cost_of_study_per_year,
  "costOfStudyShort": destination_cost_of_study_short,
  "costOfLiving": destination_cost_of_living_per_month,
  "costOfLivingShort": destination_cost_of_living_short,
  "rankingShort": destination_global_ranking_short,
  "workRightsShort": destination_work_rights_short,
  "highlights": destination_key_highlights,
  "funFactLabel": destination_fun_fact_label,
  "funFact": destination_fun_fact_text,
  "funFactBg": destination_fun_fact_bg_image,
  "universities": destination_universities[]{
    "name": university_name,
    "badge": university_badge
  },
  "visaOptions": destination_visa_options[]{
    "name": visa_option_name,
    "description": visa_option_description
  },
  "courses": destination_courses[]{
    "name": course_name,
    "university": course_university,
    "level": course_level,
    "duration": course_duration,
    "fees": course_fees,
    "description": course_description
  },
  "statTuitionLabel": detail_page_stat_tuition_label,
  "statLivingCostLabel": detail_page_stat_living_cost_label,
  "statRankingLabel": detail_page_stat_ranking_label,
  "statWorkRightsLabel": detail_page_stat_work_rights_label,
  "statIntakesLabel": detail_page_stat_intakes_label,
  "overviewSectionLabel": detail_page_overview_section_label,
  "keyHighlightsHeading": detail_page_key_highlights_heading,
  "academicsLabel": detail_page_academics_immigration_label,
  "academicsHeading": detail_page_academics_immigration_heading,
  "universitiesHeading": detail_page_universities_heading,
  "visaOptionsHeading": detail_page_visa_options_heading,
  "ctaLabel": detail_page_cta_label,
  "ctaHeadingTemplate": detail_page_cta_heading_template,
  "ctaDescriptionTemplate": detail_page_cta_description_template,
  "ctaButtonText": detail_page_cta_button_text,
  "browseAllButtonText": detail_page_browse_all_button_text,
  "intakes": destination_intakes,
  "scholarships": destination_scholarships_eligibility_criteria
}`;

const statsQuery = `*[_type == "stat"] | order(stat_sort_order asc) {
  "value": stat_value,
  "label": stat_label
}`;

const faqsQuery = `*[_type == "faq"] | order(faq_sort_order asc) {
  "q": faq_question,
  "a": faq_answer
}`;

const testimonialsQuery = `*[_type == "testimonial"] | order(testimonial_display_order asc) {
  testimonial_student_name,
  testimonial_student_country,
  testimonial_quote,
  testimonial_rating,
  testimonial_display_order,
  "testimonial_profile_image": testimonial_profile_image.asset->url
}`;

export interface ServiceData {
  service_icon_name: string;
  service_title: string;
  service_description: string;
  service_display_number: string;
  service_sort_order: number;
}

export interface DestinationListItem {
  name: string;
  slug: string;
  desc: string;
  image: string;
}

export interface DestInfo {
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
  courses: { name: string; university: string; level: string; duration: string; fees: string; description: string }[];
  highlights: string[];
  funFact: string;
  funFactLabel: string;
  funFactBg?: string;
  statTuitionLabel?: string;
  statLivingCostLabel?: string;
  statRankingLabel?: string;
  statWorkRightsLabel?: string;
  statIntakesLabel?: string;
  overviewSectionLabel?: string;
  keyHighlightsHeading?: string;
  academicsLabel?: string;
  academicsHeading?: string;
  universitiesHeading?: string;
  visaOptionsHeading?: string;
  ctaLabel?: string;
  ctaHeadingTemplate?: string;
  ctaDescriptionTemplate?: string;
  ctaButtonText?: string;
  browseAllButtonText?: string;
  intakes?: string[];
  scholarships?: string[];
}

export interface StatData {
  value: string;
  label: string;
}

export interface FaqData {
  q: string;
  a: string;
}

export interface TestimonialData {
  testimonial_student_name: string;
  testimonial_student_country: string;
  testimonial_quote: string;
  testimonial_rating: number;
  testimonial_display_order: number;
  testimonial_profile_image?: string;
}

export async function getServices(): Promise<ServiceData[]> {
  return cachedClientFetch(servicesQuery);
}

export async function getDestinations(): Promise<DestinationListItem[]> {
  return cachedClientFetch(destinationsListQuery);
}

export async function getDestinationBySlug(slug: string): Promise<DestInfo | null> {
  return cachedClientFetch(destinationDetailQuery, { slug });
}

export async function getStats(): Promise<StatData[]> {
  return cachedClientFetch(statsQuery);
}

export async function getFaqs(): Promise<FaqData[]> {
  return cachedClientFetch(faqsQuery);
}

export async function getTestimonials(): Promise<TestimonialData[]> {
  return cachedClientFetch(testimonialsQuery);
}

const privacyPolicyQuery = `*[_type == "privacyPolicy"][0]{
  "title": title,
  "lastUpdated": lastUpdated,
  "heroImageUrl": heroImageUrl,
  "sections": sections[]{
    heading,
    body,
    listItems
  },
  "metaTitle": metaTitle,
  "metaDescription": metaDescription
}`;

const termsConditionsQuery = `*[_type == "termsConditions"][0]{
  "title": title,
  "lastUpdated": lastUpdated,
  "heroImageUrl": heroImageUrl,
  "sections": sections[]{
    heading,
    body,
    listItems
  },
  "metaTitle": metaTitle,
  "metaDescription": metaDescription
}`;

export interface PolicySection {
  heading: string;
  body: string;
  listItems?: string[];
}

export interface PrivacyPolicyData {
  title: string;
  lastUpdated: string;
  heroImageUrl: string;
  sections: PolicySection[];
  metaTitle: string;
  metaDescription: string;
}

export interface TermsConditionsData {
  title: string;
  lastUpdated: string;
  heroImageUrl: string;
  sections: PolicySection[];
  metaTitle: string;
  metaDescription: string;
}

export async function getPrivacyPolicy(): Promise<PrivacyPolicyData | null> {
  return cachedClientFetch(privacyPolicyQuery);
}

export async function getTermsConditions(): Promise<TermsConditionsData | null> {
  return cachedClientFetch(termsConditionsQuery);
}

const siteSettingsQuery = `*[_type == "siteSettings"][0]{
  "companyName": companyName,
  "companyLogoDark": companyLogoDark.asset->url,
  "companyLogoLight": companyLogoLight.asset->url,
  "companyShortLogoDark": companyShortLogoDark.asset->url,
  "companyShortLogoLight": companyShortLogoLight.asset->url,
  "logoTagline": logoTagline,
  "companyTagline": companyTagline,
  "footerDescription": footerDescription,
  "copyrightText": copyrightText,
  "socialLinks": socialLinks[]{
    platform,
    url,
    handle
  },
  "primaryPhone": primaryPhone,
  "primaryEmail": primaryEmail,
  "offices": offices[]{
    officeTitle,
    isMainBranch,
    officeAddress,
    officePhone,
    officeEmail,
    officeHours,
    officeMapUrl
  },
  "aboutHeading": aboutHeading,
  "aboutDescription": aboutDescription,
  "aboutDescription2": aboutDescription2,
  "homeAboutDescription": homeAboutDescription,
  "homeAboutDescription2": HomeAboutDescription2,
  "homeAboutVideo": homeAboutVideo,
  "missionLabel": missionLabel,
  "missionQuote": missionQuote,
  "missionBgImage": missionBgImage,
  "seoTitle": seoTitle,
  "seoDescription": seoDescription,
  "seoOgImage": seoOgImage.asset->url
}`;

export interface SocialLink {
  platform: string;
  url: string;
  handle?: string;
}

export interface Office {
  officeTitle: string;
  isMainBranch?: boolean;
  officeAddress: string;
  officePhone?: string;
  officeEmail?: string;
  officeHours?: string[];
  officeMapUrl?: string;
}

export interface SiteSettings {
  companyName: string;
  companyLogoDark?: string;
  companyLogoLight?: string;
  companyShortLogoDark?: string;
  companyShortLogoLight?: string;
  logoTagline?: string;
  companyTagline?: string;
  footerDescription?: string;
  copyrightText?: string;
  socialLinks?: SocialLink[];
  primaryPhone?: string;
  primaryEmail?: string;
  offices?: Office[];
  aboutHeading?: string;
  aboutDescription?: string;
  aboutDescription2?: string;
  homeAboutDescription?: string;
  homeAboutDescription2?: string;
  homeAboutVideo?: string;
  missionLabel?: string;
  missionQuote?: string;
  missionBgImage?: string;
  seoTitle?: string;
  seoDescription?: string;
  seoOgImage?: string;
}

export async function getSiteSettings(): Promise<SiteSettings | null> {
  return cachedClientFetch(siteSettingsQuery);
}

let _siteSettingsPromise: Promise<SiteSettings | null> | null = null;
export function getSiteSettingsShared(): Promise<SiteSettings | null> {
  if (!_siteSettingsPromise) {
    _siteSettingsPromise = getSiteSettings();
  }
  return _siteSettingsPromise;
}

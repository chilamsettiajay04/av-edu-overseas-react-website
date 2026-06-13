import { type SchemaTypeDefinition } from "sanity";

import destination from "./destination";
import service from "./service";
import testimonial from "./testimonial";
import faq from "./faq";
import stat from "./stat";
import privacyPolicy from "./privacyPolicy";
import termsConditions from "./termsConditions";
import siteSettings from "./siteSettings";
import heroSection from "./heroSection";
import mainCta from "./mainCta";

export const schemaTypes: SchemaTypeDefinition[] = [
  destination,
  service,
  testimonial,
  faq,
  stat,
  privacyPolicy,
  termsConditions,
  siteSettings,
  heroSection,
  mainCta,
];

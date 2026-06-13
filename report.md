# Plan: Migrate All UI Text to Sanity

## 1. Current State

- **Frontend**: TanStack Start (React 19), TanStack Router, Vite, Tailwind CSS v4
- **Sanity client**: `next-sanity` v13.1.0 — connected to project `nummygxr`, dataset `production`
- **Only `testimonial` content type** is powered by Sanity (fetched client-side via `useEffect` + `useState`)
- **Every other string** is hardcoded directly in components — navigation, hero slides, stats, services, destinations, FAQs, contact info, footer, meta/SEO tags, error text, form placeholders, and button labels
- **No Sanity Studio** in this repository (schemas live externally)
- **No i18n / localization** infrastructure exists
- **React Query** is configured (`QueryClientProvider` in `__root.tsx`) but not used for Sanity fetches

## 2. Recommended Sanity Schema Structure

### Document Types

Organize into two groups: **Global Content** (singletons) and **Repeated Content** (multiple documents).

#### Singleton Schemas (one document each, managed via `__i18n` or single-doc pattern)

| Schema ID          | Purpose                   | Key Fields                                                                |
| ------------------ | ------------------------- | ------------------------------------------------------------------------- |
| `siteSettings`     | Site-wide config          | logo, tagline, brand description, copyright, social links, footer text    |
| `navigation`       | Main nav items + labels   | `items[]: { label, route }`, menu aria labels                             |
| `contactInfo`      | Phone, email, addresses   | phones[], emails[], offices[] (title, address, phone, email, hours)       |
| `seoDefaults`      | Global meta defaults      | meta title, description, og data, twitter handle                          |
| `homePage`         | Home page content         | hero slides[], stats[], intro text, CTA text, section labels              |
| `aboutPage`        | About page content        | hero, who-we-are text, mission quote                                      |
| `servicesPage`     | Services page content     | hero, section labels                                                      |
| `destinationsPage` | Destinations listing page | hero, section labels, "Top Picks" text                                    |
| `contactPage`      | Contact page content      | hero, form placeholders, offices, country dropdown options, toast message |
| `testimonialsPage` | Testimonials listing page | hero, loading text                                                        |
| `errorPageContent` | 404 + error boundary text | 404 heading, 404 message, error heading, error message, button labels     |

#### Collection Schemas (multiple documents)

| Schema ID     | Purpose                                   | Key Fields                                                                                                                                                                                                                           |
| ------------- | ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `destination` | Individual country data                   | name, slug, tagline, region, heroImage, overviewHeading, overview, costOfStudy, costOfStudyShort, costOfLiving, costOfLivingShort, rankingShort, workRightsShort, universities[], visaOptions[], highlights[], funFact, funFactLabel |
| `service`     | Individual service (home + services page) | title, description, icon name, order, accent colors (optional — may stay in code)                                                                                                                                                    |
| `faq`         | FAQ items                                 | question, answer, order                                                                                                                                                                                                              |
| `stat`        | Stats shown on home                       | value, label, order (visual style fields may stay in code)                                                                                                                                                                           |

### Why This Structure

- **Singletons** for page-level content because each page has one set of strings — avoids over-normalization
- **Collections** for repeatable content (services, FAQs, destinations) — allows CMS users to add/remove items freely
- **Separate `siteSettings`** for truly global strings (copyright, social links) so they are not duplicated
- **Navigation as a singleton** — a single ordered array keeps drag-and-drop reordering simple in the Studio

### Sanity Studio Schema Location

**Option A (recommended)**: Create a new Sanity Studio project (separate repo or in a `studio/` directory within this project) using `npm create sanity@latest`. This gives you a local Studio to define and manage schemas.

**Option B**: If you have an existing external Sanity project, add these schemas there and re-deploy the Studio.

## 3. GROQ Queries

### Strategy: Single Aggregated Query

Fetch all content in one request to avoid waterfall:

```groq
{
  "siteSettings": *[_type == "siteSettings"][0],
  "navigation": *[_type == "navigation"][0],
  "contactInfo": *[_type == "contactInfo"][0],
  "seoDefaults": *[_type == "seoDefaults"][0],
  "homePage": *[_type == "homePage"][0],
  "aboutPage": *[_type == "aboutPage"][0],
  "servicesPage": *[_type == "servicesPage"][0],
  "destinationsPage": *[_type == "destinationsPage"][0],
  "contactPage": *[_type == "contactPage"][0],
  "testimonialsPage": *[_type == "testimonialsPage"][0],
  "errorPageContent": *[_type == "errorPageContent"][0],
  "services": *[_type == "service"] | order(order asc),
  "faqs": *[_type == "faq"] | order(order asc),
  "stats": *[_type == "stat"] | order(order asc),
  "destinations": *[_type == "destination"],
}
```

For the destination detail page, fetch individual destination:

```groq
*[_type == "destination" && slug.current == $slug][0]
```

### Caching

- Use TanStack React Query (`useQuery` with `queryKey: ["sanity", "globalContent"]`) with appropriate `staleTime` (e.g., 5 minutes)
- Server-side fetching via TanStack Start `loader` where possible (destinations detail, at minimum)

## 4. Frontend Data Flow Improvements

### Recommended Pattern (React Query + Context)

```
Sanity API
    ↓
GROQ query via client.fetch() inside React Query hook
    ↓
React Query cache (global, staleTime: 5min)
    ↓
React Context provider (hydrated at app root)
    ↓
Individual components consume via custom hooks
```

### Implementation Steps

1. **Create a data layer**
   - `src/sanity/queries.ts` — all GROQ queries as exported strings
   - `src/sanity/types.ts` — TypeScript interfaces for all Sanity document types
   - `src/sanity/hooks.ts` — custom React Query hooks (`useSiteSettings()`, `useNavigation()`, `useGlobalContent()`, etc.)

2. **Create a content provider**
   - `src/components/site/ContentProvider.tsx` — fetches all global content once at the app root, passes via React context
   - Wrap inside `SiteLayout` or `__root.tsx`

3. **Update components to consume from context/hooks**
   - Every hardcoded string replaced with a `useContent()` or equivalent hook call
   - Falls back to hardcoded defaults during loading/error states

### Migration Order (Suggested)

| Phase | Content                                                                            | Impact                                            | Difficulty |
| ----- | ---------------------------------------------------------------------------------- | ------------------------------------------------- | ---------- |
| 1     | `siteSettings`, `navigation`, `contactInfo`, `seoDefaults`                         | Affects every page (layout, footer, SEO)          | Medium     |
| 2     | `homePage`                                                                         | Home page only                                    | Medium     |
| 3     | `aboutPage`, `servicesPage`, `destinationsPage`, `contactPage`, `testimonialsPage` | 5 sub-pages                                       | Low-Medium |
| 4     | `destination` collection                                                           | Destinations detail page (largest content volume) | High       |
| 5     | `service`, `faq`, `stat` collections                                               | Repeatable items on home/services pages           | Low        |
| 6     | `errorPageContent`                                                                 | Error boundary + 404 page                         | Low        |

## 5. Summary of All Strings to Migrate

| Page / Component            | Strings Count | Example Strings                                                                                                         |
| --------------------------- | ------------- | ----------------------------------------------------------------------------------------------------------------------- |
| Navigation (SiteLayout)     | 8             | "Home", "About Us", nav labels, "Toggle menu" aria-label                                                                |
| Logo & Footer               | 8             | "Av Edu" alt, "Overseas Consultancy" tagline, copyright, footer description, privacy/terms links                        |
| Social Icons                | 4             | "Twitter", "Facebook", "LinkedIn", "Instagram" labels                                                                   |
| Home Hero                   | 4             | "Your Gateway to Global Opportunities", 3 slide titles + subtitles                                                      |
| Home Stats                  | 5             | "Results That Speak" label, stat values + labels                                                                        |
| Home Intro                  | 4             | "Trusted Since 2012", "Welcome to Av Edu", 2 description paragraphs                                                     |
| Home Featured Services      | 5             | "What We Offer", "Our Services", 3 service titles + descs, "Learn More", "Explore All Services"                         |
| Home Destinations           | 4             | "Where Will You Go?", "Popular Destinations", "Learn More →", "Explore All Destinations"                                |
| Home FAQs                   | 3             | "Have Questions?", "Frequently Asked Questions", 5 Q&A pairs                                                            |
| Home CTA                    | 5             | "Get Started Today", "Your Global Journey Starts Here", CTA text, "Book a Consultation"                                 |
| Destinations (10 countries) | ~150          | Per country: name, tagline, region, overview, costs, stats, highlights, fun facts, CTA text, universities, visa options |
| About Page                  | 7             | Hero, "Who We Are", "Built on Trust...", description, "Our Mission", mission quote                                      |
| Services Page               | 8             | Hero, 6 service titles + descriptions                                                                                   |
| Destinations Listing        | 5             | Hero, "Top Picks", "Where Will You Go?"                                                                                 |
| Contact Page                | 12            | Hero, form placeholders, country dropdown (11 options), button labels, toast text, 2 office info blocks                 |
| Testimonials Page           | 3             | Hero, "Loading testimonials..."                                                                                         |
| Error / 404                 | 8             | "404", "Page not found", "Go home", "This page didn't load", "Something went wrong", "Try again"                        |
| Meta tags (all routes)      | ~25           | Per-route title + description + OG tags                                                                                 |

**Total: ~250+ individual strings** moving from hardcoded to Sanity-managed.

## 6. Key Considerations

### a) Icon Names & Visual Identifiers

- Icons (Lucide icon names like `GraduationCap`, `FileCheck`) and CSS accent colors should be **kept in code** as enum/mapping rather than in CMS, to avoid runtime icon loading issues
- Services schema can store an `iconName` field (string) mapped to Lucide icons on the frontend

### b) Images

- Hero images, destination images, etc. can either remain as URL strings in Sanity or be uploaded as Sanity image assets (recommended for production)
- Sanity image assets give you automatic crop, focal point, responsive breakpoints via `@sanity/image-url`

### c) No i18n Yet

- If future multilingual support is planned, wrapping all string fields in `schema.field({ name: ..., type: 'object', fields: [{ name: 'en', type: 'string' }, { name: 'es', type: 'string' }] })` would allow per-locale values. For now, keep it flat.

### d) Slug-based Routing for Destinations

- Destination slugs should use Sanity's `slug` type with `current` field for URL-safe identifiers
- The route param should match `slug.current`

### e) Loader Integration

- TanStack Start `loader` functions in routes can prefetch Sanity data server-side (better SEO, no loading states)
- Use `Route.useLoaderData()` to access it in components
- Fall back to context/hooks for global content that doesn't change per route

## 7. Migration Without Breaking Things

1. **Add all schemas to Sanity Studio** and populate them with the exact same text currently hardcoded (data entry phase — no code changes yet)
2. **Write and verify GROQ queries** return the correct data
3. **Build React Query hooks + content provider** — components will still use hardcoded strings (provider returns null)
4. **Swap one component at a time** — start with navigation (highest visibility), then footer, then page by page
5. **Add fallbacks** — if Sanity fetch fails or returns null, display the original hardcoded string as default
6. **Remove hardcoded constants** after each page is verified working

## 8. Open Questions to Decide

- Where will the Sanity Studio live? (Separate repo or `studio/` directory in this project)
- Do you want image assets uploaded to Sanity, or keep them as URL strings?
- Is multilingual support planned in the future? (Affects schema design)
- Should all global content be fetched in one query (simpler) or split per page (more granular caching)?

## 9. Home Page Walkthrough — Schema to Screen

This section takes the **home page** (`src/routes/index.tsx`) as a concrete example and maps every hardcoded string to its Sanity schema field.

### The `homePage` Singleton Schema

The home page becomes a single Sanity document (singleton) with this structure:

| Schema Field        | Sanity Type                           | Stores What                                                                                                                                                           | Hardcoded Source (`index.tsx`)           |
| ------------------- | ------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| `heroSlides`        | Array of `object`                     | Each slide: `title` (string), `subtitle` (string), `image` (URL string)                                                                                               | `HERO_SLIDES` array, lines 31–50         |
| `heroEyebrow`       | String                                | `"Your Gateway to Global Opportunities"`                                                                                                                              | Line 222                                 |
| `introLabel`        | String                                | `"Trusted Since 2012"`                                                                                                                                                | Line 267                                 |
| `introHeading`      | String                                | `"Welcome to Av Edu"`                                                                                                                                                 | Line 269                                 |
| `introParagraph1`   | Text                                  | First description paragraph                                                                                                                                           | Lines 271–276                            |
| `introParagraph2`   | Text                                  | Second description paragraph                                                                                                                                          | Lines 277–282                            |
| `servicesLabel`     | String                                | `"What We Offer"`                                                                                                                                                     | Line 392                                 |
| `servicesTitle`     | String                                | `"Our Services"`                                                                                                                                                      | Line 394                                 |
| `services`          | Array of `object`                     | Each: `iconName` (string, e.g. `"GraduationCap"`), `title` (string), `description` (text), `number` (string `"01"`), `accent` (string — optional, could stay in code) | `FEATURED_SERVICES` array, lines 357–385 |
| `ctaLabel`          | String                                | `"Get Started Today"`                                                                                                                                                 | Line 512                                 |
| `ctaHeading`        | String                                | `"Your Global Journey Starts Here"`                                                                                                                                   | Lines 514–515                            |
| `ctaText`           | Text                                  | CTA description paragraph                                                                                                                                             | Lines 517–519                            |
| `ctaButton`         | String                                | `"Book a Consultation"`                                                                                                                                               | Line 524                                 |
| `statsLabel`        | String                                | `"Results That Speak"`                                                                                                                                                | Line 574                                 |
| `stats`             | Array of `object`                     | Each: `value` (string, e.g. `"15,000+"`), `label` (string, e.g. `"Students Placed"`)                                                                                  | `STATS` array, lines 532–569             |
| `destinationsLabel` | String                                | `"Where Will You Go?"`                                                                                                                                                | Line 332                                 |
| `destinationsTitle` | String                                | `"Popular Destinations"`                                                                                                                                              | Line 334                                 |
| `destinations`      | Array of references (→ `destination`) | Links to destination documents (only 6 shown on home page, full list on `/destinations`)                                                                              | `DESTINATIONS.slice(0, 6)` on line 339   |
| `faqsLabel`         | String                                | `"Have Questions?"`                                                                                                                                                   | Line 475                                 |
| `faqsTitle`         | String                                | `"Frequently Asked Questions"`                                                                                                                                        | Lines 476–478                            |
| `faqs`              | Array of `object`                     | Each: `question` (string), `answer` (text)                                                                                                                            | `FAQS` array, lines 447–468              |
| `seo`               | Object                                | `metaTitle`, `metaDescription`, `ogTitle`, `ogDescription` (all strings)                                                                                              | Route `head()` meta, lines 14–26         |

### What Stays in Code (not in Sanity)

| Element                                                         | Reason                                                                          |
| --------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| Lucide icon components (`GraduationCap`, `FileCheck`, `Globe2`) | Mapped via `iconName` string → icon in a lookup object                          |
| Accent gradient classes (`from-amber-600/20...`)                | Visual styling, not content                                                     |
| Stat card colors, heights, patterns                             | Visual styling (the `from-stone-700`, `height: 140`, `pattern` fields in STATS) |
| Animation delays, transition classes                            | UI behaviour                                                                    |
| YouTube video embed URL                                         | Infrastructural, not editorial content                                          |
| `Learn More →` link text on destination cards                   | Could optionally go to Sanity, but is a generic UI pattern                      |

### Data Flow in Plain Terms

```
1. Sanity Studio: Editor opens "Home Page" document
                    ↓
2. Editor fills in all fields (hero slides, intro text, stats, FAQs, etc.)
                    ↓
3. Frontend runs one GROQ query: *[_type == "homePage"][0]
                    ↓
4. Returns a JSON object like:
   {
     heroSlides: [{ title: "Study in the UK", subtitle: "...", image: "..." }, ...],
     introLabel: "Trusted Since 2012",
     introHeading: "Welcome to Av Edu",
     stats: [{ value: "15,000+", label: "Students Placed" }, ...],
     faqs: [{ question: "What services...", answer: "We provide..." }, ...],
     ...
   }
                    ↓
5. Home component renders: heroSlides[0].title, introLabel, stats[0].value, etc.
```

### Migration Steps for Just the Home Page

1. Create `homePage` schema in Studio
2. Create one `homePage` document → paste all existing hardcoded text verbatim
3. Verify GROQ query returns correct data (via Sanity Vision tab or API call)
4. Frontend: replace `HERO_SLIDES` → `sanityData.heroSlides`, replace `STATS` → `sanityData.stats`, etc.
5. Delete the hardcoded arrays after confirmation
6. Add fallback: if Sanity fetch fails, display the original hardcoded strings

# Budget Report — Av Edu Website (TanStack Start + Sanity CMS)

**Prepared for:** Client  
**Project:** Av Edu — Overseas Education Consultancy Website  
**Date:** June 12, 2026  
**Market:** India (INR pricing for small consultancy)

---

## 1. Project Overview

A fully responsive, server-side rendered website for Av Edu, an overseas education consultancy with offices in Miami and Hyderabad. The site showcases study-abroad and immigration services across 25+ countries, featuring destination guides, student testimonials, and lead-generation contact forms.

**Tech Stack:** TanStack Start (React 19), TanStack Router, Vite, Tailwind CSS v4, Sanity CMS  
**Status:** Frontend UI complete (7 pages + 47 UI components). CMS integration scaffolded but not wired.

---

## 2. What Has Been Delivered (Completed Scope)

| Deliverable             | Details                                                                                                         | Status   |
| ----------------------- | --------------------------------------------------------------------------------------------------------------- | -------- |
| UI Framework & Routing  | TanStack Start SSR with file-based routing, 7 routes                                                            | Complete |
| Design System           | 47 shadcn-style UI components, Tailwind CSS v4 theme                                                            | Complete |
| Site Layout             | Navigation (sticky with scroll), TopBar, Footer, Mobile menu                                                    | Complete |
| Reusable Components     | PageHero, Reveal (scroll animation), SocialIcons, OfficeBlock, DestinationCard, ContactForm                     | Complete |
| Home Page               | Hero slideshow, stats bar, intro with YouTube, featured services, destinations grid, FAQ accordion, CTA section | Complete |
| About Page              | Hero + Who We Are + Mission quote sections                                                                      | Complete |
| Services Page           | Hero + 6 service cards grid                                                                                     | Complete |
| Destinations Page       | Listing grid (10 countries)                                                                                     | Complete |
| Destination Detail Page | Full country profile (hero, stats, overview, highlights, fun facts, universities, visa options, CTA)            | Complete |
| Contact Page            | Hero + form + 2 office info cards                                                                               | Complete |
| Testimonials Page       | Hero + 6 testimonial cards with ratings                                                                         | Complete |
| Error Handling          | 404 page, Error boundary, SSR error middleware                                                                  | Complete |
| Sanity Client           | API client configured (project: `nummygxr`, dataset: `production`)                                              | Complete |
| Sanity Schemas          | 18 schema files (11 singletons, 4 collections, 3 shared blocks)                                                 | Complete |
| Seed Script             | `scripts/seedSanity.ts` — populates all 12 singleton documents                                                  | Complete |
| React Query             | `QueryClientProvider` configured in root layout                                                                 | Complete |
| Migration Plan          | `report.md` — detailed 6-phase migration strategy                                                               | Complete |

---

## 3. Remaining Work & Budget Breakdown

All estimates in **USD + INR**. Indian market developer rate: ₹800/hr.

### Phase A — Sanity Studio Deployment & Configuration

| Task                                                                              | Hours      | Cost (₹800/hr) |
| --------------------------------------------------------------------------------- | ---------- | -------------- |
| Deploy Sanity Studio (Vercel or managed)                                          | 4          | ₹3,200         |
| Deploy all 18 schemas to Sanity project                                           | 2          | ₹1,600         |
| Configure CORS, API settings, tokens                                              | 1          | ₹800           |
| Run seed script to populate singleton documents                                   | 1          | ₹800           |
| Create collection documents manually (destinations, services, FAQs, testimonials) | 6          | ₹4,800         |
| Verify all data returns correctly via Vision/API                                  | 2          | ₹1,600         |
| **Subtotal**                                                                      | **16 hrs** | **₹12,800**    |

### Phase B — Frontend Data Layer

| Task                                                                                   | Hours      | Cost (₹800/hr) |
| -------------------------------------------------------------------------------------- | ---------- | -------------- |
| Write GROQ queries (global aggregation + per-page)                                     | 4          | ₹3,200         |
| Create TypeScript types for all Sanity documents                                       | 4          | ₹3,200         |
| Build React Query hooks (`useSiteSettings`, `useNavigation`, `useGlobalContent`, etc.) | 6          | ₹4,800         |
| Build `ContentProvider` context (React Context wrapping React Query)                   | 4          | ₹3,200         |
| **Subtotal**                                                                           | **18 hrs** | **₹14,400**    |

### Phase C — Global Layout Integration (Navigation, Footer, SEO)

| Task                                               | Hours      | Cost (₹800/hr) |
| -------------------------------------------------- | ---------- | -------------- |
| Replace hardcoded nav items with Sanity data       | 3          | ₹2,400         |
| Replace TopBar phone/email with Sanity data        | 2          | ₹1,600         |
| Replace Footer brand info, social links, copyright | 4          | ₹3,200         |
| Replace logo alt text and tagline                  | 1          | ₹800           |
| Wire SEO defaults into root layout `<head>`        | 4          | ₹3,200         |
| Replace error page content (404 + error boundary)  | 3          | ₹2,400         |
| **Subtotal**                                       | **17 hrs** | **₹13,600**    |

### Phase D — Home Page Integration

| Task                                                      | Hours      | Cost (₹800/hr) |
| --------------------------------------------------------- | ---------- | -------------- |
| Replace hero slideshow data                               | 3          | ₹2,400         |
| Replace stats section data                                | 2          | ₹1,600         |
| Replace intro section (headings, paragraphs, YouTube URL) | 3          | ₹2,400         |
| Replace featured services data                            | 3          | ₹2,400         |
| Replace destinations grid data                            | 3          | ₹2,400         |
| Replace FAQ accordion data                                | 3          | ₹2,400         |
| Replace CTA section data                                  | 2          | ₹1,600         |
| Wire home page SEO meta tags                              | 1          | ₹800           |
| **Subtotal**                                              | **20 hrs** | **₹16,000**    |

### Phase E — Inner Pages Integration (About, Services, Contact, Testimonials)

| Task                                                                     | Hours      | Cost (₹800/hr) |
| ------------------------------------------------------------------------ | ---------- | -------------- |
| About page — replace hero + content sections                             | 3          | ₹2,400         |
| Services page — replace hero + service cards grid                        | 4          | ₹3,200         |
| Contact page — replace hero, form placeholders, country options, offices | 5          | ₹4,000         |
| Testimonials page — replace hero + load testimonials from Sanity         | 4          | ₹3,200         |
| Wire per-page SEO meta tags                                              | 2          | ₹1,600         |
| **Subtotal**                                                             | **18 hrs** | **₹14,400**    |

### Phase F — Destinations Integration (Largest Scope)

| Task                                                        | Hours      | Cost (₹800/hr) |
| ----------------------------------------------------------- | ---------- | -------------- |
| Destinations listing page — replace hero + grid             | 4          | ₹3,200         |
| Destination detail page — replace hero, stats row           | 4          | ₹3,200         |
| Destination detail — replace overview, highlights, fun fact | 5          | ₹4,000         |
| Destination detail — replace universities list with badges  | 4          | ₹3,200         |
| Destination detail — replace visa options                   | 4          | ₹3,200         |
| Destination detail — replace CTA section                    | 2          | ₹1,600         |
| Wire destination-specific SEO (dynamic meta tags per slug)  | 3          | ₹2,400         |
| Handle loading, error, and not-found states for slugs       | 3          | ₹2,400         |
| **Subtotal**                                                | **29 hrs** | **₹23,200**    |

### Phase G — Content Population (Destination Data)

| Task                                                            | Hours      | Cost (₹800/hr) |
| --------------------------------------------------------------- | ---------- | -------------- |
| Create 10 destination documents in Sanity Studio with full data | 16         | ₹12,800        |
| Create 6 service documents in Sanity                            | 2          | ₹1,600         |
| Create 5 FAQ documents                                          | 1          | ₹800           |
| Create 4 stat documents                                         | 1          | ₹800           |
| Create 6 testimonial documents                                  | 2          | ₹1,600         |
| **Subtotal**                                                    | **22 hrs** | **₹17,600**    |

### Phase H — Testing, QA & Deployment

| Task                                                         | Hours      | Cost (₹800/hr) |
| ------------------------------------------------------------ | ---------- | -------------- |
| Cross-browser testing (Chrome, Firefox, Safari, Edge)        | 4          | ₹3,200         |
| Mobile responsive testing                                    | 3          | ₹2,400         |
| Content verification (all pages vs. original hardcoded data) | 4          | ₹3,200         |
| Performance audit (Lighthouse)                               | 2          | ₹1,600         |
| Production deployment (Vercel/Netlify)                       | 3          | ₹2,400         |
| Post-deployment smoke tests                                  | 2          | ₹1,600         |
| Documentation handover                                       | 2          | ₹1,600         |
| **Subtotal**                                                 | **20 hrs** | **₹16,000**    |

---

## 4. Cost Summary

| Phase     | Description                                          | Hours       | Cost (₹800/hr) |
| --------- | ---------------------------------------------------- | ----------- | -------------- |
| A         | Sanity Studio Deployment & Configuration             | 16          | ₹12,800        |
| B         | Frontend Data Layer (Queries, Hooks, Context)        | 18          | ₹14,400        |
| C         | Global Layout Integration (Nav, Footer, SEO, Errors) | 17          | ₹13,600        |
| D         | Home Page Content Integration                        | 20          | ₹16,000        |
| E         | Inner Pages (About, Services, Contact, Testimonials) | 18          | ₹14,400        |
| F         | Destinations Integration (Listing + 10 Detail Pages) | 29          | ₹23,200        |
| G         | Content Population (Data Entry in Sanity)            | 22          | ₹17,600        |
| H         | Testing, QA & Deployment                             | 20          | ₹16,000        |
| **Total** |                                                      | **160 hrs** | **₹1,28,000**  |

---

## 5. Indian Market Recommendations

For a **small overseas consultancy** in India, here are realistic pricing tiers:

### 🟢 Budget Tier (Recommended for small consultancy)

**₹75,000 – ₹90,000 fixed price**

- Core CMS integration (Phases B + C + D + E — data layer, layout, home page, inner pages)
- You populate your own content in Sanity Studio (skip Phase G)
- Basic deployment assistance
- 3–4 weeks delivery

### 🟡 Standard Tier

**₹1,10,000 – ₹1,28,000 fixed price**

- Full scope as described (all 8 phases)
- I handle content population and data entry
- Complete QA & deployment
- 5–6 weeks delivery

### 🔵 Premium Tier

**₹1,50,000 – ₹1,75,000 fixed price**

- Everything in Standard
- 3 months of basic support included (bug fixes, content changes)
- SEO optimization + performance tuning
- Priority response (48 hr turnaround)

### 💡 Payment Schedule (Standard/Premium)

| Milestone     | Amount            | Trigger                                                  |
| ------------- | ----------------- | -------------------------------------------------------- |
| 30% Advance   | ₹33,000 – ₹52,500 | On signing                                               |
| 40% Mid-point | ₹44,000 – ₹70,000 | After Phases A–D complete (site layout + home page live) |
| 30% Final     | ₹33,000 – ₹52,500 | On final delivery & deployment                           |

---

## 6. Why These Prices?

| Factor                            | Explanation                                                                                                                              |
| --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| **Already built**                 | Full 7-page UI, 47 components, responsive design — delivered. Only CMS integration remains.                                              |
| **No monthly overhead**           | Sanity free tier works for small consultancies (3 users, 20GB bandwidth).                                                                |
| **Competitive for Indian market** | ₹75K–₹1.28L is standard for a CMS-powered business website.                                                                              |
| **Value for client**              | They get a modern, fast SSR website where they can edit ALL content themselves via Sanity Studio — no developer needed for text changes. |

---

## 7. What to Say to the Client

> "The website is already built with a modern tech stack — 7 complete pages with animations, mobile-friendly design, and fast performance. The remaining work is to connect it to a content management system (CMS) so you can edit all text, photos, destinations, and testimonials yourself without any coding. The CMS is like a dashboard where you log in and make changes instantly.
>
> **Total investment: ₹75,000 – ₹1,28,000** depending on how much content entry you want to handle yourself. Delivery in 3–6 weeks."

---

## 8. Timeline Estimate

| Phase                  | Duration | Parallelizable          |
| ---------------------- | -------- | ----------------------- |
| A — Studio Setup       | 1 week   | —                       |
| B — Data Layer         | 1 week   | —                       |
| C — Layout Integration | 1 week   | Can run parallel with D |
| D — Home Page          | 1 week   | Can run parallel with C |
| E — Inner Pages        | 1 week   | Can run after D         |
| F — Destinations       | 2 weeks  | Largest scope           |
| G — Content Population | 1 week   | Can start after A       |
| H — QA & Deployment    | 1 week   | After all phases        |

**Total estimated timeline: 6–8 weeks** (with parallelization)

---

## 9. What's Not Included

- **Sanity Studio hosting** (Vercel/Netlify free tier sufficient, or ~₹1,500–4,000/month if upgraded)
- **Sanity project subscription** (Free tier: 3 users, 20GB bandwidth)
- **Domain name or DNS management**
- **Ongoing maintenance or content updates post-launch**
- **i18n / multilingual support** — can be scoped as a separate project
- **Custom backend integrations** (e.g., actual form submission API, CRM sync)
- **Custom illustrations or photography**
- **Favicon and PWA assets**

---

## 10. Post-Launch Maintenance Options

| Service                                                      | Monthly Cost (INR) |
| ------------------------------------------------------------ | ------------------ |
| Basic support (bug fixes, content updates up to 5 hrs/month) | ₹5,000/month       |
| Standard support (10 hrs/month + monitoring)                 | ₹8,000/month       |
| Premium support (20 hrs/month + priority response)           | ₹15,000/month      |

---

## 11. Quick Reference

| Item                            | Amount                    |
| ------------------------------- | ------------------------- |
| **Budget Tier (recommended)**   | **₹75,000 – ₹90,000**     |
| **Standard Tier**               | **₹1,10,000 – ₹1,28,000** |
| **Premium Tier**                | **₹1,50,000 – ₹1,75,000** |
| Hourly rate (if billing hourly) | ₹800/hr                   |
| Estimated effort                | ~160 hours                |
| Timeline                        | 3–6 weeks                 |

_This budget is valid for 30 days from the date above. Rates assume clear requirements, timely feedback, and prompt access to Sanity project admin credentials._

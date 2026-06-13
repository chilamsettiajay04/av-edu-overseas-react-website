import { defineType, defineField } from "sanity";

export default defineType({
  name: "destination",
  title: "Destination (Country)",
  type: "document",
  fields: [
    // ── Identity ──
    defineField({
      name: "destination_sort_order",
      title: "Sort Order",
      description: "Lower numbers appear first.",
      type: "number",
      initialValue: 1,
    }),
    defineField({
      name: "destination_name",
      title: "Country Name",
      description: 'Display name e.g. "United Kingdom", "Canada".',
      type: "string",
      initialValue: "United Kingdom",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "destination_slug",
      title: "URL Slug",
      description:
        "URL-friendly identifier e.g. 'united-kingdom'. Auto-generated from the country name if left empty.",
      type: "slug",
      options: { source: "destination_name" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "destination_tagline",
      title: "Tagline",
      description: "Short tagline shown under the country name on the detail hero.",
      type: "string",
      initialValue:
        "World-class education in the heart of history. Your journey to academic excellence begins here.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "destination_region",
      title: "Region Label",
      description:
        'Uppercase region badge e.g. "EUROPEAN EXCELLENCE", "NORTH AMERICAN EXCELLENCE".',
      type: "string",
      initialValue: "EUROPEAN EXCELLENCE",
    }),

    // ── Hero & Media ──
    defineField({
      name: "destination_hero_image_url",
      title: "Hero Background Image URL",
      type: "url",
      initialValue:
        "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=2400&q=80",
    }),
    defineField({
      name: "destination_overview_heading",
      title: "Overview — Sub-Heading",
      description: "e.g. 'Where tradition meets future innovation'.",
      type: "string",
      initialValue: "Where tradition meets future innovation",
    }),
    defineField({
      name: "destination_overview_description",
      title: "Overview — Description Body",
      description: "Detailed paragraph about the country's education and opportunities.",
      type: "text",
      initialValue:
        "The United Kingdom is home to some of the world's oldest and most prestigious universities. From the historic spires of Oxford to the cutting-edge labs of Imperial College London, students benefit from a global perspective and a two-year post-study work visa.",
    }),

    // ── Cost & Stats ──
    defineField({
      name: "destination_cost_of_study_per_year",
      title: "Cost of Study (full description)",
      description: 'e.g. "£10,000 – £38,000 per year".',
      type: "string",
      initialValue: "£10,000 – £38,000 per year",
    }),
    defineField({
      name: "destination_cost_of_study_short",
      title: "Cost of Study (short format)",
      description: 'Compact version for the stats bar e.g. "£10k — £38k".',
      type: "string",
      initialValue: "£10k — £38k",
    }),
    defineField({
      name: "destination_cost_of_living_per_month",
      title: "Cost of Living (full description)",
      description: 'e.g. "£800 – £1,300 per month".',
      type: "string",
      initialValue: "£800 – £1,300 per month",
    }),
    defineField({
      name: "destination_cost_of_living_short",
      title: "Cost of Living (short format)",
      description: 'Compact version for the stats bar e.g. "£800 — £1,300".',
      type: "string",
      initialValue: "£800 — £1,300",
    }),
    defineField({
      name: "destination_global_ranking_short",
      title: "Global Ranking (short format)",
      description: 'e.g. "8 Top 100", "5 Top 100".',
      type: "string",
      initialValue: "8 Top 100",
    }),
    defineField({
      name: "destination_work_rights_short",
      title: "Work Rights (short format)",
      description: 'e.g. "2 Year Post-Grad", "Up to 3 Years PGWP".',
      type: "string",
      initialValue: "2 Year Post-Grad",
    }),

    // ── Highlights ──
    defineField({
      name: "destination_key_highlights",
      title: "Key Highlights",
      description: "Bullet-point list of key selling points about the country.",
      type: "array",
      of: [{ type: "string" }],
      initialValue: [
        "Access to the world's top 3 universities",
        "Central location for European travel",
        "Strong job market for STEM graduates",
        "Diverse, multicultural society",
      ],
    }),

    // ── Fun Fact ──
    defineField({
      name: "destination_fun_fact_label",
      title: "Fun Fact — Label",
      description: 'Small uppercase label above the fun fact e.g. "Historical Insight".',
      type: "string",
      initialValue: "Historical Insight",
    }),
    defineField({
      name: "destination_fun_fact_text",
      title: "Fun Fact — Text",
      description: "The actual fun fact quote displayed on the detail page.",
      type: "text",
      initialValue:
        "The University of Oxford is the oldest university in the English-speaking world, with teaching dating back to 1096.",
    }),
    defineField({
      name: "destination_fun_fact_bg_image",
      title: "Fun Fact — Background Image URL",
      type: "url",
      description: "Optional background image for the fun fact section.",
    }),
    // ── Universities ──
    defineField({
      name: "destination_universities",
      title: "Leading Universities",
      description: "List of notable universities with optional badges.",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "university_name",
              title: "University Name",
              type: "string",
              initialValue: "University of Birmingham",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "university_badge",
              title: "Badge / Tag",
              description: 'e.g. "RUSSELL GROUP", "TOP 10", "IVY LEAGUE".',
              type: "string",
              initialValue: "RUSSELL GROUP",
            }),
          ],
        },
      ],
      initialValue: [
        { university_name: "University of Birmingham", university_badge: "RUSSELL GROUP" },
        { university_name: "Coventry University", university_badge: "MODERN" },
        { university_name: "Teesside University", university_badge: "DIGITAL" },
        { university_name: "University of Greenwich", university_badge: "LONDON" },
        { university_name: "Northumbria University", university_badge: "NEWCASTLE" },
        { university_name: "University of Hertfordshire", university_badge: "RISING" },
        { university_name: "University of Sunderland", university_badge: "MODERN" },
        { university_name: "University of East London", university_badge: "LONDON" },
        { university_name: "Middlesex University", university_badge: "LONDON" },
        { university_name: "Queen Mary University of London", university_badge: "RUSSELL GROUP" },
        { university_name: "Cardiff University", university_badge: "RUSSELL GROUP" },
        { university_name: "University of Liverpool", university_badge: "RUSSELL GROUP" },
        { university_name: "University of Leeds", university_badge: "RUSSELL GROUP" },
        { university_name: "University of Sheffield", university_badge: "RUSSELL GROUP" },
        { university_name: "BPP University", university_badge: "SPECIALIST" },
        { university_name: "Anglia Ruskin University", university_badge: "MODERN" },
        { university_name: "Cardiff Metropolitan University", university_badge: "MODERN" },
        { university_name: "University of Chester", university_badge: "MODERN" },
        { university_name: "De Montfort University", university_badge: "RISING" },
        { university_name: "University of East Anglia", university_badge: "TOP 25" },
        { university_name: "Edinburgh Napier University", university_badge: "MODERN" },
        { university_name: "Keele University", university_badge: "RISING" },
        { university_name: "University of Law", university_badge: "SPECIALIST" },
        { university_name: "Newcastle University", university_badge: "RUSSELL GROUP" },
        { university_name: "Sheffield Hallam University", university_badge: "MODERN" },
      ],
    }),

    // ── Visa Options ──
    defineField({
      name: "destination_visa_options",
      title: "Visa Options",
      description: "Available visa pathways for students and workers.",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "visa_option_name",
              title: "Visa Name",
              type: "string",
              initialValue: "Graduate Route (2 Years)",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "visa_option_description",
              title: "Visa Description",
              type: "text",
              initialValue: "Stay in the UK for at least 2 years after completing your course.",
            }),
          ],
        },
      ],
      initialValue: [
        {
          visa_option_name: "Graduate Route (2 Years)",
          visa_option_description:
            "Stay in the UK for at least 2 years after completing your course.",
        },
        {
          visa_option_name: "Skilled Worker Visa",
          visa_option_description: "For long-term employment with a licensed employer.",
        },
        {
          visa_option_name: "Global Talent Visa",
          visa_option_description: "For leaders in academia, research, or arts.",
        },
      ],
    }),

    // ── Detail Page Labels ──
    defineField({
      name: "detail_page_stat_tuition_label",
      title: 'Stat Label — "Tuition / Year"',
      type: "string",
      initialValue: "Tuition / Year",
    }),
    defineField({
      name: "detail_page_stat_living_cost_label",
      title: 'Stat Label — "Living Cost"',
      type: "string",
      initialValue: "Living Cost",
    }),
    defineField({
      name: "detail_page_stat_ranking_label",
      title: 'Stat Label — "Global Ranking"',
      type: "string",
      initialValue: "Global Ranking",
    }),
    defineField({
      name: "detail_page_stat_work_rights_label",
      title: 'Stat Label — "Work Rights"',
      type: "string",
      initialValue: "Work Rights",
    }),
    defineField({
      name: "detail_page_overview_section_label",
      title: "Overview — Section Label",
      type: "string",
      initialValue: "Overview",
    }),
    defineField({
      name: "detail_page_key_highlights_heading",
      title: "Key Highlights — Heading",
      type: "string",
      initialValue: "Key Highlights",
    }),
    defineField({
      name: "detail_page_academics_immigration_label",
      title: "Academics Section — Eyebrow Label",
      type: "string",
      initialValue: "Academics & Immigration",
    }),
    defineField({
      name: "detail_page_academics_immigration_heading",
      title: "Academics Section — Heading",
      type: "string",
      initialValue: "Premier Institutions & Visa Pathways",
    }),
    defineField({
      name: "detail_page_universities_heading",
      title: "Universities — Heading",
      type: "string",
      initialValue: "Leading Universities",
    }),
    defineField({
      name: "detail_page_visa_options_heading",
      title: "Visa Options — Heading",
      type: "string",
      initialValue: "Visa Options",
    }),
    defineField({
      name: "detail_page_cta_label",
      title: "CTA — Section Eyebrow Label",
      type: "string",
      initialValue: "Get Started Today",
    }),
    defineField({
      name: "detail_page_cta_heading_template",
      title: "CTA — Heading Template",
      description:
        'Use {{country}} as placeholder for the country name. Default: "Ready to start your {{country}} journey?"',
      type: "string",
      initialValue: "Ready to start your {{country}} journey?",
    }),
    defineField({
      name: "detail_page_cta_description_template",
      title: "CTA — Description Template",
      description:
        'Use {{country}} as placeholder. Default: "Speak with our expert consultants today and receive a personalized roadmap for your {{country}} education."',
      type: "string",
      initialValue:
        "Speak with our expert consultants today and receive a personalized roadmap for your {{country}} education.",
    }),
    defineField({
      name: "detail_page_cta_button_text",
      title: "CTA — Button Text",
      type: "string",
      initialValue: "Book Free Consultation",
    }),
    defineField({
      name: "detail_page_browse_all_button_text",
      title: 'CTA — "Browse All Destinations" Button Text',
      type: "string",
      initialValue: "Browse All Destinations",
    }),
    defineField({
      name: "destination_sort_order",
      title: "Destination",
      description: "Lower numbers appear first.",
      type: "number",
      initialValue: 1,
    }),
  ],
});

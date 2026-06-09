import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { toast } from "sonner";
import { SiteLayout, PageHero, Reveal } from "@/components/site/SiteLayout";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — RAD Overseas Consultancy" },
      { name: "description", content: "Get in touch with RAD Overseas Consultancy — Miami and Hyderabad offices ready to support your journey." },
      { property: "og:title", content: "Get In Touch — RAD Overseas Consultancy" },
      { property: "og:description", content: "Reach our Miami or Hyderabad offices for personalized overseas guidance." },
    ],
  }),
  component: Contact,
});

const COUNTRIES = [
  "United Kingdom", "Canada", "Australia", "United States", "Germany",
  "New Zealand", "Ireland", "Dubai / UAE", "Singapore", "Not sure yet",
];

const OFFICES = [
  {
    title: "Miami Office",
    address: "117 N.W. 42nd Ave., Suite CU #3, Miami, FL 33126",
    phone: "+1 305-643-4771",
    email: "info@radoverseas.com",
    hours: "Mon–Fri 9:00am–6:00pm",
  },
  {
    title: "Hyderabad Office",
    address: "Banjara Hills, Hyderabad, Telangana, India 500034",
    phone: "+91 98765 43210",
    email: "india@radoverseas.com",
    hours: "Mon–Fri 10:00am–7:00pm (IST)",
  },
];

function Contact() {
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      (e.target as HTMLFormElement).reset();
      toast.success("Thanks! Our team will reach out within one business day.");
    }, 600);
  };

  return (
    <SiteLayout>
      <PageHero
        title="Get In Touch"
        subtitle="Tell us where you want to go — we'll help you get there"
        image="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=2400&q=80"
      />
      <section className="bg-background px-6 py-24">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <form onSubmit={onSubmit} className="space-y-5 bg-card p-8 shadow-sm sm:p-10">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <input required placeholder="Full Name" className="border border-border bg-transparent px-4 py-3 text-sm focus:border-gold focus:outline-none" />
                <input required type="email" placeholder="Email" className="border border-border bg-transparent px-4 py-3 text-sm focus:border-gold focus:outline-none" />
                <input required type="tel" placeholder="Phone" className="border border-border bg-transparent px-4 py-3 text-sm focus:border-gold focus:outline-none" />
                <select required defaultValue="" className="border border-border bg-transparent px-4 py-3 text-sm focus:border-gold focus:outline-none">
                  <option value="" disabled>Destination Country</option>
                  {COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <textarea required rows={5} placeholder="Tell us about your goals" className="w-full resize-none border border-border bg-transparent px-4 py-3 text-sm focus:border-gold focus:outline-none" />
              <button
                type="submit"
                disabled={submitting}
                className="w-full border border-gold bg-gold px-6 py-3 text-[11px] uppercase tracking-[0.3em] text-gold-foreground transition-all duration-300 hover:bg-transparent hover:text-gold disabled:opacity-60"
              >
                {submitting ? "Sending…" : "Submit"}
              </button>
            </form>
          </Reveal>

          <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {OFFICES.map((o) => (
              <Reveal key={o.title}>
                <div className="h-full bg-card p-8 shadow-sm">
                  <h3 className="text-xl font-semibold">{o.title}</h3>
                  <div className="mt-2 h-px w-10 bg-gold" />
                  <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
                    <li className="flex gap-3"><MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-gold" />{o.address}</li>
                    <li className="flex gap-3"><Phone className="mt-0.5 h-4 w-4 flex-shrink-0 text-gold" />{o.phone}</li>
                    <li className="flex gap-3"><Mail className="mt-0.5 h-4 w-4 flex-shrink-0 text-gold" />{o.email}</li>
                    <li className="flex gap-3"><Clock className="mt-0.5 h-4 w-4 flex-shrink-0 text-gold" />{o.hours}</li>
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { getSiteSettings, type SiteSettings } from "@/sanity/queries";
import { SiteSettingsProvider } from "@/lib/SiteSettingsContext";
import { organizationSchema, localBusinessSchema, jsonLdScript } from "@/lib/seo";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  loader: () => getSiteSettings(),
  head: ({ loaderData }) => {
    const s = loaderData as SiteSettings | undefined;
    const name = s?.companyName || "Av Edu Overseas Consultancy";
    const title = s?.seoTitle || `${name} — Your Gateway to Global Education & Immigration`;
    const desc =
      s?.seoDescription ||
      `${name} guides students and professionals through overseas education, study abroad, and immigration journeys across 25+ countries.`;
    const siteUrl = "https://rad-architecture-showcase.vercel.app";
    const orgSchema = organizationSchema(s || null);
    const bizSchema = localBusinessSchema(s || null);
    const schemas = bizSchema ? [orgSchema, bizSchema] : [orgSchema];

    return {
      meta: [
        { charSet: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "format-detection", content: "telephone=no" },
        { name: "theme-color", content: "#000000" },
        { name: "robots", content: "index, follow" },
        { title },
        { name: "description", content: desc },
        { name: "author", content: name },
        {
          name: "keywords",
          content:
            "overseas education, study abroad, immigration consultancy, student visa, career counseling, global education",
        },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "website" },
        { property: "og:site_name", content: name },
        { property: "og:locale", content: "en_US" },
        { property: "og:url", content: siteUrl },
        ...(s?.seoOgImage ? [{ property: "og:image", content: s.seoOgImage }] : []),
        ...(s?.seoOgImage ? [{ property: "og:image:width", content: "1200" }] : []),
        ...(s?.seoOgImage ? [{ property: "og:image:height", content: "630" }] : []),
        ...(s?.seoOgImage ? [{ property: "og:image:alt", content: title }] : []),
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: desc },
        ...(s?.seoOgImage ? [{ name: "twitter:image", content: s.seoOgImage }] : []),
        {
          name: "twitter:site",
          content: s?.socialLinks?.find((l) => l.platform === "twitter")?.handle
            ? `@${s.socialLinks.find((l) => l.platform === "twitter")!.handle!.replace("@", "")}`
            : "@AvEduOverseas",
        },
      ],
      links: [
        { rel: "canonical", href: siteUrl },
        { rel: "stylesheet", href: appCss },
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,400;1,500&family=Manrope:wght@300;400;500;600;700;800&display=swap",
        },
        { rel: "dns-prefetch", href: "https://fonts.googleapis.com" },
        { rel: "dns-prefetch", href: "https://fonts.gstatic.com" },
      ],
      scripts: schemas.map(jsonLdScript),
    };
  },
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const siteSettings = Route.useLoaderData() as SiteSettings | null;

  return (
    <QueryClientProvider client={queryClient}>
      <SiteSettingsProvider value={siteSettings}>
        <Outlet />
      </SiteSettingsProvider>
    </QueryClientProvider>
  );
}

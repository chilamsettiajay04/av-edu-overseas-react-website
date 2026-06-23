import { Outlet, Link, useLoaderData, useRouteError, isRouteErrorResponse, useLocation } from "react-router-dom";
import { useEffect } from "react";

import { reportLovableError } from "../lib/lovable-error-reporting";
import { getSiteSettings, type SiteSettings } from "@/sanity/queries";
import { SiteSettingsProvider } from "@/lib/SiteSettingsContext";

export async function rootLoader() {
  return getSiteSettings();
}

export function RootLayout() {
  const siteSettings = useLoaderData() as SiteSettings | null;
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    const s = siteSettings;
    const name = s?.companyName || "Av Edu Overseas Consultancy";
    document.title = s?.seoTitle || `${name} — Your Gateway to Global Education & Immigration`;
    const favicon = s?.companyShortLogoLight || s?.companyShortLogoDark || "/companyShortLogoLight.png";
    const link = document.querySelector<HTMLLinkElement>('link[rel="icon"]');
    if (link) link.href = favicon;
  }, [siteSettings]);

  return (
    <SiteSettingsProvider value={siteSettings}>
      <Outlet />
    </SiteSettingsProvider>
  );
}

export function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  useEffect(() => {
    reportLovableError(error instanceof Error ? error : new Error(String(error)), {
      boundary: "root_error_component",
    });
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
            onClick={() => window.location.reload()}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export function NotFoundPage() {
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

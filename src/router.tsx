import { createBrowserRouter } from "react-router-dom";
import { RootLayout, rootLoader, ErrorPage, NotFoundPage } from "./routes/__root";
import HomePage from "./routes/index";
import AboutPage from "./routes/about";
import ContactPage from "./routes/contact";
import DestinationsPage from "./routes/destinations";
import DestinationDetailPage, { DestinationErrorPage } from "./routes/destinations.$slug";
import ServicesPage from "./routes/services";
import TestimonialsPage from "./routes/testimonials";
import PrivacyPolicyPage from "./routes/privacy-policy";
import TermsPage from "./routes/terms-and-conditions";

function PageSkeleton() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-muted-foreground border-t-primary" />
    </div>
  );
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    loader: rootLoader,
    errorElement: <ErrorPage />,
    HydrateFallback: PageSkeleton,
    children: [
      { index: true, element: <HomePage />, loader: HomePage.loader },
      { path: "about", element: <AboutPage />, loader: AboutPage.loader },
      { path: "contact", element: <ContactPage />, loader: ContactPage.loader },
      {
        path: "destinations",
        children: [
          { index: true, element: <DestinationsPage />, loader: DestinationsPage.loader },
          {
            path: ":slug",
            element: <DestinationDetailPage />,
            loader: DestinationDetailPage.loader,
            errorElement: <DestinationErrorPage />,
          },
        ],
      },
      { path: "services", element: <ServicesPage />, loader: ServicesPage.loader },
      { path: "testimonials", element: <TestimonialsPage />, loader: TestimonialsPage.loader },
      { path: "privacy-policy", element: <PrivacyPolicyPage />, loader: PrivacyPolicyPage.loader },
      { path: "terms-and-conditions", element: <TermsPage />, loader: TermsPage.loader },
    ],
  },
  { path: "*", element: <NotFoundPage /> },
]);

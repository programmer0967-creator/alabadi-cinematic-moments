import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { Packages } from "@/components/site/Packages";
import { Equipment } from "@/components/site/Equipment";
import { Portfolio } from "@/components/site/Portfolio";
import { Footer } from "@/components/site/Footer";
import { LanguageProvider, useLang } from "@/lib/i18n";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "العبادي للإنتاج الفني والإعلامي · Al-Abadi Production" },
      {
        name: "description",
        content:
          "تصوير سينمائي ومونتاج احترافي للأفراح والمناسبات بجودة 4K. باقات مميزة من العبادي للإنتاج الفني والإعلامي.",
      },
      { property: "og:title", content: "Al-Abadi for Artistic and Media Production" },
      {
        property: "og:description",
        content: "Elegant Simplicity. A Moment That Lasts. Cinematic wedding & event production in 4K.",
      },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;800;900&family=Inter:wght@400;600;800;900&display=swap",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <LanguageProvider>
      <Shell />
    </LanguageProvider>
  );
}

function Shell() {
  const { dir } = useLang();
  return (
    <div dir={dir} className="min-h-screen bg-background text-foreground">
      <Nav />
      <main>
        <Hero />
        <Packages />
        <Equipment />
        <Portfolio />
      </main>
      <Footer />
    </div>
  );
}

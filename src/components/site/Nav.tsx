import { Camera, Globe } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { useSettings, whatsappLink } from "@/hooks/useSiteData";
import { Link } from "@tanstack/react-router";

export function Nav() {
  const { t, lang, setLang } = useLang();
  const settings = useSettings();
  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl bg-background/70 border-b border-border/50">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2 font-display">
          <span className="w-9 h-9 rounded-lg bg-gradient-primary grid place-items-center">
            <Camera className="w-5 h-5 text-primary-foreground" />
          </span>
          <span className="font-extrabold tracking-tight">{t("brand")}</span>
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          <a href="#packages" className="hover:text-foreground transition">{t("navPackages")}</a>
          <a href="#equipment" className="hover:text-foreground transition">{t("navEquipment")}</a>
          <a href="#portfolio" className="hover:text-foreground transition">{t("navPortfolio")}</a>
          <a href="#contact" className="hover:text-foreground transition">{t("navContact")}</a>
        </nav>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setLang(lang === "ar" ? "en" : "ar")}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full border border-border hover:border-primary hover:text-primary transition text-xs font-bold"
            aria-label="Toggle language"
          >
            <Globe className="w-4 h-4" />
            {lang === "ar" ? "EN" : "ع"}
          </button>
          <a
            href={whatsappLink(settings)}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-bold hover:shadow-glow transition"
          >
            {t("bookNow")}
          </a>
        </div>
      </div>
    </header>
  );
}

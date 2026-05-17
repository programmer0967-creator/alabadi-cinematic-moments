import { Camera, Facebook, Instagram, Phone, Youtube } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { useSettings, whatsappLink } from "@/hooks/useSiteData";

export function Footer() {
  const { t } = useLang();
  const s = useSettings();

  return (
    <footer id="contact" className="relative pt-24 pb-10 border-t border-border/60 overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div className="absolute left-1/2 -translate-x-1/2 top-0 w-[600px] h-[300px] rounded-full bg-primary/10 blur-[120px]" />

      <div className="container mx-auto px-6 relative">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-4xl md:text-6xl font-extrabold mb-4">{t("ctaTitle")}</h2>
          <p className="text-muted-foreground mb-8">{t("ctaDesc")}</p>
          <a
            href={whatsappLink(s)}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-primary text-primary-foreground shadow-glow hover:scale-105 transition font-extrabold text-justify"
          >
            <Phone className="w-5 h-5" />
            {s?.phone ?? "+967 779 038 283"}
          </a>
        </div>

        <div className="grid md:grid-cols-3 gap-10 pt-12 border-t border-border/60">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-9 h-9 rounded-lg bg-gradient-primary grid place-items-center">
                <Camera className="w-5 h-5 text-primary-foreground" />
              </span>
              <span className="font-extrabold">{t("brand")}</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">{t("brandSub")}</p>
          </div>
          <div>
            <h4 className="font-extrabold mb-4">{t("followUs")}</h4>
            <div className="flex gap-3">
              {[
                { Icon: Instagram, href: s?.instagram },
                { Icon: Youtube, href: s?.youtube },
                { Icon: Facebook, href: s?.facebook },
              ]
                .filter((x) => x.href)
                .map(({ Icon, href }) => (
                  <a
                    key={href}
                    href={href!}
                    target="_blank"
                    rel="noreferrer"
                    className="w-11 h-11 rounded-full border border-border hover:border-primary hover:text-primary grid place-items-center transition"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
            </div>
            {s?.social_handle && <p className="text-sm text-muted-foreground mt-3">@{s.social_handle}</p>}
          </div>
          <div>
            <h4 className="font-extrabold mb-4">{t("directContact")}</h4>
            <a href={whatsappLink(s)} className="block text-sm text-muted-foreground hover:text-primary transition">
              &nbsp; 779038283 967+
            </a>
            <p className="text-sm text-muted-foreground mt-2">{t("photographer")}</p>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border/60 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Al-Abadi for Artistic and Media Production. {t("rights")}.
        </div>
      </div>
    </footer>
  );
}

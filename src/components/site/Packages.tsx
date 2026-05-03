import { Check, Crown, Sparkles, Star } from "lucide-react";
import { motion } from "framer-motion";
import { useLang } from "@/lib/i18n";
import { usePackages, useSettings, whatsappLink } from "@/hooks/useSiteData";

const ICONS = [Star, Sparkles, Crown];

export function Packages() {
  const { t, lang } = useLang();
  const { data: packages } = usePackages();
  const settings = useSettings();

  return (
    <section id="packages" className="relative py-28">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-primary font-bold text-sm tracking-widest">{t("packagesKicker")}</span>
          <h2 className="text-4xl md:text-5xl font-extrabold mt-3 mb-4">{t("packagesTitle")}</h2>
          <p className="text-muted-foreground">{t("packagesDesc")}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {packages.map((p, idx) => {
            const Icon = ICONS[idx % 3];
            const name = lang === "ar" ? p.name_ar : p.name_en;
            const tagline = lang === "ar" ? p.tagline_ar : p.tagline_en;
            const badge = lang === "ar" ? p.badge_ar : p.badge_en;
            const features = lang === "ar" ? p.features_ar : p.features_en;
            return (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -8 }}
                className={`relative rounded-3xl p-8 bg-gradient-card border transition-colors duration-500 ${
                  p.accent ? "border-primary/60 shadow-glow" : "border-border hover:border-primary/40"
                }`}
              >
                {p.accent && (
                  <div className="absolute -top-4 right-8 px-4 py-1 rounded-full bg-gradient-primary text-primary-foreground text-xs font-extrabold">
                    {t("bestChoice")}
                  </div>
                )}
                <div className="flex items-center justify-between mb-6">
                  <div
                    className={`w-14 h-14 rounded-2xl grid place-items-center ${
                      p.accent ? "bg-gradient-primary" : "bg-primary/10 border border-primary/30"
                    }`}
                  >
                    <Icon className={`w-7 h-7 ${p.accent ? "text-primary-foreground" : "text-primary"}`} />
                  </div>
                  {badge && <span className="text-xs font-bold text-muted-foreground">{badge}</span>}
                </div>
                <h3 className="text-2xl font-extrabold mb-1">{name}</h3>
                {tagline && <p className="text-sm text-muted-foreground mb-6 italic">{tagline}</p>}
                {p.price && <div className="text-3xl font-extrabold text-gradient mb-6">{p.price}</div>}

                <ul className="space-y-3 mb-8">
                  {features.map((f, i) => (
                    <li key={i} className="flex gap-3 text-sm">
                      <span className="shrink-0 w-5 h-5 rounded-full bg-primary/15 grid place-items-center mt-0.5">
                        <Check className="w-3 h-3 text-primary" strokeWidth={3} />
                      </span>
                      <span className="text-foreground/90">{f}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href={whatsappLink(settings, (lang === "ar" ? "مرحباً، أرغب في حجز " : "Hello, I'd like to book ") + name)}
                  target="_blank"
                  rel="noreferrer"
                  className={`block w-full text-center px-6 py-3.5 rounded-full font-extrabold transition ${
                    p.accent
                      ? "bg-gradient-primary text-primary-foreground hover:shadow-glow"
                      : "border border-border hover:border-primary hover:text-primary"
                  }`}
                >
                  {t("bookPackage")}
                </a>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

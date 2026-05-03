import { Play } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { useLang } from "@/lib/i18n";
import { useMedia, type MediaRow, youtubeId } from "@/hooks/useSiteData";
import { MediaModal } from "./MediaModal";
import basic from "@/assets/portfolio/basic.jpg";

export function Portfolio() {
  const { t, lang } = useLang();
  const { data: items } = useMedia();
  const [active, setActive] = useState<MediaRow | null>(null);

  return (
    <section id="portfolio" className="relative py-28">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-primary font-bold text-sm tracking-widest">{t("portfolioKicker")}</span>
          <h2 className="text-4xl md:text-5xl font-extrabold mt-3">{t("portfolioTitle")}</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {items.map((w, i) => {
            const title = (lang === "ar" ? w.title_ar : w.title_en) ?? "";
            const tag = (lang === "ar" ? w.tag_ar : w.tag_en) ?? "";
            const thumb =
              w.thumbnail_url ||
              (w.type === "youtube" ? `https://img.youtube.com/vi/${youtubeId(w.url)}/maxresdefault.jpg` : w.url) ||
              basic;
            return (
              <motion.button
                key={w.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                onClick={() => setActive(w)}
                className="group relative aspect-square md:aspect-[4/5] rounded-2xl overflow-hidden border border-border hover:border-primary transition text-start"
              >
                <img
                  src={thumb}
                  alt={title}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/30 to-transparent opacity-90 group-hover:opacity-100 transition" />
                <div className="absolute inset-0 grid place-items-center">
                  <span className="w-16 h-16 rounded-full bg-primary/90 backdrop-blur grid place-items-center group-hover:scale-110 group-hover:bg-primary transition shadow-glow">
                    <Play className="w-7 h-7 text-primary-foreground translate-x-0.5" fill="currentColor" />
                  </span>
                </div>
                <div className="absolute bottom-0 inset-x-0 p-5">
                  {tag && <div className="text-xs font-bold text-primary mb-1">{tag}</div>}
                  <div className="font-extrabold">{title}</div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
      <MediaModal item={active} onClose={() => setActive(null)} />
    </section>
  );
}

import camera from "@/assets/equipment-camera.jpg";
import drone from "@/assets/equipment-drone.jpg";
import ronin from "@/assets/equipment-ronin.jpg";
import edit from "@/assets/equipment-edit.jpg";
import { motion } from "framer-motion";
import { useLang } from "@/lib/i18n";

export function Equipment() {
  const { t } = useLang();
  const items = [
    { img: camera, key: "eq3cam" as const, en: "3 Pro Cameras" },
    { img: drone, key: "eqDrone" as const, en: "Drone Aerial" },
    { img: ronin, key: "eqRonin" as const, en: "Ronin X2 Gimbal" },
    { img: edit, key: "eqEdit" as const, en: "Edit Suite" },
  ];
  return (
    <section id="equipment" className="relative py-28 border-y border-border/60 bg-card/20">
      <div className="container mx-auto px-6">
        <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
          <div>
            <span className="text-primary font-bold text-sm tracking-widest">{t("equipKicker")}</span>
            <h2 className="text-4xl md:text-5xl font-extrabold mt-3">{t("equipTitle")}</h2>
          </div>
          <p className="text-muted-foreground max-w-md">{t("equipDesc")}</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {items.map((it, i) => (
            <motion.div
              key={it.en}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative aspect-[4/5] rounded-2xl overflow-hidden border border-border hover:border-primary/60 transition"
            >
              <img
                src={it.img}
                alt={it.en}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
              <div className="absolute bottom-0 inset-x-0 p-5">
                <div className="text-xs font-bold text-primary tracking-widest mb-1">{it.en}</div>
                <div className="font-extrabold text-lg">{t(it.key)}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

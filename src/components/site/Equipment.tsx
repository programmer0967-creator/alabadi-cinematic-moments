import camera from "@/assets/equipment-camera.jpg";
import drone from "@/assets/equipment-drone.jpg";
import ronin from "@/assets/equipment-ronin.jpg";
import edit from "@/assets/equipment-edit.jpg";

const items = [
  { img: camera, title: "3 كاميرات سينمائية", en: "3 Pro Cameras" },
  { img: drone, title: "تصوير جوي بالدرون", en: "Drone Aerial" },
  { img: ronin, title: "رونين X2 للثبات", en: "Ronin X2 Gimbal" },
  { img: edit, title: "استوديو مونتاج", en: "Cinematic Edit Suite" },
];

export function Equipment() {
  return (
    <section id="equipment" className="relative py-28 border-y border-border/60 bg-card/20">
      <div className="container mx-auto px-6">
        <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
          <div>
            <span className="text-primary font-bold text-sm tracking-widest">EQUIPMENT</span>
            <h2 className="text-4xl md:text-5xl font-extrabold mt-3">
              معدات <span className="text-gradient">حديثة احترافية</span>
            </h2>
          </div>
          <p className="text-muted-foreground max-w-md">
            نعتمد على أحدث المعدات السينمائية لضمان جودة استثنائية في كل لقطة.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {items.map((it) => (
            <div
              key={it.en}
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
                <div className="font-extrabold text-lg">{it.title}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

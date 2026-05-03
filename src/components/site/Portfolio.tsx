import basic from "@/assets/portfolio/basic.jpg";
import mobility from "@/assets/portfolio/mobility.jpg";
import vip from "@/assets/portfolio/vip.jpg";
import { Play } from "lucide-react";

const works = [
  { img: basic, title: "حفل زفاف · صنعاء", tag: "سينمائي" },
  { img: mobility, title: "أوبريت العرس", tag: "VIP" },
  { img: vip, title: "تصوير خارجي · إب", tag: "درون" },
  { img: basic, title: "دعوة زفاف", tag: "أساسي" },
  { img: mobility, title: "موكب العريس", tag: "ملكي" },
  { img: vip, title: "صور فوتوغرافية", tag: "بورتريه" },
];

export function Portfolio() {
  return (
    <section id="portfolio" className="relative py-28">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-primary font-bold text-sm tracking-widest">OUR WORK</span>
          <h2 className="text-4xl md:text-5xl font-extrabold mt-3">
            نماذج من <span className="text-gradient">أعمالنا</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {works.map((w, i) => (
            <button
              key={i}
              className="group relative aspect-square md:aspect-[4/5] rounded-2xl overflow-hidden border border-border hover:border-primary transition text-start"
            >
              <img
                src={w.img}
                alt={w.title}
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
                <div className="text-xs font-bold text-primary mb-1">{w.tag}</div>
                <div className="font-extrabold">{w.title}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

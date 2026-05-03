import heroImg from "@/assets/hero.jpg";
import { ArrowLeft, Play } from "lucide-react";

const WHATSAPP = "https://wa.me/967779038283";

export function Hero() {
  return (
    <section id="top" className="relative min-h-screen flex items-center overflow-hidden pt-16">
      <img
        src={heroImg}
        alt="Cinematic videography by Al-Abadi"
        className="absolute inset-0 w-full h-full object-cover opacity-40"
        width={1920}
        height={1080}
      />
      <div className="absolute inset-0 bg-gradient-hero" />
      <div className="absolute inset-0 grid-pattern opacity-40" />
      <div className="absolute -left-40 top-20 w-[500px] h-[500px] rounded-full bg-primary/20 blur-[120px]" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl animate-fade-up">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-primary text-xs font-bold mb-6">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            الإنتاج الفني والإعلامي · صنعاء
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold leading-[1.05] mb-6">
            العباد<span className="text-gradient">ي</span>
            <span className="block text-2xl md:text-4xl font-bold mt-3 text-muted-foreground">
              للإنتاج الفني والإعلامي
            </span>
          </h1>
          <p className="text-xl md:text-2xl font-bold mb-3">
            بساطة أنيقة<span className="text-primary"> ... </span>لحظة تدوم
          </p>
          <p className="text-base md:text-lg text-muted-foreground mb-10 max-w-xl">
            Elegant Simplicity. A Moment That Lasts. نُحوّل أجمل لحظاتك إلى قصة سينمائية
            بتصوير احترافي ومونتاج إبداعي بجودة 4K.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-3 px-7 py-4 rounded-full bg-gradient-primary text-primary-foreground font-extrabold shadow-glow hover:scale-[1.03] transition"
            >
              احجز عبر واتساب
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition" />
            </a>
            <a
              href="#portfolio"
              className="inline-flex items-center gap-3 px-7 py-4 rounded-full border border-border bg-card/50 backdrop-blur font-bold hover:border-primary/60 transition"
            >
              <Play className="w-5 h-5 text-primary" fill="currentColor" />
              شاهد أعمالنا
            </a>
          </div>

          <div className="mt-16 grid grid-cols-3 gap-4 max-w-lg">
            {[
              { n: "+150", l: "حفل موثّق" },
              { n: "4K", l: "Ultra HD" },
              { n: "3", l: "كاميرات احترافية" },
            ].map((s) => (
              <div key={s.l} className="text-center md:text-right">
                <div className="text-3xl md:text-4xl font-extrabold text-gradient">{s.n}</div>
                <div className="text-xs text-muted-foreground mt-1">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

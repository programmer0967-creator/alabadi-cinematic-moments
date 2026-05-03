import { Check, Crown, Sparkles, Star } from "lucide-react";

const WHATSAPP = "https://wa.me/967779038283";

const packages = [
  {
    id: "basic",
    name: "باقة الأساس",
    en: "Basic Package",
    badge: "العرض الأول",
    icon: Star,
    tagline: "بساطة أنيقة... لحظة تدوم",
    features: [
      "تصوير دعوة الزفاف من البيت إلى المحل",
      "فيديو سينمائي بكاميرا احترافية",
      "مونتاج وتلوين احترافي",
      "تسليم بجودة HD / 4K",
    ],
    accent: false,
  },
  {
    id: "mobility",
    name: "باقة التنقل والإبداع",
    en: "Mobility & Creativity",
    badge: "العرض الثاني",
    icon: Sparkles,
    tagline: "تنوع لقطات... إبداع بلا حدود",
    features: [
      "من البيت → المحل → موقع خارجي",
      "تصوير احترافي بلقطات متنوعة و Slow Motion",
      "عدد 2 رونين لثبات وحركة ناعمة",
      "تصوير درون للقطات جوية مميزة",
      "مونتاج سينمائي متكامل وإخراج إبداعي",
    ],
    accent: false,
  },
  {
    id: "vip",
    name: "الباقة الملكية VIP",
    en: "Royal VIP",
    badge: "العرض الثالث",
    icon: Crown,
    tagline: "أوبريت زفاف متكامل... تجربة فاخرة لا تُنسى",
    features: [
      "تغطية كاملة: البيت، الاستوديو، المحل، الملعب",
      "3 كاميرات احترافية بزوايا متعددة",
      "تصوير فيديو + صور فوتوغرافية معدّلة",
      "تصوير درون احترافي × 2",
      "مونتاج أوبريت: قصة، إخراج، مؤثرات، ألوان سينمائية",
      "تسليم فاخر بجودة 4K Ultra HD",
    ],
    accent: true,
  },
];

export function Packages() {
  return (
    <section id="packages" className="relative py-28">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-primary font-bold text-sm tracking-widest">PACKAGES</span>
          <h2 className="text-4xl md:text-5xl font-extrabold mt-3 mb-4">
            باقاتنا <span className="text-gradient">المميزة</span>
          </h2>
          <p className="text-muted-foreground">
            ثلاث تجارب مصمّمة بعناية لتناسب كل ذوق ومناسبة — من البساطة الأنيقة إلى الفخامة الملكية.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {packages.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.id}
                className={`relative rounded-3xl p-8 bg-gradient-card border transition-all duration-500 hover:-translate-y-2 ${
                  p.accent
                    ? "border-primary/60 shadow-glow"
                    : "border-border hover:border-primary/40"
                }`}
              >
                {p.accent && (
                  <div className="absolute -top-4 right-8 px-4 py-1 rounded-full bg-gradient-primary text-primary-foreground text-xs font-extrabold">
                    الاختيار الأمثل
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
                  <span className="text-xs font-bold text-muted-foreground">{p.badge}</span>
                </div>
                <h3 className="text-2xl font-extrabold mb-1">{p.name}</h3>
                <div className="text-xs text-primary font-bold mb-4">{p.en}</div>
                <p className="text-sm text-muted-foreground mb-6 italic">{p.tagline}</p>

                <ul className="space-y-3 mb-8">
                  {p.features.map((f) => (
                    <li key={f} className="flex gap-3 text-sm">
                      <span className="shrink-0 w-5 h-5 rounded-full bg-primary/15 grid place-items-center mt-0.5">
                        <Check className="w-3 h-3 text-primary" strokeWidth={3} />
                      </span>
                      <span className="text-foreground/90">{f}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href={`${WHATSAPP}?text=${encodeURIComponent("مرحباً، أرغب في حجز " + p.name)}`}
                  target="_blank"
                  rel="noreferrer"
                  className={`block w-full text-center px-6 py-3.5 rounded-full font-extrabold transition ${
                    p.accent
                      ? "bg-gradient-primary text-primary-foreground hover:shadow-glow"
                      : "border border-border hover:border-primary hover:text-primary"
                  }`}
                >
                  احجز هذه الباقة
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

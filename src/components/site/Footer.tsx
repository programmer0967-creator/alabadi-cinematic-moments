import { Camera, Facebook, Instagram, Phone, Youtube } from "lucide-react";

const WHATSAPP = "https://wa.me/967779038283";

export function Footer() {
  return (
    <footer id="contact" className="relative pt-24 pb-10 border-t border-border/60 overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div className="absolute left-1/2 -translate-x-1/2 top-0 w-[600px] h-[300px] rounded-full bg-primary/10 blur-[120px]" />

      <div className="container mx-auto px-6 relative">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-4xl md:text-6xl font-extrabold mb-4">
            اجعل ذكرياتك <span className="text-gradient">فيديو يروي قصتك</span>
          </h2>
          <p className="text-muted-foreground mb-8">
            تواصل معنا الآن لحجز موعدك ونصمّم لك تجربة سينمائية لا تُنسى.
          </p>
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-primary text-primary-foreground font-extrabold shadow-glow hover:scale-105 transition"
          >
            <Phone className="w-5 h-5" />
            +967 779 038 283
          </a>
        </div>

        <div className="grid md:grid-cols-3 gap-10 pt-12 border-t border-border/60">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-9 h-9 rounded-lg bg-gradient-primary grid place-items-center">
                <Camera className="w-5 h-5 text-primary-foreground" />
              </span>
              <span className="font-extrabold">AL-ABADI</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              العبادي للإنتاج الفني والإعلامي — تصوير سينمائي ومونتاج احترافي للأفراح والمناسبات.
            </p>
          </div>
          <div>
            <h4 className="font-extrabold mb-4">تابعنا</h4>
            <div className="flex gap-3">
              {[
                { icon: Instagram, href: "https://instagram.com/llcxrn" },
                { icon: Youtube, href: "https://youtube.com/@llcxrn" },
                { icon: Facebook, href: "https://facebook.com/llcxrn" },
              ].map(({ icon: Icon, href }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="w-11 h-11 rounded-full border border-border hover:border-primary hover:text-primary grid place-items-center transition"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
            <p className="text-sm text-muted-foreground mt-3">@llcxrn</p>
          </div>
          <div>
            <h4 className="font-extrabold mb-4">تواصل مباشر</h4>
            <a href={WHATSAPP} className="block text-sm text-muted-foreground hover:text-primary transition">
              واتساب: +967 779 038 283
            </a>
            <p className="text-sm text-muted-foreground mt-2">المصور / محمد العبادي</p>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border/60 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Al-Abadi for Artistic and Media Production. جميع الحقوق محفوظة.
        </div>
      </div>
    </footer>
  );
}

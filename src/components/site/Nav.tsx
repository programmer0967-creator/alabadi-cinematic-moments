import { Camera } from "lucide-react";

const WHATSAPP = "https://wa.me/967779038283";

export function Nav() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl bg-background/70 border-b border-border/50">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2 font-display">
          <span className="w-9 h-9 rounded-lg bg-gradient-primary grid place-items-center">
            <Camera className="w-5 h-5 text-primary-foreground" />
          </span>
          <span className="font-extrabold tracking-tight">AL-ABADI</span>
        </a>
        <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          <a href="#packages" className="hover:text-foreground transition">الباقات</a>
          <a href="#equipment" className="hover:text-foreground transition">المعدات</a>
          <a href="#portfolio" className="hover:text-foreground transition">أعمالنا</a>
          <a href="#contact" className="hover:text-foreground transition">تواصل</a>
        </nav>
        <a
          href={WHATSAPP}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-bold hover:shadow-glow transition"
        >
          احجز الآن
        </a>
      </div>
    </header>
  );
}

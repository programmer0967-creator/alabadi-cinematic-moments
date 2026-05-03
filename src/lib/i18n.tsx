import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "ar" | "en";

type Dict = Record<string, { ar: string; en: string }>;

export const T: Dict = {
  brand: { ar: "العبادي", en: "AL-ABADI" },
  brandSub: { ar: "للإنتاج الفني والإعلامي", en: "Artistic & Media Production" },
  navPackages: { ar: "الباقات", en: "Packages" },
  navEquipment: { ar: "المعدات", en: "Equipment" },
  navPortfolio: { ar: "أعمالنا", en: "Our Work" },
  navContact: { ar: "تواصل", en: "Contact" },
  bookNow: { ar: "احجز الآن", en: "Book Now" },
  bookWhatsapp: { ar: "احجز عبر واتساب", en: "Book via WhatsApp" },
  watchWork: { ar: "شاهد أعمالنا", en: "Watch Our Work" },
  heroBadge: { ar: "الإنتاج الفني والإعلامي · صنعاء", en: "Artistic & Media Production · Sana'a" },
  heroSlogan: { ar: "بساطة أنيقة ... لحظة تدوم", en: "Elegant Simplicity. A Moment That Lasts." },
  heroDesc: {
    ar: "نُحوّل أجمل لحظاتك إلى قصة سينمائية بتصوير احترافي ومونتاج إبداعي بجودة 4K.",
    en: "We turn your most beautiful moments into a cinematic story with professional 4K production.",
  },
  statWeddings: { ar: "حفل موثّق", en: "Weddings" },
  statQuality: { ar: "Ultra HD", en: "Ultra HD" },
  statCameras: { ar: "كاميرات احترافية", en: "Pro Cameras" },
  packagesKicker: { ar: "PACKAGES", en: "PACKAGES" },
  packagesTitle: { ar: "باقاتنا المميزة", en: "Our Premium Packages" },
  packagesDesc: {
    ar: "ثلاث تجارب مصمّمة بعناية لتناسب كل ذوق ومناسبة.",
    en: "Three experiences crafted to suit every taste and occasion.",
  },
  bestChoice: { ar: "الاختيار الأمثل", en: "Best Choice" },
  bookPackage: { ar: "احجز هذه الباقة", en: "Book This Package" },
  equipKicker: { ar: "EQUIPMENT", en: "EQUIPMENT" },
  equipTitle: { ar: "معدات حديثة احترافية", en: "Modern Professional Gear" },
  equipDesc: {
    ar: "نعتمد على أحدث المعدات السينمائية لضمان جودة استثنائية في كل لقطة.",
    en: "We rely on the latest cinematic equipment to ensure exceptional quality in every shot.",
  },
  portfolioKicker: { ar: "OUR WORK", en: "OUR WORK" },
  portfolioTitle: { ar: "نماذج من أعمالنا", en: "Selected Work" },
  ctaTitle: { ar: "اجعل ذكرياتك فيديو يروي قصتك", en: "Turn your memories into a story" },
  ctaDesc: {
    ar: "تواصل معنا الآن لحجز موعدك ونصمّم لك تجربة سينمائية لا تُنسى.",
    en: "Contact us to book and we'll design an unforgettable cinematic experience.",
  },
  followUs: { ar: "تابعنا", en: "Follow Us" },
  directContact: { ar: "تواصل مباشر", en: "Direct Contact" },
  photographer: { ar: "المصور / محمد العبادي", en: "Photographer / Mohammed Al-Abadi" },
  rights: { ar: "جميع الحقوق محفوظة", en: "All rights reserved" },
  // Equipment
  eq3cam: { ar: "3 كاميرات سينمائية", en: "3 Cinematic Cameras" },
  eqDrone: { ar: "تصوير جوي بالدرون", en: "Drone Aerial" },
  eqRonin: { ar: "رونين X2 للثبات", en: "Ronin X2 Gimbal" },
  eqEdit: { ar: "استوديو مونتاج", en: "Edit Suite" },
};

interface Ctx {
  lang: Lang;
  dir: "rtl" | "ltr";
  t: (k: keyof typeof T) => string;
  setLang: (l: Lang) => void;
}

const LangCtx = createContext<Ctx | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("ar");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = (localStorage.getItem("lang") as Lang | null) ?? "ar";
    setLangState(saved);
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  const setLang = (l: Lang) => {
    setLangState(l);
    if (typeof window !== "undefined") localStorage.setItem("lang", l);
  };

  const value: Ctx = {
    lang,
    dir: lang === "ar" ? "rtl" : "ltr",
    t: (k) => T[k]?.[lang] ?? String(k),
    setLang,
  };
  return <LangCtx.Provider value={value}>{children}</LangCtx.Provider>;
}

export function useLang() {
  const ctx = useContext(LangCtx);
  if (!ctx) throw new Error("useLang must be used within LanguageProvider");
  return ctx;
}

export const pick = <T,>(lang: Lang, ar: T, en: T): T => (lang === "ar" ? ar : en);

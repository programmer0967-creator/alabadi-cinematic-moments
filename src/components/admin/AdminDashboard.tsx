import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Camera, LayoutGrid, Image as ImageIcon, Settings, LogOut, ExternalLink } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { PackagesAdmin } from "./PackagesAdmin";
import { MediaAdmin } from "./MediaAdmin";
import { SettingsAdmin } from "./SettingsAdmin";

type Tab = "packages" | "media" | "settings";

export function AdminDashboard() {
  const [tab, setTab] = useState<Tab>("packages");
  const [email, setEmail] = useState<string>("");

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setEmail(data.user?.email ?? ""));
  }, []);

  const tabs: { id: Tab; label: string; icon: typeof LayoutGrid }[] = [
    { id: "packages", label: "الباقات", icon: LayoutGrid },
    { id: "media", label: "الوسائط", icon: ImageIcon },
    { id: "settings", label: "الإعدادات", icon: Settings },
  ];

  return (
    <div dir="rtl" className="min-h-screen bg-background text-foreground font-display">
      <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="w-9 h-9 rounded-lg bg-gradient-primary grid place-items-center">
              <Camera className="w-5 h-5 text-primary-foreground" />
            </span>
            <div>
              <div className="font-extrabold text-sm">العبادي</div>
              <div className="text-[10px] text-muted-foreground">لوحة التحكم · {email}</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link
              to="/"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-full border border-border hover:border-primary text-xs font-bold"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              عرض الموقع
            </Link>
            <button
              onClick={() => supabase.auth.signOut()}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full border border-border hover:border-destructive hover:text-destructive text-xs font-bold"
            >
              <LogOut className="w-3.5 h-3.5" />
              خروج
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 py-6">
        <div className="flex flex-wrap gap-2 mb-8 p-1 rounded-full bg-card border border-border w-fit">
          {tabs.map((tb) => {
            const Icon = tb.icon;
            const active = tab === tb.id;
            return (
              <button
                key={tb.id}
                onClick={() => setTab(tb.id)}
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition ${
                  active
                    ? "bg-gradient-primary text-primary-foreground shadow-glow"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon className="w-4 h-4" />
                {tb.label}
              </button>
            );
          })}
        </div>

        {tab === "packages" && <PackagesAdmin />}
        {tab === "media" && <MediaAdmin />}
        {tab === "settings" && <SettingsAdmin />}
      </div>
    </div>
  );
}

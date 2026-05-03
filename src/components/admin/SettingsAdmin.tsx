import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { SiteSettings } from "@/hooks/useSiteData";
import { Loader2, Save } from "lucide-react";

export function SettingsAdmin() {
  const [s, setS] = useState<SiteSettings | null>(null);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    supabase
      .from("site_settings")
      .select("*")
      .eq("id", "main")
      .maybeSingle()
      .then(({ data }) => setS((data as any) ?? null));
  }, []);

  if (!s)
    return (
      <div className="grid place-items-center py-20">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </div>
    );

  const save = async () => {
    setSaving(true);
    const { id, ...rest } = s;
    const { error } = await supabase.from("site_settings").update(rest).eq("id", id);
    setSaving(false);
    setMsg(error ? error.message : "Saved ✓");
    setTimeout(() => setMsg(""), 2000);
  };

  const fields: { k: keyof SiteSettings; label: string; placeholder?: string }[] = [
    { k: "phone", label: "Phone (display)", placeholder: "+967 779 038 283" },
    { k: "whatsapp", label: "WhatsApp number (digits only)", placeholder: "967779038283" },
    { k: "instagram", label: "Instagram URL" },
    { k: "youtube", label: "YouTube URL" },
    { k: "facebook", label: "Facebook URL" },
    { k: "social_handle", label: "Social handle (without @)" },
  ];

  return (
    <div className="max-w-2xl">
      <h2 className="text-2xl font-extrabold mb-6">Contact & Social</h2>
      <div className="space-y-4 rounded-2xl border border-border bg-gradient-card p-5">
        {fields.map((f) => (
          <div key={f.k}>
            <label className="block text-[10px] uppercase tracking-wider text-muted-foreground mb-1 font-bold">
              {f.label}
            </label>
            <input
              value={(s[f.k] as string) ?? ""}
              onChange={(e) => setS({ ...s, [f.k]: e.target.value })}
              placeholder={f.placeholder}
              className="w-full px-3 py-2.5 rounded-lg bg-background border border-border focus:border-primary outline-none text-sm"
            />
          </div>
        ))}
        <div className="flex items-center gap-3 pt-2">
          <button
            onClick={save}
            disabled={saving}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-primary text-primary-foreground text-sm font-bold shadow-glow disabled:opacity-50"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            Save Changes
          </button>
          {msg && <span className="text-xs text-primary">{msg}</span>}
        </div>
      </div>
    </div>
  );
}

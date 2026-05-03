import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { PackageRow } from "@/hooks/useSiteData";
import { Loader2, Plus, Save, Trash2 } from "lucide-react";

export function PackagesAdmin() {
  const [rows, setRows] = useState<PackageRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [msg, setMsg] = useState("");

  const load = async () => {
    setLoading(true);
    const { data } = await supabase.from("packages").select("*").order("sort_order");
    setRows((data as any) ?? []);
    setLoading(false);
  };
  useEffect(() => {
    load();
  }, []);

  const update = (id: string, patch: Partial<PackageRow>) =>
    setRows((r) => r.map((x) => (x.id === id ? { ...x, ...patch } : x)));

  const save = async (row: PackageRow) => {
    setSavingId(row.id);
    const { id, ...rest } = row;
    const { error } = await supabase.from("packages").update(rest).eq("id", id);
    setSavingId(null);
    setMsg(error ? `Error: ${error.message}` : "Saved ✓");
    setTimeout(() => setMsg(""), 2000);
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this package?")) return;
    await supabase.from("packages").delete().eq("id", id);
    load();
  };

  const add = async () => {
    const slug = `pkg-${Date.now()}`;
    await supabase.from("packages").insert({
      slug,
      name_ar: "باقة جديدة",
      name_en: "New Package",
      features_ar: [],
      features_en: [],
      sort_order: rows.length + 1,
    });
    load();
  };

  if (loading)
    return (
      <div className="grid place-items-center py-20">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </div>
    );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-extrabold">Packages</h2>
        <div className="flex items-center gap-3">
          {msg && <span className="text-xs text-primary">{msg}</span>}
          <button
            onClick={add}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-primary text-primary-foreground text-sm font-bold shadow-glow hover:scale-105 transition"
          >
            <Plus className="w-4 h-4" />
            Add Package
          </button>
        </div>
      </div>

      <div className="space-y-5">
        {rows.map((p) => (
          <div key={p.id} className="rounded-2xl border border-border bg-gradient-card p-5">
            <div className="flex items-center justify-between mb-4 gap-3 flex-wrap">
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  value={p.sort_order}
                  onChange={(e) => update(p.id, { sort_order: Number(e.target.value) })}
                  className="w-16 px-3 py-2 rounded-lg bg-background border border-border text-center"
                />
                <label className="inline-flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={p.accent}
                    onChange={(e) => update(p.id, { accent: e.target.checked })}
                  />
                  Highlight
                </label>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => save(p)}
                  disabled={savingId === p.id}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-primary text-primary-foreground text-xs font-bold disabled:opacity-50"
                >
                  {savingId === p.id ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                  Save
                </button>
                <button
                  onClick={() => remove(p.id)}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full border border-border hover:border-destructive hover:text-destructive text-xs font-bold"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {(["name", "tagline", "badge"] as const).flatMap((field) =>
                (["ar", "en"] as const).map((loc) => {
                  const key = `${field}_${loc}` as keyof PackageRow;
                  return (
                    <div key={key as string}>
                      <label className="block text-[10px] uppercase tracking-wider text-muted-foreground mb-1 font-bold">
                        {field} ({loc})
                      </label>
                      <input
                        dir={loc === "ar" ? "rtl" : "ltr"}
                        value={(p[key] as string) ?? ""}
                        onChange={(e) => update(p.id, { [key]: e.target.value } as any)}
                        className="w-full px-3 py-2 rounded-lg bg-background border border-border focus:border-primary outline-none text-sm"
                      />
                    </div>
                  );
                })
              )}
              <div>
                <label className="block text-[10px] uppercase tracking-wider text-muted-foreground mb-1 font-bold">Price</label>
                <input
                  value={p.price ?? ""}
                  onChange={(e) => update(p.id, { price: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-background border border-border focus:border-primary outline-none text-sm"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mt-4">
              {(["ar", "en"] as const).map((loc) => {
                const key = `features_${loc}` as const;
                const list = (p[key] as string[]) ?? [];
                return (
                  <div key={loc}>
                    <label className="block text-[10px] uppercase tracking-wider text-muted-foreground mb-1 font-bold">
                      Features ({loc}) — one per line
                    </label>
                    <textarea
                      dir={loc === "ar" ? "rtl" : "ltr"}
                      rows={6}
                      value={list.join("\n")}
                      onChange={(e) =>
                        update(p.id, {
                          [key]: e.target.value.split("\n").filter((x) => x.trim()),
                        } as any)
                      }
                      className="w-full px-3 py-2 rounded-lg bg-background border border-border focus:border-primary outline-none text-sm font-mono"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

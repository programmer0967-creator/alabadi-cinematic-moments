import { useEffect, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { MediaRow } from "@/hooks/useSiteData";
import { youtubeId } from "@/hooks/useSiteData";
import { Loader2, Plus, Save, Trash2, Upload, Youtube } from "lucide-react";

export function MediaAdmin() {
  const [rows, setRows] = useState<MediaRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [ytUrl, setYtUrl] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const load = async () => {
    setLoading(true);
    const { data } = await supabase.from("media_items").select("*").order("sort_order");
    setRows((data as any) ?? []);
    setLoading(false);
  };
  useEffect(() => {
    load();
  }, []);

  const update = (id: string, patch: Partial<MediaRow>) =>
    setRows((r) => r.map((x) => (x.id === id ? { ...x, ...patch } : x)));

  const save = async (row: MediaRow) => {
    const { id, ...rest } = row;
    await supabase.from("media_items").update(rest).eq("id", id);
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this item?")) return;
    await supabase.from("media_items").delete().eq("id", id);
    load();
  };

  const addYoutube = async () => {
    const id = youtubeId(ytUrl);
    if (!id) return alert("Invalid YouTube URL");
    await supabase.from("media_items").insert({
      type: "youtube",
      url: ytUrl,
      thumbnail_url: `https://img.youtube.com/vi/${id}/maxresdefault.jpg`,
      title_ar: "فيديو",
      title_en: "Video",
      sort_order: rows.length + 1,
    });
    setYtUrl("");
    load();
  };

  const uploadImage = async (file: File) => {
    setUploading(true);
    const path = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.]/g, "_")}`;
    const { error } = await supabase.storage.from("media").upload(path, file);
    if (error) {
      alert(error.message);
      setUploading(false);
      return;
    }
    const { data } = supabase.storage.from("media").getPublicUrl(path);
    await supabase.from("media_items").insert({
      type: "image",
      url: data.publicUrl,
      thumbnail_url: data.publicUrl,
      title_ar: "صورة",
      title_en: "Photo",
      sort_order: rows.length + 1,
    });
    setUploading(false);
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
      <h2 className="text-2xl font-extrabold">Media Gallery</h2>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="rounded-2xl border border-border bg-gradient-card p-5">
          <div className="flex items-center gap-2 mb-3">
            <Youtube className="w-5 h-5 text-primary" />
            <h3 className="font-extrabold">Add YouTube Video</h3>
          </div>
          <div className="flex gap-2">
            <input
              value={ytUrl}
              onChange={(e) => setYtUrl(e.target.value)}
              placeholder="https://youtu.be/..."
              className="flex-1 px-3 py-2.5 rounded-lg bg-background border border-border focus:border-primary outline-none text-sm"
            />
            <button
              onClick={addYoutube}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-bold"
            >
              <Plus className="w-4 h-4" />
              Add
            </button>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-gradient-card p-5">
          <div className="flex items-center gap-2 mb-3">
            <Upload className="w-5 h-5 text-primary" />
            <h3 className="font-extrabold">Upload Image</h3>
          </div>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            onChange={(e) => e.target.files?.[0] && uploadImage(e.target.files[0])}
            className="hidden"
          />
          <button
            onClick={() => fileRef.current?.click()}
            disabled={uploading}
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-dashed border-border hover:border-primary transition text-sm font-bold disabled:opacity-50"
          >
            {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
            Choose image to upload
          </button>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {rows.map((m) => (
          <div key={m.id} className="rounded-2xl border border-border bg-gradient-card overflow-hidden">
            <div className="aspect-video relative bg-black">
              <img src={m.thumbnail_url ?? m.url} alt="" className="w-full h-full object-cover" />
              <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-primary/90 text-primary-foreground text-[10px] font-bold uppercase">
                {m.type}
              </span>
            </div>
            <div className="p-3 space-y-2">
              <input
                dir="rtl"
                value={m.title_ar ?? ""}
                onChange={(e) => update(m.id, { title_ar: e.target.value })}
                onBlur={() => save(m)}
                placeholder="العنوان (عربي)"
                className="w-full px-2 py-1.5 rounded bg-background border border-border focus:border-primary outline-none text-xs"
              />
              <input
                value={m.title_en ?? ""}
                onChange={(e) => update(m.id, { title_en: e.target.value })}
                onBlur={() => save(m)}
                placeholder="Title (EN)"
                className="w-full px-2 py-1.5 rounded bg-background border border-border focus:border-primary outline-none text-xs"
              />
              <div className="flex gap-2">
                <input
                  dir="rtl"
                  value={m.tag_ar ?? ""}
                  onChange={(e) => update(m.id, { tag_ar: e.target.value })}
                  onBlur={() => save(m)}
                  placeholder="وسم"
                  className="flex-1 px-2 py-1.5 rounded bg-background border border-border outline-none text-xs"
                />
                <input
                  value={m.tag_en ?? ""}
                  onChange={(e) => update(m.id, { tag_en: e.target.value })}
                  onBlur={() => save(m)}
                  placeholder="tag"
                  className="flex-1 px-2 py-1.5 rounded bg-background border border-border outline-none text-xs"
                />
              </div>
              <div className="flex items-center justify-between gap-2 pt-1">
                <input
                  type="number"
                  value={m.sort_order}
                  onChange={(e) => update(m.id, { sort_order: Number(e.target.value) })}
                  onBlur={() => save(m)}
                  className="w-16 px-2 py-1 rounded bg-background border border-border text-center text-xs"
                />
                <div className="flex gap-1">
                  <button
                    onClick={() => save(m)}
                    className="p-1.5 rounded border border-border hover:border-primary"
                    aria-label="Save"
                  >
                    <Save className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => remove(m.id)}
                    className="p-1.5 rounded border border-border hover:border-destructive hover:text-destructive"
                    aria-label="Delete"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

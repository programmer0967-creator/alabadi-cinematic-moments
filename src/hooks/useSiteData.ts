import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface PackageRow {
  id: string;
  slug: string;
  name_ar: string;
  name_en: string;
  tagline_ar: string | null;
  tagline_en: string | null;
  badge_ar: string | null;
  badge_en: string | null;
  features_ar: string[];
  features_en: string[];
  price: string | null;
  accent: boolean;
  sort_order: number;
}

export interface MediaRow {
  id: string;
  type: "image" | "youtube";
  title_ar: string | null;
  title_en: string | null;
  tag_ar: string | null;
  tag_en: string | null;
  url: string;
  thumbnail_url: string | null;
  sort_order: number;
}

export interface SiteSettings {
  id: string;
  phone: string | null;
  whatsapp: string | null;
  instagram: string | null;
  youtube: string | null;
  facebook: string | null;
  social_handle: string | null;
}

export function usePackages() {
  const [data, setData] = useState<PackageRow[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    supabase.from("packages").select("*").order("sort_order").then(({ data }) => {
      setData((data as any) ?? []);
      setLoading(false);
    });
  }, []);
  return { data, loading };
}

export function useMedia() {
  const [data, setData] = useState<MediaRow[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    supabase.from("media_items").select("*").order("sort_order").then(({ data }) => {
      setData((data as any) ?? []);
      setLoading(false);
    });
  }, []);
  return { data, loading };
}

export function useSettings() {
  const [data, setData] = useState<SiteSettings | null>(null);
  useEffect(() => {
    supabase.from("site_settings").select("*").eq("id", "main").maybeSingle().then(({ data }) => {
      setData((data as any) ?? null);
    });
  }, []);
  return data;
}

export function whatsappLink(s: SiteSettings | null, text?: string) {
  const num = s?.whatsapp ?? "967779038283";
  return `https://wa.me/${num}${text ? `?text=${encodeURIComponent(text)}` : ""}`;
}

export function youtubeId(url: string) {
  const m = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{11})/);
  return m?.[1] ?? "";
}

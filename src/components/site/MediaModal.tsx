import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect } from "react";
import { youtubeId, type MediaRow } from "@/hooks/useSiteData";

export function MediaModal({ item, onClose }: { item: MediaRow | null; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    if (item) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [item, onClose]);

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[100] grid place-items-center p-4 bg-background/70 backdrop-blur-2xl"
        >
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute top-5 right-5 w-11 h-11 rounded-full bg-primary text-primary-foreground grid place-items-center hover:scale-110 transition shadow-glow"
          >
            <X className="w-5 h-5" />
          </button>
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 22 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-6xl rounded-3xl overflow-hidden border border-primary/30 shadow-elegant bg-card"
          >
            {item.type === "youtube" ? (
              <div className="aspect-video bg-black">
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${youtubeId(item.url)}?autoplay=1&rel=0`}
                  title={item.title_en ?? "video"}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ) : (
              <img src={item.url} alt={item.title_en ?? ""} className="w-full h-auto max-h-[85vh] object-contain bg-black" />
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

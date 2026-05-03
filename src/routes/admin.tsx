import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { AdminLogin } from "@/components/admin/AdminLogin";
import { AdminDashboard } from "@/components/admin/AdminDashboard";
import type { Session } from "@supabase/supabase-js";
import { Loader2 } from "lucide-react";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin · Al-Abadi" }, { name: "robots", content: "noindex" }] }),
  component: AdminPage,
});

function AdminPage() {
  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => {
      setSession(s);
      if (s) {
        setTimeout(async () => {
          const { data } = await supabase
            .from("user_roles")
            .select("role")
            .eq("user_id", s.user.id)
            .eq("role", "admin")
            .maybeSingle();
          setIsAdmin(!!data);
        }, 0);
      } else {
        setIsAdmin(false);
      }
    });
    supabase.auth.getSession().then(({ data: { session } }) => setSession(session));
    return () => sub.subscription.unsubscribe();
  }, []);

  if (!session) return <AdminLogin />;
  if (isAdmin === null)
    return (
      <div className="min-h-screen grid place-items-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  if (!isAdmin)
    return (
      <div dir="ltr" className="min-h-screen grid place-items-center bg-background text-foreground p-6">
        <div className="text-center max-w-md">
          <h1 className="text-3xl font-extrabold mb-3">Access denied</h1>
          <p className="text-muted-foreground mb-6">
            This account is not authorized as admin. Sign in with the admin email or contact support.
          </p>
          <button
            onClick={() => supabase.auth.signOut()}
            className="px-5 py-2.5 rounded-full border border-border hover:border-primary"
          >
            Sign out
          </button>
        </div>
      </div>
    );

  return <AdminDashboard />;
}

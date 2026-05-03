import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Camera, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const fn =
      mode === "signin"
        ? supabase.auth.signInWithPassword({ email, password })
        : supabase.auth.signUp({
            email,
            password,
            options: { emailRedirectTo: `${window.location.origin}/admin` },
          });
    const { error } = await fn;
    if (error) setError(error.message);
    setLoading(false);
  };

  return (
    <div dir="ltr" className="min-h-screen grid place-items-center bg-background text-foreground p-6 relative overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-primary/20 blur-[120px]" />
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={submit}
        className="relative w-full max-w-md rounded-3xl p-8 bg-gradient-card border border-border shadow-elegant"
      >
        <div className="flex items-center gap-3 mb-8">
          <span className="w-11 h-11 rounded-xl bg-gradient-primary grid place-items-center">
            <Camera className="w-6 h-6 text-primary-foreground" />
          </span>
          <div>
            <div className="font-extrabold text-lg">AL-ABADI</div>
            <div className="text-xs text-muted-foreground">Admin Panel</div>
          </div>
        </div>

        <h1 className="text-2xl font-extrabold mb-1">{mode === "signin" ? "Sign in" : "Create admin account"}</h1>
        <p className="text-sm text-muted-foreground mb-6">
          {mode === "signin" ? "Access the content dashboard." : "First sign up with the pre-approved admin email."}
        </p>

        <label className="block text-xs font-bold mb-1.5">Email</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary outline-none mb-4"
          placeholder="you@example.com"
        />
        <label className="block text-xs font-bold mb-1.5">Password</label>
        <input
          type="password"
          required
          minLength={6}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary outline-none mb-2"
          placeholder="••••••••"
        />

        {error && <div className="text-sm text-destructive mt-2">{error}</div>}

        <button
          disabled={loading}
          className="w-full mt-6 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-gradient-primary text-primary-foreground font-extrabold shadow-glow hover:scale-[1.02] transition disabled:opacity-50"
        >
          {loading && <Loader2 className="w-4 h-4 animate-spin" />}
          {mode === "signin" ? "Sign In" : "Sign Up"}
        </button>

        <button
          type="button"
          onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
          className="block mx-auto mt-4 text-xs text-muted-foreground hover:text-primary"
        >
          {mode === "signin" ? "First time? Create account" : "Already have an account? Sign in"}
        </button>
      </motion.form>
    </div>
  );
}

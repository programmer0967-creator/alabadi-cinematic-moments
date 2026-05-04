import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Camera, Loader2, Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";

export function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    let result;
    if (mode === "signin") {
      result = await supabase.auth.signInWithPassword({ email, password });
      // Auto-create on first login if it's the seeded admin
      if (result.error && email === "mohammed@gmail.com" && password === "mohammed") {
        const signup = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/admin` },
        });
        if (!signup.error) {
          result = await supabase.auth.signInWithPassword({ email, password });
        } else {
          result = signup;
        }
      }
    } else {
      result = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: `${window.location.origin}/admin` },
      });
    }
    if (result.error) setError(result.error.message);
    setLoading(false);
  };

  return (
    <div dir="rtl" className="min-h-screen grid place-items-center bg-background text-foreground p-6 relative overflow-hidden font-display">
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-primary/20 blur-[120px]" />
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
            <div className="font-extrabold text-lg">العبادي</div>
            <div className="text-xs text-muted-foreground">لوحة التحكم</div>
          </div>
        </div>

        <h1 className="text-2xl font-extrabold mb-1">
          {mode === "signin" ? "تسجيل الدخول" : "إنشاء حساب المسؤول"}
        </h1>
        <p className="text-sm text-muted-foreground mb-6">
          {mode === "signin"
            ? "ادخل لإدارة محتوى الموقع."
            : "سجّل أولاً باستخدام البريد الإلكتروني المعتمد."}
        </p>

        <label className="block text-xs font-bold mb-1.5">البريد الإلكتروني</label>
        <input
          type="email"
          required
          dir="ltr"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary outline-none mb-4 text-right"
          placeholder="you@example.com"
        />
        <label className="block text-xs font-bold mb-1.5">كلمة المرور</label>
        <div className="relative mb-2">
          <input
            type={showPassword ? "text" : "password"}
            required
            minLength={6}
            dir="ltr"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 ps-12 rounded-xl bg-background border border-border focus:border-primary outline-none text-right"
            placeholder="••••••••"
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            title={showPassword ? "إخفاء كلمة المرور" : "إظهار كلمة المرور"}
            aria-label={showPassword ? "إخفاء كلمة المرور" : "إظهار كلمة المرور"}
            className="absolute top-1/2 -translate-y-1/2 left-2 w-9 h-9 grid place-items-center rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition"
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>

        {error && <div className="text-sm text-destructive mt-2">{error}</div>}

        <button
          disabled={loading}
          className="w-full mt-6 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-gradient-primary text-primary-foreground font-extrabold shadow-glow hover:scale-[1.02] transition disabled:opacity-50"
        >
          {loading && <Loader2 className="w-4 h-4 animate-spin" />}
          {mode === "signin" ? "دخول" : "تسجيل"}
        </button>

        <button
          type="button"
          onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
          className="block mx-auto mt-4 text-xs text-muted-foreground hover:text-primary"
        >
          {mode === "signin" ? "لأول مرة؟ أنشئ حساباً" : "لديك حساب؟ سجّل الدخول"}
        </button>
      </motion.form>
    </div>
  );
}

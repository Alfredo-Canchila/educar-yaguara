"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { BookOpen } from "lucide-react";
import { getSupabaseClient, supabase } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const supabaseReady = !!supabase;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const sb = getSupabaseClient();
      const { data, error } = await sb.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data.user) {
        router.push("/admin/dashboard");
      }
    } catch (error: any) {
      setErrorMsg(error.message || "Credenciales inválidas");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-educar-light)] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-lg border border-gray-100 p-8">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-[var(--color-educar-green)] rounded-2xl flex items-center justify-center text-white mb-4 shadow-sm">
            <BookOpen size={32} />
          </div>
          <h2 className="text-2xl font-bold text-[var(--color-educar-dark)]">
            Acceso Administrativo
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Ingresa tus credenciales para continuar
          </p>
        </div>

        {!supabaseReady && (
          <div className="mb-6 p-4 bg-yellow-50 text-yellow-800 rounded-xl border border-yellow-200 text-sm">
            El acceso administrativo está deshabilitado: falta configurar Supabase. Define{" "}
            <code>NEXT_PUBLIC_SUPABASE_URL</code> y{" "}
            <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code> en Vercel.
          </div>
        )}

        {errorMsg && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl border border-red-200 text-sm">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Correo Electrónico
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading || !supabaseReady}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[var(--color-educar-burgundy)] focus:border-transparent outline-none transition-all disabled:opacity-70"
              placeholder="admin@educaryaguara.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Contraseña
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading || !supabaseReady}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[var(--color-educar-burgundy)] focus:border-transparent outline-none transition-all disabled:opacity-70"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading || !supabaseReady}
            className="w-full py-3 px-4 bg-[var(--color-educar-burgundy)] hover:bg-opacity-90 text-white font-bold rounded-xl shadow-md shadow-[var(--color-educar-burgundy)]/20 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? "Verificando..." : "Iniciar Sesión"}
          </button>
        </form>
      </div>
    </div>
  );
}

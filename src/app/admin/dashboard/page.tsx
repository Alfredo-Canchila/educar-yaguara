"use client";

import { useEffect, useState } from "react";
import LeadsTable from "@/components/admin/LeadsTable";
import { Users, Mail, PhoneCall } from "lucide-react";
import { getSupabaseClient, supabase } from "@/lib/supabase";

export default function DashboardPage() {
  const [stats, setStats] = useState({
    total: 0,
    nuevos: 0,
    contactadosHoy: 0,
  });

  const supabaseReady = !!supabase;

  useEffect(() => {
    if (!supabaseReady) return;

    const fetchStats = async () => {
      try {
        const sb = getSupabaseClient();
        const { data } = await sb.from("leads").select("estado, created_at");

        if (data) {
          const today = new Date().toISOString().split("T")[0];

          setStats({
            total: data.length,
            nuevos: data.filter((l) => l.estado === "Nuevo").length,
            contactadosHoy: data.filter(
              (l) => l.estado === "Contactado" && l.created_at.startsWith(today)
            ).length,
          });
        }
      } catch (error) {
        console.error("Error al cargar estadísticas:", error);
      }
    };

    fetchStats();
  }, [supabaseReady]);

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-[var(--color-educar-dark)]">
          Dashboard General
        </h1>
        <p className="text-gray-500 mt-2">
          Gestiona las inscripciones y prospectos de Educar Yaguará.
        </p>
      </div>

      {!supabaseReady && (
        <div className="p-4 rounded-xl border border-yellow-200 bg-yellow-50 text-yellow-800">
          Supabase no está configurado. Define <code>NEXT_PUBLIC_SUPABASE_URL</code> y{" "}
          <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code> en Vercel para habilitar el dashboard.
        </div>
      )}

      {/* Tarjetas de Métricas Rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Users size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Total de Interesados</p>
            <h3 className="text-2xl font-bold text-gray-900">{stats.total}</h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
            <Mail size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">
              Mensajes Sin Leer (Nuevos)
            </p>
            <h3 className="text-2xl font-bold text-gray-900">{stats.nuevos}</h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-green-50 text-green-600 flex items-center justify-center">
            <PhoneCall size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Contactados Hoy</p>
            <h3 className="text-2xl font-bold text-gray-900">{stats.contactadosHoy}</h3>
          </div>
        </div>
      </div>

      {/* Tabla Interactiva de Leads */}
      <div>
        <LeadsTable />
      </div>
    </div>
  );
}

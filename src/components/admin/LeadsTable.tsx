"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Lead } from "@/types";
import { MessageSquare, MessageCircle, MoreVertical, Edit2 } from "lucide-react";

export default function LeadsTable() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<string | null>(null);

  useEffect(() => {
    fetchLeads();

    // Suscripción a cambios en tiempo real en la tabla leads
    const channel = supabase
      .channel("custom-all-channel")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "leads" },
        (payload) => {
          fetchLeads();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchLeads = async () => {
    try {
      const { data, error } = await supabase
        .from("leads")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setLeads(data || []);
    } catch (error) {
      console.error("Error al cargar leads:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateLeadStatus = async (id: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from("leads")
        .update({ estado: newStatus })
        .eq("id", id);

      if (error) throw error;
      fetchLeads();
    } catch (error) {
      console.error("Error al actualizar estado:", error);
    }
  };

  const openWhatsApp = (telefono: string) => {
    const cleanPhone = telefono.replace(/\D/g, "");
    window.open(`https://wa.me/57${cleanPhone}`, "_blank");
  };

  const getStatusBadge = (estado: string) => {
    switch (estado) {
      case "Nuevo":
        return <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">Nuevo</span>;
      case "En Proceso":
        return <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">En Proceso</span>;
      case "Contactado":
        return <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">Contactado</span>;
      default:
        return <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-medium">{estado}</span>;
    }
  };

  if (loading) {
    return <div className="p-8 text-center text-gray-500">Cargando interesados...</div>;
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100 flex justify-between items-center">
        <h2 className="text-xl font-bold text-[var(--color-educar-dark)]">Bandeja de Interesados</h2>
        <span className="text-sm text-gray-500">Total: {leads.length}</span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50 text-gray-600 font-medium border-b border-gray-100">
            <tr>
              <th className="px-6 py-4">Fecha</th>
              <th className="px-6 py-4">Nombre / Correo</th>
              <th className="px-6 py-4">Teléfono</th>
              <th className="px-6 py-4">Programa de Interés</th>
              <th className="px-6 py-4">Estado</th>
              <th className="px-6 py-4 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {leads.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                  No hay interesados registrados aún.
                </td>
              </tr>
            ) : (
              leads.map((lead) => (
                <tr key={lead.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                    {new Date(lead.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{lead.nombre}</div>
                    <div className="text-gray-500 text-xs">{lead.correo}</div>
                  </td>
                  <td className="px-6 py-4 text-gray-700">{lead.telefono}</td>
                  <td className="px-6 py-4 text-gray-700">{lead.programa_interes}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(lead.estado)}
                  </td>
                  <td className="px-6 py-4 flex items-center justify-center gap-3">
                    {lead.mensaje && (
                      <button
                        onClick={() => setSelectedMessage(lead.mensaje!)}
                        className="text-gray-400 hover:text-[var(--color-educar-green)] transition-colors"
                        title="Ver Mensaje"
                      >
                        <MessageSquare size={18} />
                      </button>
                    )}
                    <button
                      onClick={() => openWhatsApp(lead.telefono)}
                      className="text-gray-400 hover:text-green-500 transition-colors"
                      title="Contactar por WhatsApp"
                    >
                      <MessageCircle size={18} />
                    </button>
                    <select
                      className="text-xs border-gray-200 rounded-md focus:ring-[var(--color-educar-green)]"
                      value={lead.estado}
                      onChange={(e) => updateLeadStatus(lead.id, e.target.value)}
                    >
                      <option value="Nuevo">Nuevo</option>
                      <option value="En Proceso">En Proceso</option>
                      <option value="Contactado">Contactado</option>
                    </select>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal para ver mensaje completo */}
      {selectedMessage && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h3 className="font-semibold text-gray-900">Mensaje del Interesado</h3>
              <button onClick={() => setSelectedMessage(null)} className="text-gray-400 hover:text-gray-600">
                ✕
              </button>
            </div>
            <div className="p-6">
              <p className="text-gray-700 whitespace-pre-wrap">{selectedMessage}</p>
            </div>
            <div className="p-4 bg-gray-50 border-t border-gray-100 text-right">
              <button
                onClick={() => setSelectedMessage(null)}
                className="px-4 py-2 bg-[var(--color-educar-dark)] text-white rounded-xl text-sm font-medium hover:bg-opacity-90"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

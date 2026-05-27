"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { getSupabaseClient, supabase } from "@/lib/supabase";

const formSchema = z.object({
  nombre: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  correo: z.string().email("Debe ser un correo electrónico válido"),
  telefono: z.string().min(7, "El teléfono debe tener al menos 7 números"),
  programa_interes: z.string().min(1, "Selecciona un nivel de interés"),
  mensaje: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const supabaseReady = !!supabase;

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const sb = getSupabaseClient();
      const { error } = await sb.from("leads").insert([
        {
          nombre: data.nombre,
          correo: data.correo,
          telefono: data.telefono,
          programa_interes: data.programa_interes,
          mensaje: data.mensaje,
          estado: "Nuevo",
        },
      ]);

      if (error) throw error;

      setSubmitStatus("success");
      reset();
    } catch (error) {
      console.error("Error al guardar el lead:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-8 shadow-sm rounded-2xl max-w-xl mx-auto border border-gray-100">
      <h3 className="text-2xl font-bold text-[var(--color-educar-dark)] mb-6 text-center">
        Déjanos tus datos
      </h3>

      {!supabaseReady && (
        <div className="mb-6 p-4 bg-yellow-50 text-yellow-800 rounded-xl border border-yellow-200">
          El formulario está temporalmente deshabilitado: falta configurar Supabase. Define{" "}
          <code>NEXT_PUBLIC_SUPABASE_URL</code> y <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code> en Vercel.
        </div>
      )}

      {submitStatus === "success" && (
        <div className="mb-6 p-4 bg-green-50 text-[var(--color-educar-green)] rounded-xl border border-green-200">
          ¡Gracias por tu interés! Nos comunicaremos contigo pronto.
        </div>
      )}

      {submitStatus === "error" && (
        <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl border border-red-200">
          Ocurrió un error al enviar tu información. Por favor, intenta de nuevo.
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nombre Completo
          </label>
          <input
            {...register("nombre")}
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[var(--color-educar-green)] focus:border-transparent outline-none transition-all"
            placeholder="Ej. Juan Pérez"
            disabled={!supabaseReady}
          />
          {errors.nombre && (
            <p className="text-red-500 text-sm mt-1">{errors.nombre.message}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Correo Electrónico
            </label>
            <input
              {...register("correo")}
              type="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[var(--color-educar-green)] focus:border-transparent outline-none transition-all"
              placeholder="juan@ejemplo.com"
              disabled={!supabaseReady}
            />
            {errors.correo && (
              <p className="text-red-500 text-sm mt-1">{errors.correo.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Teléfono / WhatsApp
            </label>
            <input
              {...register("telefono")}
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[var(--color-educar-green)] focus:border-transparent outline-none transition-all"
              placeholder="300 123 4567"
              disabled={!supabaseReady}
            />
            {errors.telefono && (
              <p className="text-red-500 text-sm mt-1">{errors.telefono.message}</p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nivel de Interés
          </label>
          <select
            {...register("programa_interes")}
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[var(--color-educar-green)] focus:border-transparent outline-none transition-all bg-white"
            disabled={!supabaseReady}
          >
            <option value="">Selecciona un nivel...</option>
            <option value="Preescolar y básica primaria">Preescolar y básica primaria</option>
            <option value="Formación para el trabajo">
              Formación para el trabajo y desarrollo humano
            </option>
            <option value="Educación continua">Educación informal o continua</option>
          </select>
          {errors.programa_interes && (
            <p className="text-red-500 text-sm mt-1">
              {errors.programa_interes.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Mensaje (Opcional)
          </label>
          <textarea
            {...register("mensaje")}
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[var(--color-educar-green)] focus:border-transparent outline-none transition-all resize-none"
            placeholder="¿Tienes alguna duda en particular?"
            disabled={!supabaseReady}
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting || !supabaseReady}
          className="w-full py-3 px-4 bg-[var(--color-educar-burgundy)] hover:bg-opacity-90 text-white font-semibold rounded-xl shadow-sm transition-all disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Enviando..." : "Enviar Información"}
        </button>
      </form>
    </div>
  );
}

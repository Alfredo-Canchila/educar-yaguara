import ContactForm from "@/components/public/ContactForm";
import { CheckCircle2, ShieldCheck, GraduationCap, Briefcase, BookOpen } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative bg-white overflow-hidden border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-32">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-extrabold text-[var(--color-educar-dark)] tracking-tight mb-6">
              Innovando y revolucionando la educación en <span className="text-[var(--color-educar-burgundy)]">Yaguará</span> y el Sur Colombiano
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-10 font-light">
              "Ayudamos a construir un mundo mejor"
            </p>
            <div className="flex justify-center gap-4">
              <a 
                href="#contacto" 
                className="bg-[var(--color-educar-green)] text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-opacity-90 shadow-lg shadow-[var(--color-educar-green)]/30 transition-all"
              >
                Comienza Hoy
              </a>
              <a 
                href="#oferta" 
                className="bg-white text-[var(--color-educar-dark)] border border-gray-200 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-gray-50 shadow-sm transition-all"
              >
                Conoce más
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Nosotros y Legalidad */}
      <section id="nosotros" className="py-24 bg-[var(--color-educar-light)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-[var(--color-educar-dark)] mb-4">Respaldo Institucional y Legalidad</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Somos una entidad comprometida con la transparencia, la calidad y el desarrollo de nuestra región.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
              <ShieldCheck size={48} className="text-[var(--color-educar-green)] mb-6" />
              <h3 className="text-xl font-bold mb-3">Vigilancia Gubernamental</h3>
              <p className="text-gray-600">
                Inspeccionados y vigilados por la Gobernación del Huila para garantizar estándares de excelencia en la formación.
              </p>
            </div>
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
              <CheckCircle2 size={48} className="text-[var(--color-educar-burgundy)] mb-6" />
              <h3 className="text-xl font-bold mb-3">Cámara de Comercio</h3>
              <p className="text-gray-600">
                Registrados formalmente en la Cámara de Comercio del Huila con matrícula S0715204.
              </p>
            </div>
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
              <BookOpen size={48} className="text-[var(--color-educar-dark)] mb-6" />
              <h3 className="text-xl font-bold mb-3">Identidad Institucional</h3>
              <p className="text-gray-600">
                Identificados con el NIT: 902.036.233-7, operando como entidad privada sin ánimo de lucro.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Oferta Educativa */}
      <section id="oferta" className="py-24 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-[var(--color-educar-dark)] mb-4">Nuestra Oferta Educativa</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Diseñamos programas integrales adaptados a las necesidades de todas las edades y perfiles en el Huila.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-3xl p-8 hover:shadow-md transition-shadow border border-gray-100">
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-6 text-[var(--color-educar-green)]">
                <GraduationCap size={32} />
              </div>
              <h3 className="text-2xl font-bold text-[var(--color-educar-dark)] mb-4">Preescolar y Básica Primaria</h3>
              <p className="text-gray-600 leading-relaxed">
                Formación inicial con bases sólidas, valores y metodologías que impulsan el desarrollo temprano y la creatividad de los más pequeños.
              </p>
            </div>
            
            <div className="bg-[var(--color-educar-burgundy)] text-white rounded-3xl p-8 shadow-lg transform md:-translate-y-4">
              <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center shadow-sm mb-6 text-white backdrop-blur-sm">
                <Briefcase size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4">Formación para el Trabajo</h3>
              <p className="text-white/90 leading-relaxed">
                Desarrollo humano y capacitación práctica enfocada en el mercado laboral actual, dotando a los jóvenes y adultos de habilidades competitivas.
              </p>
            </div>

            <div className="bg-gray-50 rounded-3xl p-8 hover:shadow-md transition-shadow border border-gray-100">
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-6 text-[var(--color-educar-dark)]">
                <BookOpen size={32} />
              </div>
              <h3 className="text-2xl font-bold text-[var(--color-educar-dark)] mb-4">Educación Continua</h3>
              <p className="text-gray-600 leading-relaxed">
                Cursos y diplomados de educación informal diseñados para la actualización constante de conocimientos y el crecimiento personal y profesional.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Formulario de Contacto */}
      <section id="contacto" className="py-24 bg-[var(--color-educar-light)] border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-extrabold text-[var(--color-educar-dark)] mb-6">
                Impulsa tu futuro hoy mismo.
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Déjanos tus datos para recibir asesoría personalizada sobre nuestros niveles educativos, procesos de inscripción y beneficios por ser parte de Educar Yaguará.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[var(--color-educar-green)]/10 text-[var(--color-educar-green)] rounded-xl flex items-center justify-center">
                    <span className="font-bold">1</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Llena el formulario</h4>
                    <p className="text-sm text-gray-500">Es rápido y no te tomará más de 1 minuto.</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[var(--color-educar-green)]/10 text-[var(--color-educar-green)] rounded-xl flex items-center justify-center">
                    <span className="font-bold">2</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Recibe Asesoría</h4>
                    <p className="text-sm text-gray-500">Un asesor se comunicará contigo vía WhatsApp.</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[var(--color-educar-green)]/10 text-[var(--color-educar-green)] rounded-xl flex items-center justify-center">
                    <span className="font-bold">3</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Inicia tu formación</h4>
                    <p className="text-sm text-gray-500">Únete a nuestra corporación y transforma tu entorno.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-[var(--color-educar-green)] to-[var(--color-educar-burgundy)] rounded-[2.5rem] transform translate-x-4 translate-y-4 opacity-20 blur-lg"></div>
              <div className="relative">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="bg-[var(--color-educar-dark)] text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-white text-lg font-bold mb-4">EDUCAR YAGUARÁ</h3>
            <p className="text-sm">
              Corporación Educativa, Cultural y Artística para la Enseñanza y el Desarrollo de la Niñez y la Juventud.
            </p>
            <p className="text-sm mt-4 text-gray-400">
              Vigilada por la Oficina de Inspección, Control y Vigilancia de la Gobernación del Huila.
            </p>
          </div>
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Ubicación</h3>
            <p className="text-sm">Carrera 4 # 1-50 barrio La Trinidad</p>
            <p className="text-sm">Yaguará, Huila, Colombia</p>
          </div>
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Contacto Directo</h3>
            <p className="text-sm"><strong>Dirección Ejecutiva:</strong> 316 484 0625</p>
            <p className="text-sm"><strong>Representación Legal:</strong> 311 508 5157</p>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-12 pt-8 text-sm text-center text-gray-500">
          © {new Date().getFullYear()} Educar Yaguará. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}

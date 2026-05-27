"use client";

import Link from "next/link";
import { BookOpen, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed w-full bg-white/90 backdrop-blur-md z-50 shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex-shrink-0 flex items-center gap-2">
            <div className="w-10 h-10 bg-[var(--color-educar-green)] rounded-xl flex items-center justify-center text-white">
              <BookOpen size={24} />
            </div>
            <div>
              <span className="font-bold text-xl text-[var(--color-educar-dark)] block leading-tight">EDUCAR</span>
              <span className="font-bold text-lg text-[var(--color-educar-burgundy)] block leading-tight">YAGUARÁ</span>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link href="#nosotros" className="text-gray-600 hover:text-[var(--color-educar-green)] font-medium transition-colors">
              Nosotros
            </Link>
            <Link href="#oferta" className="text-gray-600 hover:text-[var(--color-educar-green)] font-medium transition-colors">
              Oferta Educativa
            </Link>
            <Link href="#contacto" className="text-gray-600 hover:text-[var(--color-educar-green)] font-medium transition-colors">
              Contacto
            </Link>
            <Link 
              href="#contacto" 
              className="bg-[var(--color-educar-burgundy)] text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-opacity-90 transition-all shadow-sm"
            >
              Inscribirme
            </Link>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-[var(--color-educar-dark)] focus:outline-none"
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 p-4 shadow-lg absolute w-full">
          <div className="flex flex-col space-y-4">
            <Link href="#nosotros" onClick={() => setIsMenuOpen(false)} className="text-gray-600 font-medium hover:text-[var(--color-educar-green)] p-2">
              Nosotros
            </Link>
            <Link href="#oferta" onClick={() => setIsMenuOpen(false)} className="text-gray-600 font-medium hover:text-[var(--color-educar-green)] p-2">
              Oferta Educativa
            </Link>
            <Link href="#contacto" onClick={() => setIsMenuOpen(false)} className="text-gray-600 font-medium hover:text-[var(--color-educar-green)] p-2">
              Contacto
            </Link>
            <Link 
              href="#contacto" 
              onClick={() => setIsMenuOpen(false)}
              className="bg-[var(--color-educar-burgundy)] text-white px-4 py-3 rounded-xl font-semibold text-center mt-2 shadow-sm"
            >
              Inscribirme
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

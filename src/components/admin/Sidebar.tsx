"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, Users, Settings, LogOut, BookOpen } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const menuItems = [
    { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Interesados", href: "/admin/dashboard", icon: Users },
    { name: "Configuración", href: "/admin/settings", icon: Settings },
  ];

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
  };

  return (
    <div className="w-64 bg-[var(--color-educar-dark)] text-white h-screen fixed flex flex-col shadow-2xl">
      <div className="p-6 flex items-center gap-3 border-b border-gray-800">
        <div className="w-8 h-8 bg-[var(--color-educar-green)] rounded-lg flex items-center justify-center">
          <BookOpen size={18} className="text-white" />
        </div>
        <div>
          <h2 className="font-bold tracking-wide">EDUCAR</h2>
          <p className="text-xs text-gray-400">Backoffice</p>
        </div>
      </div>

      <div className="flex-1 py-6">
        <nav className="space-y-1 px-4">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                  isActive 
                    ? "bg-[var(--color-educar-green)] text-white font-medium" 
                    : "text-gray-400 hover:text-white hover:bg-white/10"
                }`}
              >
                <Icon size={20} />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="p-4 border-t border-gray-800">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 w-full text-left text-gray-400 hover:text-red-400 hover:bg-white/5 rounded-xl transition-colors"
        >
          <LogOut size={20} />
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
}

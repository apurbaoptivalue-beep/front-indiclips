"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Compass, PlusSquare, User, Film } from "lucide-react";
import { useState, useEffect } from "react";

export default function BottomNav() {
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsAuthenticated(!!localStorage.getItem("token"));
  }, []);

  const navItems = [
    { icon: Home, label: "Home", href: "/" },
    { icon: Compass, label: "Explore", href: "/explore" },
    { icon: PlusSquare, label: "Upload", href: "/upload", isCenter: true },
    { icon: Film, label: "Reels", href: "/" },
    { icon: User, label: "Profile", href: mounted && isAuthenticated ? "/profile" : "/login" },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 z-50 w-full h-16 bg-black border-t border-glass-border">
      <div className="flex h-full max-w-lg mx-auto font-medium">
        {navItems.map((item, index) => {
          // Both Home and Reels point to /, so just use simple active state
          const isActive = pathname === item.href;
          
          if (item.isCenter) {
            return (
              <Link 
                key={index} 
                href={item.href} 
                className="inline-flex flex-col items-center justify-center px-2 flex-shrink-0"
              >
                <div className="h-10 w-12 bg-gradient-to-tr from-primary to-secondary rounded-xl flex items-center justify-center shadow-lg shadow-primary/30">
                  <item.icon className="w-6 h-6 text-white" />
                </div>
              </Link>
            );
          }

          return (
            <Link 
              key={index} 
              href={item.href} 
              className="inline-flex flex-col items-center justify-center px-4 hover:bg-white/5 flex-1"
            >
              <item.icon className={`w-6 h-6 mb-1 ${isActive ? "text-white" : "text-gray-500"}`} />
              <span className={`text-[10px] ${isActive ? "text-white font-bold" : "text-gray-500"}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

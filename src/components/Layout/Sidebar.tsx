import Link from "next/link";
import { Home, Compass, PlusSquare, User, Settings, LayoutDashboard, Film } from "lucide-react";

export default function Sidebar() {
  const navItems = [
    { icon: Home, label: "Home", href: "/" },
    { icon: Film, label: "Reels", href: "/" },
    { icon: Compass, label: "Explore", href: "/explore" },
    { icon: PlusSquare, label: "Upload", href: "/upload" },
    { icon: User, label: "Profile", href: "/profile" },
    { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
    { icon: Settings, label: "Settings", href: "/settings" },
  ];

  return (
    <aside className="fixed left-0 top-16 z-40 h-[calc(100vh-4rem)] w-64 border-r border-glass-border bg-background hidden md:block">
      <div className="h-full px-3 py-6 overflow-y-auto">
        <ul className="space-y-1.5 font-medium">
          {navItems.map((item, index) => (
            <li key={index}>
              <Link href={item.href} className="flex items-center p-3 text-gray-300 rounded-xl hover:bg-glass hover:text-white group transition-all relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <item.icon className="w-6 h-6 text-gray-400 group-hover:text-primary transition-colors relative z-10" />
                <span className="ml-4 relative z-10">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
        
        <div className="mt-8 pt-8 border-t border-glass-border px-3">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Following</p>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center space-x-3 cursor-pointer p-2 -mx-2 rounded-xl hover:bg-glass transition-colors group">
                <div className="relative">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-primary to-secondary p-[2px] group-hover:animate-spin-slow">
                    <div className="w-full h-full bg-background rounded-full border-2 border-background flex items-center justify-center">
                      <User className="w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate group-hover:text-primary transition-colors">Creator {i}</p>
                  <p className="text-xs text-gray-500 truncate">@{`creator_${i}`}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}

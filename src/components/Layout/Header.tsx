"use client";
import Link from "next/link";
import { Search, Bell, Wallet, User, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

export default function Header() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsAuthenticated(!!localStorage.getItem("token"));
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full bg-black/40 backdrop-saturate-[180%] backdrop-blur-[30px] border-b border-white/10 shadow-[0_10px_30px_rgba(236,72,153,0.1)]">
      <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-50" />
      <div className="flex h-16 items-center px-4 md:px-6 justify-between relative">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 flex items-center justify-center transition-transform group-hover:scale-110">
              <img src="/logo.png" alt="IndiClips" className="w-8 h-8 object-contain" onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.nextElementSibling!.classList.remove('hidden'); }} />
              <div className="hidden w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg leading-none">i</span>
              </div>
            </div>
            <span className="hidden sm:block font-black text-xl tracking-tight text-white group-hover:text-primary transition-colors">
              IndiClips
            </span>
          </Link>
        </div>
        
        <div className="hidden md:flex flex-1 max-w-md mx-6">
          <div className="relative w-full">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <input
              type="search"
              placeholder="Search videos, creators..."
              className="w-full h-10 pl-10 pr-4 rounded-full bg-glass border border-glass-border text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            />
          </div>
        </div>
        
        <div className="flex items-center gap-2 md:gap-4">
          <Link href="/wallet" className="hidden sm:block">
            <Button variant="ghost" size="icon" className="relative text-gray-300 hover:text-white hover:bg-glass">
              <Wallet className="h-5 w-5" />
            </Button>
          </Link>
          <Link href="/notifications" className="hidden sm:block">
            <Button variant="ghost" size="icon" className="relative text-gray-300 hover:text-white hover:bg-glass">
              <Bell className="h-5 w-5" />
              <span className="absolute top-2 right-2.5 w-2 h-2 bg-secondary rounded-full animate-pulse shadow-[0_0_8px_rgba(236,72,153,0.8)]" />
            </Button>
          </Link>

          {mounted && !isAuthenticated ? (
            <Link href="/login">
              <Button className="bg-gradient-to-r from-primary to-secondary text-white font-bold h-9">
                <LogIn className="w-4 h-4 mr-2" /> Log In
              </Button>
            </Link>
          ) : (
            <Link href="/profile" className="hidden md:block">
              <div className="h-8 w-8 ml-2 rounded-full bg-gradient-to-tr from-primary to-secondary p-[2px] cursor-pointer hover:scale-105 transition-transform">
                <div className="w-full h-full bg-background rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-gray-300" />
                </div>
              </div>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

import Link from "next/link";
import { Search, Bell, Wallet, User, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-glass-border bg-background/80 backdrop-blur-xl">
      <div className="flex h-16 items-center px-4 md:px-6 justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-6 w-6" />
          </Button>
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center transition-transform group-hover:scale-110">
              <span className="text-white font-bold text-lg leading-none">i</span>
            </div>
            <span className="hidden md:inline-block font-bold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
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
          <Link href="/notifications">
            <Button variant="ghost" size="icon" className="relative text-gray-300 hover:text-white hover:bg-glass">
              <Bell className="h-5 w-5" />
              <span className="absolute top-2 right-2.5 w-2 h-2 bg-secondary rounded-full animate-pulse shadow-[0_0_8px_rgba(236,72,153,0.8)]" />
            </Button>
          </Link>
          <Link href="/profile">
            <div className="h-8 w-8 ml-2 rounded-full bg-gradient-to-tr from-primary to-secondary p-[2px] cursor-pointer hover:scale-105 transition-transform">
              <div className="w-full h-full bg-background rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-gray-300" />
              </div>
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
}

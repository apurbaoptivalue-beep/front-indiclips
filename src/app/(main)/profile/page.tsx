'use client';
import { Settings, Link as LinkIcon, MapPin, Grid, Heart, LayoutList, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ProfilePage() {
  return (
    <div className="w-full max-w-5xl mx-auto pb-12 animate-in fade-in duration-500">
      {/* Cover Photo */}
      <div className="w-full h-48 md:h-64 bg-gradient-to-r from-primary/40 via-secondary/20 to-primary/40 rounded-b-3xl relative overflow-hidden">
         <div className="absolute inset-0 bg-black/20" />
      </div>

      <div className="px-4 md:px-8 relative -top-16">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div className="flex items-end gap-6">
            <div className="w-32 h-32 rounded-full border-4 border-background overflow-hidden relative shadow-2xl bg-gradient-to-tr from-primary to-secondary z-10">
               {/* Avatar placeholder */}
            </div>
            <div className="mb-2">
              <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">Neon Killa</h1>
              <p className="text-gray-400 font-medium">@neonkilla</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 md:mb-2">
            <Link href="/profile">
              <Button className="bg-gradient-to-r from-primary to-secondary text-white font-bold tracking-widest uppercase border-0 px-8 shadow-lg shadow-primary/20 hover:scale-105 transition-transform">
                Edit Profile
              </Button>
            </Link>
            <Button variant="outline" size="icon" className="border-gray-700 hover:bg-gray-800 rounded-full h-10 w-10" onClick={() => alert('Share link copied!')}>
              <Share2 className="w-4 h-4" />
            </Button>
            <Link href="/admin">
              <Button variant="outline" size="icon" className="border-gray-700 hover:bg-gray-800 rounded-full h-10 w-10">
                <Settings className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Bio & Links */}
        <div className="mt-6 max-w-2xl">
          <p className="text-gray-300">
            Digital artist & video creator based in Mumbai. Sharing the neon aesthetic of everyday life and futuristic concepts. 🛸✨
          </p>
          <div className="flex flex-wrap items-center gap-4 mt-4 text-xs font-bold uppercase tracking-wider text-gray-400">
            <span className="flex items-center hover:text-white cursor-pointer transition-colors"><MapPin className="w-4 h-4 mr-1.5" /> Mumbai, IN</span>
            <a href="#" className="flex items-center text-primary hover:text-secondary transition-colors"><LinkIcon className="w-4 h-4 mr-1.5" /> neonkilla.com</a>
          </div>
        </div>

        {/* Stats */}
        <div className="flex gap-8 mt-8 border-b border-glass-border pb-8">
           <div className="flex flex-col cursor-pointer hover:opacity-80 transition-opacity">
             <span className="text-2xl font-black text-white">45</span>
             <span className="text-xs text-gray-500 font-bold tracking-widest uppercase">Following</span>
           </div>
           <div className="flex flex-col cursor-pointer hover:opacity-80 transition-opacity">
             <span className="text-2xl font-black text-white">85.2K</span>
             <span className="text-xs text-gray-500 font-bold tracking-widest uppercase">Followers</span>
           </div>
           <div className="flex flex-col cursor-pointer hover:opacity-80 transition-opacity">
             <span className="text-2xl font-black text-white">2.4M</span>
             <span className="text-xs text-gray-500 font-bold tracking-widest uppercase">Likes</span>
           </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-8 pt-4">
           <button className="flex items-center text-white font-bold border-b-2 border-primary pb-4 px-2 tracking-widest uppercase text-sm">
             <Grid className="w-4 h-4 mr-2" /> Videos
           </button>
           <button className="flex items-center text-gray-500 hover:text-white font-bold border-b-2 border-transparent hover:border-gray-700 pb-4 px-2 tracking-widest uppercase text-sm transition-all">
             <Heart className="w-4 h-4 mr-2" /> Liked
           </button>
           <button className="flex items-center text-gray-500 hover:text-white font-bold border-b-2 border-transparent hover:border-gray-700 pb-4 px-2 tracking-widest uppercase text-sm transition-all">
             <LayoutList className="w-4 h-4 mr-2" /> Playlists
           </button>
        </div>
      </div>

      {/* Video Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1 px-1 mt-2">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="aspect-[3/4] bg-glass border border-glass-border rounded-lg relative group cursor-pointer overflow-hidden isolate shadow-lg hover:z-10 hover:scale-[1.03] transition-all duration-300">
             <div className="absolute inset-0 bg-gradient-to-t from-primary/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10" />
             <div className="absolute bottom-2 left-2 z-20 flex items-center bg-black/60 px-2 py-1 rounded text-white text-xs font-bold gap-1 transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all">
                <PlayElement className="w-3 h-3 fill-current" /> 124K
             </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const PlayElement = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <polygon points="5 3 19 12 5 21 5 3"/>
  </svg>
)

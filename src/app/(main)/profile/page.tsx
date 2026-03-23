'use client';
import { useState } from "react";
import { Settings, Link as LinkIcon, MapPin, Grid, Heart, LayoutList, Share2, Store } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("videos");
  return (
    <div className="w-full max-w-5xl mx-auto pb-12 animate-in fade-in duration-500">
      {/* Cover Photo */}
      <div className="w-full h-48 md:h-64 bg-gradient-to-r from-primary/40 via-secondary/20 to-primary/40 rounded-b-3xl relative overflow-hidden">
         <div className="absolute inset-0 bg-black/20" />
      </div>

      <div className="px-4 md:px-8 relative -top-16">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div className="flex items-end gap-6 group cursor-pointer">
            <div className="w-32 h-32 rounded-full border-[3px] border-background overflow-hidden relative shadow-[0_0_30px_rgba(236,72,153,0.5)] z-10 p-[4px] hover:scale-105 transition-transform duration-500 bg-background">
               <div className="absolute inset-0 rounded-full border-[3px] border-transparent border-t-primary border-r-secondary animate-[spin_3s_linear_infinite]" />
               <div className="absolute inset-2 rounded-full border-[3px] border-transparent border-b-primary border-l-secondary animate-[spin_5s_linear_infinite_reverse]" />
               <div className="w-full h-full rounded-full overflow-hidden bg-[url('https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=400&h=400&fit=crop')] bg-cover bg-center relative z-20 shadow-inner" />
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
            <Link href="/settings">
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
        <div className="flex gap-6 md:gap-8 overflow-x-auto pt-8 border-b border-glass-border mb-6 custom-scrollbar relative z-10 w-full">
           {[
             { id: "videos", label: "Videos", icon: Grid },
             { id: "liked", label: "Liked", icon: Heart },
             { id: "playlists", label: "Playlists", icon: LayoutList },
             { id: "store", label: "Store", icon: Store },
           ].map((tab) => (
             <button
               key={tab.id}
               onClick={() => setActiveTab(tab.id)}
               className={cn(
                 "flex items-center pb-4 px-2 tracking-widest uppercase text-[11px] md:text-xs font-black whitespace-nowrap transition-all border-b-2",
                 activeTab === tab.id
                   ? "text-primary border-primary drop-shadow-[0_0_10px_rgba(236,72,153,0.8)]"
                   : "text-gray-500 border-transparent hover:text-white hover:border-gray-700"
               )}
             >
               <tab.icon className="w-4 h-4 mr-2" /> {tab.label}
             </button>
           ))}
        </div>
      </div>

      {/* Dynamic Tab Content */}
      {activeTab === "videos" ? (
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
      ) : activeTab === "store" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 md:px-8 mt-4 animate-in fade-in slide-in-from-bottom-4">
          {[
            { tag: "Digital", title: "Cyberpunk LUT Pack", price: "₹499", icon: "🎨" },
            { tag: "Merch", title: "Neon Killa Hoodie", price: "₹2,499", icon: "👕" },
            { tag: "Service", title: "1-on-1 Edit Review", price: "₹1,999", icon: "💻" }
          ].map((item, i) => (
            <div key={i} className="bg-glass/80 backdrop-blur-xl border border-glass-border rounded-2xl p-6 shadow-2xl relative overflow-hidden group hover:border-primary/50 transition-all cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="flex justify-between items-start mb-4 relative z-10">
                <span className="text-4xl filter drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">{item.icon}</span>
                <span className="bg-black/60 border border-secondary/30 text-secondary text-[9px] uppercase tracking-widest font-black px-2 py-1 rounded-full shadow-lg">{item.tag}</span>
              </div>
              <h3 className="text-white font-black text-xl tracking-tight mb-2 relative z-10">{item.title}</h3>
              <div className="flex justify-between items-end relative z-10">
                <span className="text-primary font-black text-2xl drop-shadow-[0_0_10px_rgba(236,72,153,0.5)]">{item.price}</span>
                <Button className="bg-white/10 hover:bg-white text-white hover:text-black font-black uppercase tracking-widest text-[10px] h-8 rounded-lg shadow-lg">Buy Now</Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="w-full h-40 flex items-center justify-center text-gray-500 font-bold uppercase tracking-widest text-xs">
          Nothing to show here yet.
        </div>
      )}
    </div>
  );
}

const PlayElement = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <polygon points="5 3 19 12 5 21 5 3"/>
  </svg>
)

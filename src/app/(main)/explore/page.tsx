import { Search, TrendingUp, Hash, Flame, Music } from "lucide-react";

export default function ExplorePage() {
  return (
    <div className="w-full max-w-7xl mx-auto py-8 px-4 animate-in fade-in duration-500">
      {/* Search Header */}
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl blur-xl" />
        <div className="relative bg-glass/60 border border-glass-border p-6 rounded-2xl shadow-2xl backdrop-blur-md">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="relative flex-1 w-full group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-primary transition-colors" />
              <input 
                type="text" 
                placeholder="Search accounts, videos, or hashtags..." 
                className="w-full bg-black/60 border border-gray-700/50 focus:border-primary rounded-xl h-14 pl-12 pr-4 text-white text-lg placeholder-gray-600 transition-colors focus:ring-1 focus:ring-primary outline-none font-medium"
              />
            </div>
            <button className="hidden md:block bg-gradient-to-r from-primary to-secondary text-white font-black h-14 px-10 rounded-xl shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-[0_0_30px_rgba(236,72,153,0.5)] hover:scale-[1.02] transition-all uppercase tracking-widest text-sm">
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Trending Categories */}
      <div className="flex gap-4 overflow-x-auto pb-6 mb-4 custom-scrollbar snap-x relative z-10">
        {[
          { icon: Flame, label: "Trending", color: "text-orange-500", bg: "bg-orange-500/10", border: 'border-orange-500/20' },
          { icon: Music, label: "Music", color: "text-blue-500", bg: "bg-blue-500/10", border: 'border-blue-500/20' },
          { icon: TrendingUp, label: "Creators", color: "text-green-500", bg: "bg-green-500/10", border: 'border-green-500/20' },
          { icon: Hash, label: "Gaming", color: "text-purple-500", bg: "bg-purple-500/10", border: 'border-purple-500/20' },
          { icon: Flame, label: "Comedy", color: "text-yellow-500", bg: "bg-yellow-500/10", border: 'border-yellow-500/20' },
        ].map((cat, i) => (
          <button key={i} className={`flex items-center gap-3 px-6 py-3.5 rounded-xl bg-glass/60 border ${cat.border} hover:bg-glass hover:border-primary/50 transition-all snap-start flex-shrink-0 group shadow-lg`}>
            <div className={`p-2 rounded-lg ${cat.bg} group-hover:scale-110 transition-transform`}>
              <cat.icon className={`w-4 h-4 ${cat.color}`} />
            </div>
            <span className="font-black text-white tracking-widest uppercase text-xs">{cat.label}</span>
          </button>
        ))}
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 relative z-10">
        {/* Featured Large Card */}
        <div className="col-span-2 lg:col-span-2 row-span-2 relative rounded-3xl overflow-hidden group cursor-pointer shadow-[0_10px_40px_rgba(0,0,0,0.5)] hover:shadow-[0_10px_50px_rgba(139,92,246,0.3)] transition-all duration-500 aspect-square md:aspect-auto">
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />
          <div className="absolute inset-0 bg-primary/20 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
          {/* Placeholder Background */}
          <div className="absolute inset-0 bg-gray-900 border border-gray-800">
             <div className="w-full h-full opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary via-background to-background" />
          </div>
          
          <div className="absolute bottom-8 left-8 right-8 z-20 transform group-hover:-translate-y-2 transition-transform duration-500">
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-gradient-to-r from-primary to-secondary text-white text-[10px] font-black uppercase px-3 py-1.5 rounded-full tracking-widest shadow-lg">#Trending Top 1</span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-black text-white leading-tight mb-4 group-hover:text-primary transition-colors">The Neon Aesthetics of Mumbai Cyberpunk</h2>
            <p className="text-gray-300 font-bold text-sm flex items-center gap-3 bg-black/40 w-fit px-4 py-2 rounded-full backdrop-blur-sm border border-white/10">
              <span className="w-6 h-6 rounded-full bg-gradient-to-tr from-primary to-secondary inline-block border-[1.5px] border-white" />
              @neonkilla <span className="text-gray-500">•</span> 1.2M views
            </p>
          </div>
        </div>

        {/* Standard Grid Items */}
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="aspect-[3/4] rounded-2xl overflow-hidden relative group cursor-pointer border border-gray-800 shadow-lg hover:border-secondary/50 transition-all duration-300 hover:scale-[1.02]">
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10 opacity-70 group-hover:opacity-100 transition-opacity" />
            <div className="absolute inset-0 bg-black flex items-center justify-center text-gray-800 z-0">
               <Flame className="w-12 h-12 opacity-30 group-hover:opacity-60 transition-opacity group-hover:text-secondary" />
            </div>
            
            <div className="absolute bottom-4 left-4 right-4 z-20 translate-y-2 group-hover:translate-y-0 transition-transform">
              <p className="text-white font-bold text-sm line-clamp-2 mb-2 group-hover:text-secondary transition-colors leading-snug">Amazing volumetric lighting tutorial #vfx</p>
              <p className="text-gray-400 text-[10px] font-black tracking-widest uppercase flex items-center justify-between">
                <span>{(Math.random() * 500).toFixed(0)}K Views</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

import { BarChart3, TrendingUp, Users, DollarSign, PlayCircle, Star, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  return (
    <div className="w-full max-w-6xl mx-auto py-8 px-4 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 border-b border-glass-border pb-6">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight mb-2">Creator Studio</h1>
          <p className="text-gray-400">Welcome back, <span className="text-primary font-semibold">@neonkilla</span>. Here's your channel overview.</p>
        </div>
        <Button className="bg-glass border border-glass-border hover:bg-glass/80 text-white rounded-full px-8 font-bold tracking-wide">
          Download Report
        </Button>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { icon: PlayCircle, label: "Total Views", value: "2.4M", change: "+12.5%", color: "text-blue-400", bg: "bg-blue-400/10", border: "border-blue-400/20" },
          { icon: Users, label: "Followers", value: "85.2K", change: "+5.2%", color: "text-primary", bg: "bg-primary/10", border: "border-primary/20" },
          { icon: DollarSign, label: "Earnings", value: "₹45,200", change: "+18.4%", color: "text-green-400", bg: "bg-green-400/10", border: "border-green-400/20" },
          { icon: TrendingUp, label: "Profile Visits", value: "124K", change: "-2.1%", color: "text-secondary", bg: "bg-secondary/10", border: "border-secondary/20" }
        ].map((stat, i) => (
          <div key={i} className={`bg-glass/40 border ${stat.border} border-glass-border hover:border-glass-border/80 transition-colors rounded-2xl p-6 backdrop-blur-md shadow-lg relative overflow-hidden group`}>
            <div className={`absolute -right-6 -top-6 w-24 h-24 rounded-full blur-[40px] ${stat.bg} pointer-events-none transition-opacity opacity-50 group-hover:opacity-100`} />
            <div className="flex items-center justify-between mb-4 relative z-10">
              <div className={`p-3 rounded-xl ${stat.bg}`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <span className={`text-sm font-bold flex items-center bg-black/40 px-2 py-1 rounded-lg ${stat.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                {stat.change}
                {stat.change.startsWith('+') ? <ArrowUpRight className="w-4 h-4 ml-0.5" /> : null}
              </span>
            </div>
            <p className="text-gray-400 text-xs font-black uppercase tracking-widest relative z-10">{stat.label}</p>
            <h3 className="text-3xl font-black text-white mt-1 tracking-tight relative z-10">{stat.value}</h3>
          </div>
        ))}
      </div>

      {/* Monetization Tracker */}
      <div className="mb-8 bg-glass border border-glass-border rounded-3xl p-6 md:p-8 backdrop-blur-md shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/10 rounded-full blur-[80px] pointer-events-none" />
        <div className="flex items-center gap-3 mb-6 relative z-10">
          <div className="w-12 h-12 bg-gradient-to-tr from-primary to-secondary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
            <DollarSign className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-black text-white">Monetization Eligibility</h2>
            <p className="text-sm text-gray-400 font-medium">Track your progress toward joining the Creator Fund.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
          {/* Follower Target */}
          <div className="space-y-3">
            <div className="flex justify-between items-end">
              <div>
                <p className="text-white font-bold text-sm">Followers</p>
                <p className="text-xs text-gray-500 font-medium mt-1">Goal: 1,000</p>
              </div>
              <span className="text-sm font-black text-primary">850 / 1000</span>
            </div>
            <div className="w-full h-3 bg-black/50 rounded-full overflow-hidden border border-gray-800 relative">
              <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary to-secondary w-[85%] rounded-full shadow-[0_0_10px_rgba(236,72,153,0.5)] z-10" />
            </div>
          </div>

          {/* Watch Time Target */}
          <div className="space-y-3">
            <div className="flex justify-between items-end">
              <div>
                <p className="text-white font-bold text-sm">Watch Time (Hours)</p>
                <p className="text-xs text-gray-500 font-medium mt-1">Goal: 4,000</p>
              </div>
              <span className="text-sm font-black text-secondary">3,200 / 4000</span>
            </div>
            <div className="w-full h-3 bg-black/50 rounded-full overflow-hidden border border-gray-800 relative">
              <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-secondary to-blue-500 w-[80%] rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)] z-10" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Chart Area */}
        <div className="lg:col-span-2 bg-glass/40 border border-glass-border rounded-2xl p-6 backdrop-blur-md shadow-xl flex flex-col">
          <div className="flex items-center justify-between mb-8">
             <div className="flex items-center space-x-3">
               <BarChart3 className="w-6 h-6 text-primary" />
               <h3 className="text-xl font-bold text-white">Audience Growth</h3>
             </div>
             <select className="bg-black/80 border border-gray-800 text-gray-300 font-medium text-sm rounded-lg px-4 py-2 focus:outline-none focus:border-primary cursor-pointer hover:bg-black transition-colors">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
              <option>This Year</option>
            </select>
          </div>
          {/* Mock Chart representation */}
          <div className="w-full flex-1 min-h-[250px] flex items-end justify-between gap-1 md:gap-3 border-b border-gray-800 pb-4 relative mt-auto">
             <div className="absolute left-0 top-0 h-full w-full flex flex-col justify-between opacity-20 pointer-events-none">
                <div className="w-full h-[1px] bg-gray-600" />
                <div className="w-full h-[1px] bg-gray-600" />
                <div className="w-full h-[1px] bg-gray-600" />
                <div className="w-full h-[1px] bg-gray-600" />
             </div>
             {[40, 60, 45, 80, 55, 90, 70, 85, 100, 65, 75, 50].map((h, i) => (
               <div key={i} className="w-full min-w-[10px] bg-gradient-to-t from-primary/80 to-secondary hover:opacity-100 opacity-80 cursor-pointer hover:scale-y-105 origin-bottom transition-all rounded-t-md relative group/bar" style={{ height: `${h}%` }}>
                 <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover/bar:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-20">
                   +{h}K
                 </div>
               </div>
             ))}
          </div>
          <div className="flex justify-between mt-4 text-[10px] md:text-xs text-gray-500 font-bold tracking-widest uppercase">
            <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span>
          </div>
        </div>

        {/* Trending Videos */}
        <div className="bg-glass/40 border border-glass-border rounded-2xl p-6 backdrop-blur-md shadow-xl flex flex-col">
          <div className="flex items-center space-x-2 mb-6 border-b border-glass-border pb-4">
             <TrendingUp className="w-5 h-5 text-secondary" />
             <h3 className="text-lg font-bold text-white uppercase tracking-wider">Top Videos</h3>
          </div>
          <div className="space-y-4 flex-1">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex gap-4 items-center group cursor-pointer p-2 rounded-xl hover:bg-glass/50 transition-colors -mx-2">
                <div className="w-16 h-24 bg-black rounded-lg border border-glass-border overflow-hidden relative shadow-md">
                   <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent group-hover:from-primary/50 transition-colors" />
                   <div className="absolute bottom-1 right-1 bg-black/80 px-1 rounded text-[9px] font-bold text-white tracking-widest">0:45</div>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-white font-semibold text-sm line-clamp-2 group-hover:text-primary transition-colors leading-snug">Exploring the hidden neon streets of Mumbai at night</h4>
                  <div className="flex items-center text-xs text-gray-400 mt-2 space-x-3 font-medium">
                     <span className="flex items-center"><PlayCircle className="w-3.5 h-3.5 mr-1 text-primary/70" /> 124K</span>
                     <span className="flex items-center"><Star className="w-3.5 h-3.5 mr-1 text-yellow-500/70" /> 12K</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Button className="w-full mt-6 bg-transparent border border-gray-700 text-white hover:bg-white hover:text-black font-bold uppercase tracking-widest text-xs transition-colors h-12">
            View All Content
          </Button>
        </div>
      </div>
    </div>
  );
}

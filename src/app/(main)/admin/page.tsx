import { ShieldCheck, Users, Video, AlertTriangle, CreditCard, Search, Ban, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminPanelPage() {
  return (
    <div className="w-full max-w-7xl mx-auto py-8 px-4 animate-in fade-in duration-500">
      <div className="flex items-center space-x-4 mb-8 border-b border-glass-border pb-6">
        <div className="p-3 bg-red-500/20 rounded-2xl border border-red-500/30 shadow-[0_0_20px_rgba(239,68,68,0.2)]">
           <ShieldCheck className="w-8 h-8 text-red-500" />
        </div>
        <div>
          <h1 className="text-3xl font-black tracking-tight text-white mb-1">Admin Dashboard</h1>
          <p className="text-gray-400 font-bold uppercase text-xs tracking-widest">System overview and moderation tools</p>
        </div>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { icon: Users, label: "Total Users", value: "1.24M", color: "text-blue-400", bg: "bg-blue-400/10", border: 'border-blue-400/20' },
          { icon: Video, label: "Videos Hosted", value: "852K", color: "text-primary", bg: "bg-primary/10", border: 'border-primary/20' },
          { icon: AlertTriangle, label: "Pending Reports", value: "342", color: "text-orange-400", bg: "bg-orange-400/10", border: 'border-orange-400/20' },
          { icon: CreditCard, label: "Today's Revenue", value: "₹2.4L", color: "text-green-400", bg: "bg-green-400/10", border: 'border-green-400/20' }
        ].map((stat, i) => (
          <div key={i} className={`bg-glass/40 border ${stat.border} rounded-2xl p-6 relative overflow-hidden shadow-lg transition-transform hover:-translate-y-1`}>
            <div className="flex items-center justify-between mb-4 relative z-10">
              <div className={`p-4 rounded-xl ${stat.bg}`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
            </div>
            <p className="text-gray-400 text-xs font-black uppercase tracking-widest relative z-10">{stat.label}</p>
            <h3 className="text-4xl font-black text-white mt-2 tracking-tight relative z-10">{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* User Management */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-glass/30 border border-glass-border rounded-3xl p-6 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] pointer-events-none" />
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 relative z-10">
              <h2 className="text-xl font-black text-white uppercase tracking-wider">User Management</h2>
              <div className="relative group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-primary transition-colors" />
                <input 
                  type="text" 
                  placeholder="Search users..." 
                  className="w-full sm:w-64 bg-black/60 border border-gray-800 rounded-xl pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors font-medium"
                />
              </div>
            </div>

            <div className="overflow-x-auto relative z-10">
              <table className="w-full text-left border-collapse min-w-[500px]">
                <thead>
                  <tr className="border-b border-gray-800 text-[10px] font-black uppercase tracking-widest text-gray-500">
                    <th className="pb-3 px-2">User details</th>
                    <th className="pb-3 px-2">Account Status</th>
                    <th className="pb-3 px-2">Joined Date</th>
                    <th className="pb-3 px-2 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800/50">
                  {[
                    { name: "Neon Killa", username: "@neonkilla", status: "Active", date: "Mar 10, 2026", color: "text-green-400", bg: "bg-green-400/10", border: "border-green-400/20" },
                    { name: "Random Guy", username: "@random_guy", status: "Warned", date: "Mar 12, 2026", color: "text-orange-400", bg: "bg-orange-400/10", border: "border-orange-400/20" },
                    { name: "Spam Bot 99", username: "@spam99", status: "Banned", date: "Mar 15, 2026", color: "text-red-400", bg: "bg-red-400/10", border: "border-red-400/20" },
                    { name: "India's Finest", username: "@indias_finest", status: "Active", date: "Feb 28, 2026", color: "text-green-400", bg: "bg-green-400/10", border: "border-green-400/20" },
                  ].map((user, i) => (
                    <tr key={i} className="hover:bg-glass/60 transition-colors group cursor-pointer">
                      <td className="py-4 px-2">
                        <div>
                          <p className="font-bold text-white text-sm group-hover:text-primary transition-colors">{user.name}</p>
                          <p className="text-xs text-gray-500 font-medium">{user.username}</p>
                        </div>
                      </td>
                      <td className="py-4 px-2">
                        <span className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded border ${user.bg} ${user.color} ${user.border}`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="py-4 px-2 text-xs font-bold text-gray-400">{user.date}</td>
                      <td className="py-4 px-2 text-right">
                        <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white px-3 font-bold uppercase text-[10px] tracking-wider bg-black/40 hover:bg-black/60">Manage</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Video Moderation Queue */}
          <div className="bg-glass/30 border border-glass-border rounded-3xl p-6 shadow-xl">
             <h2 className="text-xl font-black text-white uppercase tracking-wider mb-6">AI Moderation Queue</h2>
             <div className="space-y-4">
               {[1, 2].map((i) => (
                 <div key={i} className="flex flex-col sm:flex-row gap-5 p-5 border border-gray-800 rounded-2xl bg-black/40 hover:bg-glass/50 transition-colors shadow-inner">
                   <div className="w-full sm:w-40 aspect-video bg-black rounded-xl relative overflow-hidden border border-gray-800 shadow-md">
                     <div className="absolute inset-0 flex items-center justify-center">
                       <Video className="w-8 h-8 text-gray-700" />
                     </div>
                     <div className="absolute bottom-1 right-1 bg-black/80 px-1.5 py-0.5 rounded text-[9px] font-bold text-white tracking-widest">A.I. FLAGGED</div>
                   </div>
                   <div className="flex-1">
                     <div className="flex justify-between items-start mb-2 gap-2">
                       <h4 className="text-white font-bold text-sm leading-tight">Suspicious activity detected in uploaded video content</h4>
                       <span className="bg-red-500/10 text-red-500 border border-red-500/20 text-[9px] font-black uppercase px-2 py-1 rounded shadow-sm tracking-widest whitespace-nowrap">High Risk</span>
                     </div>
                     <p className="text-xs text-gray-500 font-bold mb-5 tracking-wide">Category: <span className="text-gray-300">Policy Violation / Scam</span></p>
                     <div className="flex gap-3">
                        <Button size="sm" className="bg-red-500 hover:bg-red-600 text-white border-0 h-9 font-black uppercase tracking-widest text-[10px] px-4 shadow-[0_0_15px_rgba(239,68,68,0.3)]"><Ban className="w-3.5 h-3.5 mr-1.5" /> Remove</Button>
                        <Button size="sm" variant="outline" className="border-gray-700 hover:bg-gray-800 text-gray-300 hover:text-white h-9 font-black uppercase tracking-widest text-[10px]"><CheckCircle2 className="w-3.5 h-3.5 mr-1.5" /> Approve</Button>
                     </div>
                   </div>
                 </div>
               ))}
             </div>
          </div>
        </div>

        {/* System Logs */}
        <div className="bg-glass/30 border border-glass-border rounded-3xl p-6 shadow-xl h-fit">
          <h2 className="text-xl font-black text-white uppercase tracking-wider mb-6">Live AI Alerts Log</h2>
          <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-[2px] before:bg-gradient-to-b before:from-gray-800/50 before:via-gray-800 before:to-transparent">
             {[
               { time: "10:42 AM", msg: "Multiple login failures from IP 192.168.x.x", type: "warning" },
               { time: "10:38 AM", msg: "Large transaction detected: ₹2.5L", type: "info" },
               { time: "10:15 AM", msg: "Server region ap-south-1 scaling up", type: "success" },
               { time: "09:55 AM", msg: "DDoS attempt blocked", type: "danger" },
               { time: "09:30 AM", msg: "Daily backup completed successfully", type: "success" },
             ].map((log, i) => (
               <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                 <div className={`flex items-center justify-center w-3 h-3 rounded-full border-[3px] border-background shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-lg z-10 ${
                   log.type === 'danger' ? 'bg-red-500 shadow-red-500/50' : log.type === 'warning' ? 'bg-orange-500 shadow-orange-500/50' : log.type === 'success' ? 'bg-green-500 shadow-green-500/50' : 'bg-blue-500 shadow-blue-500/50'
                 }`} />
                 <div className="w-[calc(100%-2.5rem)] md:w-[calc(50%-1.5rem)] bg-black/60 p-4 rounded-xl border border-gray-800/80 hover:border-gray-600 transition-colors shadow-inner text-sm group-hover:scale-[1.02] transition-transform">
                   <div className="flex items-center justify-between mb-1.5">
                     <span className="font-black text-[9px] text-gray-500 uppercase tracking-widest bg-black rounded px-1">{log.time}</span>
                   </div>
                   <div className="text-gray-300 text-xs font-bold tracking-wide leading-relaxed">{log.msg}</div>
                 </div>
               </div>
             ))}
          </div>
          <Button variant="ghost" className="w-full mt-8 bg-primary/10 text-primary hover:bg-primary/20 hover:text-white font-black uppercase tracking-widest text-[11px] h-12 transition-colors rounded-xl border border-primary/20">
            View Full System Logs
          </Button>
        </div>
      </div>
    </div>
  );
}

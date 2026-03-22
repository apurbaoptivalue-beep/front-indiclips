import { Heart, MessageSquare, UserPlus, Gift, AlertCircle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotificationsPage() {
  const notifications = [
    { id: 1, type: "like", user: "random_guy", content: "liked your video", time: "2m ago", read: false, icon: Heart, iconColor: "text-secondary", bgColor: "bg-secondary/10", image: true },
    { id: 2, type: "comment", user: "indias_finest", content: 'commented: "This neon aesthetic is crazy good! 🔥"', time: "1h ago", read: false, icon: MessageSquare, iconColor: "text-blue-400", bgColor: "bg-blue-400/10", image: true },
    { id: 3, type: "follow", user: "neon_creator", content: "started following you", time: "3h ago", read: true, icon: UserPlus, iconColor: "text-primary", bgColor: "bg-primary/10", image: false },
    { id: 4, type: "tip", user: "fan99", content: "sent you a tip of 500 Coins 🪙", time: "1d ago", read: true, icon: Gift, iconColor: "text-yellow-500", bgColor: "bg-yellow-500/10", image: false },
    { id: 5, type: "system", user: "IndiClips", content: "Your video 'Mumbai Nights' is trending!", time: "2d ago", read: true, icon: CheckCircle2, iconColor: "text-green-500", bgColor: "bg-green-500/10", image: true },
    { id: 6, type: "alert", user: "Safety Team", content: "A login was detected from a new device.", time: "1w ago", read: true, icon: AlertCircle, iconColor: "text-red-500", bgColor: "bg-red-500/10", image: false },
  ];

  return (
    <div className="w-full max-w-3xl mx-auto py-8 px-4 animate-in fade-in duration-500">
      <div className="flex items-center justify-between mb-8 border-b border-glass-border pb-4">
        <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Notifications</h1>
        <Button variant="ghost" className="text-primary text-sm font-bold tracking-widest uppercase hover:bg-primary/10 transition-colors">
          <CheckCircle2 className="w-4 h-4 mr-2" /> Mark all as read
        </Button>
      </div>

      <div className="space-y-4">
        <div className="flex gap-4 mb-6 border-b border-gray-800 pb-2">
          <button className="text-white font-bold border-b-2 border-primary pb-2 px-2">All Activity</button>
          <button className="text-gray-500 font-medium hover:text-white pb-2 px-2 transition-colors">Likes</button>
          <button className="text-gray-500 font-medium hover:text-white pb-2 px-2 transition-colors">Comments</button>
          <button className="text-gray-500 font-medium hover:text-white pb-2 px-2 transition-colors">Mentions</button>
        </div>

        {notifications.map((notif) => (
          <div key={notif.id} className={`flex items-start gap-4 p-4 rounded-2xl cursor-pointer transition-all ${notif.read ? 'bg-black/20 hover:bg-glass/30' : 'bg-glass/60 border border-glass-border shadow-lg hover:shadow-[0_0_15px_rgba(139,92,246,0.15)]'}`}>
            <div className="mt-1 relative">
              <div className="w-12 h-12 bg-gradient-to-tr from-primary to-secondary rounded-full overflow-hidden border-2 border-background shadow-md">
                 {/* Avatar placeholder */}
              </div>
              <div className={`absolute -bottom-1 -right-1 p-1.5 rounded-full border-2 border-background ${notif.bgColor}`}>
                <notif.icon className={`w-3 h-3 ${notif.iconColor} fill-current`} />
              </div>
            </div>
            
            <div className="flex-1">
              <p className="text-sm text-gray-300">
                <span className="font-bold text-white mr-1">{notif.user}</span>
                {notif.content}
              </p>
              <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mt-1.5">{notif.time}</p>
            </div>
            
            {notif.image && (
              <div className="w-12 h-16 bg-gray-800 rounded-md overflow-hidden border border-gray-700 ml-4 flex-shrink-0">
                 {/* Video thumbnail placeholder */}
                 <div className="w-full h-full bg-gradient-to-b from-transparent to-black/50" />
              </div>
            )}
            
            {!notif.read && (
              <div className="w-2 h-2 bg-primary rounded-full ml-2 self-center animate-pulse shadow-[0_0_5px_rgba(139,92,246,0.8)]" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

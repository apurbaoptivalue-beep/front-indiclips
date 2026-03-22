import HLSPlayer from "@/components/Player/HLSPlayer";
import { Button } from "@/components/ui/button";
import { UserPlus, Heart, Share2, Flag, MessageSquare } from "lucide-react";

const DEMO_HLS_URL = "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8";

export default function PlayerPage() {
  return (
    <div className="w-full max-w-6xl mx-auto py-6 px-4 md:px-6 animate-in slide-in-from-bottom-4 duration-500">
      <HLSPlayer src={DEMO_HLS_URL} poster="https://picsum.photos/1920/1080?random=1" />
      
      <div className="mt-6 flex flex-col md:flex-row md:items-start justify-between gap-6">
        <div className="flex-1 space-y-4">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white m-0">
             Exploring the Neon Lights of Mumbai 🌃
          </h1>
          
          <div className="flex items-center space-x-4 pb-4 border-b border-glass-border">
            <div className="flex items-center space-x-3 cursor-pointer group">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary/50 group-hover:border-primary transition-colors shadow-lg shadow-primary/20">
                <div className="w-full h-full bg-gradient-to-tr from-primary to-secondary" />
              </div>
              <div>
                <p className="text-white font-bold group-hover:text-primary transition-colors leading-tight">@neonkilla</p>
                <p className="text-sm text-gray-400">12.5K Followers</p>
              </div>
            </div>
            
            <Button className="bg-glass text-white border border-glass-border hover:bg-glass/80 hover:text-primary ml-2 rounded-full px-6 h-10 transition-all hover:scale-105">
               <UserPlus className="w-4 h-4 mr-2" /> Follow
            </Button>
          </div>
          
          <div className="bg-glass/30 border border-glass-border rounded-xl p-5 mt-4 backdrop-blur-sm shadow-inner transition-colors hover:bg-glass/50">
            <div className="flex space-x-4 text-sm font-semibold text-white mb-2">
              <span className="text-primary">85.2K views</span>
              <span>2 days ago</span>
            </div>
            <p className="text-gray-300 md:text-lg leading-relaxed">
               Walking through the vibrant streets of Mumbai at night. The colors are absolutely incredible! #mumbai #neon #travel #india #aesthetics
            </p>
          </div>
        </div>
        
        <div className="flex md:flex-col items-center justify-around md:justify-start gap-4 md:bg-glass/20 md:border md:border-glass-border rounded-2xl md:p-4 min-w-[120px] shadow-lg">
          <button className="flex flex-col items-center space-y-1 group">
            <div className="p-3 md:p-4 rounded-full bg-glass group-hover:bg-primary/20 transition-colors shadow-sm">
               <Heart className="w-6 h-6 text-white group-hover:text-primary transition-colors" />
            </div>
            <span className="text-sm text-gray-400 font-semibold uppercase tracking-wider">12K</span>
          </button>
          
          <button className="flex flex-col items-center space-y-1 group">
            <div className="p-3 md:p-4 rounded-full bg-glass group-hover:bg-secondary/20 transition-colors shadow-sm">
               <MessageSquare className="w-6 h-6 text-white group-hover:text-secondary transition-colors" />
            </div>
            <span className="text-sm text-gray-400 font-semibold uppercase tracking-wider">842</span>
          </button>
          
          <button className="flex flex-col items-center space-y-1 group">
            <div className="p-3 md:p-4 rounded-full bg-glass hover:bg-glass/80 transition-colors shadow-sm">
               <Share2 className="w-6 h-6 text-white" />
            </div>
            <span className="text-sm text-gray-400 font-semibold uppercase tracking-wider">Share</span>
          </button>
          
          <button className="flex flex-col items-center space-y-1 group pt-2 md:mt-2 md:border-t md:border-glass-border w-full">
             <Flag className="w-5 h-5 text-gray-500 hover:text-red-500 transition-colors" />
             <span className="text-[10px] text-gray-500 uppercase font-bold tracking-widest mt-1">Report</span>
          </button>
        </div>
      </div>
    </div>
  );
}

"use client";
import { useEffect, useRef, useState } from "react";
import { Heart, MessageCircle, Share2, Music, UserPlus, Languages, Swords, Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface VideoPostProps {
  id: string;
  url: string;
  creator: string;
  description: string;
  likes: number;
  comments: number;
  shares: number;
  isActive: boolean;
}

export default function VideoPost({
  id,
  url,
  creator,
  description,
  likes: initialLikes,
  comments,
  shares,
  isActive,
}: VideoPostProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(initialLikes);
  
  // Phase 3 Features
  const [showDubMenu, setShowDubMenu] = useState(false);
  const [currentLang, setCurrentLang] = useState("Original");
  const [isChallenging, setIsChallenging] = useState(false);
  const [syncScore, setSyncScore] = useState<number | null>(null);

  const triggerVibrate = () => {
    if (typeof window !== "undefined" && navigator.vibrate) {
      navigator.vibrate(50);
    }
  };

  const startChallenge = () => {
    setIsChallenging(true);
    setSyncScore(null);
    // Simulate AI Sync Scoring
    setTimeout(() => {
      setSyncScore(Math.floor(Math.random() * (99 - 85 + 1)) + 85);
    }, 3000);
  };

  useEffect(() => {
    if (!videoRef.current) return;
    if (isActive) {
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
      }
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  }, [isActive]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleLike = () => {
    triggerVibrate();
    setIsLiked(!isLiked);
    setLikes(isLiked ? likes - 1 : likes + 1);
  };

  return (
    <div className="relative w-full max-w-[450px] aspect-[9/16] bg-black rounded-2xl overflow-hidden snap-center snap-always shadow-2xl mx-auto flex-shrink-0 group">
      <video
        ref={videoRef}
        src={url}
        className="w-full h-full object-cover cursor-pointer"
        loop
        playsInline
        muted={false} // Will play sound if browser policy allows, otherwise starts muted
        onClick={togglePlay}
      />
      
      {/* Play/Pause overlay */}
      {!isPlaying && !isChallenging && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-300">
          <div className="w-20 h-20 bg-black/40 rounded-full flex items-center justify-center backdrop-blur-md">
            <svg className="w-10 h-10 text-white ml-2 opacity-80" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      )}

      {/* Split-Screen Interactive Challenge Mode */}
      {isChallenging && (
        <div className="absolute inset-y-0 right-0 w-1/2 bg-black border-l-2 border-secondary animate-in slide-in-from-right-full duration-500 overflow-hidden z-30">
           {/* Mockup of user's front camera */}
           <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=400&h=800&fit=crop')] bg-cover bg-center opacity-80" />
           <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
           
           <button onClick={() => { triggerVibrate(); setIsChallenging(false); }} className="absolute top-4 right-4 bg-black/50 p-2 rounded-full text-white hover:bg-black/80 z-20">
             <X className="w-4 h-4" />
           </button>

           <div className="absolute bottom-16 inset-x-0 flex flex-col items-center">
             {syncScore ? (
               <div className="animate-in zoom-in bounce-in duration-500 flex flex-col items-center">
                 <div className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-yellow-300 to-yellow-600 drop-shadow-[0_0_20px_rgba(234,179,8,0.8)]">
                   {syncScore}%
                 </div>
                 <div className="text-[10px] uppercase font-black tracking-widest text-yellow-500 mt-1 bg-black/50 px-2 py-0.5 rounded backdrop-blur-md border border-yellow-500/30 shadow-lg shadow-yellow-500/20">
                   Sync Match
                 </div>
               </div>
             ) : (
               <div className="bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-secondary/50 flex items-center gap-2">
                 <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse shadow-[0_0_10px_red]" />
                 <span className="text-[10px] text-secondary font-bold uppercase tracking-widest">AI Scanning...</span>
               </div>
             )}
           </div>
        </div>
      )}

      {/* Right Actions */}
      <div className="absolute right-4 bottom-28 flex flex-col items-center space-y-7 z-10">
        <div className="relative group/avatar cursor-pointer">
          <div className="w-12 h-12 bg-white rounded-full border-[3px] border-white overflow-hidden shadow-lg">
             <div className="w-full h-full bg-gradient-to-tr from-primary to-secondary rounded-full" />
          </div>
          <button className="absolute -bottom-2 right-1/2 translate-x-1/2 bg-primary text-white p-[3px] rounded-full shadow-md hover:scale-110 transition-transform">
            <UserPlus className="w-3.5 h-3.5" />
          </button>
        </div>

        <button onClick={handleLike} className="flex flex-col items-center space-y-1.5 group/btn">
          <div className="p-3 rounded-full bg-black/30 backdrop-blur-md group-hover/btn:bg-black/50 transition-colors">
            <Heart className={cn("w-7 h-7 transition-all", isLiked ? "fill-secondary text-secondary scale-110 drop-shadow-[0_0_10px_rgba(236,72,153,0.8)]" : "text-white")} />
          </div>
          <span className="text-white text-xs font-bold drop-shadow-md">{likes}</span>
        </button>

        <button onClick={() => triggerVibrate()} className="flex flex-col items-center space-y-1.5 group/btn">
          <div className="p-3 rounded-full bg-black/30 backdrop-blur-md group-hover/btn:bg-black/50 transition-colors">
            <MessageCircle className="w-7 h-7 text-white" />
          </div>
          <span className="text-white text-xs font-bold drop-shadow-md">{comments}</span>
        </button>

        <button onClick={() => triggerVibrate()} className="flex flex-col items-center space-y-1.5 group/btn">
          <div className="p-3 rounded-full bg-black/30 backdrop-blur-md group-hover/btn:bg-black/50 transition-colors">
            <Share2 className="w-7 h-7 text-white" />
          </div>
          <span className="text-white text-xs font-bold drop-shadow-md">{shares}</span>
        </button>

        {/* AI Dub Button */}
        <div className="relative">
          <button 
            onClick={() => { triggerVibrate(); setShowDubMenu(!showDubMenu); }} 
            className="flex flex-col items-center space-y-1.5 group/btn relative top-2"
          >
            <div className="p-3 rounded-full bg-black/30 backdrop-blur-md group-hover/btn:bg-primary/50 transition-colors shadow-[0_0_10px_rgba(236,72,153,0)] group-hover/btn:shadow-[0_0_15px_rgba(236,72,153,0.5)] border border-transparent group-hover/btn:border-primary/50">
              <Languages className="w-6 h-6 text-white" />
            </div>
            <span className="text-white text-[9px] font-black uppercase tracking-wider drop-shadow-md pb-1">Dub</span>
          </button>
          
          {showDubMenu && (
            <div className="absolute right-14 top-0 bg-glass/90 backdrop-blur-xl border border-glass-border p-2 rounded-2xl w-36 shadow-[0_0_20px_rgba(0,0,0,0.8)] animate-in slide-in-from-right-2 fade-in">
              <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest px-2 mb-2 pb-1.5 border-b border-gray-700">AI Translator</div>
              {["Original", "Hindi", "Bengali", "Kannada", "Tamil"].map((lang) => (
                <button 
                  key={lang}
                  onClick={() => { triggerVibrate(); setCurrentLang(lang); setShowDubMenu(false); }}
                  className={cn("w-full text-left px-3 py-2 text-xs font-bold rounded-xl transition-colors flex justify-between items-center", currentLang === lang ? "bg-gradient-to-r from-primary to-secondary text-white shadow-lg" : "text-gray-300 hover:bg-white/10 hover:text-white")}
                >
                  {lang}
                  {currentLang === lang && <Check className="w-3.5 h-3.5" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Challenge Button */}
        <button onClick={() => { triggerVibrate(); startChallenge(); }} className="flex flex-col items-center space-y-1.5 group/btn relative top-2">
          <div className="p-3 rounded-full bg-black/30 backdrop-blur-md group-hover/btn:bg-secondary/50 transition-colors shadow-[0_0_10px_rgba(139,92,246,0)] group-hover/btn:shadow-[0_0_15px_rgba(139,92,246,0.5)] border border-transparent group-hover/btn:border-secondary/50 relative">
             <div className="absolute inset-0 rounded-full border border-secondary/50 animate-ping opacity-20" />
            <Swords className="w-6 h-6 text-white" />
          </div>
          <span className="text-secondary text-[9px] font-black uppercase tracking-wider drop-shadow-md">Duel</span>
        </button>
      </div>

      {/* Bottom info */}
      <div className="absolute bottom-0 left-0 right-16 px-4 pb-4 pt-20 bg-gradient-to-t from-black via-black/50 to-transparent pointer-events-none z-0">
        <h3 className="text-white font-bold text-lg drop-shadow-md hover:underline cursor-pointer pointer-events-auto">@{creator}</h3>
        <p className="text-white text-[15px] mt-2 line-clamp-2 drop-shadow-md pointer-events-auto leading-tight">{description}</p>
        <div className="flex items-center space-x-2 mt-4 animate-pulse">
          <Music className="w-4 h-4 text-white" />
          <p className="text-white text-sm truncate font-medium drop-shadow-md">Original Sound - {creator}</p>
        </div>
      </div>
    </div>
  );
}

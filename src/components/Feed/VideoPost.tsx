"use client";
import { useEffect, useRef, useState } from "react";
import { Heart, MessageCircle, Share2, Music, UserPlus } from "lucide-react";
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
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-300">
          <div className="w-20 h-20 bg-black/40 rounded-full flex items-center justify-center backdrop-blur-md">
            <svg className="w-10 h-10 text-white ml-2 opacity-80" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
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

        <button className="flex flex-col items-center space-y-1.5 group/btn">
          <div className="p-3 rounded-full bg-black/30 backdrop-blur-md group-hover/btn:bg-black/50 transition-colors">
            <MessageCircle className="w-7 h-7 text-white" />
          </div>
          <span className="text-white text-xs font-bold drop-shadow-md">{comments}</span>
        </button>

        <button className="flex flex-col items-center space-y-1.5 group/btn">
          <div className="p-3 rounded-full bg-black/30 backdrop-blur-md group-hover/btn:bg-black/50 transition-colors">
            <Share2 className="w-7 h-7 text-white" />
          </div>
          <span className="text-white text-xs font-bold drop-shadow-md">{shares}</span>
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

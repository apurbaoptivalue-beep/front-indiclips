"use client";
import { useEffect, useRef, useState } from "react";
import Hls from "hls.js";
import { Maximize, Play, Pause, Volume2, VolumeX, Settings } from "lucide-react";

interface HLSPlayerProps {
  src: string;
  poster?: string;
}

export default function HLSPlayer({ src, poster }: HLSPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);

  useEffect(() => {
    let hls: Hls;
    const video = videoRef.current;
    if (!video) return;

    if (Hls.isSupported()) {
      hls = new Hls({
        maxBufferSize: 0,
      });
      hls.loadSource(src);
      hls.attachMedia(video);
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = src;
    }

    return () => {
      if (hls) {
        hls.destroy();
      }
    };
  }, [src]);

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

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  let timeoutRef = useRef<NodeJS.Timeout>(null);
  const handleMouseMove = () => {
    setShowControls(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      if (isPlaying) setShowControls(false);
    }, 3000);
  };

  return (
    <div 
      ref={containerRef} 
      className="relative w-full max-w-5xl mx-auto aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl group border border-glass-border/50"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => isPlaying && setShowControls(false)}
    >
      <video
        ref={videoRef}
        className="w-full h-full cursor-pointer"
        poster={poster}
        onClick={togglePlay}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      {/* Controls Overlay */}
      <div 
        className={`absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent transition-opacity duration-300 pointer-events-none flex flex-col justify-end p-4 md:p-6 ${
          showControls ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="pointer-events-auto flex items-center justify-between w-full">
          <div className="flex items-center space-x-5">
            <button onClick={togglePlay} className="text-white hover:text-primary transition-colors hover:scale-110">
              {isPlaying ? <Pause className="w-8 h-8 fill-current" /> : <Play className="w-8 h-8 fill-current" />}
            </button>
            <button onClick={toggleMute} className="text-white hover:text-primary transition-colors">
              {isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
            </button>
            {/* simple progress bar visual */}
            <div className="hidden md:block w-64 lg:w-96 h-1.5 bg-gray-600 rounded-full overflow-hidden cursor-pointer relative group/progress">
               <div className="w-[45%] h-full bg-gradient-to-r from-primary to-secondary relative">
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full scale-0 group-hover/progress:scale-100 transition-transform shadow-[0_0_8px_rgba(236,72,153,0.8)]" />
               </div>
            </div>
          </div>
          <div className="flex items-center space-x-5">
            <button className="text-white hover:text-primary transition-colors">
               <Settings className="w-6 h-6" />
            </button>
            <button onClick={toggleFullscreen} className="text-white hover:text-primary transition-colors">
              <Maximize className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

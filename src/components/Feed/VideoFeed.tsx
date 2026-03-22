"use client";
import { useEffect, useRef, useState } from "react";
import VideoPost from "./VideoPost";
import { fetchAPI } from "@/lib/api";

interface VideoData {
  id: string;
  url: string;
  creator: string;
  description: string;
  likes: number;
  comments: number;
  shares: number;
}

export default function VideoFeed() {
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [videos, setVideos] = useState<VideoData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch videos from the new AWS backend
    fetchAPI("/videos/feed")
      .then((data) => {
        setVideos(Array.isArray(data) ? data : data.videos || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch feed:", err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (videos.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveVideoId(entry.target.getAttribute("data-id"));
          }
        });
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.7, // 70% of video must be visible
      }
    );

    const videoElements = document.querySelectorAll(".video-post-element");
    videoElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [videos]);

  if (loading) {
    return <div className="h-[calc(100vh-4.5rem)] w-full flex items-center justify-center text-primary animate-pulse font-bold tracking-widest uppercase">Loading Feed...</div>;
  }

  if (videos.length === 0) {
    return <div className="h-[calc(100vh-4.5rem)] w-full flex items-center justify-center text-gray-500 font-bold tracking-widest uppercase">No videos available</div>;
  }

  return (
    <div 
      ref={containerRef}
      className="h-[calc(100vh-4.5rem)] w-full overflow-y-scroll snap-y snap-mandatory flex flex-col items-center no-scrollbar pointer-events-auto"
      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
    >
      {videos.map((video, index) => (
        <div key={video.id} data-id={video.id} className="video-post-element w-full h-[calc(100vh-4.5rem)] flex items-center justify-center p-4 snap-start shrink-0">
          <VideoPost {...video} isActive={activeVideoId === video.id || (activeVideoId === null && index === 0)} />
        </div>
      ))}
    </div>
  );
}

"use client";
import { useEffect, useState } from "react";

export default function SplashScreen() {
  const [show, setShow] = useState(true);
  const [animateClose, setAnimateClose] = useState(false);

  useEffect(() => {
    // Verify if we already showed the splash screen in this session to avoid annoyance, 
    // but for demo we will just show it on first mount.
    const hasSeenSplash = sessionStorage.getItem("hasSeenSplash");
    if (hasSeenSplash) {
      setShow(false);
      return;
    }
    
    // Start closing animation after 1.5 seconds
    const timer1 = setTimeout(() => {
      setAnimateClose(true);
    }, 1500);

    // Unmount completely after 3.5 seconds (allowing 2s for the slow-motion fade & scale)
    const timer2 = setTimeout(() => {
      setShow(false);
      sessionStorage.setItem("hasSeenSplash", "true");
    }, 3500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  if (!show) return null;

  return (
    <div 
      className={`fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center transition-all duration-[2000ms] ease-in-out
        ${animateClose ? "opacity-0 scale-125 pointer-events-none" : "opacity-100 scale-100"}
      `}
    >
      <div className="relative flex flex-col items-center">
        <div className={`transition-all duration-[2000ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${animateClose ? "scale-50 blur-xl translate-y-10" : "scale-100 blur-0 translate-y-0"}`}>
          <img 
            src="/logo.png" 
            alt="IndiClips Loading" 
            className="w-48 md:w-64 h-auto object-contain drop-shadow-[0_0_40px_rgba(236,72,153,0.4)]"
            onError={(e) => { 
              e.currentTarget.style.display = 'none'; 
              e.currentTarget.nextElementSibling!.classList.remove('hidden'); 
            }} 
          />
          <div className="hidden text-5xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary px-4 py-2">
            IndiClips
          </div>
        </div>
        
        <div className={`absolute -bottom-24 transition-opacity duration-[1000ms] ${animateClose ? "opacity-0" : "opacity-100"}`}>
           <div className="flex gap-2 items-center">
             <div className="w-2.5 h-2.5 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]" />
             <div className="w-2.5 h-2.5 bg-secondary rounded-full animate-bounce [animation-delay:-0.15s]" />
             <div className="w-2.5 h-2.5 bg-primary rounded-full animate-bounce" />
           </div>
        </div>
      </div>
    </div>
  );
}

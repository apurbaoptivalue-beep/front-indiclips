"use client";
import React, { useState } from "react";
import { User, Shield, Bell, Lock, Key, LogOut, CheckCircle2, ChevronRight, AlertCircle, Bookmark, Clock, BarChart2, Timer, Star, LayoutGrid, Ban, EyeOff, Users, Sparkles, Scissors, Video, Search } from "lucide-react";

export default function SettingsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const triggerVibrate = () => {
    if (typeof window !== "undefined" && navigator.vibrate) {
      navigator.vibrate(30);
    }
  };

  const SectionTitle = ({ children }: { children: React.ReactNode }) => (
    <h3 className="text-gray-400 font-bold text-[13px] uppercase tracking-widest mt-8 mb-3 px-2 flex items-center">{children}</h3>
  );

  const SettingRow = ({ icon: Icon, label, value, subtext }: any) => (
    <div 
      onClick={triggerVibrate}
      className="flex items-center justify-between p-4 bg-glass border border-glass-border hover:bg-white/5 transition-colors cursor-pointer group first:rounded-t-2xl last:rounded-b-2xl border-b-0 last:border-b relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="flex items-center gap-4 relative z-10 w-full">
        <Icon className="w-6 h-6 text-white group-hover:text-primary transition-colors" strokeWidth={1.5} />
        <div className="flex flex-col flex-1 min-w-0">
           <span className="text-white font-medium text-[15px]">{label}</span>
           {subtext && <span className="text-gray-500 text-sm mt-0.5 pr-4 truncate block">{subtext}</span>}
        </div>
      </div>
      <div className="flex items-center gap-2 relative z-10 flex-shrink-0">
        {value && <span className="text-gray-400 font-medium text-sm whitespace-nowrap">{value}</span>}
        <ChevronRight className="w-5 h-5 text-gray-500 group-hover:text-primary transition-colors" strokeWidth={1.5} />
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-2xl mx-auto py-6 md:py-10 px-4 animate-in fade-in duration-500 pb-24">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white tracking-tight">Settings and activity</h1>
      </div>

      <div className="relative mb-8">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input 
          type="text" 
          placeholder="Search settings" 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full h-12 bg-black/40 border border-gray-800 rounded-xl pl-12 pr-4 text-white placeholder-gray-500 font-medium outline-none focus:border-primary/50 transition-all hover:bg-black/60 focus:bg-black/60 shadow-inner"
        />
      </div>

      <div className="space-y-0 relative z-10">
        <SectionTitle>
          Your account
        </SectionTitle>
        <SettingRow icon={User} label="Accounts Center" subtext="Password, security, personal details, ad preferences" />
        
        <SectionTitle>How you use IndiClips</SectionTitle>
        <SettingRow icon={Bookmark} label="Saved" />
        <SettingRow icon={Clock} label="Archive" />
        <SettingRow icon={BarChart2} label="Video Analytics" subtext="View performance for your recent uploads" />
        <SettingRow icon={Bell} label="Notifications" />
        <SettingRow icon={Timer} label="Time management" />

        <SectionTitle>Who can see your content</SectionTitle>
        <SettingRow icon={Lock} label="Account privacy" value="Public" />
        <SettingRow icon={Star} label="Close Friends" value="0" />
        <SettingRow icon={LayoutGrid} label="Crossposting" />
        <SettingRow icon={Ban} label="Blocked" value="0" />
        <SettingRow icon={EyeOff} label="Story, live and location" />
        <SettingRow icon={Users} label="Activity in Friends tab" />

        <SectionTitle>Also from IndiClips</SectionTitle>
        <div 
          onClick={triggerVibrate}
          className="flex items-center justify-between p-4 bg-glass border border-glass-border hover:bg-white/5 transition-colors cursor-pointer group first:rounded-t-2xl last:rounded-b-2xl border-b-0 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="flex items-center gap-4 relative z-10 w-full">
            <div className="relative w-6 h-6 rounded-full bg-gradient-to-tr from-primary to-secondary p-0.5">
              <div className="w-full h-full bg-black rounded-full flex items-center justify-center">
                 <Sparkles className="w-3.5 h-3.5 text-white" />
              </div>
            </div>
            <div className="flex flex-col flex-1 min-w-0">
               <span className="text-white font-medium text-[15px]">IndiClips AI</span>
               <span className="text-gray-500 text-sm mt-0.5 truncate block">Get answers, advice and generate images</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_rgba(236,72,153,0.8)]" />
            <ChevronRight className="w-5 h-5 text-gray-500 group-hover:text-primary transition-colors relative z-10" />
          </div>
        </div>
        <SettingRow icon={Scissors} label="Edits" subtext="Create videos with powerful editing tools" />
        <SettingRow icon={Video} label="Creator Studio" subtext="Manage your videos and analytics" />

        <SectionTitle>Login</SectionTitle>
        <div onClick={triggerVibrate} className="p-4 bg-glass border border-glass-border border-b-0 rounded-t-2xl hover:bg-white/5 transition-colors cursor-pointer font-medium text-[15px] text-blue-500">
          Add account
        </div>
        <div onClick={triggerVibrate} className="p-4 bg-glass border border-glass-border rounded-b-2xl hover:bg-white/5 transition-colors cursor-pointer font-medium text-[15px] text-red-500">
          Log out
        </div>
      </div>
    </div>
  );
}

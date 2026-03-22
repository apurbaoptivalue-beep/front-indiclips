"use client";
import React, { useState } from "react";
import { User, Shield, Bell, Lock, Key, LogOut, CheckCircle2, ChevronRight, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fetchAPI } from "@/lib/api";

type TabType = "profile" | "account" | "privacy" | "notifications";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<TabType>("profile");
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSave = async () => {
    setIsSaving(true);
    setError("");
    
    try {
      if (activeTab === "account") {
        if (!currentPassword || !newPassword) {
          throw new Error("Please fill in both password fields");
        }
        if (newPassword !== confirmPassword) {
          throw new Error("New passwords do not match");
        }
        
        await fetchAPI("/users/security", {
          method: "PUT",
          body: JSON.stringify({ currentPassword, newPassword }),
        });
      } else {
        // Mock delay for other tabs
        await new Promise(r => setTimeout(r, 800));
      }
      
      setSaved(true);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setTimeout(() => setSaved(false), 3000);
    } catch (err: any) {
      setError(err.message || "Failed to save settings");
      setTimeout(() => setError(""), 5000);
    } finally {
      setIsSaving(false);
    }
  };

  const tabs = [
    { id: "profile", label: "Edit Profile", icon: User },
    { id: "account", label: "Account & Security", icon: Shield },
    { id: "privacy", label: "Privacy", icon: Lock },
    { id: "notifications", label: "Notifications", icon: Bell },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto py-6 md:py-10 px-4 animate-in fade-in duration-500">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-white tracking-tight mb-2">Settings</h1>
        <p className="text-gray-400 font-medium">Manage your account preferences and privacy.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Navigation Sidebar */}
        <div className="w-full md:w-64 flex-shrink-0 space-y-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabType)}
              className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all font-bold tracking-wide ${
                activeTab === tab.id
                  ? "bg-primary text-white shadow-[0_0_20px_rgba(139,92,246,0.2)]"
                  : "bg-glass border border-glass-border text-gray-400 hover:text-white hover:bg-glass/80"
              }`}
            >
              <div className="flex items-center gap-3">
                <tab.icon className="w-5 h-5" />
                {tab.label}
              </div>
              <ChevronRight className={`w-4 h-4 transition-transform ${activeTab === tab.id ? "translate-x-1" : ""}`} />
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="flex-1 bg-glass border border-glass-border rounded-3xl p-6 md:p-10 shadow-2xl relative overflow-hidden backdrop-blur-md">
          {error && (
            <div className="absolute top-4 right-4 bg-red-500/20 border border-red-500/50 text-red-400 px-4 py-3 rounded-xl flex items-center gap-2 font-bold text-sm animate-in fade-in slide-in-from-top-4 z-20 shadow-lg shadow-red-500/10">
              <AlertCircle className="w-5 h-5 flex-shrink-0" /> {error}
            </div>
          )}
          {saved && (
            <div className="absolute top-4 right-4 bg-green-500/20 border border-green-500/50 text-green-400 px-4 py-2 rounded-xl flex items-center gap-2 font-bold text-sm animate-in fade-in slide-in-from-top-4 z-20 shadow-lg shadow-green-500/10">
              <CheckCircle2 className="w-5 h-5" /> Settings Saved!
            </div>
          )}

          {activeTab === "profile" && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="flex items-center justify-between border-b border-glass-border pb-6">
                <div>
                  <h2 className="text-xl font-black text-white">Public Profile</h2>
                  <p className="text-sm text-gray-400 mt-1">This information will be displayed on your channel.</p>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-primary to-secondary p-1">
                  <div className="w-full h-full bg-background rounded-full border-4 border-background flex items-center justify-center overflow-hidden relative group cursor-pointer">
                    <User className="w-10 h-10 text-gray-400" />
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-white text-xs font-bold">CHANGE</span>
                    </div>
                  </div>
                </div>
                <Button className="bg-glass border border-gray-700 hover:bg-gray-800 text-white font-bold h-10">Upload Picture</Button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-black tracking-widest text-gray-500 uppercase">Display Name</label>
                    <input type="text" defaultValue="Neon Killa" className="w-full h-12 bg-black/60 border border-gray-800 rounded-xl px-4 text-white focus:border-primary outline-none font-bold" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black tracking-widest text-gray-500 uppercase">Username</label>
                    <div className="flex items-center">
                      <span className="bg-gray-900 border border-gray-800 border-r-0 h-12 px-4 rounded-l-xl text-gray-500 flex items-center font-bold">@</span>
                      <input type="text" defaultValue="neonkilla" className="w-full h-12 bg-black/60 border border-gray-800 rounded-r-xl px-4 text-white focus:border-primary outline-none font-bold" />
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black tracking-widest text-gray-500 uppercase">Bio</label>
                  <textarea defaultValue="Digital artist & video creator based in Mumbai." className="w-full h-24 bg-black/60 border border-gray-800 rounded-xl p-4 text-white focus:border-primary outline-none font-medium custom-scrollbar resize-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black tracking-widest text-gray-500 uppercase">Website URL</label>
                  <input type="url" defaultValue="https://neonkilla.com" className="w-full h-12 bg-black/60 border border-gray-800 rounded-xl px-4 text-white focus:border-primary outline-none font-medium" />
                </div>
              </div>
            </div>
          )}

          {activeTab === "account" && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="border-b border-glass-border pb-6">
                <h2 className="text-xl font-black text-white">Account Details</h2>
                <p className="text-sm text-gray-400 mt-1">Manage your login and security settings.</p>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-black tracking-widest text-gray-500 uppercase">Email Address</label>
                  <input type="email" defaultValue="creator@indiclips.com" readOnly className="w-full h-12 bg-black/40 border border-gray-800 rounded-xl px-4 text-gray-400 outline-none font-medium opacity-70" />
                </div>
                
                <h3 className="text-sm font-bold text-white mt-8 mb-4 border-t border-glass-border pt-6">Change Password</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-xs font-black tracking-widest text-gray-500 uppercase">Current Password</label>
                    <input type="password" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} placeholder="••••••••" className="w-full h-12 bg-black/60 border border-gray-800 rounded-xl px-4 text-white focus:border-primary outline-none font-medium" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-black tracking-widest text-gray-500 uppercase">New Password</label>
                      <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} placeholder="••••••••" className="w-full h-12 bg-black/60 border border-gray-800 rounded-xl px-4 text-white focus:border-primary outline-none font-medium" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black tracking-widest text-gray-500 uppercase">Confirm New Password</label>
                      <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="••••••••" className="w-full h-12 bg-black/60 border border-gray-800 rounded-xl px-4 text-white focus:border-primary outline-none font-medium" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "privacy" && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="border-b border-glass-border pb-6">
                <h2 className="text-xl font-black text-white">Privacy Controls</h2>
                <p className="text-sm text-gray-400 mt-1">Control who can see and interact with your content.</p>
              </div>

              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-black/40 rounded-xl border border-gray-800 hover:border-gray-700 transition-colors">
                  <div>
                    <p className="text-white font-bold">Private Account</p>
                    <p className="text-xs text-gray-500 mt-1">Only approved followers can see your posts.</p>
                  </div>
                  <div className="w-12 h-6 bg-gray-800 rounded-full relative cursor-pointer group">
                    <div className="w-5 h-5 bg-gray-500 rounded-full absolute top-0.5 left-0.5 group-hover:bg-gray-400 transition-colors" />
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-black/40 rounded-xl border border-gray-800 hover:border-gray-700 transition-colors">
                  <div>
                    <p className="text-white font-bold">Allow Comments</p>
                    <p className="text-xs text-gray-500 mt-1">Let everyone comment on your public videos.</p>
                  </div>
                  <div className="w-12 h-6 bg-primary rounded-full relative cursor-pointer group shadow-[0_0_10px_rgba(139,92,246,0.3)]">
                    <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5 shadow-sm" />
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-black/40 rounded-xl border border-gray-800 hover:border-gray-700 transition-colors">
                  <div>
                    <p className="text-white font-bold">Show Activity Status</p>
                    <p className="text-xs text-gray-500 mt-1">Let others see when you are online in Chat.</p>
                  </div>
                  <div className="w-12 h-6 bg-primary rounded-full relative cursor-pointer group shadow-[0_0_10px_rgba(139,92,246,0.3)]">
                    <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5 shadow-sm" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "notifications" && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="border-b border-glass-border pb-6">
                <h2 className="text-xl font-black text-white">Push Notifications</h2>
                <p className="text-sm text-gray-400 mt-1">Choose what alerts you receive on your device.</p>
              </div>

              <div className="space-y-4">
                {["New Follower", "Likes on your videos", "Comments on your posts", "Direct Messages", "Live Stream Alerts", "Tips and Earnings"].map((label, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <span className="text-sm font-bold text-gray-300">{label}</span>
                    <input type="checkbox" defaultChecked className="w-5 h-5 accent-primary bg-black/60 border-gray-800 rounded outline-none" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Save Button */}
          <div className="mt-10 pt-6 border-t border-glass-border flex justify-end">
             <Button 
               onClick={handleSave}
               disabled={isSaving}
               className="bg-gradient-to-r from-primary to-secondary text-white font-black tracking-widest uppercase text-sm h-12 px-10 rounded-xl shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-[0_0_30px_rgba(236,72,153,0.5)] hover:scale-[1.02] transition-all disabled:opacity-50"
             >
               {isSaving ? "Saving..." : "Save Changes"}
             </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

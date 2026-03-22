"use client";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Play } from "lucide-react";
import { fetchAPI } from "@/lib/api";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await fetchAPI("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      alert("Login successful!");
      window.location.href = "/";
    } catch (err: any) {
      setError(err.message || "Failed to login. Check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col space-y-6 bg-glass/80 border border-glass-border p-8 rounded-2xl backdrop-blur-xl shadow-2xl relative">
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-2xl pointer-events-none" />
      
      <div className="flex flex-col space-y-2 text-center relative z-10">
        <div className="flex justify-center mb-4">
          <div className="w-14 h-14 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center shadow-lg shadow-primary/30 transform transition-transform hover:scale-110">
            <Play className="text-white w-7 h-7 ml-1" fill="currentColor" />
          </div>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-white m-0">Welcome back</h1>
        <p className="text-sm text-gray-400 mt-1">
          Enter your details to sign in to IndiClips
        </p>
      </div>
      
      <form onSubmit={handleLogin} className="space-y-5 relative z-10">
        {error && <div className="text-red-400 text-sm font-bold text-center bg-red-500/10 p-2 rounded">{error}</div>}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300 ml-1">Email</label>
          <Input id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@example.com" type="email" required />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between ml-1 leading-none">
            <label className="text-sm font-medium text-gray-300">Password</label>
            <Link href="/forgot-password" className="text-sm text-primary hover:text-primary/80 transition-colors">
              Forgot password?
            </Link>
          </div>
          <Input id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" type="password" required />
        </div>
        
        <div className="pt-2">
          <Button disabled={loading} type="submit" className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white border-0 h-12 text-md rounded-xl shadow-lg shadow-primary/25 transition-all hover:scale-[1.02] font-semibold disabled:opacity-50">
            {loading ? "Signing in..." : "Sign In"}
          </Button>
        </div>
      </form>
      
      <div className="text-center text-sm text-gray-400 relative z-10 pt-2 border-t border-glass-border">
        Don&apos;t have an account?{" "}
        <Link href="/signup" className="text-primary hover:text-primary/80 transition-colors font-semibold">
          Sign up
        </Link>
      </div>
    </div>
  );
}

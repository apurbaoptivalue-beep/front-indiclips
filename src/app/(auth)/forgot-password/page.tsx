import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { KeyRound } from "lucide-react";

export default function ForgotPasswordPage() {
  return (
    <div className="flex flex-col space-y-6 bg-glass/80 border border-glass-border p-8 rounded-2xl backdrop-blur-xl shadow-2xl relative text-center">
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-2xl pointer-events-none" />
      
      <div className="flex flex-col space-y-4 relative z-10 items-center">
        <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
          <KeyRound className="text-primary w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-white">Reset password</h1>
          <p className="text-sm text-gray-400 max-w-[280px] mx-auto">
            Enter the email associated with your account and we&apos;ll send a link to reset your password.
          </p>
        </div>
      </div>
      
      <form className="space-y-6 relative z-10">
        <div className="space-y-1 text-left">
          <label className="text-sm font-medium text-gray-300 ml-1">Email address</label>
          <Input id="email" placeholder="name@example.com" type="email" required />
        </div>
        
        <Button className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white border-0 h-12 text-md rounded-xl shadow-lg shadow-primary/25 transition-all hover:scale-[1.02] font-semibold">
          Send Reset Link
        </Button>
      </form>
      
      <div className="text-center text-sm text-gray-400 relative z-10 pt-2 border-t border-glass-border">
        <Link href="/login" className="text-primary hover:text-primary/80 transition-colors font-semibold">
          Back to login
        </Link>
      </div>
    </div>
  );
}

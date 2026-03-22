import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShieldAlert } from "lucide-react";

export default function OTPPage() {
  return (
    <div className="flex flex-col space-y-6 bg-glass/80 border border-glass-border p-8 rounded-2xl backdrop-blur-xl shadow-2xl relative text-center">
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-2xl pointer-events-none" />
      
      <div className="flex flex-col space-y-4 relative z-10 items-center">
        <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
          <ShieldAlert className="text-primary w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-white">Verification required</h1>
          <p className="text-sm text-gray-400 max-w-[250px] mx-auto">
            We&apos;ve sent a 6-digit code to your email. Enter it below to verify your account.
          </p>
        </div>
      </div>
      
      <form className="space-y-6 relative z-10">
        <div className="flex justify-center gap-2">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Input key={`otp-${i}`} className="w-12 h-14 text-center text-xl font-bold bg-black/40" maxLength={1} type="text" />
          ))}
        </div>
        
        <Button className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white border-0 h-12 text-md rounded-xl shadow-lg shadow-primary/25 transition-all hover:scale-[1.02] font-semibold">
          Verify Address
        </Button>
      </form>
      
      <div className="text-center text-sm text-gray-400 relative z-10 pt-2 border-t border-glass-border">
        Didn&apos;t receive the code?{" "}
        <button className="text-primary hover:text-primary/80 transition-colors font-semibold">
          Resend code
        </button>
      </div>
    </div>
  );
}

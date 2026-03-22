import { useState } from "react";
import { Gift, X, Zap, Coins } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TipModalProps {
  isOpen: boolean;
  onClose: () => void;
  creatorName: string;
}

export default function TipModal({ isOpen, onClose, creatorName }: TipModalProps) {
  const [selectedAmount, setSelectedAmount] = useState<number>(50);
  const [customAmount, setCustomAmount] = useState("");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in zoom-in-95 duration-200">
      <div className="relative w-full max-w-md bg-background border border-glass-border rounded-[2rem] shadow-[0_0_50px_rgba(139,92,246,0.15)] overflow-hidden">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-primary/30 via-primary/10 to-transparent p-6 flex items-center justify-between border-b border-glass-border relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/20 blur-[30px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
          <div className="flex items-center space-x-4 relative z-10">
            <div className="w-12 h-12 bg-gradient-to-tr from-primary to-secondary rounded-2xl flex items-center justify-center shadow-lg shadow-primary/30">
              <Gift className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-black text-xl text-white tracking-tight">Send a Tip</h3>
              <p className="text-xs text-gray-300 font-medium">Show love to <span className="text-primary font-bold">@{creatorName}</span></p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 bg-black/40 rounded-full hover:bg-black/60 transition-colors relative z-10 border border-glass-border">
            <X className="w-5 h-5 text-gray-300 hover:text-white" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 relative">
          <div className="flex items-center justify-between bg-glass/40 p-4 rounded-xl border border-glass-border shadow-inner">
            <span className="text-xs text-gray-400 font-black uppercase tracking-widest">Your Balance</span>
            <div className="flex items-center space-x-2 font-black text-white text-lg">
              <div className="w-6 h-6 bg-yellow-500/20 rounded-full flex items-center justify-center">
                <Coins className="w-3.5 h-3.5 text-yellow-500" />
              </div>
              <span>1,250 Coins</span>
            </div>
          </div>

          <div>
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 block">Select Amount</label>
            <div className="grid grid-cols-3 gap-3 mb-4">
              {[10, 50, 100, 500, 1000, 5000].map((amount) => (
                <button
                  key={amount}
                  onClick={() => { setSelectedAmount(amount); setCustomAmount(""); }}
                  className={`py-3.5 rounded-xl border-2 font-black text-lg flex flex-col items-center justify-center transition-all ${
                    selectedAmount === amount 
                      ? 'bg-primary/20 border-primary text-white shadow-[0_0_15px_rgba(139,92,246,0.3)] scale-[1.03]' 
                      : 'bg-glass border-glass-border text-gray-400 hover:border-gray-500 hover:bg-glass/80'
                  }`}
                >
                  <Coins className={`w-5 h-5 mb-1 ${selectedAmount === amount ? 'text-yellow-400' : 'text-gray-500'}`} />
                  {amount}
                </button>
              ))}
            </div>
            
            <div className="relative group">
              <input
                type="number"
                placeholder="Custom amount..."
                value={customAmount}
                onChange={(e) => {
                  setCustomAmount(e.target.value);
                  setSelectedAmount(0);
                }}
                className="w-full h-14 bg-black/60 border border-gray-800 rounded-xl pl-12 pr-4 text-white placeholder-gray-600 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors font-bold text-lg"
              />
              <Coins className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-primary transition-colors" />
            </div>
          </div>

          <Button className="w-full bg-gradient-to-r from-primary to-secondary text-white font-black uppercase tracking-[0.2em] h-14 rounded-xl shadow-[0_0_20px_rgba(236,72,153,0.3)] hover:shadow-[0_0_30px_rgba(236,72,153,0.5)] hover:scale-[1.02] transition-all border-0 text-sm mt-4">
            SEND {(selectedAmount || customAmount) ? `${selectedAmount || customAmount} COINS` : 'TIP'} <Zap className="w-5 h-5 ml-2 fill-current" />
          </Button>
          
          <p className="text-center text-[10px] text-gray-500 font-bold tracking-widest uppercase mt-4">Transactions are secure and non-refundable</p>
        </div>
      </div>
    </div>
  );
}

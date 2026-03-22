import { Wallet, Coins, ArrowUpRight, History, CreditCard, Gift, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function WalletPage() {
  return (
    <div className="w-full max-w-5xl mx-auto py-8 px-4 animate-in fade-in duration-500">
      <h1 className="text-3xl font-bold text-white tracking-tight mb-8">Wallet & Earnings</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Main Balance */}
        <div className="md:col-span-2 bg-gradient-to-br from-primary/20 via-black to-secondary/10 border border-primary/30 rounded-3xl p-8 relative overflow-hidden shadow-[0_0_30px_rgba(139,92,246,0.15)] group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 group-hover:scale-110 transition-transform duration-700" />
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-primary/20 rounded-full blur-[60px] translate-y-1/2 -translate-x-1/2 group-hover:scale-110 transition-transform duration-700 delay-100" />
          
          <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <p className="text-primary font-bold uppercase tracking-widest text-xs mb-3 flex items-center bg-primary/10 w-max px-3 py-1.5 rounded-full border border-primary/20">
                <Wallet className="w-3.5 h-3.5 mr-2" /> Total Earnings Balance
              </p>
              <div className="flex items-baseline space-x-3 drop-shadow-lg">
                <span className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300 tracking-tighter">₹45,200</span>
                <span className="text-green-400 font-bold text-lg flex items-center bg-green-400/10 px-2 py-1 rounded-lg">
                  +12.5% <ArrowUpRight className="w-4 h-4 ml-1" />
                </span>
              </div>
              <p className="text-sm text-gray-400 mt-3 font-medium">Available for instant withdrawal: <span className="text-white font-bold">₹32,000</span></p>
            </div>
            
            <Button className="bg-white text-black hover:bg-gray-200 border-0 shadow-xl shadow-white/10 rounded-full px-8 py-6 text-md font-black tracking-wide uppercase transition-transform hover:scale-105">
              Withdraw Funds
            </Button>
          </div>
        </div>

        {/* Coin Balance */}
        <div className="bg-glass/40 border border-glass-border rounded-3xl p-8 flex flex-col justify-center items-center text-center relative overflow-hidden shadow-lg hover:border-yellow-500/30 transition-colors">
          <div className="w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center mb-4 shadow-[0_0_15px_rgba(234,179,8,0.3)]">
            <Coins className="w-8 h-8 text-yellow-500" />
          </div>
          <p className="text-gray-400 font-black uppercase tracking-widest text-xs mb-1">Coin Balance</p>
          <h2 className="text-4xl font-black text-white mb-6 tracking-tight">1,250</h2>
          <Button className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-white font-black uppercase tracking-widest border-0 shadow-lg shadow-yellow-500/20 h-12 rounded-xl transition-transform hover:scale-[1.03]">
            Buy Coins
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Buy Coins Packages */}
        <div className="bg-glass/30 border border-glass-border rounded-2xl p-6 shadow-xl relative overflow-hidden">
          <div className="flex items-center space-x-3 mb-6 border-b border-glass-border pb-4">
            <CreditCard className="w-6 h-6 text-primary" />
            <h3 className="text-xl font-bold text-white uppercase tracking-wider">Top Up Options</h3>
          </div>
          
          <div className="space-y-4">
            {[
              { amount: 100, price: "₹99", bonus: "0%" },
              { amount: 500, price: "₹399", bonus: "+20%" },
              { amount: 1000, price: "₹699", bonus: "+40%", popular: true },
              { amount: 5000, price: "₹2999", bonus: "+70%" },
            ].map((pkg, i) => (
              <div key={i} className={`flex items-center justify-between p-4 rounded-xl border transition-all cursor-pointer group hover:bg-glass/80 ${pkg.popular ? 'bg-primary/10 border-primary shadow-[0_0_15px_rgba(139,92,246,0.15)] transform scale-[1.02]' : 'bg-black/40 border-gray-800 hover:border-gray-500'}`}>
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${pkg.popular ? 'bg-primary/20 text-primary' : 'bg-yellow-500/10 text-yellow-500 group-hover:bg-yellow-500/20'}`}>
                    <Coins className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-white font-black text-lg flex items-center">{pkg.amount} Coins 
                      {pkg.popular && <span className="ml-3 text-[9px] uppercase font-black bg-gradient-to-r from-primary to-secondary text-white rounded shadow-sm px-2 py-1 tracking-widest animate-pulse">Most Popular</span>}
                    </h4>
                    {pkg.bonus !== "0%" && <p className="text-xs text-green-400 font-bold uppercase tracking-wider mt-0.5">Bonus {pkg.bonus}</p>}
                  </div>
                </div>
                <Button className={`font-black uppercase tracking-widest px-6 border-0 ${pkg.popular ? 'bg-primary hover:bg-primary/90 text-white shadow-lg' : 'bg-white/10 hover:bg-white/20 text-white'}`}>
                  {pkg.price}
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Transaction History */}
        <div className="bg-glass/30 border border-glass-border rounded-2xl p-6 shadow-xl">
           <div className="flex flex-col h-full">
            <div className="flex items-center justify-between mb-6 border-b border-glass-border pb-4">
              <div className="flex items-center space-x-3">
                <History className="w-6 h-6 text-secondary" />
                <h3 className="text-xl font-bold text-white uppercase tracking-wider">Recent Activity</h3>
              </div>
              <Button variant="ghost" className="text-primary text-xs font-bold uppercase tracking-widest hover:text-white bg-primary/10 hover:bg-primary/20">View All</Button>
            </div>
            
            <div className="space-y-0.5 flex-1 p-2">
              {[
                { title: "Tip from @user123", date: "Today, 10:45 AM", amount: "+ ₹150", type: "income", icon: Gift },
                { title: "Withdrawal to Bank", date: "Yesterday, 2:30 PM", amount: "- ₹5,000", type: "expense", icon: Wallet },
                { title: "Subscribed to @creator", date: "Mar 15, 2026", amount: "- 250 Coins", type: "expense", icon: ShieldCheck },
                { title: "Tip from @fan99", date: "Mar 14, 2026", amount: "+ ₹500", type: "income", icon: Gift },
                { title: "Purchased 500 Coins", date: "Mar 10, 2026", amount: "+ 500 Coins", type: "income", icon: Coins },
              ].map((tx, i) => (
                <div key={i} className="flex items-center justify-between p-3.5 hover:bg-glass/60 rounded-xl transition-colors cursor-pointer border-b border-gray-800/30 last:border-0 group">
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-xl border ${tx.type === 'income' ? 'bg-green-500/10 border-green-500/20 text-green-400 group-hover:bg-green-500/20' : 'bg-red-500/10 border-red-500/20 text-red-400 group-hover:bg-red-500/20'} transition-colors`}>
                      <tx.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">{tx.title}</h4>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">{tx.date}</p>
                    </div>
                  </div>
                  <span className={`text-sm font-black tracking-wide ${tx.type === 'income' ? 'text-green-400' : 'text-gray-300'}`}>
                    {tx.amount}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

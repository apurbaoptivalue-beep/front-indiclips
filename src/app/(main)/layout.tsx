import Header from "@/components/Layout/Header";
import Sidebar from "@/components/Layout/Sidebar";
import Chatbot from "@/components/Chatbot/Chatbot";
import BottomNav from "@/components/Layout/BottomNav";
import SplashScreen from "@/components/Layout/SplashScreen";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SplashScreen />
      <Header />
      <div className="flex relative">
        <Sidebar />
        <main className="flex-1 md:ml-64 relative min-h-[calc(100vh-4rem)]">
          {/* Main content background decorative gradients */}
          <div className="fixed top-[20%] right-[-5%] w-[30%] h-[40%] bg-primary/10 rounded-full blur-[100px] pointer-events-none z-0" />
          <div className="fixed bottom-[-10%] left-[20%] w-[30%] h-[30%] bg-secondary/10 rounded-full blur-[120px] pointer-events-none z-0" />
          
            <div className="relative z-10 w-full h-full">
              {children}
            </div>
          </main>
        </div>
        <Chatbot />
        <BottomNav />
      </div>
    );
  }

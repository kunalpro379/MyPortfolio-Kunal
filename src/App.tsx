import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Index from "./pages/Index";
import Boot from "./pages/Boot";
import Dashboard from "./pages/Dashboard";
import Blogs from './pages/Blogs';

const queryClient = new QueryClient();

const App = () => {
  const [bootSequence, setBootSequence] = useState<"index" | "boot" | "dashboard">("index");

  // Function to handle index completion
  const handleIndexComplete = () => {
    setBootSequence("boot");
  };

  // Function to handle boot completion
  const handleBootComplete = () => {
    setBootSequence("dashboard");
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        {/* Fixed background that stays during transitions */}
        <div className="fixed inset-0 bg-[#011428]" style={{
          backgroundImage: `repeating-linear-gradient(45deg, rgba(255,0,0,0.05) 0px, rgba(255,0,0,0.05) 2px, transparent 2px, transparent 4px)`
        }} />

        <Toaster />
        <Router>
          <div className="relative h-screen w-screen flex flex-col overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.main
                key={bootSequence}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 0.5,
                  ease: "easeInOut"
                }}
                className="flex-1 flex flex-col w-full h-full"
              >
                {bootSequence === "index" && <Index onComplete={handleIndexComplete} />}
                {bootSequence === "boot" && <Boot onBootComplete={handleBootComplete} />}
                {bootSequence === "dashboard" && (
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/blogs" element={<Blogs />} />
                  </Routes>
                )}
              </motion.main>
            </AnimatePresence>
          </div>
        </Router>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;

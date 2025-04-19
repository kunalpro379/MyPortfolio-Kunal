import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import Background from '@/components/ui/Background';

interface BootProps {
  onBootComplete: () => void;
}

const bootMessages = [
  'POST (Power-On Self-Test) Completed Successfully',
  'Loading Developer Core...',
  'Initializing Flutter Engine...',
  'Setting up Node.js Server Modules...',
  'Compiling AI Models...',
  'Cloning GitHub Repositories...',
  'Detecting Coffee Levels... HIGH ☕',
  'Connecting to OpenAI Brain APIs...',
  'Secure Dev Mode: Enabled',
  'Checking Portfolio Integrity... PASS',
  'Activating Keyboard Warrior Mode...',
  'Loading Projects...',
  'Loading Skills...',
  'Rendering Portfolio Interface...',
  'System Boot: SUCCESS ✅',
  'Mounting /dev/kunalpro379...',
  'Welcome to KunalOS v2.0.4'
];

const Boot = ({ onBootComplete }: BootProps) => {
  const [messages, setMessages] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [showFinalAnimation, setShowFinalAnimation] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    let currentIndex = 0;
    const messageInterval = setInterval(() => {
      if (currentIndex < bootMessages.length) {
        setMessages(prev => [...prev, bootMessages[currentIndex]]);
        currentIndex++;
        setProgress(Math.min((currentIndex / bootMessages.length) * 100, 100));
      } else {
        clearInterval(messageInterval);
        setIsComplete(true);
        
        // Show final animation before transitioning
        setTimeout(() => {
          setShowFinalAnimation(true);
          
          // Wait for final animation before transitioning
          setTimeout(() => {
            onBootComplete();
          }, 1200);
        }, 800);
      }
    }, 300);

    return () => clearInterval(messageInterval);
  }, [onBootComplete]);

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-[#011428] relative overflow-hidden">
      <Background />
      <div className="relative z-10 flex flex-col items-center justify-center w-full h-full p-4">
        <motion.div 
          className="w-full h-full flex flex-col justify-center items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div 
            className="w-full max-w-3xl bg-black/50 border border-[hsl(var(--text-primary))] rounded-lg p-4 md:p-6 backdrop-blur-sm"
            initial={{ y: 20, opacity: 0.8 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="font-mono text-[hsl(var(--text-primary))] text-sm md:text-base">
              <div className="text-lg md:text-xl mb-4 font-bold flex items-center justify-between">
                <span>UEFI BIOS Utility v2.0.4</span>
                {isComplete && (
                  <motion.span 
                    className="text-green-500"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    ✓ COMPLETE
                  </motion.span>
                )}
              </div>
              
              <div className="h-64 md:h-80 overflow-y-auto custom-scrollbar mb-4">
                <div className="space-y-1">
                  {messages.map((msg, idx) => (
                    <motion.div 
                      key={idx} 
                      className="typewriter"
                      initial={{ opacity: 0, x: -5 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ 
                        duration: 0.3,
                        delay: 0.1
                      }}
                    >
                      {msg}
                    </motion.div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              </div>

              <motion.div 
                className="mt-2"
                animate={{ opacity: isComplete ? [1, 0, 1, 0, 1] : [1, 0] }}
                transition={{ 
                  duration: isComplete ? 0.2 : 0.8,
                  repeat: isComplete ? 2 : Infinity, 
                  repeatType: "reverse" 
                }}
              >
                █
              </motion.div>

              <div className="mt-6 h-2 bg-[hsl(var(--text-primary))/0.2] rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-[hsl(var(--text-primary))]"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 50, 
                    damping: 10 
                  }}
                />
              </div>
              
              {isComplete && (
                <motion.div 
                  className="mt-4 text-center text-green-400"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  Boot successful! Launching dashboard...
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Boot;
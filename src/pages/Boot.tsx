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
  'Compiling GenAI-Powered Insight Models...',
  'Mounting MongoDB Neural Memory...',
  'Injecting Social Graph Intelligence...',
  'Cloning GitHub Repositories (Stars ≥ 500)...',
  'Detecting Coffee Levels... HIGH ☕',
  'Scanning for Late Night Coding Sessions... DETECTED 🌙',
  'Connecting to OpenAI Brain APIs...',
  'Activating Secure Dev Mode 🔐',
  'Checking Portfolio Integrity... PASS',
  'Running `flutter pub get`... DONE',
  'Optimizing Socket.IO Connections...',
  'Activating Real-time Whiteboard Mode ✏️🧠',
  'Loading My Digest Feed Engine...',
  'Syncing with /dev/kunalpro379/projects/social_media_app',
  'Enabling Snapshot Capture & Daily Progress Mode...',
  'Indexing Achievements & Creative Logs...',
  'Spawning AIML NPC Engine... [GTA5 Compatibility: ENABLED]',
  'Validating Daily Motivation Levels... OVER 9000 💥',
  'Keyboard Warrior Mode: ON',
  'CodeForge Reactor Online ⚙️🔥',
  'Initializing Visual Search & Discovery Modules',
  'Rendering Custom UI Widgets (animated tabs, segmented controls...)',
  'System Boot Sequence: COMPLETE ✅',
  'Welcome to KunalOS v2.0.4 – Powered by Passion, Caffeine, and Endless Curiosity ☁️🚀'
];

const Boot = ({ onBootComplete }: BootProps) => {
  const [messages, setMessages] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [showFinalAnimation, setShowFinalAnimation] = useState(false);
  const [shouldScroll, setShouldScroll] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const messageContainerRef = useRef<HTMLDivElement>(null);
  const linesBeforeScroll = useRef<number>(0);
  
  // Add a hexadecimal counter for cyberpunk effect
  const [hexCounter, setHexCounter] = useState('0x00000');

  // Improved scrolling function that handles step-by-step scrolling
  const scrollToBottom = () => {
    if (!scrollContainerRef.current) return;
    
    const scrollContainer = scrollContainerRef.current;
    
    // Check if we should start scrolling yet
    if (shouldScroll) {
      scrollContainer.scrollBy({
        top: 20, // Approximate height of a single line
        behavior: "auto" // Use auto for consistent line-by-line scrolling
      });
    } else {
      // Keep scrollTop at 0 until container is filled
      scrollContainer.scrollTop = 0;
    }
  };
  
  // Check if the message container has filled the viewport
  useEffect(() => {
    if (!scrollContainerRef.current || !messageContainerRef.current || messages.length === 0) return;
    
    const scrollContainer = scrollContainerRef.current;
    const messageContainer = messageContainerRef.current;
    
    // If we haven't determined the number of messages that fit in the container yet
    if (linesBeforeScroll.current === 0 && messageContainer.offsetHeight > scrollContainer.clientHeight) {
      linesBeforeScroll.current = messages.length - 1;
      console.log(`Container will start scrolling after ${linesBeforeScroll.current} messages`);
    }
    
    // Start scrolling only after we reach the message threshold
    if (!shouldScroll && messages.length > linesBeforeScroll.current && linesBeforeScroll.current > 0) {
      setShouldScroll(true);
    }
    
    if (shouldScroll) {
      scrollToBottom();
    }
  }, [messages, shouldScroll]);

  // Cyberpunk hexadecimal counter effect
  useEffect(() => {
    const hexInterval = setInterval(() => {
      setHexCounter('0x' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0'));
    }, 100);
    
    return () => clearInterval(hexInterval);
  }, []);

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
      
      {/* Cyberpunk grid overlay */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="w-full h-full" 
          style={{
            backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(2, 216, 252, .3) 25%, rgba(2, 216, 252, .3) 26%, transparent 27%, transparent 74%, rgba(2, 216, 252, .3) 75%, rgba(2, 216, 252, .3) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(2, 216, 252, .3) 25%, rgba(2, 216, 252, .3) 26%, transparent 27%, transparent 74%, rgba(2, 216, 252, .3) 75%, rgba(2, 216, 252, .3) 76%, transparent 77%, transparent)',
            backgroundSize: '50px 50px'
          }}
        />
      </div>
      
      {/* Glowing corners effect */}
      <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-[#02d8fc] z-0">
        <motion.div 
          className="absolute -top-1 -left-1 w-2 h-2 bg-[#02d8fc] rounded-full"
          animate={{
            opacity: [1, 0.5, 1],
            boxShadow: [
              '0 0 10px 2px #02d8fc',
              '0 0 20px 4px #02d8fc',
              '0 0 10px 2px #02d8fc'
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </div>
      <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-[#02d8fc] z-0">
        <motion.div 
          className="absolute -top-1 -right-1 w-2 h-2 bg-[#02d8fc] rounded-full"
          animate={{
            opacity: [1, 0.5, 1],
            boxShadow: [
              '0 0 10px 2px #02d8fc',
              '0 0 20px 4px #02d8fc',
              '0 0 10px 2px #02d8fc'
            ]
          }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
        />
      </div>
      <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-[#02d8fc] z-0">
        <motion.div 
          className="absolute -bottom-1 -left-1 w-2 h-2 bg-[#02d8fc] rounded-full"
          animate={{
            opacity: [1, 0.5, 1],
            boxShadow: [
              '0 0 10px 2px #02d8fc',
              '0 0 20px 4px #02d8fc',
              '0 0 10px 2px #02d8fc'
            ]
          }}
          transition={{ duration: 2, repeat: Infinity, delay: 1 }}
        />
      </div>
      <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-[#02d8fc] z-0">
        <motion.div 
          className="absolute -bottom-1 -right-1 w-2 h-2 bg-[#02d8fc] rounded-full"
          animate={{
            opacity: [1, 0.5, 1],
            boxShadow: [
              '0 0 10px 2px #02d8fc',
              '0 0 20px 4px #02d8fc',
              '0 0 10px 2px #02d8fc'
            ]
          }}
          transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
        />
      </div>
      
      <div className="relative z-10 flex flex-col items-center justify-center w-full h-full px-4 py-6 md:p-8">
        <motion.div 
          className="w-full h-full flex flex-col justify-center items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div 
            className="w-full max-w-3xl bg-black/70 backdrop-blur-md rounded-lg border overflow-hidden relative"
            style={{ borderColor: 'rgba(2, 216, 252, 0.5)' }}
            initial={{ y: 20, opacity: 0.8 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Top header bar with cyber accent */}
            <div className="bg-gradient-to-r from-[#02d8fc20] via-[#02d8fc40] to-[#02d8fc20] border-b border-[#02d8fc50] p-2 px-4 flex justify-between items-center">
              <div className="font-mono text-lg md:text-xl text-[#02d8fc] flex items-center gap-2 tracking-wider">
                <motion.div
                  animate={{ 
                    opacity: [1, 0.5, 1],
                    rotate: [0, 360]
                  }}
                  transition={{ 
                    opacity: { duration: 2, repeat: Infinity },
                    rotate: { duration: 8, repeat: Infinity, ease: "linear" }
                  }}
                  className="w-4 h-4 border-2 rounded-full border-t-transparent border-[#02d8fc]"
                />
                <span className="text-sm md:text-lg">UEFI BIOS v2.0.4</span>
              </div>
              <div className="font-mono text-xs md:text-sm text-[#02d8fc70]">
                {hexCounter}
              </div>
            </div>
            
            <div className="p-4 md:p-6">
              <div className="font-mono text-[#02d8fc] text-sm md:text-base">
                {/* Status bar */}
                <div className="flex items-center justify-between mb-4">
                  <div className="text-base md:text-lg font-bold flex items-center gap-2">
                    <motion.div
                      className="h-3 w-3 md:h-4 md:w-4 bg-[#02d8fc40] rounded-full relative"
                      animate={{ backgroundColor: isComplete ? '#4ade80' : '#02d8fc40' }}
                    >
                      {isComplete && (
                        <motion.div
                          className="absolute inset-0 rounded-full bg-[#4ade80]"
                          animate={{ 
                            opacity: [0, 0.8, 0],
                            scale: [1, 1.8, 1]
                          }}
                          transition={{ 
                            duration: 2,
                            repeat: Infinity
                          }}
                        />
                      )}
                    </motion.div>
                    <span>SYSTEM BOOT</span>
                  </div>
                  
                  {isComplete ? (
                    <motion.div 
                      className="text-green-500 bg-green-900/30 px-2 py-0.5 border border-green-500/30 rounded-md text-xs md:text-sm"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      COMPLETE
                    </motion.div>
                  ) : (
                    <motion.div 
                      className="text-[#02d8fc] bg-blue-900/30 px-2 py-0.5 border border-[#02d8fc]/30 rounded-md text-xs md:text-sm"
                      animate={{ opacity: [1, 0.7, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      BOOTING
                    </motion.div>
                  )}
                </div>
                
                {/* CRT screen effect */}
                <div 
                  className="h-64 md:h-80 overflow-y-auto custom-scrollbar mb-4 rounded-md p-3 relative scrollbar-hide"
                  style={{
                    backgroundColor: 'rgba(0, 10, 20, 0.6)',
                    boxShadow: 'inset 0 0 20px rgba(2, 216, 252, 0.2)',
                    borderRadius: '4px',
                    border: '1px solid rgba(2, 216, 252, 0.1)',
                    scrollbarWidth: 'none' /* Firefox */
                  }}
                  ref={scrollContainerRef}
                >
                  {/* Scan line effect */}
                  <motion.div 
                    className="absolute inset-0 pointer-events-none z-20 bg-gradient-to-b from-transparent via-[#02d8fc10] to-transparent"
                    style={{ height: '100%' }}
                    animate={{ top: ['0%', '100%', '0%'] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  />
                  
                  {/* CRT flicker effect */}
                  <motion.div 
                    className="absolute inset-0 pointer-events-none z-10 bg-[#02d8fc05]"
                    animate={{ opacity: [0, 0.05, 0, 0.08, 0] }}
                    transition={{ 
                      duration: 0.5, 
                      repeat: Infinity, 
                      repeatDelay: Math.random() * 5 + 1 
                    }}
                  />
                  
                  <div className="space-y-1 relative z-0" ref={messageContainerRef}>
                    {messages.map((msg, idx) => (
                      <motion.div 
                        key={idx} 
                        className="font-mono text-xs md:text-sm flex gap-3"
                        initial={{ opacity: 0, x: -5 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ 
                          duration: 0.2,
                          delay: 0.1
                        }}
                      >
                        <span className="text-[#02d8fc80]">[{String(idx).padStart(2, '0')}]</span>
                        <span className="text-[#02d8fcdd]">{msg}</span>
                      </motion.div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>
                </div>

                {/* Terminal cursor */}
                <motion.div 
                  className="mt-2 text-[#02d8fc] font-bold text-lg"
                  animate={{ opacity: isComplete ? [1, 0, 1, 0, 1] : [1, 0] }}
                  transition={{ 
                    duration: isComplete ? 0.2 : 0.8,
                    repeat: isComplete ? 2 : Infinity, 
                    repeatType: "reverse" 
                  }}
                >
                  █
                </motion.div>

                {/* Progress bar with cyberpunk styling */}
                <div className="mt-6 relative h-3 md:h-4 bg-[#00131f] rounded-sm overflow-hidden border border-[#02d8fc30]">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-[#02d8fc80] to-[#02d8fcdd]"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 50, 
                      damping: 10 
                    }}
                  />
                  
                  {/* Progress percentage markers */}
                  {[0, 25, 50, 75, 100].map(marker => (
                    <div 
                      key={marker}
                      className="absolute top-0 bottom-0 border-l border-[#02d8fc30] opacity-50"
                      style={{ left: `${marker}%` }}
                    />
                  ))}
                  
                  {/* Progress percentage text */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-[#02d8fc] text-xs font-mono tracking-wider">
                      {Math.round(progress)}%
                    </div>
                  </div>
                </div>
                
                {isComplete && (
                  <motion.div 
                    className="mt-4 text-center text-green-400 relative"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <span className="relative">
                      Boot successful! Launching dashboard...
                      <motion.span 
                        className="absolute left-1/2 bottom-0 h-0.5 bg-green-400"
                        style={{ translateX: '-50%' }}
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                      />
                    </span>
                  </motion.div>
                )}
              </div>
            </div>
            
            {/* Bottom cyber accent bar */}
            <div className="bg-gradient-to-r from-[#02d8fc20] via-[#02d8fc10] to-[#02d8fc20] border-t border-[#02d8fc30] p-2 flex justify-between items-center">
              <div className="flex gap-1 md:gap-2">
                {['01', '10', '11'].map((bin, i) => (
                  <motion.div 
                    key={i}
                    className="h-1 md:h-1.5 w-4 md:w-6 bg-[#02d8fc]"
                    animate={{ 
                      opacity: [0.3, 1, 0.3],
                      backgroundColor: ['#02d8fc', '#00ff88', '#02d8fc']
                    }}
                    transition={{ 
                      duration: 2,
                      delay: i * 0.3,
                      repeat: Infinity
                    }}
                  />
                ))}
              </div>
              <div className="text-[#02d8fc80] text-xs font-mono tracking-wider">KunalOS</div>
              <div className="flex gap-1 md:gap-2">
                {['11', '10', '01'].map((bin, i) => (
                  <motion.div 
                    key={i}
                    className="h-1 md:h-1.5 w-4 md:w-6 bg-[#02d8fc]"
                    animate={{ 
                      opacity: [0.3, 1, 0.3],
                      backgroundColor: ['#02d8fc', '#00ff88', '#02d8fc']
                    }}
                    transition={{ 
                      duration: 2,
                      delay: i * 0.3,
                      repeat: Infinity
                    }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Final transition overlay */}
      {showFinalAnimation && (
        <motion.div 
          className="absolute inset-0 bg-[#02d8fc] z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ 
            duration: 1.2,
            times: [0, 0.5, 1]
          }}
        />
      )}
    </div>
  );
};

export default Boot;
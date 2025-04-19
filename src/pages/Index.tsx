import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import Background from '@/components/ui/Background';

interface IndexProps {
  onComplete?: () => void;
}

const Index = ({ onComplete }: IndexProps) => {
  const [progressWidth, setProgressWidth] = useState(0);
  const [hexCounter, setHexCounter] = useState('0x00000');
  const [dataBlips, setDataBlips] = useState<string[]>([]);
  const blipsRef = useRef<HTMLDivElement>(null);

  // Generate random cyberpunk data blips
  useEffect(() => {
    const blipMessages = [
      'Neural interface connected',
      'Biometric scan complete',
      'Digital footprint analyzed',
      'Memory augmentation enabled',
      'Processing node matrix',
      'Virtual projection calibrated',
      'Quantum encryption online',
      'Digital identity verified',
      'Cybernetic handshake initiated'
    ];

    const interval = setInterval(() => {
      if (progressWidth < 80) {
        const randomMessage = blipMessages[Math.floor(Math.random() * blipMessages.length)];
        setDataBlips(prev => [...prev.slice(-3), randomMessage]);
      }
    }, 1200);

    return () => clearInterval(interval);
  }, [progressWidth]);

  // Scroll to latest blip
  useEffect(() => {
    if (blipsRef.current) {
      blipsRef.current.scrollTop = blipsRef.current.scrollHeight;
    }
  }, [dataBlips]);

  // Cyberpunk hexadecimal counter effect
  useEffect(() => {
    const hexInterval = setInterval(() => {
      setHexCounter('0x' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0'));
    }, 100);
    
    return () => clearInterval(hexInterval);
  }, []);
  
  useEffect(() => {
    // Smoother progress animation
    const timer = setInterval(() => {
      setProgressWidth(prev => {
        const increment = (100 - prev) * 0.1; // Dynamic increment for smooth deceleration
        const newWidth = prev + Math.max(0.5, increment);
        
        if (newWidth >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            if (onComplete) onComplete();
          }, 800);
          return 100;
        }
        return newWidth;
      });
    }, 60);

    return () => clearInterval(timer);
  }, [onComplete]);

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
      <div className="absolute top-0 left-0 w-8 h-8 md:w-12 md:h-12 border-t-2 border-l-2 border-[#02d8fc] z-0">
        <motion.div 
          className="absolute -top-1 -left-1 w-1.5 h-1.5 md:w-2 md:h-2 bg-[#02d8fc] rounded-full"
          animate={{
            opacity: [1, 0.5, 1],
            boxShadow: [
              '0 0 5px 1px #02d8fc',
              '0 0 10px 2px #02d8fc',
              '0 0 5px 1px #02d8fc'
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </div>
      <div className="absolute top-0 right-0 w-8 h-8 md:w-12 md:h-12 border-t-2 border-r-2 border-[#02d8fc] z-0">
        <motion.div 
          className="absolute -top-1 -right-1 w-1.5 h-1.5 md:w-2 md:h-2 bg-[#02d8fc] rounded-full"
          animate={{
            opacity: [1, 0.5, 1],
            boxShadow: [
              '0 0 5px 1px #02d8fc',
              '0 0 10px 2px #02d8fc',
              '0 0 5px 1px #02d8fc'
            ]
          }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
        />
      </div>
      <div className="absolute bottom-0 left-0 w-8 h-8 md:w-12 md:h-12 border-b-2 border-l-2 border-[#02d8fc] z-0">
        <motion.div 
          className="absolute -bottom-1 -left-1 w-1.5 h-1.5 md:w-2 md:h-2 bg-[#02d8fc] rounded-full"
          animate={{
            opacity: [1, 0.5, 1],
            boxShadow: [
              '0 0 5px 1px #02d8fc',
              '0 0 10px 2px #02d8fc',
              '0 0 5px 1px #02d8fc'
            ]
          }}
          transition={{ duration: 2, repeat: Infinity, delay: 1 }}
        />
      </div>
      <div className="absolute bottom-0 right-0 w-8 h-8 md:w-12 md:h-12 border-b-2 border-r-2 border-[#02d8fc] z-0">
        <motion.div 
          className="absolute -bottom-1 -right-1 w-1.5 h-1.5 md:w-2 md:h-2 bg-[#02d8fc] rounded-full"
          animate={{
            opacity: [1, 0.5, 1],
            boxShadow: [
              '0 0 5px 1px #02d8fc',
              '0 0 10px 2px #02d8fc',
              '0 0 5px 1px #02d8fc'
            ]
          }}
          transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
        />
      </div>
      
      <div className="relative z-10 flex flex-col items-center justify-center w-full h-full px-4 py-6 md:p-8">
        <motion.div 
          className="w-full max-w-xl bg-black/50 backdrop-blur-md rounded-lg border-2 overflow-hidden relative"
          style={{ borderColor: 'rgba(2, 216, 252, 0.5)' }}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Top header bar with cyber accent */}
          <div className="bg-gradient-to-r from-[#02d8fc20] via-[#02d8fc40] to-[#02d8fc20] border-b border-[#02d8fc50] p-2 px-4 flex justify-between items-center">
            <div className="font-mono text-lg text-[#02d8fc] flex items-center gap-2 tracking-wider">
              <motion.div
                animate={{ 
                  opacity: [1, 0.5, 1],
                  rotate: [0, 360]
                }}
                transition={{ 
                  opacity: { duration: 2, repeat: Infinity },
                  rotate: { duration: 8, repeat: Infinity, ease: "linear" }
                }}
                className="w-3 h-3 md:w-4 md:h-4 border-2 rounded-full border-t-transparent border-[#02d8fc]"
              />
              <span className="text-sm md:text-base">KUNAL.OS</span>
            </div>
            <div className="font-mono text-xs md:text-sm text-[#02d8fc70]">
              {hexCounter}
            </div>
          </div>
          
          <div className="p-4 md:p-6 flex flex-col items-center">
            <div className="flex flex-col md:flex-row w-full gap-4 md:gap-6">
              {/* Left panel - KP Logo */}
              <div className="flex flex-col items-center md:items-start">
                <motion.div 
                  className="relative h-36 w-36 sm:h-40 sm:w-40 flex items-center justify-center border-2 border-[#02d8fc30] bg-[#01142840] rounded-md overflow-hidden"
                  animate={{ 
                    boxShadow: [
                      '0 0 10px rgba(2, 216, 252, 0.3)',
                      '0 0 20px rgba(2, 216, 252, 0.5)',
                      '0 0 10px rgba(2, 216, 252, 0.3)',
                    ]
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity,
                  }}
                >
                  {/* Scan line effect */}
                  <motion.div 
                    className="absolute inset-0 pointer-events-none z-10 bg-gradient-to-b from-transparent via-[#02d8fc10] to-transparent"
                    animate={{ top: ['0%', '100%', '0%'] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  />
                  
                  <div className="text-[4.5rem] sm:text-[5rem] font-black">
                    <span className="text-[#02d8fc]" style={{ 
                      textShadow: '0 0 10px rgba(2, 216, 252, 0.7), 0 0 20px rgba(2, 216, 252, 0.5)' 
                    }}>
                      K<span className="text-white">P</span>
                    </span>
                  </div>
                </motion.div>
                
                {/* Data blips panel */}
                <div 
                  ref={blipsRef}
                  className="w-full mt-4 h-16 sm:h-20 md:h-24 bg-[#00131f] border border-[#02d8fc30] rounded-md p-2 overflow-y-auto font-mono text-xs"
                  style={{ scrollBehavior: 'smooth' }}
                >
                  {dataBlips.map((blip, idx) => (
                    <motion.div 
                      key={idx} 
                      initial={{ opacity: 0, x: -5 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-[#02d8fc] mb-1"
                    >
                      <span className="text-[#02d8fc60] mr-2">[{String(idx).padStart(2, '0')}]</span>
                      {blip}
                    </motion.div>
                  ))}
                </div>
              </div>
              
              {/* Right panel - Status info */}
              <div className="flex-1 flex flex-col">
                <div className="font-mono text-[#02d8fc] text-sm md:text-base">
                  {/* Status bar */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-base md:text-lg font-bold flex items-center gap-2">
                      <motion.div
                        className="h-3 w-3 bg-[#02d8fc40] rounded-full relative"
                        animate={{ 
                          backgroundColor: progressWidth >= 100 ? '#4ade80' : '#02d8fc40' 
                        }}
                      >
                        {progressWidth >= 100 && (
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
                    
                    {progressWidth >= 100 ? (
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
                        INITIALIZING
                      </motion.div>
                    )}
                  </div>

                  {/* System Initialization Text */}
                  <div className="mb-5">
                    <div className="text-sm text-[#02d8fc90] mb-1">SYSTEM STATUS</div>
                    <motion.div 
                      className="text-lg md:text-xl font-light text-white"
                      animate={{ opacity: [0.9, 1, 0.9] }}
                      transition={{ duration: 2, ease: "easeInOut", repeat: Infinity }}
                    >
                      Portfolio Interface Loading
                    </motion.div>
                  </div>

                  {/* Developer Info */}
                  <div className="mb-6 bg-[#02d8fc10] border border-[#02d8fc30] rounded px-3 py-2">
                    <div className="text-sm text-[#02d8fc90] mb-1">USER PROFILE</div>
                    <div className="flex flex-col gap-1">
                      <div className="flex">
                        <span className="text-[#02d8fc80] w-20">NAME</span>
                        <span className="text-white font-semibold">KUNAL</span>
                      </div>
                      <div className="flex">
                        <span className="text-[#02d8fc80] w-20">ROLE</span>
                        <span className="text-white">SOFTWARE DEV</span>
                      </div>
                      <div className="flex">
                        <span className="text-[#02d8fc80] w-20">STATUS</span>
                        <span className="text-green-400">ACTIVE</span>
                      </div>
                    </div>
                  </div>

                  {/* Loading Bar with cyber styling */}
                  <div className="relative">
                    <div className="text-sm text-[#02d8fc90] mb-1">INTERFACE LOADING</div>
                    <div className="relative h-3 md:h-4 bg-[#00131f] rounded-sm overflow-hidden border border-[#02d8fc30]">
                      <motion.div 
                        className="h-full bg-gradient-to-r from-[#02d8fc80] to-[#02d8fcdd]"
                        initial={{ width: 0 }}
                        animate={{ width: `${progressWidth}%` }}
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
                          {Math.round(progressWidth)}%
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {progressWidth >= 100 && (
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
            </div>
          </div>
          
          {/* Bottom cyber accent bar */}
          <div className="bg-gradient-to-r from-[#02d8fc20] via-[#02d8fc10] to-[#02d8fc20] border-t border-[#02d8fc30] p-2 flex justify-between items-center">
            <div className="flex gap-1 md:gap-2">
              {['01', '10', '11'].map((bin, i) => (
                <motion.div 
                  key={i}
                  className="h-1 md:h-1.5 w-3 md:w-4 bg-[#02d8fc]"
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
            <div className="text-[#02d8fc80] text-xs font-mono tracking-wider">PORTFOLIO.SYS</div>
            <div className="flex gap-1 md:gap-2">
              {['11', '10', '01'].map((bin, i) => (
                <motion.div 
                  key={i}
                  className="h-1 md:h-1.5 w-3 md:w-4 bg-[#02d8fc]"
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
      </div>
      
      {/* Final transition overlay when complete */}
      {progressWidth >= 100 && (
        <motion.div 
          className="absolute inset-0 bg-[#02d8fc] z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.8, 0] }}
          transition={{ 
            duration: 1,
            delay: 0.8,
            times: [0, 0.5, 1]
          }}
        />
      )}
    </div>
  );
};

export default Index;
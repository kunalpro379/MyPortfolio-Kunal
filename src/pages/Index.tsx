import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Background from '@/components/ui/Background';

interface IndexProps {
  onComplete?: () => void;
}

const Index = ({ onComplete }: IndexProps) => {
  const [progressWidth, setProgressWidth] = useState(0);
  
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
          }, 500);
          return 100;
        }
        return newWidth;
      });
    }, 50);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="h-full w-full flex items-center justify-center bg-[#011428] relative overflow-hidden">
      <Background />
      <div className="relative z-10 flex flex-col items-center justify-center w-full h-full p-4">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-4xl md:text-6xl font-bold text-[#02d8fc] mb-4"
        >
          <motion.main 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center h-full w-full bg-purple"
          >
            {/* Main Content - Centered */}
            <div className="flex flex-col items-center justify-center">
              {/* KP Logo with glow effect */}
              <motion.div 
                className="relative mb-16"
                animate={{ 
                  scale: [1, 1.05, 1],
                  opacity: [0.9, 1, 0.9]
                }}
                transition={{ 
                  duration: 2, 
                  ease: "easeInOut",
                  repeat: Infinity,
                }}
              >
                <div className="text-[6rem] sm:text-[8rem] md:text-[11rem] font-black">
                  <span className="text-black" style={{ 
                    textShadow: '0 0 10px rgba(118, 31, 199, 0.7), 0 0 20px rgba(118, 31, 199, 0.5)' 
                  }}>
                    K<span className="text-[#8b31f7]">P</span>
                  </span>
                </div>
                
                {/* Add glow effect around the logo */}
                <motion.div 
                  className="absolute inset-0 blur-xl opacity-30" 
                  animate={{
                    opacity: [0.3, 0.5, 0.3],
                  }}
                  transition={{
                    duration: 2,
                    ease: "easeInOut",
                    repeat: Infinity,
                  }}
                  style={{ 
                    background: 'radial-gradient(circle at center, #8b31f7 0%, transparent 70%)',
                    zIndex: -1
                  }}
                ></motion.div>
              </motion.div>

              {/* System Initialization Text */}
              <motion.div 
                className="text-xl md:text-2xl font-light text-gray-300 mb-6"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 1.5, ease: "easeInOut", repeat: Infinity }}
              >
                System Initialization in Progress...
              </motion.div>

              {/* Developer Text */}
              <div className="text-md md:text-lg font-mono text-[#02d8fc] mb-8">
                {'< Software Developer | Turning Ideas into Reality />'}
              </div>

              {/* Loading Bar with improved styling */}
              <div className="w-full max-w-md bg-gray-800/30 rounded-full overflow-hidden relative h-2 backdrop-blur-sm">
                <motion.div 
                  className="h-full relative"
                  style={{
                    background: 'linear-gradient(90deg, #02d8fc, #0066ff)',
                    width: `${progressWidth}%`,
                  }}
                  initial={{ width: "0%", opacity: 0 }}
                  animate={{ 
                    width: `${progressWidth}%`,
                    opacity: 1,
                  }}
                  transition={{ 
                    duration: 0.3,
                    ease: "easeOut"
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
                </motion.div>

                {/* Glowing effect */}
                <div 
                  className="absolute inset-0 w-full h-full opacity-50"
                  style={{
                    background: `radial-gradient(circle at ${progressWidth}% 50%, rgba(2, 216, 252, 0.4) 0%, transparent 50%)`
                  }}
                />
              </div>
              
              {/* Loading percentage with smoother animation */}
              <motion.div 
                className="text-sm text-gray-400 mt-2"
                animate={{ 
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                {Math.round(progressWidth)}%
              </motion.div>
            </div>
          </motion.main>
        </motion.div>
      </div>
    </div>
  );
};

export default Index;
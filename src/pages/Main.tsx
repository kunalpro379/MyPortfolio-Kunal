import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faMicrochip, 
  faMemory, 
  faHdd, 
  faTemperatureHalf,
} from '@fortawesome/free-solid-svg-icons';
import CardDots from '@/components/ui/CardDots';

// Define the brainAnimColor variable here
const brainAnimColor = '#02d8fc';

// Helper Components
const TechStack = ({ name, percentage, color }: { name: string, percentage: number, color: string }) => (
  <div>
    <div className="flex justify-between text-[#02d8fc] mb-2">
      <span>{name}</span>
      <span>{percentage}%</span>
    </div>
    <div className="w-full bg-blue-900/20 h-1.5">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${percentage}%` }}
        className="h-full"
        style={{ backgroundColor: color }}
      />
    </div>
  </div>
);

const ProjectStat = ({ name, value }: { name: string, value: string }) => (
  <motion.div 
    className="flex justify-between items-center"
    whileHover={{ x: 5 }}
  >
    <span>{name}</span>
    <span className="text-[#02d8fc]/80">{value}</span>
  </motion.div>
);

const HealthStat = ({ name, value, icon }: { name: string, value: string, icon: string }) => (
  <motion.div 
    className="flex justify-between items-center"
    whileHover={{ x: 5 }}
  >
    <div className="flex items-center gap-2">
      <span>{icon}</span>
      <span>{name}</span>
    </div>
    <span className="text-[#02d8fc]/80">{value}</span>
  </motion.div>
);

const ProjectCard = ({ name, description }: { name: string, description: string }) => (
  <motion.div
    className="cyber-card p-4"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={{ scale: 1.02 }}
    transition={{ duration: 0.3 }}
  >
    <h4 className="text-[#02d8fc] text-lg mb-2">{name}</h4>
    <p className="text-[#02d8fc]/70 text-sm">{description}</p>
    <CardDots />
  </motion.div>
);

// Specialized gauge components for Cognitive Processing Unit and Creative Rendering Core
const CognitiveProcessingUnitGauge = ({ value, maxValue }: { value: number, maxValue: number }) => {
  const percentage = (value / maxValue) * 100;
  const circumference = 2 * Math.PI * 70;
  const offset = circumference - (percentage / 100) * circumference;
  
  // Animated counter
  const [displayValue, setDisplayValue] = useState(0);
  
  useEffect(() => {
    // Animate the counter from current display value to the actual value
    const duration = 800;
    const startValue = displayValue;
    const startTime = Date.now();
    
    const animateValue = () => {
      const now = Date.now();
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      const newValue = Math.floor(startValue + progress * (value - startValue));
      setDisplayValue(newValue);
      
      if (progress < 1) {
        requestAnimationFrame(animateValue);
      }
    };
    
    requestAnimationFrame(animateValue);
  }, [value]);

  return (
    
    <div className="relative w-48 h-48">
        
      {/* Grid background pattern */}
      <div className="absolute inset-0 opacity-10">
        
        <div className="w-full h-full" 
          style={{
            backgroundImage: 'radial-gradient(circle, #02d8fc 1px, transparent 1px), radial-gradient(circle, #02d8fc 1px, transparent 1px)',
            backgroundSize: '20px 20px',
            backgroundPosition: '0 0, 10px 10px'
          }}
        />
      </div>

      {/* Outer glow effect */}
      <div className="absolute inset-0 rounded-full blur-[15px] bg-[#02d8fc] opacity-10" />
      
      <svg className="transform -rotate-90 w-full h-full relative">
        {/* Segmented arcs - 60 segments */}
        {Array.from({ length: 60 }).map((_, i) => {
          const rotation = (i * 6); // 6 degrees per segment
          const isActive = i < Math.floor(percentage / 100 * 60);
          const isMajor = i % 5 === 0; // Major tick every 5 segments
          
          return (
            <motion.path
              key={`segment-${i}`}
              d={`M ${96 + 82 * Math.cos(rotation * Math.PI / 180)} ${96 + 82 * Math.sin(rotation * Math.PI / 180)} 
                 A 82 82 0 0 1 ${96 + 82 * Math.cos((rotation + 3) * Math.PI / 180)} ${96 + 82 * Math.sin((rotation + 3) * Math.PI / 180)}`}
              stroke={isActive ? "#02d8fc" : "#1a365d"}
              strokeWidth={isMajor ? "3" : "2"}
              fill="none"
              className={`${isActive ? "opacity-90" : "opacity-30"} transition-all duration-300`}
              strokeLinecap="round"
              animate={isActive ? { 
                opacity: [0.7, 1, 0.7],
              } : {}}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          );
        })}

        {/* Rotating background circle */}
        <motion.circle
          cx="96"
          cy="96"
          r="65"
          stroke="#02d8fc20"
          strokeWidth="1.5"
          strokeDasharray="4,10"
          fill="none"
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        />

        {/* Glitch effect circle */}
        <motion.circle
          cx="96"
          cy="96"
          r="58"
          stroke="#02d8fc40"
          strokeWidth="1"
          fill="none"
          animate={{ 
            opacity: [1, 0.5, 0.8, 0.3, 1],
            scale: [1, 1.01, 0.99, 1.02, 1],
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity,
            times: [0, 0.2, 0.4, 0.6, 1],
            ease: "easeInOut" 
          }}
        />

        {/* Main progress circle */}
        <defs>
          <linearGradient id="cpuGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#02d8fc" />
            <stop offset="100%" stopColor="#0ff" />
          </linearGradient>
          <filter id="cpuGlow">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        
        <motion.circle
          cx="96"
          cy="96"
          r="70"
          stroke="url(#cpuGradient)"
          strokeWidth="5"
          fill="none"
          strokeLinecap="round"
          filter="url(#cpuGlow)"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          style={{ strokeDasharray: circumference }}
          transition={{ duration: 1, ease: "easeOut" }}
        />

        {/* Dots along the circle */}
        {Array.from({ length: 8 }).map((_, i) => {
          const angle = (percentage / 100) * 360 * (i / 8);
          return (
            <motion.circle
              key={`dot-${i}`}
              cx={96 + 70 * Math.cos(angle * Math.PI / 180)}
              cy={96 + 70 * Math.sin(angle * Math.PI / 180)}
              r="2"
              fill="#02d8fc"
              animate={{
                scale: [1, 2, 1],
                opacity: [0.8, 1, 0.8],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.25,
              }}
            />
          );
        })}
        
        {/* Digital markers at cardinal points */}
        {[0, 90, 180, 270].map((angle) => (
          <path
            key={`marker-${angle}`}
            d={`M ${96 + 55 * Math.cos(angle * Math.PI / 180)} ${96 + 55 * Math.sin(angle * Math.PI / 180)} 
               L ${96 + 62 * Math.cos(angle * Math.PI / 180)} ${96 + 62 * Math.sin(angle * Math.PI / 180)}`}
            stroke="#02d8fc"
            strokeWidth="2"
            className="opacity-70"
          />
        ))}
      </svg>

      {/* Center content */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative flex flex-col items-center">
          {/* Hexagonal frame */}
          <svg
            className="absolute w-full h-full"
            viewBox="0 0 100 100"
            style={{ filter: 'drop-shadow(0 0 5px rgba(2, 216, 252, 0.5))' }}
          >
            <motion.path
              d="M50 10 L90 50 L50 90 L10 50 Z"
              fill="rgba(10, 20, 30, 0.7)"
              stroke="#02d8fc"
              strokeWidth="1"
              animate={{
                strokeDasharray: ['0,1000', '1000,1000'],
                rotate: [0, 360],
              }}
              transition={{
                strokeDasharray: { duration: 3, repeat: Infinity, ease: "linear" },
                rotate: { duration: 30, repeat: Infinity, ease: "linear" }
              }}
            />
          </svg>

          {/* Value display */}
          <div className="flex flex-col items-center justify-center z-10 p-2">
      
            
            <div className="relative">
              <motion.div 
                className="text-4xl font-bold font-mono text-[#02d8fc]"
                animate={{ 
                  textShadow: ['0 0 8px rgba(2,216,252,0.5)', '0 0 15px rgba(2,216,252,0.8)', '0 0 8px rgba(2,216,252,0.5)'],
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                {displayValue}
              </motion.div>
              
              {/* Random glitch effect */}
              <motion.div 
                className="absolute inset-0 flex items-center justify-center text-4xl font-bold font-mono text-[#ff0066] mix-blend-screen"
                animate={{ 
                  opacity: [0, 0.01, 0, 0.015, 0, 0.008, 0],
                  x: [-2, 1, 0, -1, 0],
                }}
                transition={{ 
                  duration: 0.5, 
                  repeat: Infinity, 
                  repeatDelay: Math.random() * 5 + 3
                }}
              >
                {displayValue}
              </motion.div>
            </div>
            
            <span className="text-[#02d8fc80] text-sm font-mono">MHz</span>
          </div>
        </div>
      </div>

      {/* Corner accents - replacing with connected dots animation */}
      {[45, 135, 225, 315].map((angle, i) => (
        <motion.div
          key={`corner-${i}`}
          className="absolute w-4 h-4"
          style={{
            transform: `rotate(${angle}deg) translateY(-88px)`,
            transformOrigin: 'center center',
            left: 'calc(50% - 2px)',
            top: '50%',
          }}
        >
          <svg width="100%" height="100%" viewBox="0 0 20 20">
            <defs>
              <linearGradient id={`dotTrailGradient${i}`} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor={i % 2 === 0 ? "#02d8fc" : "#00ff88"} />
                <stop offset="100%" stopColor={i % 2 === 0 ? "#0ff" : "#02d8fc"} />
              </linearGradient>
              
              {/* Define the trail path animation */}
              <motion.path
                id={`trailPath${i}`}
                d="M2,10 L18,10"
                stroke="none"
                initial={false}
              />
            </defs>
            
            {/* Trail effect */}
            <motion.path
              d="M2,10 L18,10"
              stroke={`url(#dotTrailGradient${i})`}
              strokeWidth="0.8"
              strokeDasharray="1,3"
              initial={{ pathLength: 0 }}
              animate={{ 
                pathLength: [0, 1, 1, 0],
                opacity: [0, 1, 1, 0] 
              }}
              transition={{ 
                duration: 5,
                times: [0, 0.3, 0.7, 1],
                repeat: Infinity,
                repeatDelay: 1
              }}
            />
            
            {/* Moving dot */}
            <motion.circle
              cx="2"
              cy="10"
              r="2"
              fill={i % 2 === 0 ? "#02d8fc" : "#00ff88"}
              animate={{ 
                cx: [2, 18, 18, 2],
                opacity: [0.7, 1, 0.7, 0]
              }}
              transition={{ 
                duration: 5,
                times: [0, 0.3, 0.7, 1],
                repeat: Infinity,
                repeatDelay: 1
              }}
            />
            
            {/* Connecting line that grows from center */}
            <motion.line
              x1="10"
              y1="10"
              x2="10"
              y2="10"
              stroke={i % 2 === 0 ? "#02d8fc" : "#00ff88"}
              strokeWidth="1"
              animate={{
                x1: [10, 2],
                x2: [10, 18],
                opacity: [0, 1, 1, 0]
              }}
              transition={{ 
                duration: 5,
                times: [0, 0.3, 0.7, 1],
                repeat: Infinity,
                repeatDelay: 1
              }}
            />
          </svg>
        </motion.div>
      ))}
    </div>
  );
};

const CreativeRenderingCoreGauge = ({ value, maxValue }: { value: number, maxValue: number }) => {
  const percentage = (value / maxValue) * 100;
  const circumference = 2 * Math.PI * 70;
  const offset = circumference - (percentage / 100) * circumference;
  
  // Animated counter
  const [displayValue, setDisplayValue] = useState(0);
  
  useEffect(() => {
    // Animate the counter from current display value to the actual value
    const duration = 800;
    const startValue = displayValue;
    const startTime = Date.now();
    
    const animateValue = () => {
      const now = Date.now();
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      const newValue = Math.floor(startValue + progress * (value - startValue));
      setDisplayValue(newValue);
      
      if (progress < 1) {
        requestAnimationFrame(animateValue);
      }
    };
    
    requestAnimationFrame(animateValue);
  }, [value]);

  return (
    <div className="relative w-48 h-48">
      {/* Grid background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full" 
          style={{
            backgroundImage: 'radial-gradient(circle, #f97316 1px, transparent 1px), radial-gradient(circle, #f97316 1px, transparent 1px)',
            backgroundSize: '20px 20px',
            backgroundPosition: '0 0, 10px 10px'
          }}
        />
      </div>

      {/* Outer glow effect */}
      <div className="absolute inset-0 rounded-full blur-[15px] bg-[#f97316] opacity-10" />
      
      <svg className="transform -rotate-90 w-full h-full relative">
        {/* Segmented arcs - 60 segments */}
        {Array.from({ length: 60 }).map((_, i) => {
          const rotation = (i * 6); // 6 degrees per segment
          const isActive = i < Math.floor(percentage / 100 * 60);
          const isMajor = i % 5 === 0; // Major tick every 5 segments
          
          return (
            <motion.path
              key={`segment-${i}`}
              d={`M ${96 + 82 * Math.cos(rotation * Math.PI / 180)} ${96 + 82 * Math.sin(rotation * Math.PI / 180)} 
                 A 82 82 0 0 1 ${96 + 82 * Math.cos((rotation + 3) * Math.PI / 180)} ${96 + 82 * Math.sin((rotation + 3) * Math.PI / 180)}`}
              stroke={isActive ? "#f97316" : "#3d1f00"}
              strokeWidth={isMajor ? "3" : "2"}
              fill="none"
              className={`${isActive ? "opacity-90" : "opacity-30"} transition-all duration-300`}
              strokeLinecap="round"
              animate={isActive ? { 
                opacity: [0.7, 1, 0.7],
              } : {}}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          );
        })}

        {/* Rotating background circle */}
        <motion.circle
          cx="96"
          cy="96"
          r="65"
          stroke="#f9731620"
          strokeWidth="1.5"
          strokeDasharray="4,10"
          fill="none"
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        />

        {/* Glitch effect circle */}
        <motion.circle
          cx="96"
          cy="96"
          r="58"
          stroke="#f9731640"
          strokeWidth="1"
          fill="none"
          animate={{ 
            opacity: [1, 0.5, 0.8, 0.3, 1],
            scale: [1, 1.01, 0.99, 1.02, 1],
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity,
            times: [0, 0.2, 0.4, 0.6, 1],
            ease: "easeInOut" 
          }}
        />

        {/* Main progress circle */}
        <defs>
          <linearGradient id="gpuGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f97316" />
            <stop offset="100%" stopColor="#fb923c" />
          </linearGradient>
          <filter id="gpuGlow">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        
        <motion.circle
          cx="96"
          cy="96"
          r="70"
          stroke="url(#gpuGradient)"
          strokeWidth="5"
          fill="none"
          strokeLinecap="round"
          filter="url(#gpuGlow)"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          style={{ strokeDasharray: circumference }}
          transition={{ duration: 1, ease: "easeOut" }}
        />

        {/* Dots along the circle */}
        {Array.from({ length: 8 }).map((_, i) => {
          const angle = (percentage / 100) * 360 * (i / 8);
          return (
            <motion.circle
              key={`dot-${i}`}
              cx={96 + 70 * Math.cos(angle * Math.PI / 180)}
              cy={96 + 70 * Math.sin(angle * Math.PI / 180)}
              r="2"
              fill="#f97316"
              animate={{
                scale: [1, 2, 1],
                opacity: [0.8, 1, 0.8],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.25,
              }}
            />
          );
        })}
        
        {/* Digital markers at cardinal points */}
        {[0, 90, 180, 270].map((angle) => (
          <path
            key={`marker-${angle}`}
            d={`M ${96 + 55 * Math.cos(angle * Math.PI / 180)} ${96 + 55 * Math.sin(angle * Math.PI / 180)} 
               L ${96 + 62 * Math.cos(angle * Math.PI / 180)} ${96 + 62 * Math.sin(angle * Math.PI / 180)}`}
            stroke="#f97316"
            strokeWidth="2"
            className="opacity-70"
          />
        ))}
      </svg>

      {/* Center content */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative flex flex-col items-center">
          {/* Hexagonal frame */}
          <svg
            className="absolute w-full h-full"
            viewBox="0 0 100 100"
            style={{ filter: 'drop-shadow(0 0 5px rgba(249, 115, 22, 0.5))' }}
          >
            <motion.path
              d="M50 10 L90 50 L50 90 L10 50 Z"
              fill="rgba(30, 15, 5, 0.7)"
              stroke="#f97316"
              strokeWidth="1"
              animate={{
                strokeDasharray: ['0,1000', '1000,1000'],
                rotate: [0, -360],
              }}
              transition={{
                strokeDasharray: { duration: 3, repeat: Infinity, ease: "linear" },
                rotate: { duration: 30, repeat: Infinity, ease: "linear" }
              }}
            />
          </svg>

          {/* Value display */}
          <div className="flex flex-col items-center justify-center z-10 p-2">

            <div className="relative">
              <motion.div 
                className="text-4xl font-bold font-mono text-[#f97316]"
                animate={{ 
                  textShadow: ['0 0 8px rgba(249,115,22,0.5)', '0 0 15px rgba(249,115,22,0.8)', '0 0 8px rgba(249,115,22,0.5)'],
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                {displayValue}
              </motion.div>
              
              {/* Random glitch effect */}
              <motion.div 
                className="absolute inset-0 flex items-center justify-center text-4xl font-bold font-mono text-[#ff0066] mix-blend-screen"
                animate={{ 
                  opacity: [0, 0.01, 0, 0.015, 0, 0.008, 0],
                  x: [-2, 1, 0, -1, 0],
                }}
                transition={{ 
                  duration: 0.5, 
                  repeat: Infinity, 
                  repeatDelay: Math.random() * 5 + 3
                }}
              >
                {displayValue}
              </motion.div>
            </div>
            
            <span className="text-[#f9731680] text-sm font-mono">MHz</span>
          </div>
        </div>
      </div>

      {/* Corner accents */}
      {[45, 135, 225, 315].map((angle, i) => (
        <motion.div
          key={`corner-${i}`}
          className="absolute w-4 h-4"
          style={{
            transform: `rotate(${angle}deg) translateY(-88px)`,
            transformOrigin: 'center center',
            left: 'calc(50% - 2px)',
            top: '50%',
          }}
        >
          <motion.div
            className="w-full h-full border-2 border-[#f97316]"
            animate={{
              opacity: [0.3, 1, 0.3],
              rotate: [0, 90, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: i * 1,
            }}
          />
        </motion.div>
      ))}
    </div>
  );
};

// Create a new component for the rotating spiral heat visualizer
const HeatVisualizer = ({ fanSpeed, cpuTemp, gpuTemp }: { fanSpeed: number, cpuTemp: number, gpuTemp: number }) => {
  // Calculate a "heat index" based on CPU and GPU temps
  const avgTemp = (cpuTemp + gpuTemp) / 2;
  const heatLevel = Math.min(Math.max((avgTemp - 35) / 50, 0), 1); // Scale between 0-1 (35°C is cool, 85°C is hot)
  
  // Fan speed as percentage of max (assuming 2500 RPM is max)
  const fanSpeedPercent = Math.min(fanSpeed / 2500, 1);
  
  // Determine status based on temperatures
  const getStatus = () => {
    if (avgTemp < 45) return { text: "Normal", color: "#02d8fc" };
    if (avgTemp < 65) return { text: "Moderate", color: "#f97316" };
    return { text: "Caution", color: "#ef4444" };
  };
  
  const status = getStatus();
  
  return (
    <div className="relative w-32 h-32 mx-auto">
      {/* Background glow based on temperature */}
      <div 
        className="absolute inset-0 rounded-full blur-[20px] transition-all duration-1000 ease-in-out"
        style={{ 
          backgroundColor: status.color,
          opacity: 0.1 + (heatLevel * 0.4)
        }}
      />
      
      {/* Spiral image that rotates based on fan speed */}
      <motion.img 
        src="/output-onlinepngtools.png" 
        alt="Fan spiral"
        className="w-full h-full"
        style={{
          filter: `hue-rotate(${avgTemp > 65 ? '0deg' : '160deg'}) brightness(${1 + heatLevel * 0.5})`,
        }}
        animate={{ 
          rotate: 360,
          scale: [1, 1 + (heatLevel * 0.05), 1]
        }}
        transition={{ 
          rotate: { 
            repeat: Infinity, 
            duration: 4 / fanSpeedPercent, // Faster rotation with higher fan speed
            ease: "linear"
          },
          scale: {
            repeat: Infinity,
            duration: 2,
            ease: "easeInOut"
          }
        }}
      />

      {/* Center status indicator */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div 
          className={`w-16 h-16 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-500`}
          style={{ 
            backgroundColor: `rgba(0,0,0,0.7)`,
            border: `2px solid ${status.color}`,
            color: status.color,
            boxShadow: `0 0 10px ${status.color}`
          }}
        >
          <motion.div 
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {status.text}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

const Main = () => {
  // State for dynamic readings
  const [cpuFrequency, setCpuFrequency] = useState(3603);
  const [cpuTemp, setCpuTemp] = useState(40);
  const [cpuLoadPercent, setCpuLoadPercent] = useState(44);
  const [gpuFrequency, setGpuFrequency] = useState(2609);
  const [gpuTemp, setGpuTemp] = useState(51);
  const [gpuLoadPercent, setGpuLoadPercent] = useState(54);
  const [fanSpeed, setFanSpeed] = useState(1332);

  // Function to generate random value within a range
  const getRandomValue = (base: number, variance: number) => {
    return Math.floor(base + (Math.random() - 0.5) * variance);
  };

  // Update readings periodically
  useEffect(() => {
    const updateReadings = () => {
      setCpuFrequency(getRandomValue(3603, 200));
      setCpuTemp(getRandomValue(40, 5));
      setCpuLoadPercent(getRandomValue(44, 15));
      setGpuFrequency(getRandomValue(2609, 150));
      setGpuTemp(getRandomValue(51, 4));
      setGpuLoadPercent(getRandomValue(54, 20));
      setFanSpeed(getRandomValue(1332, 100));
    };

    const readingsInterval = setInterval(updateReadings, 2000);
    return () => clearInterval(readingsInterval);
  }, []);

  // Card animation variants
  const cardVariants = {
    initial: { scale: 1, opacity: 0.9 },
    hover: { 
      scale: 1.03, 
      opacity: 1,
      transition: { 
        duration: 0.3,
        type: "spring",
        stiffness: 300
      }
    },
    tap: { 
      scale: 0.97,
      transition: { 
        duration: 0.1,
        type: "spring",
        stiffness: 500
      }
    }
  };

  return (
    <div className="p-6 ">
      <div className="text-3xl font-semibold text-[#02d8fc] border-b-2 border-blue-900/30 pb-4 mb-6 flex items-center gap-4">
        <span>System Information: KunalOS</span>
        <span className="text-sm font-normal">VESIT Mumbai</span>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1">
        {/* System Performance Card */}
        <motion.div 
          initial="initial"
          whileHover="hover"
          whileTap="tap"
          variants={cardVariants}
          className="cyber-card p-8 flex flex-col relative min-h-[300px]"
        >
          <CardDots count={15} />
          <div className="flex items-center gap-3 mb-4 text-[#02d8fc] text-xl z-10">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <FontAwesomeIcon icon={faMicrochip} />
            </motion.div>
            <div>System Performance</div>
          </div>
          
          <div className="flex flex-wrap gap-8 justify-center">
            {/* CPU Section - Gauge and Info */}
            <div className="flex flex-col items-center">
              <CognitiveProcessingUnitGauge
                value={cpuFrequency}
                maxValue={4000}
              />
              
              {/* CPU Info directly under gauge */}
              <div className="mt-4 flex flex-col items-center space-y-2">
                <div className="flex flex-col items-center">   
                  <motion.span 
                    className="text-[#02d8fc] text-xs font-semibold uppercase tracking-wider mb-1 text-center"
                    animate={{ 
                      textShadow: ['0 0 3px rgba(2,216,252,0.3)', '0 0 8px rgba(2,216,252,0.6)', '0 0 3px rgba(2,216,252,0.3)'],
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    Cognitive Processing Unit
                  </motion.span>
                  <motion.span 
                    className="text-[#02d8fc] text-xs font-semibold uppercase tracking-wider text-center"
                    animate={{ 
                      opacity: [0.7, 1, 0.7] 
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    SynapseCore X1
                  </motion.span>
                </div>

                <div className="mt-2 space-y-2 w-full text-white">
                  <div>CPU Temp: {cpuTemp}°C</div>
                  <div className="flex flex-col">
                    <span>Load: {cpuLoadPercent}%</span>
                    <div className="w-full bg-blue-900/20 h-1.5 mt-1">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${cpuLoadPercent}%` }}
                        transition={{ duration: 1.5 }}
                        className="bg-[#02d8fc] h-full"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* GPU Section - Gauge and Info */}
            <div className="flex flex-col items-center">
              <CreativeRenderingCoreGauge
                value={gpuFrequency}
                maxValue={3000}
              />
              
              {/* GPU Info directly under gauge */}
              <div className="mt-4 flex flex-col items-center space-y-2">
                <div className="flex flex-col items-center">
                  <motion.span 
                    className="text-[#f97316] text-xs font-semibold uppercase tracking-wider mb-1 text-center"
                    animate={{ 
                      textShadow: ['0 0 3px rgba(249,115,22,0.3)', '0 0 8px rgba(249,115,22,0.6)', '0 0 3px rgba(249,115,22,0.3)'],
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    Creative Rendering Core
                  </motion.span>
                  <motion.span 
                    className="text-[#f97316] text-xs font-semibold uppercase tracking-wider text-center"
                    animate={{ 
                      opacity: [0.7, 1, 0.7] 
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    VisionCore Z
                  </motion.span>
                </div>

                <div className="mt-2 space-y-2 w-full text-white">
                  <div>GPU Temp: {gpuTemp}°C</div>
                  <div className="flex flex-col">
                    <span>Load: {gpuLoadPercent}%</span>
                    <div className="w-full bg-blue-900/20 h-1.5 mt-1">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${gpuLoadPercent}%` }}
                        transition={{ duration: 1.5 }}
                        className="bg-[#f97316] h-full"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2 justify-center mt-6 text-white">
            <span>Fan Speed:</span>
            <motion.span
              animate={{
                opacity: [1, 0.7, 1]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              {fanSpeed} RPM
            </motion.span>
          </div>
        </motion.div>

        {/* Memory Card */}
        <motion.div 
          variants={cardVariants}
          initial="initial"
          whileHover="hover"
          whileTap="tap"
          className="cyber-card p-8 flex flex-col relative min-h-[300px]"
        >
          <CardDots />
          <div className="flex items-center gap-3 mb-4 text-[#02d8fc] text-xl z-10">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <FontAwesomeIcon icon={faMemory} />
            </motion.div>
            <div>🧠 Neural Cache Monitor</div>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between text-[#02d8fc] mb-1">
              <span className="font-semibold">Memory Unit:</span>
              <span className="text-[#00ff88]">Synaptic Storage 16GB+</span>
            </div>
            <div className="flex justify-between text-[#02d8fc] mb-1">
              <span className="font-semibold">Total Utilization:</span>
              <span className="text-[#00ff88]">60%</span>
            </div>
            <div className="w-full bg-blue-900/20 h-2 mb-4">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '60%' }}
                className="h-full bg-gradient-to-r from-[#02d8fc] to-[#00ff88]"
              />
            </div>

            {/* Brain circuit image replacing SVG visualization */}

            {/* Brain circuit image with enhanced animations */}
            <div className="my-2 flex justify-center">
              <motion.div 
                className="relative w-40 h-40 md:w-48 md:h-48"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
              >
                <motion.img 
                  src="/braincircuit.png" 
                  alt="Neural Circuit Brain" 
                  className="w-full h-full object-contain z-20 relative"
                  animate={{ 
                    filter: ['brightness(1)', 'brightness(1.3)', 'brightness(1)'],
                    scale: [1, 1.05, 1]
                  }}
                  transition={{ 
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                
                {/* Animated glow effect */}
                <motion.div 
                  className="absolute inset-0 rounded-full blur-xl z-10"
                  style={{ backgroundColor: brainAnimColor }}
                  animate={{ 
                    opacity: [0.2, 0.5, 0.2],
                    scale: [0.8, 1.2, 0.8],
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                
                {/* Pulsating ring effect */}
                <motion.div
                  className="absolute inset-0 border-4 rounded-full z-30"
                  style={{ borderColor: brainAnimColor }}
                  animate={{
                    scale: [0.7, 1.3, 0.7],
                    opacity: [0.7, 0, 0.7],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                
                {/* Particle effect around the brain */}
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={`particle-${i}`}
                    className="absolute w-2 h-2 rounded-full z-30"
                    style={{ 
                      backgroundColor: i % 2 === 0 ? '#02d8fc' : '#00ff88',
                      top: `${50 + 35 * Math.sin(i * Math.PI / 3)}%`,
                      left: `${50 + 35 * Math.cos(i * Math.PI / 3)}%`,
                    }}
                    animate={{
                      scale: [0.5, 1.5, 0.5],
                      opacity: [0.3, 1, 0.3],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.3,
                      ease: "easeInOut"
                    }}
                  />
                ))}
                
                {/* Neural connections */}
                {[...Array(3)].map((_, i) => {
                  const startAngle = i * 2 * Math.PI / 3;
                  const endAngle = ((i + 1.5) % 3) * 2 * Math.PI / 3;
                  const start = {
                    x: 50 + 40 * Math.cos(startAngle),
                    y: 50 + 40 * Math.sin(startAngle)
                  };
                  const end = {
                    x: 50 + 40 * Math.cos(endAngle),
                    y: 50 + 40 * Math.sin(endAngle)
                  };
                  
                  return (
                    <motion.div
                      key={`connection-${i}`}
                      className="absolute h-0.5 rounded-full origin-left z-10"
                      style={{
                        top: `${start.y}%`,
                        left: `${start.x}%`,
                        backgroundColor: brainAnimColor,
                        width: `${Math.hypot(end.x - start.x, end.y - start.y)}%`,
                        transform: `rotate(${Math.atan2(end.y - start.y, end.x - start.x)}rad)`,
                      }}
                      animate={{
                        opacity: [0, 1, 0],
                        scaleX: [0.5, 1, 0.5],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.5,
                        ease: "easeInOut"
                      }}
                    />
                  );
                })}
              </motion.div>
            </div>

            <div className="mt-4">
              <div className="text-sm text-[#02d8fc] mb-2">Module Allocation:</div>
              <div className="space-y-3">
                <div className="space-y-1">
                  <div className="flex justify-between text-[#02d8fc] text-sm">
                    <span>Flutter</span>
                    <span>40%</span>
                  </div>
                  <div className="w-full bg-blue-900/20 h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: '40%' }}
                      className="h-full bg-[#02d8fc]"
                    />
                  </div>
                </div>
                
                <div className="space-y-1">
                  <div className="flex justify-between text-[#02d8fc] text-sm">
                    <span>Node.js</span>
                    <span>35%</span>
                  </div>
                  <div className="w-full bg-blue-900/20 h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: '35%' }}
                      className="h-full bg-[#00ff88]"
                    />
                  </div>
                </div>
                
                <div className="space-y-1">
                  <div className="flex justify-between text-[#02d8fc] text-sm">
                    <span>GenAI</span>
                    <span>15%</span>
                  </div>
                  <div className="w-full bg-blue-900/20 h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: '15%' }}
                      className="h-full bg-[#ff5f00]"
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-4 grid grid-cols-2 gap-2">
              <div className="flex items-center gap-1">
                <div className="h-2 w-2 rounded-full bg-[#02d8fc] animate-pulse"></div>
                <span className="text-xs text-[#02d8fc]">Cache Integrity: Optimal</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="h-2 w-2 rounded-full bg-[#00ff88] animate-pulse"></div>
                <span className="text-xs text-[#02d8fc]">Swap Memory: Auto-Expand</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="h-2 w-2 rounded-full bg-[#ff5f00] animate-pulse"></div>
                <span className="text-xs text-[#02d8fc]">Learning Rate: 1.2x/Day</span>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Project Stats Card */}
        <motion.div 
          variants={cardVariants}
          initial="initial"
          whileHover="hover"
          whileTap="tap"
          className="cyber-card p-8 flex flex-col relative min-h-[300px]"
        >
          <CardDots />
          <div className="flex items-center gap-3 mb-4 text-[#02d8fc] text-xl z-10">
            <motion.div
              animate={{ 
                rotateY: [0, 360],
                scale: [1, 1.1, 1]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <FontAwesomeIcon icon={faHdd} />
            </motion.div>
            <div>🚀 Project Stats – Dev Throughput Dashboard</div>
          </div>
          
          <div className="space-y-4 text-[#02d8fc]">
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold">Project Engine:</span>
              <span className="text-[#00ff88] font-mono">RenderCore V2.1</span>
            </div>
            
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold">Status:</span>
              <motion.span 
                className="bg-green-500/20 text-green-400 px-2 py-0.5 rounded-md font-medium"
                animate={{ opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                ACTIVE
              </motion.span>
            </div>
            
            <div className="bg-blue-900/30 rounded-lg p-3 space-y-3">
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-1">
                  <span className="text-[#02d8fc]">🚀</span> 
                  Projects Deployed
                </span>
                <span className="text-[#00ff88]">7+ Live Builds</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-1">
                  <span className="text-[#02d8fc]">🧪</span> 
                  Active Repositories
                </span>
                <span className="text-[#00ff88]">16+ In Development</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-1">
                  <span className="text-[#02d8fc]">✅</span> 
                  Availability
                </span>
                <span className="flex gap-1 text-[#00ff88]">
                  <span className="bg-blue-900/50 px-1 rounded text-xs">Freelance</span>
                  <span className="bg-blue-900/50 px-1 rounded text-xs">Internships</span>
                  <span className="bg-blue-900/50 px-1 rounded text-xs">Collabs</span>
                </span>
              </div>
            </div>
            
            <div className="space-y-3 mt-2">
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-1">
                  <span>⚙️</span> Project Capacity
                </span>
                <span>85%</span>
              </div>
              <div className="w-full bg-blue-900/20 h-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '85%' }}
                  className="h-full bg-gradient-to-r from-[#02d8fc] to-[#0ff]"
                />
              </div>
              
              <div className="flex justify-between items-center mt-2">
                <span className="flex items-center gap-1">
                  <span>⚡</span> System Load
                </span>
                <span className="text-[#00ff88]">Balanced</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-1">
                  <span>🟢</span> Upgrade Mode
                </span>
                <span className="text-[#00ff88] text-sm">Continuous Learning Enabled</span>
              </div>
              
              {/* Progress ring visualization */}
              <div className="flex justify-center mt-2">
                <svg width="80" height="80" viewBox="0 0 100 100" className="z-10">
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#02d8fc20" strokeWidth="8" />
                  
                  <motion.circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="#02d8fc"
                    strokeWidth="8"
                    strokeDasharray={2 * Math.PI * 40}
                    strokeDashoffset={2 * Math.PI * 40 * (1 - 0.85)}
                    strokeLinecap="round"
                    transform="rotate(-90 50 50)"
                  />
                  
                  {/* Engine dots */}
                  {Array.from({ length: 4 }).map((_, i) => {
                    const angle = i * (Math.PI / 2);
                    const x = 50 + 40 * Math.cos(angle);
                    const y = 50 + 40 * Math.sin(angle);
                    return (
                      <motion.circle
                        key={`engine-${i}`}
                        cx={x}
                        cy={y}
                        r={3}
                        fill="#02d8fc"
                        animate={{
                          opacity: [0.5, 1, 0.5],
                          scale: [1, 1.5, 1]
                        }}
                        transition={{
                          duration: 2,
                          delay: i * 0.5,
                          repeat: Infinity
                        }}
                      />
                    );
                  })}
                  
                  <text x="50" y="45" textAnchor="middle" fill="#02d8fc" fontSize="12">85%</text>
                  <text x="50" y="60" textAnchor="middle" fill="#02d8fc" fontSize="8">CAPACITY</text>
                </svg>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* System Health Card */}
        <motion.div 
          variants={cardVariants}
          initial="initial"
          whileHover="hover"
          whileTap="tap"
          className="cyber-card p-8 flex flex-col relative min-h-[300px]"
        >
          <CardDots count={15} />
          <div className="flex items-center gap-3 mb-4 text-[#02d8fc] text-xl z-10">
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 10, -10, 0]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <FontAwesomeIcon icon={faTemperatureHalf} />
            </motion.div>
            <div>System Health</div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Left side - Heat Visualizer */}
            <div className="flex flex-col items-center justify-center space-y-2">
              <HeatVisualizer 
                fanSpeed={fanSpeed}
                cpuTemp={cpuTemp}
                gpuTemp={gpuTemp}
              />
              
              <div className="text-center text-[#02d8fc]">
                <div className="font-mono text-sm">
                  <motion.span
                    animate={{
                      opacity: [1, 0.7, 1]
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    Fan: {fanSpeed} RPM
                  </motion.span>
                </div>
                <div className="font-mono text-sm">
                  <motion.span
                    animate={{
                      opacity: [1, 0.7, 1]
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.5
                    }}
                  >
                    Avg Temp: {Math.round((cpuTemp + gpuTemp) / 2)}°C
                  </motion.span>
                </div>
              </div>
            </div>
            
            {/* Right side - Status indicators */}
            <div className="space-y-3 text-[#02d8fc]">
              <HealthStat name="Work-Life Balance" value="Optimal" icon="🟢" />
              <HealthStat name="Coffee Level" value="85%" icon="☕" />
              <HealthStat name="Bug Count" value="Minimal" icon="🔧" />
              <HealthStat name="Stress Level" value="Low" icon="🧘‍♂️" />
              <HealthStat name="Motivation" value="Overclocked" icon="💯" />
              
              <div className="mt-3">
                <div className="flex justify-between mb-1">
                  <span>Overall Health</span>
                  <span>95%</span>
                </div>
                <div className="w-full bg-blue-900/20 h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '95%' }}
                    className="h-full bg-gradient-to-r from-[#02d8fc] to-[#0ff]"
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Main;
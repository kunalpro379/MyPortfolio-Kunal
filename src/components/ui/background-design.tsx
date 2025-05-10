import { useState, useEffect } from 'react';

const MathematicalCircuit = () => {
  const [animate, setAnimate] = useState(false);
  
  useEffect(() => {
    // Start animation after component mounts
    setAnimate(true);
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      <svg width="100%" height="100%" viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
        <defs>
          {/* Define gradient for glowing effect */}
          <linearGradient id="circuitGlow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#2563eb" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0.8" />
          </linearGradient>
          
          {/* Pulse animation for nodes */}
          <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="1" />
            <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0.6" />
          </radialGradient>
          
          {/* Circuit pattern with mathematical elements */}
          <pattern id="mathCircuit" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
            {/* Basic Circuit Lines */}
            <path d="M20,20 L80,20 M50,20 L50,50 M20,50 L80,50 M80,80 L120,80 M80,80 L80,120 
                     M20,120 L80,120 M20,80 L20,120 M120,120 L180,120 M120,120 L120,150 M120,80 L120,50
                     M120,50 L150,50 M150,50 L150,20 M150,20 L180,20 M180,20 L180,50"
                  stroke="url(#circuitGlow)" strokeWidth="1.5" fill="none" />
            
            {/* Mathematical symbols and formulas */}
            <text x="30" y="35" fill="#0ea5e9" fontSize="8">∫e^x</text>
            <text x="85" y="65" fill="#0ea5e9" fontSize="8">∇×B</text>
            <text x="140" y="35" fill="#0ea5e9" fontSize="8">∑1/n</text>
            <text x="35" y="105" fill="#0ea5e9" fontSize="8">d/dx</text>
            <text x="135" y="105" fill="#0ea5e9" fontSize="8">∛x</text>
            <text x="85" y="140" fill="#0ea5e9" fontSize="8">π²/6</text>
            <text x="140" y="170" fill="#0ea5e9" fontSize="8">λ=h/p</text>
            
            {/* Circuit Nodes */}
            <circle cx="50" cy="20" r="3" fill="url(#nodeGlow)" className={animate ? "animate-pulse" : ""} />
            <circle cx="20" cy="50" r="3" fill="url(#nodeGlow)" />
            <circle cx="80" cy="50" r="3" fill="url(#nodeGlow)" />
            <circle cx="120" cy="50" r="3" fill="url(#nodeGlow)" />
            <circle cx="150" cy="50" r="3" fill="url(#nodeGlow)" className={animate ? "animate-pulse" : ""} />
            <circle cx="20" cy="80" r="3" fill="url(#nodeGlow)" />
            <circle cx="80" cy="80" r="3" fill="url(#nodeGlow)" className={animate ? "animate-pulse" : ""} />
            <circle cx="120" cy="80" r="3" fill="url(#nodeGlow)" />
            <circle cx="20" cy="120" r="3" fill="url(#nodeGlow)" />
            <circle cx="80" cy="120" r="3" fill="url(#nodeGlow)" />
            <circle cx="120" cy="120" r="3" fill="url(#nodeGlow)" className={animate ? "animate-pulse" : ""} />
            <circle cx="180" cy="120" r="3" fill="url(#nodeGlow)" />
            <circle cx="120" cy="150" r="3" fill="url(#nodeGlow)" />
            
            {/* Sine Wave Circuit */}
            <path d="M20,180 C35,160 50,200 65,180 C80,160 95,200 110,180 C125,160 140,200 155,180 C170,160 185,200 200,180" 
                  stroke="#0ea5e9" strokeWidth="1.5" fill="none" />
            
            {/* Decorative elements */}
            <rect x="160" y="60" width="30" height="30" stroke="#0ea5e9" strokeWidth="1" fill="none" rx="2" />
            <circle cx="175" cy="75" r="10" stroke="#0ea5e9" strokeWidth="1" fill="none" />
          </pattern>
        </defs>
        
        {/* Main background with pattern */}
        <rect width="100%" height="100%" fill="url(#mathCircuit)" opacity="0.15" />
        
        {/* Animated data flow along main paths */}
        <g className={animate ? "animate-pulse" : ""}>
          <circle cx="400" cy="200" r="3" fill="#38bdf8" opacity="0.8">
            <animate attributeName="cx" from="100" to="700" dur="8s" repeatCount="indefinite" />
            <animate attributeName="cy" values="100;300;150;400;200" dur="8s" repeatCount="indefinite" />
          </circle>
          <circle cx="200" cy="300" r="3" fill="#38bdf8" opacity="0.8">
            <animate attributeName="cx" from="700" to="100" dur="7s" repeatCount="indefinite" />
            <animate attributeName="cy" values="400;200;350;150;400" dur="7s" repeatCount="indefinite" />
          </circle>
          <circle cx="500" cy="400" r="3" fill="#38bdf8" opacity="0.8">
            <animate attributeName="cx" from="300" to="600" dur="6s" repeatCount="indefinite" />
            <animate attributeName="cy" values="200;400;300;500;200" dur="6s" repeatCount="indefinite" />
          </circle>
        </g>
      </svg>
    </div>
  );
};

export default MathematicalCircuit;
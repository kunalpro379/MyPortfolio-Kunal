import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faMicrochip, 
  faMemory, 
  faHdd, 
  faTemperatureHalf,
  faUser,
  faCog,
  faFile,
  faEnvelope,
  faHome,
  faGamepad,
  faNewspaper,
  faBars,
  faXmark
} from '@fortawesome/free-solid-svg-icons';
import { useLocation } from 'react-router-dom';
import Background from '@/components/ui/Background';
import About from './About';
import Skills from './Skills';
import Resume from './Resume';
import Contact from './Contact';
import Main from './Main';
import Playground from './Playground';
import Blogs from './Blogs';
import useMobile from '@/hooks/use-mobile';

const Dashboard = () => {
  const location = useLocation();
  const { isMobile } = useMobile();
  const [showSidebar, setShowSidebar] = useState(!isMobile);
  const [currentTime, setCurrentTime] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [activeTab, setActiveTab] = useState('main'); // Add state for active tab
  
  // Add state for dynamic readings
  const [cpuFrequency, setCpuFrequency] = useState(3800);
  const [cpuTemp, setCpuTemp] = useState(44);
  const [cpuLoadPercent, setCpuLoadPercent] = useState(42);
  const [gpuFrequency, setGpuFrequency] = useState(2595);
  const [gpuTemp, setGpuTemp] = useState(49);
  const [gpuLoadPercent, setGpuLoadPercent] = useState(65);
  const [fanSpeed, setFanSpeed] = useState(1394);

  // Function to generate random value within a range
  const getRandomValue = (base: number, variance: number) => {
    return Math.floor(base + (Math.random() - 0.5) * variance);
  };

  // Update readings periodically
  useEffect(() => {
    const updateReadings = () => {
      setCpuFrequency(getRandomValue(3800, 400));
      setCpuTemp(getRandomValue(44, 8));
      setCpuLoadPercent(getRandomValue(42, 20));
      setGpuFrequency(getRandomValue(2595, 200));
      setGpuTemp(getRandomValue(49, 6));
      setGpuLoadPercent(getRandomValue(65, 25));
      setFanSpeed(getRandomValue(1394, 200));
    };

    const readingsInterval = setInterval(updateReadings, 2000);
    return () => clearInterval(readingsInterval);
  }, []);

  // Enhanced card animation variants
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

  // Update clock
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      const dateString = now.toLocaleDateString([], { year: 'numeric', month: 'numeric', day: 'numeric' });
      setCurrentTime(timeString);
      setCurrentDate(dateString);
    };

    updateClock();
    const timer = setInterval(updateClock, 1000);
    return () => clearInterval(timer);
  }, []);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  // Navigation handlers - updated to set active tab instead of navigating
  const handleNavigation = (tab: string) => {
    setActiveTab(tab);
    if (isMobile) {
      setShowSidebar(false); // Close sidebar on mobile after selection
    }
  };

  // Calculate the stroke dash offset for circular progress
  const cpuCircleRef = useRef<SVGCircleElement>(null);
  const cpuCircumference = 2 * Math.PI * 32; // 2πr where r is the radius of the circle

  // Calculate the stroke dash offset for circular progress (GPU)
  const gpuCircumference = 2 * Math.PI * 32;

  // Define the tabs configuration
  const tabs = [
    { id: 'main', path: '/', icon: faHome, label: 'Main' },
    { id: 'about', path: '/about', icon: faUser, label: 'About' },
    { id: 'skills', path: '/skills', icon: faCog, label: 'Skills' },
    { id: 'resume', path: '/resume', icon: faFile, label: 'Resume' },
    { id: 'playground', path: '/playground', icon: faGamepad, label: 'Playground' },
    { id: 'blogs', path: '/blogs', icon: faNewspaper, label: 'Blogs' },
    { id: 'contact', path: '/contact', icon: faEnvelope, label: 'Contact' }
  ];

  // Render the active tab content
  const renderTabContent = () => {
    switch (activeTab) {
      case 'main':
        return <Main />;
      case 'about':
        return <About />;
      case 'skills':
        return <Skills />;
      case 'resume':
        return <Resume />;
      case 'playground':
        return <Playground />;
      case 'blogs':
        return <Blogs />;
      case 'contact':
        return <Contact />;
      default:
        return <Main />;
    }
  };

  return (
    <div className="min-h-screen w-full overflow-hidden bg-[#011428]">
      {/* Background component */}
      <div className="fixed inset-0 z-0">
        <Background />
      </div>
      
      {/* Main content */}
      <div className="relative z-10 flex flex-col h-screen">
        {/* Header Bar */}
        <div className="cyber-header flex justify-between items-center py-3 md:py-4 px-3 md:px-6">
          <div className="flex items-center gap-2 md:gap-3">
            {/* Mobile menu toggle button */}
            <motion.button
              className="text-[#02d8fc] md:hidden p-2"
              onClick={toggleSidebar}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FontAwesomeIcon icon={showSidebar ? faXmark : faBars} />
            </motion.button>
            
            {/* Animated name with special styling */}
            <motion.div 
              className="relative"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                className="text-lg md:text-3xl font-bold"
                style={{
                  background: "linear-gradient(to right, #02d8fc, #00ff88, #02d8fc)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  fontFamily: "'Orbitron', sans-serif",
                  letterSpacing: "1px",
                  textShadow: "0 0 10px rgba(2, 216, 252, 0.5)"
                }}
                animate={{
                  textShadow: [
                    "0 0 4px rgba(2, 216, 252, 0.5)",
                    "0 0 8px rgba(2, 216, 252, 0.8)",
                    "0 0 4px rgba(2, 216, 252, 0.5)"
                  ]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                KunalPatil
              </motion.div>
              
              {/* Glitch effect */}
              <motion.div
                className="absolute inset-0 text-lg md:text-3xl font-bold text-[#ff0066] mix-blend-screen"
                style={{
                  fontFamily: "'Orbitron', sans-serif",
                  letterSpacing: "1px",
                }}
                animate={{
                  opacity: [0, 0.02, 0, 0.015, 0, 0.01, 0],
                  x: [-1, 1, 0, -1, 0],
                }}
                transition={{
                  duration: 0.5,
                  repeat: Infinity,
                  repeatDelay: Math.random() * 5 + 2
                }}
              >
                KunalPatil
              </motion.div>
              
              {/* Cyber underline */}
              <motion.div
                className="h-[2px] bg-gradient-to-r from-transparent via-[#02d8fc] to-transparent mt-1"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
              />
            </motion.div>
            
            <div className="text-sm md:text-2xl font-semibold text-[#02d8fc] hidden sm:block">UEFI BIOS Utility</div>
            <div className="text-[#02d8fc] ml-2 hidden lg:block">ⓘ</div>
          </div>
          <div className="flex items-center gap-2 md:gap-4">
            <div className="bg-sky-900/50 px-2 md:px-3 py-1 md:py-1.5 rounded text-[#02d8fc] text-xs md:text-base font-bold">v2.0.4</div>
            <div className="text-right">
              <div className="text-sm md:text-2xl font-bold text-[#02d8fc]">{currentTime}</div>
              <div className="text-xs text-[#02d8fc] text-right hidden sm:block">{currentDate}</div>
            </div>
          </div>
        </div>

        {/* Content Area with Sidebar */}
        <div className="flex flex-1 h-[calc(100vh-4rem)]">
          {/* Sidebar - with mobile responsive behavior */}
          <AnimatePresence>
            {(showSidebar || !isMobile) && (
              <motion.div 
                initial={isMobile ? { x: -250, opacity: 0 } : false}
                animate={{ 
                  x: 0, 
                  opacity: 1,
                  width: isMobile ? '100%' : 'auto'
                }}
                exit={isMobile ? { x: -250, opacity: 0 } : undefined}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 25
                }}
                className={`
                  ${isMobile ? 'fixed inset-0 z-30 bg-[#011428]/95' : 'relative'} 
                  md:block w-full md:w-60 flex-shrink-0 flex flex-col 
                  border-r-2 border-blue-900/30 h-full neon-border
                `}
              >
                {/* Mobile close button - visible only on mobile */}
                {isMobile && (
                  <div className="flex justify-end p-4">
                    <motion.button
                      onClick={toggleSidebar}
                      whileTap={{ scale: 0.9 }}
                      className="text-[#02d8fc] text-xl"
                    >
                      <FontAwesomeIcon icon={faXmark} />
                    </motion.button>
                  </div>
                )}
                
                {/* Sidebar tabs */}
                <div className="flex flex-col py-4">
                  {tabs.map((tab) => (
                    <motion.div 
                      key={tab.id}
                      whileHover={{ backgroundColor: "rgba(2, 216, 252, 0.1)" }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleNavigation(tab.id)}
                      className={`py-4 px-6 flex items-center gap-3 cursor-pointer ${
                        activeTab === tab.id ? 'bg-[#061429] border-l-4 border-[#02d8fc]' : ''
                      }`}
                    >
                      {tab.id === 'main' ? (
                        <div className="text-[#02d8fc] text-lg">❯</div>
                      ) : (
                        <div className="w-4"></div>
                      )}
                      <motion.div 
                        whileHover={{ 
                          scale: 1.2,
                          rotate: tab.icon === faCog ? 180 : tab.id === 'main' ? 360 : 0 
                        }}
                        transition={{ duration: 0.3 }}
                        className="text-[#02d8fc] text-xl"
                      >
                        <FontAwesomeIcon icon={tab.icon} />
                      </motion.div>
                      {/* Show text always on mobile, or when sidebar is expanded */}
                      <div className="font-medium text-[#02d8fc] text-lg">
                        {tab.label}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Mobile menu button - visible when sidebar is closed */}
          {isMobile && !showSidebar && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed bottom-4 left-4 z-30 bg-[#02d8fc]/20 text-[#02d8fc] p-3 rounded-full"
              onClick={toggleSidebar}
            >
              <FontAwesomeIcon icon={faBars} />
            </motion.button>
          )}
          
          {/* Main Content Area */}
          <div className={`flex-1 flex flex-col overflow-auto ${isMobile && showSidebar ? 'hidden' : 'block'}`}>
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
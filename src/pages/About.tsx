import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const CyberBiosAbout = () => {
  const [bootComplete, setBootComplete] = useState(false);
  const [bootProgress, setBootProgress] = useState(0);
  const [typeIndex, setTypeIndex] = useState(0);
  const [glitchActive, setGlitchActive] = useState(false);
  const [scanLinePosition, setScanLinePosition] = useState(0);

  const bioText = "I'm a backend-focused developer with strong expertise in Flutter, Node.js, system design, and AWS. My skills span across backend technologies, DevOps, and deployment, with a focus on building scalable, high-performance systems. I specialize in Node.js, Express.js, and MongoDB, delivering real-time and robust solutions. I have extensive experience with real - time communication systems using WebSockets and Socket.IO and have worked on projects like live chat systems and live-streaming platforms.I'm also proficient in machine learning and deep learning, leveraging these technologies for AI - powered solutions such as content recommendations and intelligent search features. In the realm of DevOps, I manage the deployment lifecycle using tools like Docker, Kubernetes, CI/CD pipelines, and AWS to ensure streamlined processes and scalable applications. I design systems that emphasize performance, scalability, and fault tolerance, always considering the long-term sustainability of the architecture.";
  const bioText2 = "              I'm currently exploring the potential of generative AI to build innovative applications and push boundaries in real-time user experiences. From building cloud-native applications to deploying production-ready solutions on AWS, I'm dedicated to creating efficient, reliable, and high-impact technologies that solve real-world problems.";

  // Boot sequence animation
  useEffect(() => {
    const timer = setTimeout(() => setBootComplete(true), 3000);
    const interval = setInterval(() => {
      setBootProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  // Typewriter effect
  useEffect(() => {
    if (bootComplete && typeIndex < bioText.length) {
      const timer = setTimeout(() => {
        setTypeIndex(prev => prev + 1);
      }, 30);
      return () => clearTimeout(timer);
    }
  }, [bootComplete, typeIndex, bioText]);

  // Random glitch effects
  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 150);
    }, Math.random() * 3000 + 2000);

    return () => clearInterval(glitchInterval);
  }, []);

  // Scan line animation
  useEffect(() => {
    const scanInterval = setInterval(() => {
      setScanLinePosition(prev => (prev + 1) % 100);
    }, 50);

    return () => clearInterval(scanInterval);
  }, []);

  // Lightning effect animation variants
  const lightningVariants = {
    initial: { opacity: 0, scale: 0 },
    animate: {
      opacity: [0, 1, 0],
      scale: [0, 1, 0],
      transition: {
        duration: 0.7,
        repeat: Infinity,
        repeatDelay: Math.random() * 5 + 3
      }
    }
  };

  // Profile photo animation variants
  const profilePhotoVariants = {
    initial: { scale: 1 },
    animate: {
      scale: [1, 1.02, 1],
      rotate: [0, 1, -1, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        repeatType: "mirror" as const
      }
    }
  };

  return (
    <div className="min-h-screen w-full bg-black text-cyan-400 font-mono p-4 relative overflow-x-hidden">
      {/* Scan lines effect */}
      <div
        className="pointer-events-none fixed inset-0 z-50 bg-scan-lines"
        style={{
          background: `linear-gradient(to bottom, 
            transparent 0%, 
            rgba(6, 182, 212, 0.1) ${scanLinePosition}%, 
            transparent ${scanLinePosition + 2}%, 
            transparent 100%)`
        }}
      />

      {/* CRT screen edge effect */}
      <div className="pointer-events-none fixed inset-0 z-40 rounded-lg box-border border-8 border-gray-900 opacity-50"></div>

      {/* Random glitch overlay */}
      {glitchActive && (
        <div className="fixed inset-0 bg-cyan-400 opacity-10 z-30"></div>
      )}

      {/* Boot screen */}
      {!bootComplete && (
        <div className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-black">
          <div className="w-full max-w-md">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-4"
            >
              <div className="flex items-center justify-between">
                <div className="text-cyan-400 text-2xl font-bold">NEURAL BIOS v7.3</div>
                <div className="text-cyan-400 text-sm">SYS_INIT</div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.5 } }}
              className="mb-6"
            >
              <p className="text-green-400">[SYS] Initializing neural interface...</p>
              <p className="text-green-400">[SYS] Loading core parameters...</p>
              <p className="text-pink-400">[SEC] Verifying user identity: <span className="text-cyan-400">KUNAL PATIL</span></p>
              <p className="text-yellow-400">[MEM] Allocating resources for BIO section...</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 1 } }}
              className="mb-4"
            >
              <div className="text-sm mb-1 flex justify-between">
                <span>LOADING BIO MODULE</span>
                <span>{bootProgress}%</span>
              </div>
              <div className="w-full h-2 bg-gray-800 overflow-hidden">
                <motion.div
                  className="h-full bg-cyan-400"
                  initial={{ width: 0 }}
                  animate={{ width: `${bootProgress}%` }}
                  transition={{ duration: 0.1 }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      )}

      {/* Main content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: bootComplete ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 max-w-7xl mx-auto"
      >
        {/* Header with BIOS-style title */}
        <div className="text-xl md:text-3xl font-semibold text-cyan-400 border-b-2 border-cyan-800 pb-3 md:pb-4 mb-6 relative flex items-center gap-4">
          <div className="flex items-center">
            <motion.div
              animate={{
                opacity: [1, 0.7, 1],
                scale: [1, 1.05, 1]
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-green-400 text-lg md:text-2xl font-mono mr-3"
            >
              [BIO]
            </motion.div>
            <span className="relative">
              About Kunal Patil
              <motion.span
                className="absolute -bottom-1 left-0 w-full h-0.5 bg-cyan-400"
                animate={{
                  scaleX: [0, 1, 1, 0],
                  x: ['-100%', '0%', '0%', '100%']
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "loop"
                }}
              />
            </span>
          </div>
          <span className="text-xs md:text-base text-green-400 ml-auto">BIOS Version: 4.7.21</span>
        </div>

        {/* Main content with cyber card */}
        <motion.div
          className="bg-black border border-cyan-700 p-4 md:p-6 relative mb-8"
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {/* Corner decorations */}
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan-400"></div>
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyan-400"></div>
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-cyan-400"></div>
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan-400"></div>

          {/* Lightning effects */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={`lightning-${i}`}
              className="absolute w-1 h-16 bg-cyan-400 rounded-full"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                rotate: `${Math.random() * 90 - 45}deg`,
                opacity: 0.6,
                boxShadow: '0 0 10px #02d8fc, 0 0 20px #02d8fc'
              }}
              variants={lightningVariants}
              initial="initial"
              animate="animate"
              custom={i}
            />
          ))}

          {/* Energy dots */}
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={`dot-${i}`}
              className="absolute w-2 h-2 rounded-full"
              style={{
                backgroundColor: i % 3 === 0 ? '#02d8fc' : i % 3 === 1 ? '#00ff88' : '#ff79c6',
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                scale: [0, 1.5, 0],
                opacity: [0, 0.8, 0],
                boxShadow: [
                  '0 0 0px rgba(0,0,0,0)',
                  `0 0 20px ${i % 3 === 0 ? '#02d8fc' : i % 3 === 1 ? '#00ff88' : '#ff79c6'}`,
                  '0 0 0px rgba(0,0,0,0)'
                ]
              }}
              transition={{
                duration: 1 + (Math.random() * 2),
                repeat: Infinity,
                repeatDelay: 2 + (Math.random() * 5),
                delay: i * 0.3
              }}
            />
          ))}

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Profile Image */}
            <div className="flex flex-col items-center">
              <motion.div
                className="relative w-40 h-40"
                variants={profilePhotoVariants}
                initial="initial"
                animate="animate"
              >
                <motion.div
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 to-pink-500 blur-lg opacity-30"
                  animate={{
                    opacity: [0.3, 0.6, 0.3],
                    scale: [1, 1.05, 1],
                    rotate: [0, 180, 360]
                  }}
                  transition={{ duration: 5, repeat: Infinity }}
                />
                <div className="absolute inset-0 rounded-full border-4 border-cyan-700 overflow-hidden">
                  <motion.img
                    src="/picofme.png"
                    alt="Profile"
                    className="w-full h-full object-cover"
                    animate={{
                      scale: [1, 1.1, 1],
                      filter: [
                        'brightness(1) contrast(1)',
                        'brightness(1.2) contrast(1.1)',
                        'brightness(1) contrast(1)'
                      ]
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                  />
                </div>
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-cyan-400"
                  animate={{
                    rotate: 360,
                    borderColor: ['#06b6d4', '#00ff88', '#06b6d4']
                  }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-green-400"
                  animate={{
                    rotate: -360,
                    borderColor: ['#00ff88', '#06b6d4', '#00ff88']
                  }}
                  transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                />
                {/* Hexagon overlay */}
                <motion.div
                  className="absolute inset-0"
                  style={{
                    background: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M50 0L93.3 25V75L50 100L6.7 75V25L50 0Z\' fill=\'none\' stroke=\'%2306b6d4\' stroke-width=\'1\'/%3E%3C/svg%3E")',
                    backgroundSize: 'cover',
                    opacity: 0.5
                  }}
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ duration: 10, repeat: Infinity }}
                />
              </motion.div>

              <motion.div
                className="mt-4 bg-cyan-900/20 border border-cyan-700 py-2 px-4 w-full text-center"
                animate={{
                  borderColor: ['#0e7490', '#06b6d4', '#0e7490'],
                  boxShadow: [
                    '0 0 0px rgba(6, 182, 212, 0)',
                    '0 0 10px rgba(6, 182, 212, 0.3)',
                    '0 0 0px rgba(6, 182, 212, 0)'
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="text-xs text-cyan-600 mb-1">STATUS</div>
                <div className="flex items-center justify-center text-green-400 text-sm">
                  <motion.div
                    className="w-2 h-2 rounded-full bg-green-400 mr-2"
                    animate={{
                      opacity: [1, 0.4, 1],
                      scale: [1, 1.2, 1]
                    }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                  ONLINE
                </div>
              </motion.div>
            </div>

            {/* User Info */}
            <div className="md:col-span-2 space-y-4">
              <div className="flex flex-col md:flex-row md:items-center gap-2 justify-between">
                <motion.h2
                  className="text-2xl md:text-3xl font-bold text-cyan-400 font-mono tracking-widest flex items-center gap-2"
                  animate={{
                    textShadow: ['0 0 5px rgba(6, 182, 212, 0.3)', '0 0 20px rgba(6, 182, 212, 0.7)', '0 0 5px rgba(6, 182, 212, 0.3)']
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <span className="text-green-400 text-lg">ID:</span> Kunal Patil
                </motion.h2>
                <motion.span
                  className="bg-green-400/10 text-green-400 px-4 py-1 border border-green-400/40 font-mono text-sm"
                  animate={{
                    backgroundColor: ['rgba(34, 197, 94, 0.1)', 'rgba(34, 197, 94, 0.2)', 'rgba(34, 197, 94, 0.1)']
                  }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  AI Engineer
                </motion.span>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="border border-cyan-700 p-3">
                  <div className="text-xs text-cyan-600 mb-2">CLASS TYPE</div>
                  <div className="flex gap-2 flex-wrap">
                    <span className="bg-cyan-900/30 text-cyan-400 px-2 py-1 text-xs border border-cyan-700">AI & ML</span>
                    <span className="bg-cyan-900/30 text-cyan-400 px-2 py-1 text-xs border border-cyan-700">MOBILE</span>
                    <span className="bg-cyan-900/30 text-cyan-400 px-2 py-1 text-xs border border-cyan-700">BACKEND</span>
                  </div>
                </div>
                <div className="border border-cyan-700 p-3">
                  <div className="text-xs text-cyan-600 mb-2">EDUCATION</div>
                  <div className="text-sm">B.E. Computer Science</div>
                  <div className="text-xs text-cyan-600 mt-1">VESIT Mumbai, 2022-2026</div>
                </div>
              </div>

              <div className="border border-cyan-700 p-3">
                <div className="flex justify-between items-center mb-2">
                  <div className="text-xs text-cyan-600">SYSTEMS</div>
                  <motion.div
                    className="text-xs border border-cyan-900 px-2"
                    animate={{
                      borderColor: ['rgba(8, 145, 178, 0.6)', 'rgba(8, 145, 178, 1)', 'rgba(8, 145, 178, 0.6)']
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    SKILLS.DAT
                  </motion.div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { name: 'Flutter', level: 90 },
                    { name: 'Node.js', level: 85 },
                    { name: 'AWS', level: 80 },
                    { name: 'MongoDB', level: 75 }
                  ].map((skill, i) => (
                    <div key={i} className="mb-1">
                      <div className="flex justify-between text-xs mb-1">
                        <span>{skill.name}</span>
                        <span>{skill.level}%</span>
                      </div>
                      <div className="w-full bg-cyan-900/30 h-1">
                        <motion.div
                          className="bg-cyan-400 h-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.level}%` }}
                          transition={{ duration: 1, delay: 0.1 * i + 0.5 }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bio Text */}
        <div className="mt-6 border border-cyan-700 p-4 relative overflow-hidden mb-8">
          <div className="flex justify-between items-center mb-2">
            <div className="text-xs text-cyan-600">BIO DATA</div>
            <motion.div
              className="text-xs border border-pink-600 px-2 text-pink-400"
              animate={{
                borderColor: ['rgba(219, 39, 119, 0.6)', 'rgba(219, 39, 119, 1)', 'rgba(219, 39, 119, 0.6)']
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              SECURE
            </motion.div>
          </div>

          <div className="font-mono text-sm leading-relaxed text-cyan-300">
            <span className="text-green-400 mr-1">&gt;</span>
            {bioText.substring(0, typeIndex)}
            <motion.span
              className="inline-block w-2 h-4 bg-green-400 ml-1"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.8, repeat: Infinity }}
            />
          </div>

          {typeIndex >= bioText.length && (
            <motion.div
              className="font-mono text-sm leading-relaxed text-pink-400 mt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <span className="text-green-400 mr-1">&gt;</span>
              {bioText2}
            </motion.div>
          )}

          {/* Terminal background lines */}
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute left-0 right-0 h-px bg-cyan-900/30"
              style={{ top: `${(i + 1) * 20}%` }}
            />
          ))}
        </div>

        {/* Interests */}
        <div className="mt-6 border border-cyan-700 p-4 mb-8">
          <div className="text-xs text-cyan-600 mb-2">INTERESTS</div>
          <div className="flex flex-wrap gap-2">
            {[
              'AI & Machine Learning',
              'Mobile App Development',
              'C++ System Level',
              'Java Backend',
              'GenAI Explorer'
            ].map((interest, i) => (
              <motion.span
                key={i}
                className="bg-cyan-900/30 text-cyan-400 px-3 py-1 text-xs border border-cyan-800"
                whileHover={{ backgroundColor: 'rgba(8, 145, 178, 0.4)', borderColor: '#06b6d4' }}
                animate={{
                  boxShadow: ['0 0 0px rgba(6, 182, 212, 0)', '0 0 10px rgba(6, 182, 212, 0.3)', '0 0 0px rgba(6, 182, 212, 0)']
                }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
              >
                {interest}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Footer */}
        <motion.div
          className="mt-6 pt-2 flex flex-col md:flex-row justify-between text-xs text-cyan-600 border-t border-cyan-900 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <div className="mb-2 md:mb-0">PRESS F1 FOR HELP | ESC TO EXIT</div>
          <motion.div
            animate={{
              color: ['rgb(8, 145, 178)', 'rgb(6, 182, 212)', 'rgb(8, 145, 178)']
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            SYSTEM STATUS: NOMINAL
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default CyberBiosAbout;
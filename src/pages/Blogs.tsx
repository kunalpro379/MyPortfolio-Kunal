import React from 'react';
import Background from '@/components/ui/Background';
import useMobile from '@/hooks/use-mobile';
import { motion } from 'framer-motion';
import CardDots from '@/components/ui/CardDots';

const Blogs = () => {
  const { isMobile } = useMobile();

  return (
    <div className="min-h-screen w-full p-3 md:p-6 relative overflow-auto">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 to-purple-900/10 animate-pulse pointer-events-none" />

      <div className="text-xl md:text-3xl font-semibold text-[#02d8fc] border-b-2 border-blue-900/30 pb-3 md:pb-4 mb-4 md:mb-6 relative flex items-center gap-4">
        <span className="relative flex items-center gap-2">
          <span className="text-[#00ff88] text-lg md:text-2xl font-mono animate-pulse">[SYS]</span>
          About Me
          <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-[#02d8fc] animate-[glitch_2s_infinite]" />
        </span>
        <span className="text-xs md:text-base text-[#00ff88]/80 font-mono ml-2">BIOS Utility v2.0.4</span>
      </div>

      <motion.div
        className="cyber-card p-4 md:p-8 relative"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 via-purple-900/20 to-blue-900/20 animate-gradient pointer-events-none" />
        <CardDots />

        {/* Lightning effects */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-1 h-16 bg-[#ff79c6] rounded-full"
          animate={{
            opacity: [0, 1, 0],
            height: [0, 16, 0],
            rotate: [0, 15, 0]
          }}
          transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 3.7 }}
        />
        <motion.div
          className="absolute top-1/3 right-1/3 w-1 h-24 bg-[#00ff88] rounded-full"
          animate={{
            opacity: [0, 1, 0],
            height: [0, 24, 0],
            rotate: [0, -20, 0]
          }}
          transition={{ duration: 0.7, repeat: Infinity, repeatDelay: 2.5 }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-1 h-20 bg-[#02d8fc] rounded-full"
          animate={{
            opacity: [0, 1, 0],
            height: [0, 20, 0],
            rotate: [0, 30, 0]
          }}
          transition={{ duration: 0.4, repeat: Infinity, repeatDelay: 4.2 }}
        />

        {/* Small lightning focus points */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`lightning-${i}`}
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
              duration: 0.8 + (Math.random() * 1.2),
              repeat: Infinity,
              repeatDelay: 1 + (Math.random() * 4),
              ease: 'easeInOut',
              delay: i * 0.5
            }}
          />
        ))}

        <div className="relative z-10 space-y-6">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            {/* Cyber Avatar with Profile Image - FIXED POSITIONING */}
            {/* 
            <div className="relative w-36 h-36 md:w-56 md:h-56 flex items-center justify-center mt-4">
            <motion.div
              className="absolute inset-0 rounded-full blur-2xl"
              style={{ background: 'radial-gradient(circle, #02d8fc 40%, transparent 70%)' }}
              animate={{ opacity: [0.3, 0.7, 0.3], scale: [1, 1.1, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            />

            <motion.div
              className="absolute inset-0 rounded-full border-4 border-[#02d8fc]"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
              style={{ boxShadow: '0 0 24px #02d8fc80, 0 0 8px #00ff88' }}
            />

            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-3 h-3 rounded-full"
                style={{
                  backgroundColor: i % 2 === 0 ? '#02d8fc' : '#00ff88',
                  top: `${50 + 44 * Math.sin((i * Math.PI) / 3)}%`,
                  left: `${50 + 44 * Math.cos((i * Math.PI) / 3)}%`,
                  boxShadow: '0 0 8px #02d8fc, 0 0 2px #00ff88',
                }}
                animate={{ scale: [1, 1.5, 1], opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.2, ease: 'easeInOut' }}
              />
            ))}

            <motion.div
              className="absolute inset-4 rounded-full border-2 border-[#00ff88]"
              animate={{ scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />



            <motion.div
              className="absolute left-0 right-0 h-1 bg-[#02d8fc]/60 rounded-full"
              style={{ top: '50%' }}
              animate={{ y: [-40, 40, -40] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            />

            <motion.div
              className="absolute top-1/2 left-1/2 w-1 h-16 bg-[#02d8fc] -translate-x-1/2 -translate-y-1/2"
              animate={{
                rotate: [0, 90, 180, 270, 360],
                opacity: [0, 0.8, 0],
                height: [0, 16, 0],
              }}
              transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 4 }}
              style={{ boxShadow: '0 0 10px #02d8fc, 0 0 15px #02d8fc' }}
            />
          </div> 
            */}
            <div className="absolute w-full">
              <div className="relative w-28 h-28 md:w-40 md:h-40 mx-auto -top-20 md:-top-24">
                <img
                  src="/picofme.png"
                  alt="Profile"
                  className="w-full h-full object-cover rounded-full border-4 border-[#ff79c6] shadow-lg shadow-[#02d8fc]/30 z-20 relative animate-[pulse_2s_infinite]"
                  draggable="false"
                />
                {/* Additional colored glow for the profile image */}
                <motion.div
                  className="absolute inset-0 rounded-full blur-xl"
                  style={{ background: 'radial-gradient(circle, #ff79c6 30%, #02d8fc 70%, transparent 90%)' }}
                  animate={{ opacity: [0.4, 0.8, 0.4], scale: [0.9, 1.1, 0.9] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                />

                {/* Lightning effect 1 for profile image */}
                <motion.div
                  className="absolute -bottom-4 -right-2 w-1 h-12 bg-[#ff79c6] rotate-45 rounded-full"
                  animate={{ opacity: [0, 1, 0], height: [0, 12, 0] }}
                  transition={{ duration: 0.3, repeat: Infinity, repeatDelay: 2.7 }}
                  style={{ boxShadow: '0 0 8px #ff79c6, 0 0 12px #ff79c6' }}
                />

                {/* Lightning effect 2 for profile image */}
                <motion.div
                  className="absolute -top-2 -left-4 w-1 h-10 bg-[#00ff88] -rotate-30 rounded-full"
                  animate={{ opacity: [0, 1, 0], height: [0, 10, 0] }}
                  transition={{ duration: 0.4, repeat: Infinity, repeatDelay: 3.5 }}
                  style={{ boxShadow: '0 0 8px #00ff88, 0 0 12px #00ff88' }}
                />
              </div>
            </div>

            {/* Cyber Info Panel */}
            <div className="flex-1 space-y-2 text-center md:text-left">
              <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 justify-center md:justify-start">
                <h2 className="text-2xl md:text-3xl font-bold text-[#02d8fc] font-mono tracking-widest flex items-center gap-2">
                  <span className="text-[#00ff88] text-lg animate-pulse">[ID]</span> Kunal Patil
                </h2>
                <span className="bg-[#00ff88]/20 text-[#00ff88] px-3 py-1 rounded font-mono text-xs md:text-sm border border-[#00ff88]/40 shadow shadow-[#00ff88]/20 animate-pulse">AI Engineer</span>
              </div>
              <div className="flex flex-wrap gap-2 justify-center md:justify-start mt-2">
                <span className="bg-blue-900/50 text-[#02d8fc] px-2 py-1 rounded text-xs font-mono border border-[#02d8fc]/30 shadow shadow-[#02d8fc]/10">AI & Machine Learning</span>
                <span className="bg-blue-900/50 text-[#02d8fc] px-2 py-1 rounded text-xs font-mono border border-[#02d8fc]/30 shadow shadow-[#02d8fc]/10">Mobile App Development</span>
                <span className="bg-blue-900/50 text-[#02d8fc] px-2 py-1 rounded text-xs font-mono border border-[#02d8fc]/30 shadow shadow-[#02d8fc]/10">C++ System Level</span>
                <span className="bg-blue-900/50 text-[#02d8fc] px-2 py-1 rounded text-xs font-mono border border-[#02d8fc]/30 shadow shadow-[#02d8fc]/10">Java Backend</span>
                <span className="bg-blue-900/50 text-[#02d8fc] px-2 py-1 rounded text-xs font-mono border border-[#02d8fc]/30 shadow shadow-[#02d8fc]/10">GenAI Explorer</span>
              </div>
              <div className="mt-3 bg-blue-900/30 border border-[#02d8fc]/30 rounded-lg p-3 shadow shadow-[#02d8fc]/10 text-[#02d8fc] font-mono text-sm text-left animate-[glitch_2s_infinite]">
                <span className="text-[#00ff88]">[SYS]</span> <span className="text-[#ff79c6]">BIOS</span> <span className="text-[#02d8fc]">User Profile Loaded</span>
              </div>
            </div>
          </div>

          {/* Cyber Biography Panel */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-blue-900/30 border border-[#02d8fc]/30 rounded-lg p-4 shadow shadow-[#02d8fc]/10">
              <h3 className="text-lg font-semibold text-[#02d8fc] mb-2 font-mono flex items-center gap-2">
                <span className="text-[#00ff88]">[BIO]</span> Biography
              </h3>
              <p className="text-blue-200 font-mono text-sm leading-relaxed">
                Backend-focused developer with strong expertise in <span className="text-[#00ff88]">Flutter</span>, <span className="text-[#00ff88]">Node.js</span>, system design, and <span className="text-[#00ff88]">AWS</span>. Skilled in backend technologies, DevOps, and deployment, building scalable, high-performance systems. Specializes in <span className="text-[#02d8fc]">Node.js</span>, <span className="text-[#02d8fc]">Express.js</span>, and <span className="text-[#02d8fc]">MongoDB</span>, delivering real-time, robust solutions.<br /><br />
                <span className="text-[#ff79c6]">Currently exploring</span> generative AI to build innovative applications and push boundaries in real-time user experiences. From cloud-native apps to production-ready AWS deployments, dedicated to creating efficient, reliable, and high-impact technologies for real-world problems.
              </p>
            </div>
            <div className="bg-blue-900/30 border border-[#02d8fc]/30 rounded-lg p-4 shadow shadow-[#02d8fc]/10">
              <h3 className="text-lg font-semibold text-[#02d8fc] mb-2 font-mono flex items-center gap-2">
                <span className="text-[#00ff88]">[EDU]</span> Education
              </h3>
              <div className="border-l-2 border-[#02d8fc] pl-4 py-1 hover:bg-blue-900/20 transition-colors">
                <p className="text-white font-medium font-mono">Bachelor of Engineering in Computer Science</p>
                <p className="text-blue-300 font-mono">VESIT Mumbai, 2022-2026</p>
              </div>
              <h3 className="text-lg font-semibold text-[#02d8fc] mt-4 mb-2 font-mono flex items-center gap-2">
                <span className="text-[#00ff88]">[INT]</span> Interests
              </h3>
              <div className="flex flex-wrap gap-2 mt-1">
                <span className="bg-blue-900/50 text-[#00ff88] px-3 py-1 rounded-full text-xs font-mono border border-[#00ff88]/30 shadow shadow-[#00ff88]/10">AI & Machine Learning</span>
                <span className="bg-blue-900/50 text-[#00ff88] px-3 py-1 rounded-full text-xs font-mono border border-[#00ff88]/30 shadow shadow-[#00ff88]/10">Mobile App Development</span>
                <span className="bg-blue-900/50 text-[#00ff88] px-3 py-1 rounded-full text-xs font-mono border border-[#00ff88]/30 shadow shadow-[#00ff88]/10">C++ System Level</span>
                <span className="bg-blue-900/50 text-[#00ff88] px-3 py-1 rounded-full text-xs font-mono border border-[#00ff88]/30 shadow shadow-[#00ff88]/10">Java Backend</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div >
    </div >
  );
};

export default Blogs;
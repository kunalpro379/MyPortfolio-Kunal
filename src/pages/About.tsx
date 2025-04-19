import React from 'react';
import Background from '@/components/ui/Background';
import useMobile from '@/hooks/use-mobile';
import { motion } from 'framer-motion';
import CardDots from '@/components/ui/CardDots';

const About = () => {
  const { isMobile } = useMobile();
  
  return (
    <div className="min-h-screen w-full p-3 md:p-6">
      <div className="text-xl md:text-3xl font-semibold text-[#02d8fc] border-b-2 border-blue-900/30 pb-3 md:pb-4 mb-4 md:mb-6">
        About Me
      </div>
      
      <motion.div 
        className="cyber-card p-4 md:p-8 relative"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <CardDots />
        <div className="relative z-10 space-y-4">
          <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-center">
            <div className="w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden border-2 border-[#02d8fc] shadow-lg shadow-[#02d8fc]/20">
              <motion.div 
                className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600"
                animate={{ 
                  background: ['linear-gradient(135deg, #0066ff, #02d8fc)', 'linear-gradient(225deg, #02d8fc, #0066ff)'],
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
            </div>
            
            <div className="space-y-2 text-center md:text-left">
              <h2 className="text-2xl md:text-3xl font-bold text-[#02d8fc]">Kunal Patil</h2>
              <p className="text-blue-300 text-lg">Full Stack Developer & Designer</p>
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                <span className="bg-blue-900/30 text-[#02d8fc] px-2 py-1 rounded text-xs">Flutter</span>
                <span className="bg-blue-900/30 text-[#02d8fc] px-2 py-1 rounded text-xs">React</span>
                <span className="bg-blue-900/30 text-[#02d8fc] px-2 py-1 rounded text-xs">Node.js</span>
                <span className="bg-blue-900/30 text-[#02d8fc] px-2 py-1 rounded text-xs">UI/UX</span>
                <span className="bg-blue-900/30 text-[#02d8fc] px-2 py-1 rounded text-xs">AI Integration</span>
              </div>
            </div>
          </div>
          
          <div className="mt-6">
            <h3 className="text-xl font-semibold text-[#02d8fc] mb-3">Biography</h3>
            <p className="text-blue-300 mb-4">
              I am a passionate Full Stack Developer with expertise in Flutter, React, and modern web technologies.
              Currently studying at VESIT Mumbai, I specialize in creating responsive and intuitive user interfaces
              with a focus on performance and accessibility.
            </p>
            <p className="text-blue-300">
              With a background in both front-end and back-end development, I bring a holistic approach to
              software engineering. I'm particularly interested in AI integration, real-time applications,
              and creating seamless user experiences across platforms.
            </p>
          </div>
          
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-xl font-semibold text-[#02d8fc] mb-3">Education</h3>
              <div className="space-y-3">
                <div className="border-l-2 border-[#02d8fc] pl-4 py-1">
                  <p className="text-white font-medium">Bachelor of Engineering in Computer Science</p>
                  <p className="text-blue-300">VESIT Mumbai, 2022-2026</p>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-[#02d8fc] mb-3">Interests</h3>
              <div className="flex flex-wrap gap-2">
                <span className="bg-blue-900/30 text-[#00ff88] px-3 py-1 rounded-full text-sm">AI & Machine Learning</span>
                <span className="bg-blue-900/30 text-[#00ff88] px-3 py-1 rounded-full text-sm">Mobile App Development</span>
                <span className="bg-blue-900/30 text-[#00ff88] px-3 py-1 rounded-full text-sm">UI/UX Design</span>
                <span className="bg-blue-900/30 text-[#00ff88] px-3 py-1 rounded-full text-sm">Web3</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default About;
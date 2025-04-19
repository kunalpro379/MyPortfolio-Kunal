import React from 'react';
import { motion } from 'framer-motion';
import Background from '@/components/ui/Background';
import CardDots from '@/components/ui/CardDots';

const Resume = () => {
  return (
    <div className="min-h-screen w-full p-3 md:p-6">
      <div className="fixed inset-0 z-0">
        <Background />
      </div>
      <div className="relative z-10">
        <div className="text-xl md:text-3xl font-semibold text-[#02d8fc] border-b-2 border-blue-900/30 pb-3 md:pb-4 mb-4 md:mb-6">
          Resume
        </div>

        <motion.div 
          className="cyber-card p-8 flex items-center justify-center text-center text-[#02d8fc] text-2xl font-semibold"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <CardDots />
          <div className="relative z-10">
            🚧 Coming Soon 🚧
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Resume;

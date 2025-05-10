import React from 'react';
import Background from '@/components/ui/Background';
import useMobile from '@/hooks/use-mobile';
import { motion } from 'framer-motion';
import CardDots from '@/components/ui/CardDots';

const Resume = () => {
  const { isMobile } = useMobile();

  return (
    <div className="min-h-screen w-full p-3 md:p-6">
      <div className="text-xl md:text-3xl font-semibold text-[#02d8fc] border-b-2 border-blue-900/30 pb-3 md:pb-4 mb-4 md:mb-6">
        Will be updated soon      </div>


    </div>
  );
};

export default Resume;
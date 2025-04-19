import React from 'react';
import Background from '@/components/ui/Background';

const Playground = () => {
  return (
    <div className="min-h-screen w-full overflow-hidden">
      <div className="fixed inset-0 z-0">
        <Background />
      </div>
      <div className="relative z-10 p-6">
        <h1 className="text-3xl font-semibold neon-text border-b-2 border-blue-900/30 pb-4 mb-6">
          Playground
        </h1>
        <div className="cyber-card p-8">
          {/* Content will be added later */}
          <p className="text-[#02d8fc]">Playground content coming soon...</p>
        </div>
      </div>
    </div>
  );
};

export default Playground;
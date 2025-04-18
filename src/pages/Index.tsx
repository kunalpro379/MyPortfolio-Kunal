
const Index = () => {
  return (
    <main className="relative w-screen h-screen overflow-hidden bg-[hsl(var(--background))]">
      {/* Animated Grid Background - Multiple animated layers */}
      <div className="fixed inset-0 w-full h-full">
        <div className="absolute inset-0 grid-pattern animate-grid opacity-30"></div>
        <div className="absolute inset-0 grid-pattern animate-grid opacity-30" style={{ animationDelay: '-2s', transform: 'scale(1.5) rotate(45deg)' }}></div>
        <div className="absolute inset-0 grid-pattern animate-grid opacity-30" style={{ animationDelay: '-4s', transform: 'scale(2) rotate(-45deg)' }}></div>
      </div>

      {/* Main Content - Centered with reduced KP size */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {/* KP Logo with reduced size and 3D effects */}
        <div className="text-[11rem] font-black animate-float perspective-3d">
          <span className="block text-[hsl(var(--text-primary))] animate-glitch mix-blend-difference transform-gpu hover:scale-110 transition-transform duration-300 ease-in-out">
            KP
          </span>
          <span className="absolute top-0 left-0 text-[hsl(var(--text-secondary))] animate-glitch mix-blend-difference transform-gpu translate-z-12" style={{ clipPath: 'inset(0 0 50% 0)', transform: 'translateZ(50px)' }}>
            KP
          </span>
          <span className="absolute top-0 left-0 text-[hsl(var(--text-primary))] animate-glitch mix-blend-difference transform-gpu -translate-z-12" style={{ clipPath: 'inset(50% 0 0 0)', transform: 'translateZ(-50px)' }}>
            KP
          </span>
        </div>

        {/* Loading Text - Centered */}
        <div className="mt-8 text-2xl font-light text-[hsl(var(--text-secondary))] typewriter text-center">
          System Initialization in Progress...
        </div>

        {/* Developer Text - Centered */}
        <div className="mt-4 text-lg font-mono text-[hsl(var(--text-primary))] opacity-75 text-center">
          {'< Software Developer | Turning Ideas into Reality />'}
        </div>

        {/* Loading Bar */}
        <div className="w-64 h-1 mt-8 overflow-hidden bg-[hsl(var(--text-primary)/0.2)] rounded-full">
          <div className="h-full bg-[hsl(var(--text-primary))] animate-[loading_2s_ease-in-out_infinite]"></div>
        </div>
      </div>
    </main>
  );
};

export default Index;


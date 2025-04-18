
const Index = () => {
  return (
    <main className="relative w-screen h-screen overflow-hidden bg-[hsl(var(--background))]">
      {/* Animated Grid Background */}
      <div className="fixed inset-0 w-full h-full">
        <div className="absolute inset-0 grid-pattern animate-grid"></div>
        <div className="absolute inset-0 grid-pattern animate-grid" style={{ animationDelay: '-2s' }}></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full">
        {/* KP Logo */}
        <div className="text-[15rem] font-black animate-float perspective-1000">
          <span className="block text-[hsl(var(--text-primary))] animate-glitch mix-blend-difference">
            KP
          </span>
          <span className="absolute top-0 left-0 text-[hsl(var(--text-secondary))] animate-glitch mix-blend-difference" style={{ clipPath: 'inset(0 0 50% 0)' }}>
            KP
          </span>
          <span className="absolute top-0 left-0 text-[hsl(var(--text-primary))] animate-glitch mix-blend-difference" style={{ clipPath: 'inset(50% 0 0 0)' }}>
            KP
          </span>
        </div>

        {/* Loading Text */}
        <div className="mt-16 text-2xl font-light text-[hsl(var(--text-secondary))] typewriter">
          System Initialization in Progress...
        </div>

        {/* Developer Text */}
        <div className="mt-8 text-lg font-mono text-[hsl(var(--text-primary))] opacity-75">
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

import React, { useEffect, useRef } from 'react';
import './CardParticles.css';

interface ParticleShape {
  x: number;
  y: number;
  size: number;
  color: string;
  type: 'circle' | 'triangle' | 'square';
  speedX: number;
  speedY: number;
  rotation: number;
  rotationSpeed: number;
}

interface CardParticlesProps {
  count?: number;
  className?: string;
}

const CardParticles: React.FC<CardParticlesProps> = ({ 
  count = 20,
  className = '' 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<ParticleShape[]>([]);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      
      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Initialize particles
    particlesRef.current = Array.from({ length: count }, () => {
      const size = Math.random() * 2 + 1; // 1-3px size
      const types = ['circle', 'triangle', 'square'] as const;
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size,
        color: getRandomColor(),
        type: types[Math.floor(Math.random() * types.length)],
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.3,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.01
      };
    });
    
    // Animation function
    const animate = () => {
      if (!ctx || !canvas) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particlesRef.current.forEach((particle) => {
        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Update rotation
        particle.rotation += particle.rotationSpeed;
        
        // Boundary check and wrap around
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;
        
        // Draw particle
        ctx.save();
        ctx.translate(particle.x, particle.y);
        ctx.rotate(particle.rotation);
        ctx.fillStyle = particle.color;
        
        switch (particle.type) {
          case 'circle':
            ctx.beginPath();
            ctx.arc(0, 0, particle.size, 0, Math.PI * 2);
            ctx.fill();
            break;
          case 'triangle':
            const size = particle.size * 1.5;
            ctx.beginPath();
            ctx.moveTo(0, -size);
            ctx.lineTo(size, size);
            ctx.lineTo(-size, size);
            ctx.closePath();
            ctx.fill();
            break;
          case 'square':
            ctx.fillRect(-particle.size, -particle.size, particle.size * 2, particle.size * 2);
            break;
        }
        
        ctx.restore();
      });
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    const animationRef = { current: 0 };
    animationRef.current = requestAnimationFrame(animate);
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationRef.current);
    };
  }, [count]);
  
  const getRandomColor = (): string => {
    // Cyber theme colors
    const colors = ['#02d8fc', '#00ff88', '#ff5f00', '#9000ff', '#ffffff'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <canvas 
      ref={canvasRef} 
      className={`particle-canvas absolute inset-0 pointer-events-none z-0 ${className}`}
    />
  );
};

export default CardParticles;
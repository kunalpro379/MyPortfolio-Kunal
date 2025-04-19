import React from 'react';
import './Background.css';

interface BackgroundProps {
  children?: React.ReactNode;
}

const Background: React.FC<BackgroundProps> = ({ children }) => {
  return (
    <div className="background">
      <div className="circuit-overlay"></div>
      {children}
    </div>
  );
};

export default Background;
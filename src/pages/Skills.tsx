import React from 'react';
import { motion } from 'framer-motion';
import CardDots from '@/components/ui/CardDots';
import useMobile from '@/hooks/use-mobile';
import Background from '@/components/ui/Background';

// Skill component with progress indicator
const SkillBar = ({ name, percentage, color }: { name: string, percentage: number, color: string }) => (
  <div className="mb-4">
    <div className="flex justify-between mb-1">
      <span className="text-[#02d8fc] font-medium">{name}</span>
      <span className="text-[#02d8fc]">{percentage}%</span>
    </div>
    <div className="h-2 w-full bg-blue-900/20 rounded-full overflow-hidden">
      <motion.div 
        className="h-full rounded-full" 
        style={{ backgroundColor: color }}
        initial={{ width: 0 }}
        animate={{ width: `${percentage}%` }}
        transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
      />
    </div>
  </div>
);

const Skills = () => {
  const { isMobile } = useMobile();

  const skillCategories = [
    {
      title: "Frontend Development",
      skills: [
        { name: "Flutter", percentage: 90, color: "#02d8fc" },
        { name: "React", percentage: 85, color: "#00ff88" },
        { name: "UI/UX Design", percentage: 80, color: "#02d8fc" },
        { name: "Responsive Design", percentage: 88, color: "#00ff88" }
      ]
    },
    {
      title: "Backend Development",
      skills: [
        { name: "Node.js", percentage: 82, color: "#02d8fc" },
        { name: "Firebase", percentage: 78, color: "#ff5f00" },
        { name: "MongoDB", percentage: 75, color: "#00ff88" },
        { name: "REST APIs", percentage: 85, color: "#02d8fc" }
      ]
    },
    {
      title: "Tools & Technologies",
      skills: [
        { name: "Git & GitHub", percentage: 88, color: "#02d8fc" },
        { name: "VS Code", percentage: 92, color: "#00ff88" },
        { name: "Docker", percentage: 70, color: "#ff5f00" },
        { name: "CI/CD", percentage: 75, color: "#02d8fc" }
      ]
    }
  ];

  return (
    <div className="min-h-screen w-full p-3 md:p-6">
      <div className="fixed inset-0 z-0">
        <Background />
      </div>
      <div className="relative z-10">
        <div className="text-xl md:text-3xl font-semibold text-[#02d8fc] border-b-2 border-blue-900/30 pb-3 md:pb-4 mb-4 md:mb-6">
          Skills & Expertise
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {/* Skills Overview Card */}
          <motion.div 
            className="cyber-card p-4 md:p-8 relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <CardDots />
            <div className="relative z-10">
              <h2 className="text-[#02d8fc] text-lg md:text-xl font-semibold mb-4">Technical Proficiency</h2>
              
              <div className="space-y-4">
                {/* Skill visualization - circular representation */}
                <div className="flex flex-wrap justify-center gap-3">
                  {["Flutter", "React", "Node.js", "UI/UX", "Firebase"].map((skill, i) => (
                    <motion.div
                      key={skill}
                      className="w-16 h-16 md:w-20 md:h-20 relative"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                    >
                      <svg className="w-full h-full" viewBox="0 0 100 100">
                        <circle 
                          cx="50" 
                          cy="50" 
                          r="40" 
                          stroke="#02d8fc20" 
                          strokeWidth="8" 
                          fill="none" 
                        />
                        <motion.circle 
                          cx="50"
                          cy="50"
                          r="40"
                          stroke="#02d8fc"
                          strokeWidth="8"
                          fill="none"
                          strokeLinecap="round"
                          strokeDasharray={2 * Math.PI * 40}
                          strokeDashoffset={2 * Math.PI * 40 * (1 - (85 + i * 3) / 100)}
                          transform="rotate(-90 50 50)"
                          initial={{ strokeDashoffset: 2 * Math.PI * 40 }}
                          animate={{ strokeDashoffset: 2 * Math.PI * 40 * (1 - (85 + i * 3) / 100) }}
                          transition={{ duration: 1.5, delay: 0.2 + i * 0.1 }}
                        />
                        <text 
                          x="50" 
                          y="50" 
                          fill="#02d8fc" 
                          fontSize="10"
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          {skill}
                        </text>
                        <text 
                          x="50" 
                          y="62" 
                          fill="#02d8fc" 
                          fontSize="12"
                          textAnchor="middle"
                          dominantBaseline="middle"
                          fontWeight="bold"
                        >
                          {85 + i * 3}%
                        </text>
                      </svg>
                    </motion.div>
                  ))}
                </div>
                
                <div className="mt-6">
                  <h3 className="text-[#02d8fc] text-md font-medium mb-2">Learning Progress</h3>
                  <div className="bg-blue-900/20 h-2 rounded-full">
                    <motion.div
                      className="h-full bg-gradient-to-r from-[#02d8fc] to-[#00ff88] rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: "92%" }}
                      transition={{ duration: 2, ease: "easeOut" }}
                    />
                  </div>
                  <div className="flex justify-between mt-1 text-xs text-[#02d8fc]">
                    <span>Started Learning</span>
                    <span className="text-[#00ff88]">92% Complete</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Skills Detail Card */}
          <motion.div 
            className="cyber-card p-4 md:p-8 relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <CardDots />
            <div className="relative z-10">
              <h2 className="text-[#02d8fc] text-lg md:text-xl font-semibold mb-4">Specialized Knowledge</h2>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {["AI Integration", "Mobile Dev", "Full-Stack", "Cloud Services", "System Design", "UI/UX Research"].map((tag, i) => (
                    <motion.span 
                      key={tag}
                      className="bg-blue-900/30 text-[#02d8fc] px-3 py-1 rounded text-sm"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: i * 0.1 }}
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>
                
                <div className="mt-4 grid grid-cols-2 gap-3">
                  {["Problem Solving", "Algorithmic Thinking", "System Architecture", "Code Review"].map((skill, i) => (
                    <motion.div 
                      key={skill}
                      className="flex items-center gap-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                    >
                      <div className="h-2 w-2 rounded-full bg-[#00ff88] animate-pulse" />
                      <span className="text-[#02d8fc]">{skill}</span>
                    </motion.div>
                  ))}
                </div>
                
                <div className="mt-4">
                  <h3 className="text-[#02d8fc] text-md font-medium mb-2">Continual Growth</h3>
                  <div className="h-20 relative overflow-hidden rounded-md bg-blue-900/20">
                    <motion.div 
                      className="absolute inset-0 flex flex-col justify-end items-center p-3"
                      style={{ background: 'linear-gradient(to top, rgba(2,216,252,0.3), transparent)' }}
                    >
                      <motion.div 
                        className="h-full w-full flex flex-col justify-end"
                        initial={{ y: 100 }}
                        animate={{ y: 0 }}
                        transition={{ duration: 1 }}
                      >
                        <div className="text-center">
                          <span className="text-sm text-[#00ff88] font-semibold">Always learning new technologies</span>
                        </div>
                      </motion.div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Detailed Skills List */}
          {skillCategories.map((category, i) => (
            <motion.div 
              key={category.title}
              className="cyber-card p-4 md:p-8 relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
            >
              <CardDots />
              <div className="relative z-10">
                <h2 className="text-[#02d8fc] text-lg md:text-xl font-semibold mb-4">{category.title}</h2>
                <div>
                  {category.skills.map((skill) => (
                    <SkillBar 
                      key={skill.name} 
                      name={skill.name} 
                      percentage={skill.percentage} 
                      color={skill.color} 
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Skills;
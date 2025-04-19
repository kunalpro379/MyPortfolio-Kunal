import React from 'react';
import { motion } from 'framer-motion';
import Background from '@/components/ui/Background';
import CardDots from '@/components/ui/CardDots';
import useMobile from '@/hooks/use-mobile';

const ResumeItem = ({ title, company, period, description }: { 
  title: string, 
  company: string, 
  period: string, 
  description: string 
}) => (
  <motion.div 
    className="mb-6 relative pl-6 before:content-[''] before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:bg-[#02d8fc] before:rounded-full"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <h3 className="text-[#02d8fc] text-lg font-medium">{title}</h3>
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2">
      <span className="text-blue-300">{company}</span>
      <span className="text-sm text-gray-400">{period}</span>
    </div>
    <p className="text-gray-300">{description}</p>
  </motion.div>
);

const Resume = () => {
  const { isMobile } = useMobile();
  
  const experiences = [
    {
      title: "Frontend Developer Intern",
      company: "TechStart Solutions",
      period: "Jun 2024 - Present",
      description: "Developing responsive web applications using React.js and implementing UI designs. Collaborating with the design team to improve user experience."
    },
    {
      title: "Mobile App Developer",
      company: "Freelance",
      period: "Jan 2023 - Present",
      description: "Building cross-platform mobile applications for clients using Flutter. Implementing complex UI designs and integrating with backend services."
    },
    {
      title: "Web Developer",
      company: "Campus Tech Club",
      period: "Sep 2022 - May 2023",
      description: "Developed and maintained the club's website using modern web technologies. Implemented responsive designs and interactive features."
    }
  ];
  
  const education = [
    {
      title: "Bachelor of Engineering in Computer Science",
      company: "VESIT Mumbai",
      period: "2022 - 2026",
      description: "Focusing on software development, artificial intelligence, and data structures. Maintaining a strong academic record with consistently high grades."
    },
    {
      title: "Higher Secondary Certificate",
      company: "Mumbai Junior College",
      period: "2020 - 2022",
      description: "Completed with distinction in Computer Science, Mathematics, and Physics."
    }
  ];
  
  const certifications = [
    {
      title: "Flutter Development Bootcamp",
      company: "Udemy",
      period: "Aug 2023",
      description: "Comprehensive course covering Flutter framework, Dart programming, state management, and app deployment."
    },
    {
      title: "React.js Advanced Concepts",
      company: "Coursera",
      period: "Mar 2023",
      description: "Deep dive into React hooks, context API, performance optimization, and testing."
    },
    {
      title: "Full-Stack Web Development",
      company: "FreeCodeCamp",
      period: "Dec 2022",
      description: "Certificate covering front-end libraries, data visualization, and back-end development with Node.js."
    }
  ];

  return (
    <div className="min-h-screen w-full p-3 md:p-6">
      <div className="fixed inset-0 z-0">
        <Background />
      </div>
      <div className="relative z-10">
        <div className="text-xl md:text-3xl font-semibold text-[#02d8fc] border-b-2 border-blue-900/30 pb-3 md:pb-4 mb-4 md:mb-6">
          Resume
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {/* Download Resume Button */}
          <motion.div 
            className="cyber-card p-4 md:p-8 relative col-span-1 md:col-span-3 flex justify-center items-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            whileHover={{ scale: 1.01 }}
          >
            <CardDots />
            <div className="relative z-10">
              <button className="bg-gradient-to-r from-[#02d8fc] to-[#0066ff] text-white px-6 py-3 rounded-md font-medium hover:shadow-lg hover:shadow-[#02d8fc]/20 transition-all duration-300">
                Download Full Resume
              </button>
            </div>
          </motion.div>
          
          {/* Experience Section */}
          <motion.div 
            className="cyber-card p-4 md:p-8 relative col-span-1 md:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <CardDots />
            <div className="relative z-10">
              <h2 className="text-[#02d8fc] text-lg md:text-xl font-semibold mb-6 flex items-center gap-2">
                <span className="text-xl">💼</span> Professional Experience
              </h2>
              <div>
                {experiences.map((exp, index) => (
                  <ResumeItem
                    key={index}
                    title={exp.title}
                    company={exp.company}
                    period={exp.period}
                    description={exp.description}
                  />
                ))}
              </div>
            </div>
          </motion.div>
          
          {/* Sidebar - Education & Certifications */}
          <div className="col-span-1">
            {/* Education Section */}
            <motion.div 
              className="cyber-card p-4 md:p-8 relative mb-4 md:mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <CardDots />
              <div className="relative z-10">
                <h2 className="text-[#02d8fc] text-lg md:text-xl font-semibold mb-6 flex items-center gap-2">
                  <span className="text-xl">🎓</span> Education
                </h2>
                <div>
                  {education.map((edu, index) => (
                    <div key={index} className="mb-4">
                      <h3 className="text-[#02d8fc] font-medium">{edu.title}</h3>
                      <p className="text-blue-300 text-sm">{edu.company}</p>
                      <p className="text-gray-400 text-sm mb-1">{edu.period}</p>
                      <p className="text-gray-300 text-sm">{edu.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
            
            {/* Certifications Section */}
            <motion.div 
              className="cyber-card p-4 md:p-8 relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <CardDots />
              <div className="relative z-10">
                <h2 className="text-[#02d8fc] text-lg md:text-xl font-semibold mb-6 flex items-center gap-2">
                  <span className="text-xl">🏆</span> Certifications
                </h2>
                <div>
                  {certifications.map((cert, index) => (
                    <div key={index} className="mb-4">
                      <h3 className="text-[#02d8fc] font-medium">{cert.title}</h3>
                      <p className="text-blue-300 text-sm">{cert.company}</p>
                      <p className="text-gray-400 text-sm mb-1">{cert.period}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* Skills Section */}
          <motion.div 
            className="cyber-card p-4 md:p-8 relative col-span-1 md:col-span-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <CardDots />
            <div className="relative z-10">
              <h2 className="text-[#02d8fc] text-lg md:text-xl font-semibold mb-6 flex items-center gap-2">
                <span className="text-xl">⚡</span> Core Skills
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-6">
                {[
                  "Flutter Development", "React.js", "Node.js", "UI/UX Design",
                  "Firebase", "MongoDB", "REST APIs", "Git/GitHub",
                  "Responsive Design", "Mobile App Dev", "JavaScript/TypeScript", "SQL/NoSQL"
                ].map((skill, index) => (
                  <motion.div 
                    key={index}
                    className="flex items-center gap-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 + index * 0.05 }}
                  >
                    <div className="w-2 h-2 rounded-full bg-[#02d8fc]" />
                    <span className="text-gray-300 text-sm">{skill}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Resume;
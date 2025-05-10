import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { ChevronLeft, Calendar, Clock, Bookmark, Copy, Share2, Eye, Heart, MessageSquare, User, Search, Send, Brain, Monitor, Server, Lock, Network, Database, FileText } from 'lucide-react';
import { vscDarkPlus, atomDark, dracula, materialDark, oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { Pluggable } from 'unified';
import { ReactMarkdownOptions } from 'react-markdown';
import useMobile from '../hooks/use-mobile';

// Define types for heading elements and table of contents
interface HeadingElement extends HTMLElement {
    id: string;
    textContent: string;
    tagName: string;
}

interface HeadingData {
    id: string;
    text: string;
    level: number;
}

// Interface for the component props
interface BlogReaderProps {
  blog: any;
  onBack: () => void;
  embedded?: boolean; // Optional prop for when used inside another component
  blogCategory?: string; // Optional prop to help with image resolution
}

// Add the available code themes for cycling through them
const codeThemes = [
  { name: 'VS Code Dark+', theme: vscDarkPlus },
  { name: 'Atom Dark', theme: atomDark },
  { name: 'Dracula', theme: dracula },
  { name: 'Material Dark', theme: materialDark },
  { name: 'One Dark', theme: oneDark },
];

// Custom renderer components for ReactMarkdown
const MarkdownComponents = {
  img: (props) => {
    const { src, alt, blogCategory } = props;
    
    // Get the blog folder from the current blog being viewed
    const getBlogFolder = (category) => {
      // Map category to folder name
      const categoryToFolder = {
        "Security": "vpn-blog",
        "DevOps": "monorepos-turborepos",
        "Frontend": "react-blog",
        "AI": "gan-sketch-to-face", // Default AI blog is gan-sketch-to-face
        "Machine Learning": "Face-Recognition-with-PCA&SVM" // Add this mapping
      };
      
      // Check if the category contains specific keywords to determine the folder more accurately
      if (category === "AI" && props.title && props.title.includes("PCA")) {
        return "Face-Recognition-with-PCA&SVM";
      } else if (category === "DevOps" && props.title && props.title.includes("Cloud IDE")) {
        return "cloud-ide-deployment";
      } 
      
      return categoryToFolder[category] || "vpn-blog";
    };
    
    // Handle relative paths by checking if the path starts with '/' or 'http'
    let imgSrc = src;
    
    if (src && (!src.startsWith('/') && !src.startsWith('http'))) {
      // This is a relative path in the blog content
      // Use the filename directly from the public folder
      imgSrc = `/${src}`;
    } else if (src && src.startsWith('/src/')) {
      // For paths that start with /src/, use just the filename in production
      const filename = src.split('/').pop();
      imgSrc = `/${filename}`;
    }
    
    return (
      <div className="my-4 group relative overflow-hidden rounded-md">
        <motion.img 
          src={imgSrc} 
          alt={alt || "Blog image"} 
          className="w-full rounded-md border border-cyan-900/30 transform transition-all duration-700 hover:scale-105"
          initial={{ filter: "grayscale(0.3) brightness(0.8)" }}
          whileInView={{ filter: "grayscale(0) brightness(1)" }}
          transition={{ duration: 0.8 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="absolute -bottom-10 left-0 right-0 p-2 bg-black/70 backdrop-blur-sm border-t border-cyan-500/30 text-xs text-cyan-300 transition-all duration-300 group-hover:bottom-0">
          {alt || "Image"}
        </div>
      </div>
    );
  },
  
  // Enhanced code block rendering
  code: ({ node, inline, className, children, ...props }) => {
    const [codeThemeIndex, setCodeThemeIndex] = useState(0);
    const [copied, setCopied] = useState(false);
    
    const match = /language-(\w+)/.exec(className || '');
    const language = match ? match[1] : '';

    const copyToClipboard = () => {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(String(children));
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    };

    const cycleTheme = () => {
      setCodeThemeIndex((prevIndex) => (prevIndex + 1) % codeThemes.length);
    };

    // For inline code
    if (inline) {
      return (
        <code className="px-1.5 py-0.5 mx-0.5 rounded bg-slate-800 text-cyan-400 font-mono text-sm shadow-[0_0_4px_rgba(6,182,212,0.4)]" {...props}>
          {children}
        </code>
      );
    }

    // For code blocks
    return (
      <motion.div 
        className="group relative my-6"
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="absolute right-2 top-2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
          <motion.button 
            onClick={cycleTheme}
            className="px-3 py-1 rounded bg-slate-700/90 text-xs text-cyan-300 hover:bg-cyan-800/80 transition-colors border border-cyan-500/30 backdrop-blur-sm shadow-[0_0_10px_rgba(6,182,212,0.3)]"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Theme
          </motion.button>
          <motion.button 
            onClick={copyToClipboard}
            className="px-3 py-1 rounded bg-slate-700/90 text-xs text-cyan-300 hover:bg-cyan-800/80 transition-colors border border-cyan-500/30 backdrop-blur-sm shadow-[0_0_10px_rgba(6,182,212,0.3)]"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {copied ? 'Copied!' : 'Copy'}
          </motion.button>
        </div>
        
        <div className="rounded-lg overflow-hidden border border-cyan-800/70 shadow-[0_0_20px_rgba(6,182,212,0.2)]">
          <div className="flex items-center space-x-2 bg-black/90 px-4 py-2 border-b border-cyan-900/50 backdrop-blur-sm">
            <motion.div 
              className="h-3 w-3 rounded-full bg-red-500"
              whileHover={{ scale: 1.2 }}
            ></motion.div>
            <motion.div 
              className="h-3 w-3 rounded-full bg-yellow-500"
              whileHover={{ scale: 1.2 }}
            ></motion.div>
            <motion.div 
              className="h-3 w-3 rounded-full bg-green-500"
              whileHover={{ scale: 1.2 }}
            ></motion.div>
            <div className="flex-1 text-xs text-cyan-500 ml-2 font-mono flex items-center">
              <span className="mr-1 opacity-50">$</span>
              <span>{language ? language.toUpperCase() : 'CODE'}</span>
              <motion.span 
                className="ml-1 inline-block"
                animate={{ opacity: [0, 1] }}
                transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
              >_</motion.span>
            </div>
            <div className="text-xs text-slate-500">
              {codeThemes[codeThemeIndex].name}
            </div>
          </div>
          
          <SyntaxHighlighter
            style={codeThemes[codeThemeIndex].theme}
            language={language || 'text'}
            showLineNumbers={!inline && language !== 'text'}
            wrapLongLines={true}
            customStyle={{
              margin: 0,
              borderRadius: 0,
              padding: '1rem',
              backgroundColor: 'rgb(13, 19, 33)',
            }}
            codeTagProps={{
              style: {
                fontSize: '0.9rem',
                fontFamily: 'Menlo, Monaco, Consolas, "Courier New", monospace',
              }
            }}
          >
            {String(children).replace(/\n$/, '')}
          </SyntaxHighlighter>
        </div>
      </motion.div>
    );
  },
  
  // Enhanced table rendering
  table: ({ node, children, ...props }) => {
    return (
      <motion.div 
        className="my-6 overflow-x-auto rounded-lg border border-cyan-900/50 shadow-[0_0_15px_rgba(6,182,212,0.15)]"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <table className="min-w-full divide-y divide-cyan-900/50" {...props}>
          {children}
        </table>
      </motion.div>
    );
  },
  thead: ({ node, children, ...props }) => (
    <thead className="bg-slate-800/90 backdrop-blur-sm" {...props}>
      {children}
    </thead>
  ),
  tbody: ({ node, children, ...props }) => (
    <tbody className="divide-y divide-cyan-900/40 bg-slate-900/70" {...props}>
      {children}
    </tbody>
  ),
  tr: ({ node, children, ...props }) => (
    <tr className="transition-colors hover:bg-cyan-900/20" {...props}>
      {children}
    </tr>
  ),
  th: ({ node, children, ...props }) => (
    <th className="px-4 py-3 text-left text-xs font-medium text-cyan-400 uppercase tracking-wider" {...props}>
      {children}
    </th>
  ),
  td: ({ node, children, ...props }) => (
    <td className="px-4 py-3 text-sm text-slate-300" {...props}>
      {children}
    </td>
  ),
  
  // Enhanced paragraph
  p: ({ node, children, ...props }) => (
    <motion.p 
      className="mb-4 leading-relaxed"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      {...props}
    >
      {children}
    </motion.p>
  ),
  
  // Enhanced headers
  h1: ({ node, children, ...props }) => {
    const id = children.toString().toLowerCase().replace(/\s+/g, '-');
    return (
      <motion.h1
        id={id}
        className="text-3xl font-bold my-6 text-cyan-300 border-l-4 border-cyan-500 pl-3 scroll-mt-20"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        {...props}
      >
        {children}
      </motion.h1>
    );
  },
  h2: ({ node, children, ...props }) => {
    const id = children.toString().toLowerCase().replace(/\s+/g, '-');
    return (
      <motion.h2
        id={id}
        className="text-2xl font-bold my-5 text-cyan-300 border-l-2 border-cyan-500 pl-3 scroll-mt-20"
        initial={{ opacity: 0, x: -15 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        {...props}
      >
        {children}
      </motion.h2>
    );
  },
  h3: ({ node, children, ...props }) => {
    const id = children.toString().toLowerCase().replace(/\s+/g, '-');
    return (
      <motion.h3
        id={id}
        className="text-xl font-bold my-4 text-cyan-200 scroll-mt-20"
        initial={{ opacity: 0, x: -10 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        {...props}
      >
        {children}
      </motion.h3>
    );
  },
};

const CyberTerminal = ({ children, className = "" }) => {
     return (
          <div className={`bg-slate-900/90 backdrop-blur-md border border-cyan-700/40 rounded-lg p-4 shadow-[0_0_30px_rgba(6,182,212,0.15)] relative overflow-hidden ${className}`}>
               <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-cyan-500"></div>
               <div className="flex items-center space-x-2 mb-3 border-b border-cyan-900/50 pb-2">
                    <motion.div whileHover={{ scale: 1.2 }} className="h-3 w-3 rounded-full bg-red-500"></motion.div>
                    <motion.div whileHover={{ scale: 1.2 }} className="h-3 w-3 rounded-full bg-yellow-500"></motion.div>
                    <motion.div whileHover={{ scale: 1.2 }} className="h-3 w-3 rounded-full bg-green-500"></motion.div>
                    <div className="flex-1 text-xs text-cyan-400 ml-2 font-mono flex items-center">
                         <span className="opacity-60 mr-2">$</span>
                         <span>NEURAL_READER</span>
                         <motion.span 
                              className="ml-1 inline-block"
                              animate={{ opacity: [0, 1] }}
                              transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
                         >_</motion.span>
                    </div>
               </div>
               {children}
               
               {/* Circuit decoration */}
               <div className="absolute -bottom-10 -right-10 w-40 h-40 opacity-10">
                    <svg width="100%" height="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                         <path d="M10,10 L90,10 M50,10 L50,90 M10,50 L90,50 M10,90 L90,90" stroke="#0ea5e9" strokeWidth="1" fill="none"/>
                         <circle cx="10" cy="10" r="3" fill="#0ea5e9" />
                         <circle cx="50" cy="10" r="3" fill="#0ea5e9" />
                         <circle cx="90" cy="10" r="3" fill="#0ea5e9" />
                         <circle cx="10" cy="50" r="3" fill="#0ea5e9" />
                         <circle cx="50" cy="50" r="3" fill="#0ea5e9" />
                         <circle cx="90" cy="50" r="3" fill="#0ea5e9" />
                         <circle cx="10" cy="90" r="3" fill="#0ea5e9" />
                         <circle cx="50" cy="90" r="3" fill="#0ea5e9" />
                         <circle cx="90" cy="90" r="3" fill="#0ea5e9" />
                    </svg>
               </div>
          </div>
     );
};

const BlogReader = ({ blog, onBack, embedded, blogCategory }: BlogReaderProps) => {
     const [isLoading, setIsLoading] = useState(true);
     const [headings, setHeadings] = useState<HeadingData[]>([]);
     const contentRef = useRef<HTMLDivElement | null>(null);
     const { isMobile } = useMobile(); // Use the mobile hook
     
     useEffect(() => {
          const timer = setTimeout(() => {
               setIsLoading(false);
          }, 500);
          
          return () => clearTimeout(timer);
     }, []);
     
     useEffect(() => {
          if (!isLoading && contentRef.current) {
               const headingElements = Array.from(contentRef.current.querySelectorAll('h1, h2, h3')) as HeadingElement[];
               const headingData = headingElements.map((heading) => ({
                    id: heading.id,
                    text: heading.textContent,
                    level: parseInt(heading.tagName.substring(1)),
               }));
               setHeadings(headingData);
          }
     }, [isLoading]);
     
     const scrollToHeading = (id: string) => {
          const element = document.getElementById(id);
          if (element) {
               element.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
               });
          }
     };
     
     return (
          <div className="relative flex flex-col lg:flex-row">
               {/* Mobile TOC Dropdown - Only visible on mobile */}
               {isMobile && headings.length > 0 && (
                    <motion.div
                         className="mb-4 w-full"
                         initial={{ opacity: 0, y: -10 }}
                         animate={{ opacity: 1, y: 0 }}
                         transition={{ delay: 0.2 }}
                    >
                         <CyberTerminal className="p-3">
                              <details className="text-cyan-400">
                                   <summary className="font-mono text-sm cursor-pointer flex items-center justify-between">
                                        <span className="flex items-center">
                                             <span className="mr-2">📑</span> TABLE OF CONTENTS
                                        </span>
                                        <span className="text-xs opacity-70">(tap to expand)</span>
                                   </summary>
                                   <div className="mt-3 space-y-2 max-h-60 overflow-y-auto pl-2 border-l border-cyan-900/50">
                                        {headings.map((heading) => (
                                             <motion.div
                                                  key={heading.id}
                                                  className={`cursor-pointer text-sm hover:text-cyan-300 transition-colors ${
                                                       heading.level === 1 
                                                            ? 'font-bold text-cyan-400 pl-0' 
                                                            : heading.level === 2 
                                                                 ? 'text-slate-300 pl-3' 
                                                                 : 'text-slate-400 pl-6'
                                                  }`}
                                                  onClick={() => scrollToHeading(heading.id)}
                                                  whileHover={{ x: 5 }}
                                                  whileTap={{ scale: 0.95 }}
                                             >
                                                  {heading.text}
                                             </motion.div>
                                        ))}
                                   </div>
                              </details>
                         </CyberTerminal>
                    </motion.div>
               )}
               
               {/* Table of Contents Sidebar - Only on large screens */}
               {headings.length > 0 && (
                    <motion.div 
                         className="hidden lg:block w-64 pr-8 sticky top-4 h-fit"
                         initial={{ opacity: 0, x: -20 }}
                         animate={{ opacity: 1, x: 0 }}
                         transition={{ delay: 0.3 }}
                    >
                         <CyberTerminal className="p-4">
                              <div className="flex items-center space-x-2 mb-4">
                                   <div className="text-cyan-400 font-mono text-sm">NAVIGATION</div>
                                   <div className="flex-1 h-px bg-cyan-900/50"></div>
                              </div>
                              <div className="space-y-2">
                                   {headings.map((heading) => (
                                        <motion.div
                                             key={heading.id}
                                             className={`cursor-pointer text-sm hover:text-cyan-300 transition-colors ${
                                                  heading.level === 1 
                                                       ? 'font-bold text-cyan-400 pl-0' 
                                                       : heading.level === 2 
                                                            ? 'text-slate-300 pl-3' 
                                                            : 'text-slate-400 pl-6'
                                             }`}
                                             onClick={() => scrollToHeading(heading.id)}
                                             whileHover={{ x: 5 }}
                                             whileTap={{ scale: 0.95 }}
                                        >
                                             {heading.text}
                                        </motion.div>
                                   ))}
                              </div>
                         </CyberTerminal>
                    </motion.div>
               )}
               
               {/* Main Content */}
               <div className="flex-1 px-1 sm:px-3">
                    <motion.button
                         onClick={onBack}
                         className="p-2 rounded-full bg-slate-900/90 backdrop-blur-md border border-cyan-900/50 text-cyan-400 hover:text-cyan-300 hover:border-cyan-500/50 transition-all z-10 mb-4 block"
                         whileHover={{ scale: 1.05 }}
                         whileTap={{ scale: 0.95 }}
                    >
                         <ChevronLeft />
                    </motion.button>
                    
                    <motion.div
                         initial={{ opacity: 0, y: 30 }}
                         animate={{ opacity: 1, y: 0 }}
                         exit={{ opacity: 0, y: -30 }}
                         transition={{ duration: 0.5 }}
                         ref={contentRef}
                    >
                         <CyberTerminal>
                              {isLoading ? (
                                   <div className="flex flex-col items-center justify-center py-20">
                                        <div className="w-16 h-16 relative mb-6">
                                             <motion.div 
                                                  className="absolute inset-0 border-2 border-transparent border-t-cyan-500 rounded-full"
                                                  animate={{ rotate: 360 }}
                                                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                                             />
                                             <motion.div 
                                                  className="absolute inset-1 border-2 border-transparent border-r-purple-500 rounded-full"
                                                  animate={{ rotate: -360 }}
                                                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                             />
                                             <div className="absolute inset-0 flex items-center justify-center">
                                                  <motion.div 
                                                       className="w-2 h-2 bg-cyan-400 rounded-full"
                                                       animate={{ scale: [1, 1.5, 1] }}
                                                       transition={{ duration: 1.5, repeat: Infinity }}
                                                  />
                                             </div>
                                        </div>
                                        <div className="text-cyan-400 font-mono text-sm flex flex-col items-center">
                                             <div className="flex">
                                                  <span>LOADING</span>
                                                  <motion.span
                                                       animate={{ opacity: [0, 1, 0] }}
                                                       transition={{ duration: 1.5, repeat: Infinity, times: [0, 0.5, 1] }}
                                                       className="ml-1"
                                                  >...</motion.span>
                                             </div>
                                             <motion.div
                                                  className="mt-2 text-xs text-slate-400"
                                                  animate={{ opacity: [0, 1] }}
                                                  transition={{ duration: 1, delay: 0.5 }}
                                             >
                                                  DECRYPTING NEURAL DATA
                                             </motion.div>
                                        </div>
                                   </div>
                              ) : (
                                   <div>
                                        <div className="mb-6 border-b border-cyan-900/50 pb-4">
                                             <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4 gap-3">
                                                  <div className="flex items-center space-x-3">
                                                       <motion.div 
                                                            whileHover={{ rotate: 15, scale: 1.1 }}
                                                            className="w-10 h-10 sm:w-12 sm:h-12 rounded-md flex items-center justify-center bg-cyan-900/50 border border-cyan-700/50 text-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.3)]"
                                                       >
                                                            {blog.icon || <FileText className="w-5 h-5 sm:w-6 sm:h-6" />}
                                                       </motion.div>
                                                       <div>
                                                            <div className="text-xs sm:text-sm text-cyan-400 flex items-center mb-1">
                                                                 <span className="opacity-60 mr-1">../</span>
                                                                 <span className="mr-1">SECTOR/</span>
                                                                 <span className="bg-cyan-900/40 px-2 py-0.5 rounded border border-cyan-800/50 text-xs">{blog.category}</span>
                                                            </div>
                                                            <div className="flex items-center space-x-2 sm:space-x-3 text-xs">
                                                                 <span className="text-slate-400 flex items-center">
                                                                      <Calendar className="w-3 h-3 mr-1" />{blog.date}
                                                                 </span>
                                                                 <span className="text-cyan-400 bg-cyan-900/40 px-2 py-0.5 rounded-full border border-cyan-700/30 flex items-center text-xs">
                                                                      <Clock className="w-3 h-3 mr-1" />{blog.readTime}
                                                                 </span>
                                                            </div>
                                                       </div>
                                                  </div>
                                                  
                                                  <div className="flex space-x-2 mt-1 sm:mt-0">
                                                       <motion.button
                                                            className="p-1.5 sm:p-2 rounded-md bg-slate-800/80 text-slate-400 hover:text-cyan-400 hover:bg-slate-700/80 transition-colors border border-slate-700/30"
                                                            whileHover={{ scale: 1.1, boxShadow: "0 0 10px rgba(6,182,212,0.3)" }}
                                                            whileTap={{ scale: 0.9 }}
                                                       >
                                                            <Bookmark className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                                       </motion.button>
                                                       <motion.button
                                                            className="p-1.5 sm:p-2 rounded-md bg-slate-800/80 text-slate-400 hover:text-cyan-400 hover:bg-slate-700/80 transition-colors border border-slate-700/30"
                                                            whileHover={{ scale: 1.1, boxShadow: "0 0 10px rgba(6,182,212,0.3)" }}
                                                            whileTap={{ scale: 0.9 }}
                                                       >
                                                            <Copy className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                                       </motion.button>
                                                       <motion.button
                                                            className="p-1.5 sm:p-2 rounded-md bg-slate-800/80 text-slate-400 hover:text-cyan-400 hover:bg-slate-700/80 transition-colors border border-slate-700/30"
                                                            whileHover={{ scale: 1.1, boxShadow: "0 0 10px rgba(6,182,212,0.3)" }}
                                                            whileTap={{ scale: 0.9 }}
                                                       >
                                                            <Share2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                                       </motion.button>
                                                  </div>
                                             </div>
                                             
                                             <div className="relative mb-5 bg-gradient-to-r from-cyan-900/30 via-transparent to-transparent p-3 sm:p-4 rounded-lg border-l-2 border-cyan-500/70">
                                                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-cyan-300 mb-1">{blog.title}</h1>
                                                <motion.div 
                                                     className="absolute -left-1 top-0 bottom-0 w-1 bg-cyan-500/70"
                                                     animate={{ 
                                                         opacity: [0.5, 1, 0.5],
                                                         height: ["100%", "95%", "100%"]
                                                     }}
                                                     transition={{ duration: 3, repeat: Infinity }}
                                                />
                                             </div>
                                             
                                             <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 overflow-x-auto">
                                                  {blog.tags && blog.tags.map((tag, i) => (
                                                       <motion.span 
                                                          key={i} 
                                                          className="text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md bg-slate-800/80 text-cyan-400 border border-cyan-900/50 backdrop-blur-sm whitespace-nowrap"
                                                          whileHover={{ scale: 1.05, backgroundColor: "rgba(8, 145, 178, 0.2)" }}
                                                       >
                                                            <span className="text-cyan-500 mr-1">#</span>
                                                            {tag}
                                                       </motion.span>
                                                  ))}
                                             </div>
                                             
                                             <div className="flex items-center justify-around sm:justify-start sm:space-x-6 py-2 px-3 bg-slate-800/40 rounded-md border border-slate-700/50">
                                                  <div className="flex items-center space-x-1 text-xs sm:text-sm text-slate-400">
                                                       <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-500/70" />
                                                       <span>{blog.views || 0}</span>
                                                  </div>
                                                  <div className="flex items-center space-x-1 text-xs sm:text-sm text-slate-400">
                                                       <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-500/70" />
                                                       <span>{blog.likes || 0}</span>
                                                  </div>
                                                  <div className="flex items-center space-x-1 text-xs sm:text-sm text-slate-400">
                                                       <MessageSquare className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-500/70" />
                                                       <span>{blog.comments || 0}</span>
                                                  </div>
                                             </div>
                                        </div>
                                        
                                        <div className="prose prose-invert prose-cyan max-w-none prose-sm sm:prose-base md:prose-lg">
                                             <ReactMarkdown 
                                                  components={{
                                                       ...MarkdownComponents as any,
                                                       img: (props) => MarkdownComponents.img({ ...props, blogCategory: blog.category }),
                                                       root: ({ children }) => (
                                                            <div className="prose-headings:text-cyan-300 prose-a:text-cyan-400 prose-a:no-underline hover:prose-a:text-cyan-300 prose-blockquote:border-l-cyan-500 prose-blockquote:bg-slate-800/50 prose-blockquote:p-4 prose-blockquote:rounded-r-md prose-blockquote:italic prose-strong:text-cyan-200">
                                                                 {children}
                                                            </div>
                                                       )
                                                  }}
                                                  rehypePlugins={[rehypeRaw as Pluggable]}
                                             >
                                                  {blog.content}
                                             </ReactMarkdown>
                                        </div>
                                        
                                        <div className="mt-8 border-t border-cyan-900/50 pt-4">
                                             <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center gap-3">
                                                  <div className="flex items-center space-x-2 text-slate-400 mb-3 sm:mb-0">
                                                       <User className="w-4 h-4" />
                                                       <span className="text-cyan-300 font-mono">{blog.author}</span>
                                                  </div>
                                                  
                                                  <div className="flex flex-wrap gap-2 w-full sm:w-auto sm:flex-nowrap sm:space-x-3">
                                                       <motion.button
                                                            className="flex flex-1 sm:flex-auto items-center justify-center sm:justify-start space-x-1.5 px-3 sm:px-4 py-1.5 rounded-md bg-slate-800/80 text-slate-300 hover:text-cyan-400 hover:bg-slate-700/80 transition-colors border border-slate-700/50 shadow-[0_0_10px_rgba(6,182,212,0.2)]"
                                                            whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(6,182,212,0.4)" }}
                                                            whileTap={{ scale: 0.95 }}
                                                       >
                                                            <Heart className="w-4 h-4" />
                                                            <span>Like</span>
                                                       </motion.button>
                                                       <motion.button
                                                            className="flex flex-1 sm:flex-auto items-center justify-center sm:justify-start space-x-1.5 px-3 sm:px-4 py-1.5 rounded-md bg-cyan-900/20 text-cyan-400 hover:bg-cyan-900/40 transition-colors border border-cyan-700/50 shadow-[0_0_10px_rgba(6,182,212,0.3)]"
                                                            whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(6,182,212,0.5)" }}
                                                            whileTap={{ scale: 0.95 }}
                                                       >
                                                            <MessageSquare className="w-4 h-4" />
                                                            <span>Comment</span>
                                                       </motion.button>
                                                       <motion.button
                                                            onClick={onBack}
                                                            className="flex flex-1 sm:flex-auto items-center justify-center sm:justify-start space-x-1.5 px-3 sm:px-4 py-1.5 rounded-md bg-slate-900/90 text-slate-300 hover:text-cyan-400 hover:bg-slate-800/90 transition-colors border border-slate-700/50 shadow-[0_0_10px_rgba(6,182,212,0.2)]"
                                                            whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(6,182,212,0.4)" }}
                                                            whileTap={{ scale: 0.95 }}
                                                       >
                                                            <ChevronLeft className="w-4 h-4" />
                                                            <span>Back</span>
                                                       </motion.button>
                                                  </div>
                                             </div>
                                        </div>
                                   </div>
                              )}
                         </CyberTerminal>
                    </motion.div>
               </div>
          </div>
     );
};

export default BlogReader;
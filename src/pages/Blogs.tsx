import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Lock, Shield, Cpu, Zap, Database, Server, HardDrive, Network, Code, Brain, Eye, GitBranch, FileText } from 'lucide-react';
import BlogReader from './blog-reader';
import { BlogMetadata, BlogSection, Blog } from '../utils/blogUtils';
import AdvancedTechCircuit from '../components/ui/circuital-background';
import MathematicalCircuit from '../components/ui/background-design';
// Import blog markdown files
import vpnBlogContent from '../data/blogs/vpn-blog/blog-data.md';
import monorepoBlogContent from '../data/blogs/monorepos-turborepos/blog-data.md';
import reactBlogContent from '../data/blogs/react-blog/blog-data.md';
import ganBlogContent from '../data/blogs/gan-sketch-to-face/blog-data.md';
import faceRecognitionBlogContent from '../data/blogs/Face-Recognition-with-PCA&SVM/blog-data.md';
import cloudIdeBlogContent from '../data/blogs/cloud-ide-deployment/blog-data.md';

// Type definitions for fallback metadata
interface FallbackMetadata {
  title: string;
  date: string;
  category: string;
  tags: string[];
  readTime: string;
  author?: string;
  excerpt?: string;
  id: number;
  [key: string]: any;
}

// Type for frontmatter data with optional fields
interface FrontmatterData {
  title?: string;
  date?: string;
  category?: string;
  tags?: string[] | string;
  readTime?: string;
  author?: string;
  excerpt?: string;
  icon?: string;
  id?: number;
  [key: string]: any;
}

// Type definition for parsed blog result
interface ParsedBlog {
  metadata: BlogMetadata;
  sections: BlogSection[];
  rawContent?: string;
}

// Fallback metadata in case parsing fails
const fallbackMetadata: Record<string, FallbackMetadata> = {
  vpn: {
    title: "Custom VPN Implementation: Understanding Secure Tunneling with TUN and OpenSSL",
    date: "2024-03-10",
    category: "Security",
    tags: ["VPN", "Networking", "Security", "OpenSSL", "TUN"],
    readTime: "15 min read",
    author: "Kunal Patil",
    id: 1
  },
  monorepo: {
    title: "Monorepos and Turborepo: Building Efficient JavaScript Workspaces",
    date: "2024-03-09",
    category: "DevOps",
    tags: ["Monorepo", "Turborepo", "JavaScript", "Build Tools", "CI/CD"],
    readTime: "12 min read",
    author: "Vinit Solanki",
    id: 2
  },
  react: {
    title: "Advanced React Patterns: Building Scalable Applications",
    date: "2024-03-08",
    category: "Frontend",
    tags: ["React", "JavaScript", "Web Development", "Patterns", "Architecture"],
    readTime: "10 min read",
    author: "Vinit Solanki",
    id: 3
  },
  cloudIde: {
    title: "Building a Cloud IDE with AWS EKS: A Developer's Guide to Modern Architecture",
    date: "2025-02-15",
    category: "DevOps",
    tags: ["AWS", "Kubernetes", "Cloud", "IDE", "DevTools"],
    readTime: "15 min",
    author: "Kunal Patil",
    id: 4
  },
  faceRecognition: {
    title: "The Power of PCA and SVM in Face Classification: A Classic Yet Effective Approach",
    date: "2025-01-20",
    category: "AI",
    tags: ["Machine Learning", "Computer Vision", "PCA", "SVM", "Face Recognition"],
    readTime: "10 min",
    author: "Kunal Patil",
    id: 5
  },
  gan: {
    title: "From Sketch to Reality: Transforming Hand-Drawn Faces into Photorealistic Portraits Using AI",
    date: "2025-03-10",
    category: "AI",
    tags: ["GAN", "Computer Vision", "Deep Learning", "Image Generation", "Sketch Conversion"],
    readTime: "12 min",
    author: "Kunal Patil",
    id: 6
  },

};

// Safe parsing function that uses fallbacks if needed
const safeParse = (content: any, fallback: FallbackMetadata): ParsedBlog => {
  try {
    // Handle different possible formats from the Vite markdown plugin
    if (content) {
      // Log some information about what we're parsing
      console.log(`Parsing blog: ${fallback.title}`);
      console.log(`Content type: ${typeof content}`);
      
      let frontmatterData: FrontmatterData = {};
      let markdownContent = '';
      
      // Case 1: If it's an object with frontmatter property (from our markdown plugin)
      if (typeof content === 'object' && content.frontmatter) {
        console.log(`Found frontmatter:`, content.frontmatter);
        frontmatterData = content.frontmatter as FrontmatterData;
        
        // Try to get content from different possible locations
        if (typeof content.raw === 'string' && content.raw) {
          console.log(`Using raw content, length: ${content.raw.length} chars`);
          markdownContent = content.raw;
        } else if (typeof content.default === 'string' && content.default) {
          console.log(`Using default content, length: ${content.default.length} chars`);
          markdownContent = content.default;
        } else if (typeof content === 'string') {
          console.log(`Using content as string, length: ${content.length} chars`);
          markdownContent = content;
        }
      }
      // Case 2: If it's a string (possible direct export from markdown plugin)
      else if (typeof content === 'string') {
        console.log(`Content is a direct string, length: ${content.length} chars`);
        // Check if it has frontmatter
        const frontmatterMatch = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
        if (frontmatterMatch) {
          try {
            // Try to parse YAML frontmatter manually
            const frontmatterStr = frontmatterMatch[1];
            const metadata: Record<string, any> = {};
            frontmatterStr.split('\n').forEach(line => {
              const [key, ...valueParts] = line.split(':');
              if (key && valueParts.length) {
                let value = valueParts.join(':').trim();
                // Handle quoted strings
                if (value.startsWith('"') && value.endsWith('"')) {
                  value = value.slice(1, -1);
                }
                metadata[key.trim()] = value;
              }
            });
            frontmatterData = metadata as FrontmatterData;
            // Remove frontmatter from content
            markdownContent = content.replace(/^---[\s\S]*?---/, '').trim();
            console.log(`Extracted frontmatter from string and removed it from content`);
          } catch (e) {
            console.error('Failed to parse frontmatter from string:', e);
            markdownContent = content;
          }
        } else {
          // No frontmatter, use the whole string as content
          markdownContent = content;
        }
      }
      
      // Ensure frontmatterData.tags is properly typed to avoid TypeScript errors
      const tagValue = frontmatterData.tags || fallback.tags;
      let processedTags: string[];
      
      if (Array.isArray(tagValue)) {
        processedTags = tagValue as string[];
      } else if (typeof tagValue === 'string') {
        processedTags = tagValue.split(',').map(t => t.trim());
      } else {
        processedTags = fallback.tags;
      }
      
      // Combine metadata with fallbacks, preferring actual data when available
      const metadata: BlogMetadata = {
        ...fallback,
        ...frontmatterData,
        tags: processedTags
      } as BlogMetadata;
      
      console.log(`Final markdown content length: ${markdownContent.length} chars`);
      
      // Parse the content into sections
      const sections = markdownContent 
        ? parseContentIntoSections(markdownContent, metadata.title) 
        : [{
            id: 'section-1',
            title: 'Content',
            content: 'No content available.'
          }];
      
      return { 
        metadata, 
        sections, 
        rawContent: markdownContent 
      };
    }
    
    // If no content was found, use fallback
    console.log(`No content found, using fallback for: ${fallback.title}`);
    return {
      metadata: fallback,
      sections: [{
        id: 'section-1',
        title: 'Content',
        content: 'No content available.'
      }],
      rawContent: ''
    };
  } catch (e) {
    console.error('Error parsing blog:', e);
    return {
      metadata: fallback,
      sections: [{
        id: 'section-1',
        title: fallback.title,
        content: 'Content unavailable due to an error.'
      }],
      rawContent: ''
    };
  }
};

// Helper function to parse content into sections
const parseContentIntoSections = (content, defaultTitle) => {
  if (!content || typeof content !== 'string') {
    console.log('Invalid content provided to parseContentIntoSections:', content);
    return [{
      id: 'section-1',
      title: 'Content',
      content: 'No content available.'
    }];
  }

  console.log(`Content length: ${content.length} characters`);
  
  // First, remove frontmatter if present
  let mainContent = content;
  const frontmatterMatch = content.match(/^---[\s\S]*?---/);
  if (frontmatterMatch) {
    mainContent = content.substring(frontmatterMatch[0].length).trim();
    console.log('Removed frontmatter, remaining content:', mainContent.substring(0, 50) + '...');
  }

  // Split by markdown headings (# for h1, ## for h2, ### for h3)
  const sections = [];
  
  // First, check if there's a main title (# Title)
  const mainTitleMatch = mainContent.match(/^#\s+(.+)$/m);
  let contentWithoutMainTitle = mainContent;
  let mainTitle = defaultTitle;
  
  if (mainTitleMatch) {
    mainTitle = mainTitleMatch[1];
    // Remove the main title from content to avoid duplication
    const titleIndex = mainContent.indexOf(mainTitleMatch[0]);
    if (titleIndex !== -1) {
      contentWithoutMainTitle = mainContent.substring(0, titleIndex) + 
                              mainContent.substring(titleIndex + mainTitleMatch[0].length);
      contentWithoutMainTitle = contentWithoutMainTitle.trim();
    }
    console.log('Found main title:', mainTitle);
  }

  // Find all section headers (## and ###)
  const sectionRegex = /^(#{2,3})\s+(.+)$/gm;
  let sectionMatches = Array.from(contentWithoutMainTitle.matchAll(sectionRegex));
  
  console.log(`Found ${sectionMatches.length} section headers`);
  
  // If no section headers found, return the whole content as one section
  if (sectionMatches.length === 0) {
    console.log('No section headers found, using full content');
    // Check if the content is substantial enough to be displayed
    const cleanContent = contentWithoutMainTitle.trim();
    return [{
      id: 'section-1',
      title: mainTitle || defaultTitle || 'Content',
      content: cleanContent.length > 0 ? cleanContent : mainContent // Fallback to the full content if cleaned content is empty
    }];
  }
  
  // Process each section
  for (let i = 0; i < sectionMatches.length; i++) {
    const match = sectionMatches[i];
    const nextMatch = sectionMatches[i + 1];
    
    const sectionTitle = match[2].trim();
    const sectionStart = match.index + match[0].length;
    const sectionEnd = nextMatch ? nextMatch.index : contentWithoutMainTitle.length;
    
    // Get the section content and ensure it's properly trimmed
    let sectionContent = contentWithoutMainTitle.substring(sectionStart, sectionEnd).trim();
    
    // If the section appears empty, add a simple placeholder or skip
    if (!sectionContent || sectionContent.length < 5) {
      console.log(`Section "${sectionTitle}" appears empty or too short, adding placeholder`);
      sectionContent = `Content for ${sectionTitle}`;
    }
    
    sections.push({
      id: `section-${i + 1}`,
      title: sectionTitle,
      content: sectionContent
    });
  }

  // Check if there's content before the first section
  if (sectionMatches.length > 0 && sectionMatches[0].index > 0) {
    const introContent = contentWithoutMainTitle.substring(0, sectionMatches[0].index).trim();
    if (introContent.length > 10) { // Only add if there's meaningful content
      sections.unshift({
        id: 'intro',
        title: 'Introduction',
        content: introContent
      });
    }
  }

  // If no sections were created (unlikely at this point), create a default one
  if (sections.length === 0) {
    sections.push({
      id: 'section-1',
      title: mainTitle || defaultTitle || 'Content',
      content: contentWithoutMainTitle || 'No content available.'
    });
  }

  console.log(`Successfully parsed ${sections.length} sections`);
  return sections;
};

// Parse markdown content with fallbacks
const vpnBlog = safeParse(vpnBlogContent, fallbackMetadata.vpn);
const monorepoBlog = safeParse(monorepoBlogContent, fallbackMetadata.monorepo);
const reactBlog = safeParse(reactBlogContent, fallbackMetadata.react);
const ganBlog = safeParse(ganBlogContent, fallbackMetadata.gan);
const faceRecognitionBlog = safeParse(faceRecognitionBlogContent, fallbackMetadata.faceRecognition);
const cloudIdeBlog = safeParse(cloudIdeBlogContent, fallbackMetadata.cloudIde);

console.log('VPN Blog:', vpnBlog);
console.log('Monorepo Blog:', monorepoBlog);
console.log('React Blog:', reactBlog);
console.log('GAN Blog:', ganBlog);
console.log('Face Recognition Blog:', faceRecognitionBlog);
console.log('Cloud IDE Blog:', cloudIdeBlog);

// Combine all blog data
const blogData = [
  {
    ...vpnBlog.metadata,
    sections: vpnBlog.sections,
    attachment: "/src/data/blogs/vpn-blog/vpn_background.jpg", // Use the other available image
    icon: <Lock className="h-6 w-6 text-cyan-400" />
  },
  {
    ...monorepoBlog.metadata,
    sections: monorepoBlog.sections,
    attachment: "/src/data/blogs/monorepos-turborepos/attatchment_1.webp",
    icon: <GitBranch className="h-6 w-6 text-cyan-400" />
  },
  {
    ...reactBlog.metadata,
    sections: reactBlog.sections,
    attachment: "/src/data/blogs/react-blog/attatchment_1.webp",
    icon: <Code className="h-6 w-6 text-cyan-400" />
  },
  {
    ...ganBlog.metadata,
    sections: ganBlog.sections,
    attachment: null, // Add attachment path if available
    icon: <Brain className="h-6 w-6 text-cyan-400" />
  },
  {
    ...faceRecognitionBlog.metadata,
    sections: faceRecognitionBlog.sections,
    attachment: null, // Add attachment path if available
    icon: <Eye className="h-6 w-6 text-cyan-400" />
  },
  {
    ...cloudIdeBlog.metadata,
    sections: cloudIdeBlog.sections,
    attachment: null, // Add attachment path if available
    icon: <Server className="h-6 w-6 text-cyan-400" />
  },

];

console.log('Combined Blog Data:', blogData);

const CyberTerminal = ({ children, className = "" }) => {
  return (
    <div className={`bg-black/80 border border-cyan-500/30 rounded-md p-3 ${className}`}>
      <div className="flex items-center space-x-2 mb-2 border-b border-cyan-900/50 pb-2">
        <div className="h-3 w-3 rounded-full bg-red-500"></div>
        <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
        <div className="h-3 w-3 rounded-full bg-green-500"></div>
        <div className="flex-1 text-xs text-cyan-500 ml-2 font-mono">TERMINAL-ACCESS</div>
      </div>
      {children}
    </div>
  );
};

const CyberGrid = () => {
  return (
    <div className="fixed inset-0 z-0 opacity-20">
      <div className="w-full h-full"
        style={{
          backgroundImage: 'linear-gradient(to right, #0f172a 1px, transparent 1px), linear-gradient(to bottom, #0f172a 1px, transparent 1px)',
          backgroundSize: '30px 30px'
        }}>
      </div>
    </div>
  );
};

const HexBackground = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full z-0 opacity-10">
      <svg width="100%" height="100%">
        <pattern id="hexagons" width="50" height="43.4" patternUnits="userSpaceOnUse" patternTransform="scale(2)">
          <polygon points="25,0 50,14.4 50,38.6 25,53 0,38.6 0,14.4" fill="none" stroke="#0ea5e9" strokeWidth="0.5" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#hexagons)" />
      </svg>
    </div>
  );
};

const FloatingParticles = () => {
  const particles = Array.from({ length: 15 }).map((_, i) => ({
    id: i,
    size: Math.random() * 4 + 1,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 20 + 10
  }));

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {particles.map(particle => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-cyan-500"
          initial={{ opacity: 0.1, x: `${particle.x}vw`, y: `${particle.y}vh` }}
          animate={{
            opacity: [0.1, 0.3, 0.1],
            x: [`${particle.x}vw`, `${(particle.x + 20) % 100}vw`, `${(particle.x + 40) % 100}vw`],
            y: [`${particle.y}vh`, `${(particle.y + 30) % 100}vh`, `${(particle.y + 15) % 100}vh`]
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`
          }}
        />
      ))}
    </div>
  );
};

const CircuitLines = () => {
  return (
    <div className="fixed inset-0 z-0 opacity-10">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="circuit" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
            <path d="M30,10 L70,10 M50,10 L50,30 M30,30 L70,30 M70,50 L90,50 M70,50 L70,70 M30,70 L70,70 M30,50 L10,50 M30,50 L30,70"
              fill="none" stroke="#0ea5e9" strokeWidth="1" />
            <circle cx="50" cy="10" r="2" fill="#0ea5e9" />
            <circle cx="30" cy="30" r="2" fill="#0ea5e9" />
            <circle cx="70" cy="30" r="2" fill="#0ea5e9" />
            <circle cx="30" cy="50" r="2" fill="#0ea5e9" />
            <circle cx="70" cy="50" r="2" fill="#0ea5e9" />
            <circle cx="30" cy="70" r="2" fill="#0ea5e9" />
            <circle cx="70" cy="70" r="2" fill="#0ea5e9" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#circuit)" />
      </svg>
    </div>
  );
};

const ScanLine = () => {
  return (
    <motion.div
      className="fixed left-0 right-0 h-[2px] bg-cyan-500/30 z-10 pointer-events-none"
      animate={{
        top: ["0%", "100%"],
        opacity: [0.3, 0.6, 0.3]
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "linear"
      }}
    />
  );
};

const TypewriterEffect = ({ text, className = "" }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 50);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text]);

  return <span className={className}>{displayedText}</span>;
};

const BlogCard = ({ blog, index, onSelect }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative"
      onClick={() => onSelect(blog)}
    >
      <CyberTerminal className="h-full transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_15px_rgba(6,182,212,0.4)] cursor-pointer">
        <div className="mb-2 flex justify-between items-start">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-md flex items-center justify-center bg-slate-800 border border-cyan-800">
              {blog.icon}
            </div>
            <div>
              <span className="text-xs text-cyan-400">SECTOR/{blog.category}</span>
            </div>
          </div>
          <div className="flex items-center space-x-2 text-xs">
            <span className="text-slate-400">{blog.date}</span>
            <span className="text-cyan-400 bg-cyan-900/30 px-2 py-0.5 rounded">{blog.readTime}</span>
          </div>
        </div>

        <h3 className="text-lg font-bold text-cyan-300 mb-2 group-hover:text-cyan-200 transition-colors">
          {blog.title}
        </h3>

        {blog.attachment && (
          <div className="mb-4 rounded-md overflow-hidden">
            <img
              src={blog.attachment}
              alt={blog.title}
              className="w-full h-48 object-cover"
            />
          </div>
        )}

        <div className="flex flex-wrap gap-2 mb-2">
          {blog.tags.map((tag, i) => (
            <span key={i} className="text-xs px-2 py-0.5 rounded bg-slate-800 text-cyan-400 border border-cyan-900/50">
              #{tag}
            </span>
          ))}
        </div>

        <div className="text-xs text-slate-400 mb-2">
          Author: <span className="text-cyan-400">{blog.author}</span>
        </div>

        <motion.div
          className="flex items-center text-cyan-500 text-sm font-mono mt-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 + index * 0.1 }}
        >
          <span className="mr-1">&gt;</span>
          <TypewriterEffect text="ACCESS_FILE" className="text-cyan-400" />
          <motion.span
            className="ml-1"
            animate={{ opacity: [0, 1] }}
            transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
          >_</motion.span>
        </motion.div>

        {/* Visual elements */}
        <div className="absolute -top-0.5 -bottom-0.5 -left-0.5 w-1 bg-cyan-500/30 rounded"></div>
        <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-cyan-500/50"></div>
        <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-cyan-500/50"></div>
        <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-cyan-500/50"></div>
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-cyan-500/50"></div>
      </CyberTerminal>
    </motion.div>
  );
};

const StatCard = ({ icon, title, value }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(prev => {
        if (prev < value) return prev + 1;
        clearInterval(interval);
        return prev;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [value]);

  return (
    <div className="bg-slate-900/80 border border-cyan-900/50 rounded-md p-3 flex items-center space-x-3">
      <div className="w-10 h-10 rounded-md flex items-center justify-center bg-slate-800 border border-cyan-800">
        {icon}
      </div>
      <div>
        <div className="text-xs text-slate-400">{title}</div>
        <div className="text-xl font-bold text-cyan-400">{count}</div>
      </div>
    </div>
  );
};

const Blogs = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [category, setCategory] = useState("All");
  const [selectedBlog, setSelectedBlog] = useState(null);

  // Helper function to prepare blog data for BlogReader
  const prepareBlogForReader = (blog) => {
    // Check if blog exists
    if (!blog) return null;
    
    // Convert sections to a single content string if needed
    let content = '';
    if (blog.sections && Array.isArray(blog.sections)) {
      content = blog.sections.map(section => {
        return `## ${section.title}\n\n${section.content}`;
      }).join('\n\n');
    }
    
    // Create a blog object compatible with BlogReader
    return {
      ...blog,
      content: content,
      views: Math.floor(Math.random() * 100) + 50, // Adding some mock data
      likes: Math.floor(Math.random() * 50) + 10,
      comments: Math.floor(Math.random() * 20) + 5,
      author: blog.author || "Kunal"
    };
  };

  const categories = ["All", "Security", "Cryptography", "AI Security", "DevSecOps", "Programming"];

  const filteredBlogs = blogData.filter(blog => {
    if (!blog || !blog.title || !blog.tags) return false;

    const matchesSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.tags.some(tag => tag && tag.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = category === "All" || blog.category === category;

    return matchesSearch && matchesCategory;
  });

  const handleBack = () => {
    setSelectedBlog(null);
  };

  return (
    <div className="min-h-screen w-full p-3 md:p-6">
      <div className="min-h-screen w-full bg-slate-900 text-slate-100 relative overflow-hidden">
        {/* Background elements */}
        <CyberGrid />
        <HexBackground />
        {/* <CircuitLines /> */}
        {/* <AdvancedTechCircuit/> */}
        <MathematicalCircuit/>
        <FloatingParticles />
        <ScanLine />

        {/* Main Content */}
        <div className="relative z-10 max-w-7xl mx-auto p-4 md:p-6 pb-24">
          {/* Header, tabs, stats, etc. */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <div className="flex justify-between items-center mb-4">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="flex items-center space-x-2">
                  <Terminal className="h-6 w-6 text-cyan-400" />
                  <h1 className="text-2xl md:text-3xl font-bold text-cyan-300">
                    NEURAL<span className="text-cyan-500">::</span>ARCHIVE
                  </h1>
                </div>
                <div className="text-sm text-cyan-600 ml-8 font-mono">v2.5.7 [SYSTEM ACTIVE]</div>
              </motion.div>

              <motion.div
                className="flex items-center space-x-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <div className="hidden md:flex space-x-3">
                  <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse"></div>
                  <div className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" style={{ animationDelay: "0.5s" }}></div>
                  <div className="h-2 w-2 rounded-full bg-blue-400 animate-pulse" style={{ animationDelay: "1s" }}></div>
                </div>

                <div className="text-xs md:text-sm">
                  <span className="text-slate-400">UPLINK:</span>
                  <span className="text-green-400 ml-1">ACTIVE</span>
                </div>

                <motion.button
                  className="p-2 rounded-md bg-slate-800 border border-cyan-800 hover:bg-slate-700"
                  onClick={() => setShowSearch(!showSearch)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Eye className="h-4 w-4 text-cyan-400" />
                </motion.button>
              </motion.div>
            </div>

            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: showSearch ? "auto" : 0, opacity: showSearch ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="mb-6 p-4 bg-black/50 border border-cyan-900/30 rounded-md">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="SEARCH//: enter query parameters..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-slate-800 border border-cyan-900/50 rounded-md py-2 px-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 placeholder-slate-500"
                      />
                      <div className="absolute right-3 top-2.5 text-cyan-500 animate-pulse">|</div>
                    </div>
                  </div>

                  <div className="flex flex-nowrap gap-2 overflow-x-auto py-1 md:justify-end">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setCategory(cat)}
                        className={`whitespace-nowrap px-3 py-1.5 rounded-md text-xs border ${category === cat
                          ? "bg-cyan-900/50 text-cyan-300 border-cyan-700"
                          : "bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700"
                          }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <StatCard icon={<Database className="h-5 w-5 text-cyan-400" />} title="ARCHIVES" value={42} />
              <StatCard icon={<Brain className="h-5 w-5 text-purple-400" />} title="AI SYSTEMS" value={7} />
              <StatCard icon={<Server className="h-5 w-5 text-green-400" />} title="NODES" value={16} />
              <StatCard icon={<Network className="h-5 w-5 text-blue-400" />} title="CONNECTIONS" value={128} />
            </motion.div>
          </motion.div>

          {/* Main area: Blog grid or BlogReader */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            {selectedBlog ? (
              <BlogReader blog={prepareBlogForReader(selectedBlog)} onBack={handleBack} embedded={true} blogCategory={selectedBlog.category} />
            ) : (
              <>
                <div className="flex items-center space-x-2 mb-6">
                  <div className="h-1 w-1 rounded-full bg-cyan-400"></div>
                  <div className="h-1 w-1 rounded-full bg-cyan-400"></div>
                  <h2 className="text-xl font-bold text-cyan-400 font-mono">KNOWLEDGE_MATRIX</h2>
                  <div className="h-px flex-grow bg-cyan-900/50"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredBlogs.length > 0 ? (
                    filteredBlogs.map((blog, index) => (
                      <BlogCard
                        key={blog.id}
                        blog={blog}
                        index={index}
                        onSelect={setSelectedBlog}
                      />
                    ))
                  ) : (
                    <motion.div
                      className="col-span-3 text-center py-16"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <div className="inline-block p-4 rounded-full bg-slate-800/50 border border-cyan-900/30 mb-4">
                        <Database className="h-10 w-10 text-cyan-500/50" />
                      </div>
                      <h3 className="text-xl font-mono text-cyan-400 mb-2">NO DATA FOUND</h3>
                      <p className="text-slate-400">Your search parameters returned no results.</p>
                    </motion.div>
                  )}
                </div>
              </>
            )}
          </motion.div>

          {/* Footer */}
          <motion.div
            className="mt-16 border-t border-cyan-900/30 pt-6 text-center text-xs text-slate-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <div>
              <span className="text-cyan-500">[</span>
              SYSTEM
              <span className="text-cyan-500">]</span>
              <span className="mx-2">•</span>
              NEURAL::ARCHIVE
              <span className="mx-2">•</span>
              <span className="text-cyan-500">{new Date().getFullYear()}</span>
            </div>
            <div className="mt-1 flex justify-center items-center space-x-1">
              <div className="h-1 w-1 rounded-full bg-cyan-900"></div>
              <div className="h-px w-12 bg-cyan-900/50"></div>
              <div className="h-1 w-1 rounded-full bg-cyan-900"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Blogs;
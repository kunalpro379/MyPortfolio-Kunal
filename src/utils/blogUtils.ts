import matter from 'gray-matter';
import { Buffer } from 'buffer';

// Add Buffer to window object
if (typeof window !== 'undefined') {
     window.Buffer = Buffer;
}

// Define proper interface for frontmatter
interface Frontmatter {
     title?: string;
     date?: string;
     category?: string;
     tags?: string[] | string;
     readTime?: string;
     author?: string;
     excerpt?: string;
     icon?: string;
     id?: number | string;
     [key: string]: any; // Allow other properties
}

export interface BlogMetadata {
     title: string;
     date: string;
     category: string;
     tags: string[];
     readTime: string;
     author?: string;
     excerpt?: string;
     icon?: string;
     id: number;
}

export interface BlogSection {
     id: string;
     title: string;
     content: string;
     list?: string[];
     subSections?: {
          id: string;
          title: string;
          content: string;
          list?: string[];
     }[];
}

export interface Blog {
     metadata: BlogMetadata;
     sections: BlogSection[];
     rawContent?: string; // Store raw content for direct rendering
}

// Counter for generating unique default IDs
let defaultIdCounter = 100;

export const parseMarkdownBlog = (markdownContent: string): Blog => {
     try {
          // Check if markdownContent is valid - early silent handling for vite import issues
          if (!markdownContent) {
               defaultIdCounter++;
               return {
                    metadata: {
                         title: `Blog ${defaultIdCounter}`,
                         date: new Date().toISOString().split('T')[0],
                         category: "General",
                         tags: ["General"],
                         readTime: "5 min",
                         id: defaultIdCounter
                    },
                    sections: [{
                         id: "section-1",
                         title: "Content",
                         content: "Blog content could not be loaded."
                    }]
               };
          }
          
          // Handle special case for Vite module import objects
          if (typeof markdownContent === 'object') {
               // Try to extract content from the module
               const moduleContent = markdownContent as any;
               
               // Check for common patterns from vite markdown plugins
               if (moduleContent.default) {
                    // Prioritize checking different properties
                    if (moduleContent.default.content) {
                         // Format 1: module.default.content contains the markdown
                         markdownContent = moduleContent.default.content;
                    } else if (moduleContent.default.toString) {
                         // Format 2: module.default can be converted to string
                         markdownContent = moduleContent.default.toString();
                    } else if (typeof moduleContent.default === 'string') {
                         // Format 3: module.default is already a string
                         markdownContent = moduleContent.default;
                    }
                    
                    // If we have frontmatter in the module, use that directly
                    if (moduleContent.default.frontmatter || moduleContent.frontmatter) {
                         const frontMatterData = moduleContent.default.frontmatter || moduleContent.frontmatter;
                         
                         // Return fully formed blog with metadata and sections
                         defaultIdCounter++;
                         return {
                              metadata: {
                                   title: frontMatterData.title || `Blog ${defaultIdCounter}`,
                                   date: frontMatterData.date || new Date().toISOString().split('T')[0],
                                   category: frontMatterData.category || "General",
                                   tags: Array.isArray(frontMatterData.tags) 
                                        ? frontMatterData.tags 
                                        : (frontMatterData.tags ? [frontMatterData.tags] : ["General"]),
                                   readTime: frontMatterData.readTime || "5 min",
                                   id: frontMatterData.id || defaultIdCounter,
                                   author: frontMatterData.author,
                                   excerpt: frontMatterData.excerpt,
                                   icon: frontMatterData.icon
                              },
                              sections: [{
                                   id: "section-1",
                                   title: frontMatterData.title || "Content",
                                   content: markdownContent
                              }],
                              rawContent: markdownContent
                         };
                    }
               } else if (moduleContent.content || moduleContent.raw) {
                    // Format 4: module.content or module.raw contains the markdown
                    markdownContent = moduleContent.content || moduleContent.raw;
               }
          }
          
          // Final check - if we still don't have a string, use an empty one
          if (typeof markdownContent !== 'string') {
               // Convert to string if possible, otherwise empty string
               markdownContent = String(markdownContent || "");
          }

          // Initialize variables
          let content = markdownContent;
          let frontmatter: Frontmatter = {};
          let rawContent = '';
          
          // Check if the content is an object with markdown fields (from vite plugin)
          if (typeof markdownContent === 'string' && markdownContent.includes('export const')) {
               try {
                    // For vite-plugin-markdown format
                    if (markdownContent.includes('export const frontmatter =')) {
                         // Extract the frontmatter JSON
                         const frontmatterMatch = markdownContent.match(/export const frontmatter = ({[\s\S]*?});/);
                         if (frontmatterMatch && frontmatterMatch[1]) {
                              try {
                                   frontmatter = JSON.parse(frontmatterMatch[1].replace(/\\"/g, '"').replace(/\\n/g, '\n'));
                              } catch (e) {
                                   console.warn("Failed to parse frontmatter JSON:", e);
                                   // Fallback: Try eval with safety checks
                                   if (frontmatterMatch[1].trim().startsWith('{') && 
                                       frontmatterMatch[1].trim().endsWith('}')) {
                                       try {
                                           frontmatter = Function('return ' + frontmatterMatch[1])();
                                       } catch (evalError) {
                                           console.error("Failed eval fallback:", evalError);
                                       }
                                   }
                              }
                         }
                         
                         // Extract the raw content
                         const rawMatch = markdownContent.match(/export const raw = ("[\s\S]*?");/);
                         if (rawMatch && rawMatch[1]) {
                              try {
                                   // Handle escaped JSON string
                                   rawContent = JSON.parse(rawMatch[1]);
                                   content = rawContent;
                              } catch (e) {
                                   console.warn("Failed to parse raw content:", e);
                                   // Try a different approach
                                   rawContent = rawMatch[1].slice(1, -1)
                                       .replace(/\\"/g, '"')
                                       .replace(/\\n/g, '\n');
                                   content = rawContent;
                              }
                         }
                    }
                    // Handle the old format where content is exported as "export default"
                    else if (content.startsWith('export default')) {
                         const match = content.match(/export default\s+({[\s\S]*?})/);
                         if (match && match[1]) {
                              try {
                                   const parsed = Function('return ' + match[1])();
                                   if (parsed && parsed.content) {
                                       rawContent = parsed.content;
                                       content = rawContent;
                                       if (parsed.frontmatter) {
                                           frontmatter = parsed.frontmatter;
                                       }
                                   }
                              } catch (e) {
                                   console.error("Error parsing export default content:", e);
                              }
                         }
                    }
               } catch (e) {
                    console.error("Error extracting content:", e);
               }
          }

          // If we don't have parsed content yet, try using gray-matter directly
          if (!rawContent && content === markdownContent) {
               try {
                    const parsedMatter = matter(markdownContent);
                    frontmatter = parsedMatter.data;
                    content = parsedMatter.content;
                    rawContent = content;
               } catch (e) {
                    console.error("Failed to parse with gray-matter:", e);
               }
          }

          // Prepare metadata
          let completeMetadata;
          
          // If we have frontmatter
          if (frontmatter && typeof frontmatter === 'object') {
               defaultIdCounter++;
               const defaultMetadata = {
                    title: `Untitled Blog ${defaultIdCounter}`,
                    date: new Date().toISOString().split('T')[0],
                    category: "General",
                    tags: ["General"],
                    readTime: "5 min",
                    id: defaultIdCounter
               };
               
               // Create a safe copy of frontmatter with default fallbacks
               const safeFrontmatter = { ...frontmatter };
               
               try {
                    // Build complete metadata with proper type safety
                    completeMetadata = {
                         ...defaultMetadata,
                         ...safeFrontmatter,
                         // Safely ensure tags is always an array
                         tags: (() => {
                              if (!safeFrontmatter.tags) return defaultMetadata.tags;
                              if (Array.isArray(safeFrontmatter.tags)) return safeFrontmatter.tags;
                              return [String(safeFrontmatter.tags)]; // Convert any non-array to string array
                         })(),
                         // Safely ensure id is always a number
                         id: (() => {
                              if (!safeFrontmatter.id) return defaultMetadata.id;
                              const parsedId = Number(safeFrontmatter.id);
                              return isNaN(parsedId) ? defaultMetadata.id : parsedId;
                         })()
                    };
               } catch (err) {
                    console.error("Error processing frontmatter:", err);
                    completeMetadata = { ...defaultMetadata };
               }
          } 
          else {
               // Try to find frontmatter in traditional markdown format
               const frontmatterMatch = content.match(/^---\s*([\s\S]*?)\s*---/);
               
               if (!frontmatterMatch) {
                    // No frontmatter found, use defaults
                    defaultIdCounter++;
                    return {
                         metadata: {
                              title: `Untitled Blog ${defaultIdCounter}`,
                              date: new Date().toISOString().split('T')[0],
                              category: "General",
                              tags: ["General"],
                              readTime: "5 min",
                              id: defaultIdCounter
                         },
                         sections: [{
                              id: "section-1",
                              title: "Content",
                              content: content
                         }],
                         rawContent: content
                    };
               }

               // Extract and parse frontmatter
               const frontmatterYaml = frontmatterMatch[1];
               content = content.slice(frontmatterMatch[0].length).trim();
               rawContent = content;
               
               // Parse YAML frontmatter
               const metadata: Record<string, any> = {};
               const lines = frontmatterYaml.split('\n');
               
               for (const line of lines) {
                    const parts = line.split(':').map(part => part.trim());
                    if (parts.length >= 2) {
                         const key = parts[0].replace(/"/g, '');
                         // Join back parts in case there were colons in the value
                         let value = parts.slice(1).join(':').trim();
                         
                         // Handle arrays
                         if (value.startsWith('[') && value.endsWith(']')) {
                              try {
                                   // Parse as JSON array
                                   metadata[key] = JSON.parse(value.replace(/'/g, '"'));
                              } catch {
                                   // Fallback: split by commas
                                   metadata[key] = value.slice(1, -1).split(',').map(item => 
                                        item.trim().replace(/"/g, '').replace(/'/g, '')
                                   );
                              }
                         } 
                         // Handle quoted strings
                         else if ((value.startsWith('"') && value.endsWith('"')) || 
                                  (value.startsWith("'") && value.endsWith("'"))) {
                              metadata[key] = value.slice(1, -1);
                         } 
                         // Handle other values
                         else {
                              metadata[key] = value;
                         }
                    }
               }
               
               // Default values for required fields
               defaultIdCounter++;
               const defaultMetadata = {
                    title: `Untitled Blog ${defaultIdCounter}`,
                    date: new Date().toISOString().split('T')[0],
                    category: "General",
                    tags: ["General"],
                    readTime: "5 min",
                    id: defaultIdCounter
               };
               
               // Ensure we have complete metadata
               completeMetadata = {
                    ...defaultMetadata,
                    ...metadata,
                    // Ensure tags is always an array
                    tags: Array.isArray(metadata.tags) ? metadata.tags : (metadata.tags ? [metadata.tags] : defaultMetadata.tags),
                    // Ensure id is always a number
                    id: metadata.id ? Number(metadata.id) : defaultMetadata.id
               };
          }

          // Split content into sections based on markdown headers
          const sections = content.split(/(?=^#{2,3}\s)/m).map((section, index) => {
               const lines = section.trim().split('\n');
               const title = lines[0].replace(/^#{2,3}\s/, '') || `Section ${index + 1}`;
               const content = lines.slice(1).join('\n').trim();

               return {
                    id: `section-${index + 1}`,
                    title,
                    content,
               };
          });
          
          // If there are no sections from headers, use the whole content as one section
          const finalSections = sections.length > 0 ? sections : [{
               id: 'section-1',
               title: completeMetadata.title || 'Content',
               content: content
          }];

          return {
               metadata: completeMetadata as BlogMetadata,
               sections: finalSections,
               rawContent: rawContent // Store raw markdown for direct rendering if needed
          };
     } catch (error) {
          console.error('Error parsing markdown:', error);
          
          // For errors, generate a unique error ID too
          defaultIdCounter++;
          
          // Instead of throwing an error, return a default blog object
          return {
               metadata: {
                    title: `Error Loading Blog ${defaultIdCounter}`,
                    date: new Date().toISOString().split('T')[0],
                    category: "Error",
                    tags: ["Error"],
                    readTime: "Unknown",
                    id: defaultIdCounter
               },
               sections: [{
                    id: "section-error",
                    title: "Error",
                    content: "There was an error loading this blog post. Please try again later."
               }]
          };
     }
};
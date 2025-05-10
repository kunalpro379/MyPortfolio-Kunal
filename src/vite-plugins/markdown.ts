import { Plugin } from 'vite';
import fs from 'fs';
import matter from 'gray-matter';
import { marked } from 'marked';
import hljs from 'highlight.js';

// Create a proper interface that extends MarkedOptions to include highlight
interface ExtendedMarkedOptions {
  highlight?: (code: string, lang: string) => string;
  gfm?: boolean;
  breaks?: boolean;
  pedantic?: boolean;
  smartLists?: boolean;
  smartypants?: boolean;
}

export default function markdownPlugin(): Plugin {
  return {
    name: 'vite-plugin-markdown',
    async transform(code, id) {
      if (id.endsWith('.md')) {
        try {
          // Read the file content
          const fileContent = fs.readFileSync(id, 'utf-8');
          
          // Parse frontmatter and content using gray-matter
          const { data, content } = matter(fileContent);
          
          // Configure marked with syntax highlighting
          // Use the extended type to avoid TypeScript errors
          marked.setOptions({
            highlight: function(code, lang) {
              if (lang && hljs.getLanguage(lang)) {
                try {
                  return hljs.highlight(code, { language: lang }).value;
                } catch (err) {
                  console.error(err);
                }
              }
              return hljs.highlightAuto(code).value;
            },
            gfm: true,
            breaks: true,
            pedantic: false,
            smartLists: true,
            smartypants: true,
          } as ExtendedMarkedOptions);

          // Parse markdown content to HTML
          const html = marked(content);

          // Here's the improved export format
          return {
            code: `
              // Export frontmatter as an object
              export const frontmatter = ${JSON.stringify(data)};
              
              // Export HTML and raw content as strings
              export const html = ${JSON.stringify(html)};
              export const raw = ${JSON.stringify(content)};
              
              // Export the raw content as the default string export
              // This makes it work with standard string imports
              export default ${JSON.stringify(content)};
              
              // Also provide a combined object format with all data
              export const markdown = { 
                frontmatter: ${JSON.stringify(data)}, 
                html: ${JSON.stringify(html)}, 
                content: ${JSON.stringify(content)}
              };
            `,
            map: null
          };
        } catch (err) {
          console.error(`Error processing markdown file ${id}:`, err);
          return {
            code: `
              export const frontmatter = {};
              export const html = "";
              export const raw = "";
              export default "";
              export const markdown = { frontmatter: {}, html: "", content: "" };
            `,
            map: null
          };
        }
      }
    }
  };
}
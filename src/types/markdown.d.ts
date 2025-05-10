declare module '*.md' {
     // Define the structure that matches how markdown files are processed by Vite
     const content: {
          frontmatter?: {
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
          };
          default: string;
          raw?: string;
          render?: () => string;
     };
     export default content;
}
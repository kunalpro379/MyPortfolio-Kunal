// filepath: c:\Users\kunal\OneDrive\CODE FOR LIFE\portfolio-react\Portfolio\src\types\react-markdown.d.ts
import 'react-markdown';

declare module 'react-markdown' {
  interface ReactMarkdownOptions {
    // Add missing properties that are actually valid for ReactMarkdown
    className?: string;
    blogCategory?: string;
    [key: string]: any;
  }
}
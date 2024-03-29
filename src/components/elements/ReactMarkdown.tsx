import React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';

const components: any = {
  code({ className, children, ...props }): any {
    const match = /language-(\w+)/.exec(className || '');
    return match
      ? <SyntaxHighlighter language={match[1]} PreTag='div' style={atomDark} {...props}>{children}</SyntaxHighlighter>
      : <code className={className} {...props}>{children}</code>;
  }
};

interface Props {
  children: string;
}

const ReactMarkdownCustom: React.FC<Props> = ({ children }) => {
  return (
    <ReactMarkdown
      rehypePlugins={[rehypeRaw]}
      components={components}
    >
      {children}
    </ReactMarkdown>
  );
};

export default ReactMarkdownCustom;

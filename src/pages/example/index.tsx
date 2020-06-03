import React from 'react';
import ReactMarkdown from 'react-markdown/with-html';

import Container from 'react-bootstrap/Container';

import content from './index.md';

const ExamplePage: React.FC = () => {
  return (
    <Container>
      <ReactMarkdown
        source={content}
        escapeHtml={false}
      />
    </Container>
  );
};

export default ExamplePage;

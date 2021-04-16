import React from 'react';

import Container from 'react-bootstrap/Container';

import ReactMarkdown from '../../components/elements/ReactMarkdown';

import content from './index.md';

const ExamplePage: React.FC = () => {
  return (
    <Container>
      <ReactMarkdown>
        {content}
      </ReactMarkdown>
    </Container>
  );
};

export default ExamplePage;

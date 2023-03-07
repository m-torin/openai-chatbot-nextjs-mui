import React, { ReactNode } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import Typography from "@mui/material/Typography";
import Box from '@mui/material/Box';

/**
 * An object representing a match for a code block in a message.
 * @typedef {Object} CodeBlockMatch
 * @property {string} language - The language of the code block.
 * @property {string} content - The content of the code block.
 */
type CodeBlockMatch = {
  language: string;
  content: string;
};

/**
 * Parses a message for code blocks, and returns an array of React components
 * for rendering the message with highlighted code blocks.
 * @param {string | undefined} message - The message to be parsed and rendered.
 * @returns {ReactNode[]} An array of React components for rendering the message with highlighted code blocks.
 */
const renderMessage = (message?: string): ReactNode[] => {
  if (!message) {
    return [];
  }

  // Match all code blocks in the message
  const codeBlocks = message.match(/```(?<language>[\w-]*)\n(?<content>[\s\S]*?)\n```/g);

  // If no code blocks are found, return the message as plain text
  if (!codeBlocks) {
    return [<Typography variant="body1">{message}</Typography>];
  }

  // Create an array to hold the message parts and iterate over the code blocks
  const messageParts: ReactNode[] = [];
  let lastIndex = 0;

  codeBlocks.forEach((codeBlock, index) => {
    // Get the start index of the current code block in the message
    const startIndex = message.indexOf(codeBlock, lastIndex);

    // If there is plain text before the current code block, add it to the message parts
    if (startIndex > lastIndex) {
      messageParts.push(
        <Typography key={`text-${index}`} variant="body1">
          {message.substring(lastIndex, startIndex)}
        </Typography>
      );
    }

    // Extract the language and content from the current code block using optional chaining and nullish coalescing
    const codeBlockMatch = codeBlock.match(/```(?<language>[\w-]*)\n(?<content>[\s\S]*?)\n```/)?.groups ?? { language: 'javascript', content: '' };
    const { language, content } = codeBlockMatch as CodeBlockMatch;

    // Add the syntax-highlighted code block to the message parts
    messageParts.push(
      <Box sx={{ marginBottom: 3 }}>
        <SyntaxHighlighter key={`code-${index}`} language={language} wrapLines>
          {`${content}`}
        </SyntaxHighlighter>
      </Box>
    );

    // Update the last index to the end of the current code block
    lastIndex = startIndex + codeBlock.length;
  });

  // If there is plain text after the last code block, add it to the message parts
  if (lastIndex < message.length) {
    messageParts.push(
      <Typography key={`text-end`} variant="body1">
        {message.substring(lastIndex)}
      </Typography>
    );
  }

  return messageParts;
};

export default renderMessage;

import { memo, useMemo } from 'react';
import Box from '@mui/material/Box';
import clsx from 'clsx';
import styles from './MessageBubble.module.css';
import RenderMessage from './RenderMessage';

/**
 * Props for the MessageBubble component
 * @typedef {Object} IMessageBubbleProps
 * @property {string} message - The message to be rendered.
 * @property {number|string} messageKey - A key to identify the message.
 * @property {'user' | 'assistant'} role - The role of the message sender.
 */
interface IMessageBubbleProps {
  message: string;
  messageKey: number | string;
  role: 'user' | 'assistant';
}

/**
 * Renders a message bubble component based on the role of the sender.
 * @param {IMessageBubbleProps} props - The props for the component.
 * @returns {JSX.Element} The rendered message bubble component.
 */
const MessageBubble = memo(({ message, role, messageKey }: IMessageBubbleProps): JSX.Element => {
  // Conditionally applies class names based on the role of the message sender
  const messageClass = clsx(styles.message, role === 'user' ? styles.user : styles.assistant);

  // Memoizes the rendered message to prevent unnecessary re-renders
  const renderedMessage = useMemo(() => RenderMessage(message), [message]);

  return (
    <Box key={messageKey} className={messageClass}>
      {renderedMessage}
    </Box>
  );
});

export default MessageBubble;

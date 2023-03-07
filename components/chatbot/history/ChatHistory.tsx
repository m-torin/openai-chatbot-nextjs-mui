import { ChatMessage } from '../../../pages/api/chatbot';
import Box from '@mui/material/Box';
import { RefObject } from 'react';
import SystemMessage from './SystemMessage';
import MessageBubble from './MessageBubble';

/**
 * Props for the ChatHistory component
 * @typedef {Object} ChatHistoryProps
 * @property {ChatMessage[]} chatHistory - An array of objects representing the chat history.
 * @property {RefObject<HTMLDivElement>} chatHistoryRef - A reference to the chat history container.
 */
type ChatHistoryProps = {
  chatHistory: ChatMessage[];
  chatHistoryRef: RefObject<HTMLDivElement>;
};

/**
 * Renders the chat history.
 * @param {ChatHistoryProps} props - The props for the component.
 * @returns {JSX.Element} The rendered ChatHistory component.
 */
const ChatHistory = ({ chatHistory, chatHistoryRef }: ChatHistoryProps): JSX.Element => {
  /**
   * Renders a chat message bubble based on the role of the chat message.
   * @param {ChatMessage} chatMessage - The chat message object to render.
   * @param {number} index - The index of the chat message object in the chat history array.
   * @returns {JSX.Element} The rendered chat message bubble.
   */
  const renderChatMessage = ({ role, content }: ChatMessage, index: number): JSX.Element => {
    switch (role) {
      case "system":
        return <SystemMessage key={index} content={content} />;
      case "assistant":
        return (<MessageBubble messageKey={index} message={content} role="assistant" />);
      default:
        return (<MessageBubble messageKey={index} message={content} role="user" />);
    }
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        marginBottom: 3,
        padding: 2,
        overflow: "hidden",
      }}
    >
      <Box
        ref={chatHistoryRef}
        sx={{
          height: "100%",
          overflowY: "auto",
          flex: 1,
        }}
      >
        {chatHistory.map(renderChatMessage)}
      </Box>
    </Box>
  );
};

export default ChatHistory;

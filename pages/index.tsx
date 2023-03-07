import { useState } from 'react';
import ChatbotPage from '../components/chatbot/ChatbotPage';
import { ChatRequestBody, ChatMessage, OpenAIChatCompletion } from './api/chatbot';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';

/**
 * A container component for the chatbot page.
 * @component
 */
const ChatbotContainer = () => {
  /**
   * The state for the chat history, initially set to a system message introducing the chatbot.
   * @type {ChatMessage[]} An array containing the chat messages, each with a role and content property.
   */
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
    {
      role: 'system',
      content: 'I am a helpful chatbot. I can help you write ES6 TypeScript code.',
    },
  ]);

  // The state for the submission status of the user message form
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  /**
   * Handles the submission of a user message to the chatbot API, updates the chat history with the user message and the bot response.
   * @async
   * @param {string} userInput - The user's message to be submitted to the chatbot API.
   */
  const submitUserMessage = async (userInput: string) => {
    setIsSubmitting(true);

    // Construct the request body for the chatbot API
    const requestBody: ChatRequestBody = {
      model: 'gpt-3.5-turbo',
      messages: [...chatHistory, { role: 'user', content: userInput }],
    };

    try {
      // Call the chatbot API with the request body
      const response = await fetch('/api/chatbot', {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const responseData: OpenAIChatCompletion = await response.json();

      // Add the chatbot's response to the chat history
      setChatHistory([...requestBody.messages, responseData.choices[0].message]);
    } catch (error) {
      console.error(error);
    }
    setIsSubmitting(false);
  };

  return (
    <Container>
      <Paper elevation={2}>
        <ChatbotPage
          chatHistory={chatHistory}
          isSubmitting={isSubmitting}
          submitUserMessage={submitUserMessage}
        />
      </Paper>
    </Container>
  );
};

export default ChatbotContainer;

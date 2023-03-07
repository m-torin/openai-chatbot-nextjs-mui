import { ChangeEvent, FormEvent, useCallback, useRef, useState } from 'react';
import ChatbotForm from './form/ChatbotForm';
import { ChatMessage } from '../../pages/api/chatbot';
import Stack from '@mui/material/Stack';
import ChatHistory from './history/ChatHistory';

/**
 * Props for the ChatbotPage component.
 */
type ChatbotPageProps = {
  /**
   * An array of objects representing the chat history.
   */
  chatHistory: ChatMessage[];
  /**
   * A flag indicating whether the user message is being submitted.
   */
  isSubmitting: boolean;
  /**
   * A function to submit the user message to the chatbot.
   * @param {string} userInput - The user message to submit.
   */
  submitUserMessage: (userInput: string) => Promise<void>;
};

/**
 * Renders a chatbot page with a chat history and a form for submitting messages.
 * @param {ChatbotPageProps} props - The props for the component.
 * @returns {JSX.Element} The rendered chatbot page.
 */
const ChatbotPage = ({ chatHistory, isSubmitting, submitUserMessage }: ChatbotPageProps): JSX.Element => {
  // Reference to chat history container
  const chatHistoryRef = useRef<HTMLDivElement>(null);
  // User input state
  const [userInput, setUserInput] = useState('');

  // Handle input change event
  const handleInputChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setUserInput(event.target.value);
  }, []);

  // Handle form submission event
  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      // Submit user message to the chatbot
      await submitUserMessage(userInput);
      setUserInput('');
    } catch (error) {
      // Handle error and display message to user
      console.error(error);
    }
  };

  return (
    <>
      <Stack
        direction="column"
        justifyContent="space-around"
        alignItems="stretch"
        sx={{ height: '100vh', backgroundColor: '#fff', padding: '2rem' }}
        spacing={2} 
      >
        <ChatHistory chatHistory={chatHistory} chatHistoryRef={chatHistoryRef}  />
        <ChatbotForm
          handleFormSubmit={handleFormSubmit}
          userInput={userInput}
          isSubmitting={isSubmitting}
          handleInputChange={handleInputChange}
        />
      </Stack>
    </>
  );
};

export default ChatbotPage;

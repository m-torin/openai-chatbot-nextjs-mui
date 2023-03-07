import { ChangeEvent, FormEvent, memo,KeyboardEvent } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import styles from './ChatbotForm.module.css';

/**
 * Props for the ChatbotForm component
 * @typedef {Object} ChatbotFormProps
 * @property {(event: FormEvent<HTMLFormElement>) => void} handleFormSubmit - A function to handle the form submission event.
 * @property {string} userInput - The input value of the chatbot form.
 * @property {boolean} isSubmitting - A flag indicating whether a message is being submitted.
 * @property {(event: ChangeEvent<HTMLInputElement>) => void} handleInputChange - A function to handle input change event.
 */
type ChatbotFormProps = {
  handleFormSubmit: (event: FormEvent<HTMLFormElement>) => void;
  userInput: string;
  isSubmitting: boolean;
  handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

/**
 * Renders a form for submitting messages to a chatbot.
 * @param {ChatbotFormProps} props - The props for the component.
 * @returns {JSX.Element} The rendered chatbot form.
 */
const ChatbotForm = ({
  handleFormSubmit,
  userInput,
  isSubmitting,
  handleInputChange,
}: ChatbotFormProps): JSX.Element => {

  /**
   * Handles the key down event on the input field. If the Enter key is pressed
   * without the Shift key, it prevents the default behavior (submitting the form)
   * and triggers the form submit manually.
   * @param {KeyboardEvent<HTMLInputElement>} event - The key down event.
   */
  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleFormSubmit(event as unknown as FormEvent<HTMLFormElement>);
    }
  };

  return (
    <Box>
      <form onSubmit={handleFormSubmit} className={styles.form}>
        <Stack direction="row" spacing={2}>
          <TextField
            label="Message"
            aria-label="Type your message here"
            maxRows={14}
            multiline
            fullWidth
            value={userInput}
            variant="outlined"
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            className={styles.input}
          />
          <Button
            color="primary"
            aria-label="Send message"
            type="submit"
            variant="contained"
            disabled={isSubmitting}
            startIcon={isSubmitting && <CircularProgress size={20} />}
            className={styles.button}
          >
            {isSubmitting ? 'Sending...' : 'Send'}
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default memo(ChatbotForm);

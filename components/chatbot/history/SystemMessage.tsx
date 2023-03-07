import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

/**
 * Props for the SystemMessage component
 * @typedef {Object} SystemMessageProps
 * @property {string} content - The content of the system message.
 */
type SystemMessageProps = {
  content: string;
};

/**
 * Renders a system message with an info alert style.
 * @param {SystemMessageProps} props - The props for the component.
 * @returns {JSX.Element} The rendered system message.
 */
const SystemMessage = ({ content }: SystemMessageProps): JSX.Element => (
  <Alert severity="info" sx={{ marginBottom: 2 }}>
    <AlertTitle>Chat baseline</AlertTitle>
    {content}
  </Alert>
);

export default SystemMessage;

import styles from "./Message.module.css";

/**
 * Renders a message component with the provided message.
 *
 * @param {string} message - The message to be displayed
 * @return {JSX.Element} The rendered message component
 */
function Message({ message }: { message: string }): JSX.Element {
  console.log(message);
  return (
    <p className={styles.message}>
      <span role="img">👋</span> {message}
    </p>
  );
}

export default Message;

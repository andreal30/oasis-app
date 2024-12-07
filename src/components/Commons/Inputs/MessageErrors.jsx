import PropTypes from "prop-types";
import { Message } from "primereact/message";

const MessageErrors = ({ touched, error }) => {
  if (!touched || !error) {
    return null;
  }

  return (
    <Message
      severity='error'
      text={error}
      className='w-full justify-content-start mb-1 border-2 border-round-3xl text-error border-error bg-error-light'
      style={{ backgroundColor: "transparent" }}
      icon='text-error pi pi-times-circle'
    />
  );
};

MessageErrors.propTypes = {
  touched: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
};

export default MessageErrors;

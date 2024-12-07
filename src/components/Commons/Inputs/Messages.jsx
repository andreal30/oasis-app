import PropTypes from "prop-types";
import { Message } from "primereact/message";

const Messages = ({ text, severity }) => {
  const classes = `w-full justify-content-start mb-1 border-2 border-round-3xl`;
  const style = { backgroundColor: "transparent" };

  return (
    <Message
      severity={severity}
      text={text}
      className={`${classes} ${
        severity === "error"
          ? "text-error border-error bg-error-light"
          : severity === "success"
          ? "text-success border-success bg-success-light"
          : severity === "warning"
          ? "text-warning border-warning bg-warning-light"
          : "text-info border-info bg-info-light"
      }`}
      style={style}
      icon={
        severity === "error"
          ? "text-error pi pi-times-circle"
          : severity === "success"
          ? "text-success pi pi-check-circle"
          : severity === "warning"
          ? "text-warning pi pi-exclamation-triangle"
          : "text-info pi pi-info-circle"
      }
    />
  );
};

Messages.propTypes = {
  text: PropTypes.string.isRequired,
  severity: PropTypes.oneOf(["error", "success", "warning", "info"]).isRequired,
};

export default Messages;

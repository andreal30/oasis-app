import PropTypes from "prop-types";
import { Button } from "primereact/button";

const IconButton = ({
  label,
  iconClass = "",
  className = "",
  type = "submit",
  onClick = () => {},
  disabled = false,
  size = "normal",
  outlined = false,
}) => {
  return (
    <Button
      aria-label={label}
      icon={`pi pi-${iconClass}`}
      className={`my-btn ${className}`}
      type={type}
      onClick={onClick}
      disabled={disabled}
      rounded
      size={size}
      outlined={outlined}
    />
  );
};

IconButton.propTypes = {
  label: PropTypes.string.isRequired,
  iconClass: PropTypes.string.isRequired,
  className: PropTypes.string,
  type: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  size: PropTypes.string,
  outlined: PropTypes.bool,
};

export default IconButton;

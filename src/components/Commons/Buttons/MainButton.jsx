import PropTypes from "prop-types";
import { Button } from "primereact/button";

const MainButton = ({
  label,
  icon = false,
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
      label={label}
      icon={icon ? `pi pi-${iconClass}` : null}
      className={icon ? `my-btn pr-1-5 ${className}` : `my-btn ${className}`}
      type={type}
      onClick={onClick}
      disabled={disabled}
      rounded
      size={size}
      outlined={outlined}
    />
  );
};

MainButton.propTypes = {
  label: PropTypes.string.isRequired,
  icon: PropTypes.bool,
  iconClass: PropTypes.string,
  className: PropTypes.string,
  type: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  size: PropTypes.string,
  outlined: PropTypes.bool,
};

export default MainButton;

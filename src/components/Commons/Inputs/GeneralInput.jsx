import PropTypes from "prop-types";
import { FloatLabel } from "primereact/floatlabel";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";

const GeneralInput = ({
  id,
  name,
  value,
  onChange,
  iconClass,
  label,
  type = "text",
  className = "",
  disabled = false,
  autocomplete = "on", // Default to 'on'
}) => {
  const handleNumberChange = (e) => {
    onChange(e); // Handle numeric inputs
  };

  const handleTextChange = (e) => {
    onChange(e); // Handle text inputs
  };

  return (
    <FloatLabel>
      <IconField iconPosition='left' className='w-full text-400'>
        <InputIcon className={`pl-1 text-400 pi pi-${iconClass}`}> </InputIcon>
        {type === "number" ? (
          <InputNumber
            inputId={id}
            id={id}
            name={name}
            value={value}
            onValueChange={handleNumberChange} // Call the number handler
            className={`w-full input-main ${className}`}
            mode='decimal'
            disabled={disabled}
            autoComplete={autocomplete} // Add autocomplete
          />
        ) : (
          <InputText
            // inputId={id}
            id={id}
            name={name}
            value={value}
            className={`w-full input-main ${className}`}
            onChange={handleTextChange} // Call the text handler
            type={type}
            disabled={disabled}
            autoComplete={autocomplete} // Add autocomplete
          />
        )}
      </IconField>
      <label htmlFor={id} className='left-3 text-400'>
        {label}
      </label>
    </FloatLabel>
  );
};

GeneralInput.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.oneOf([null]),
  ]),
  onChange: PropTypes.func.isRequired,
  iconClass: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["text", "number", "email"]),
  className: PropTypes.string,
  disabled: PropTypes.bool,
  autocomplete: PropTypes.string, // New prop
};

export default GeneralInput;

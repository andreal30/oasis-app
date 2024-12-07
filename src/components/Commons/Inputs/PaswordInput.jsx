import PropTypes from "prop-types";
import { FloatLabel } from "primereact/floatlabel";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { Password } from "primereact/password";

const PasswordInput = ({
  id,
  name,
  value,
  onChange,
  label,
  disabled = false,
  autocomplete = "current-password", // Default to password-specific autocomplete
}) => (
  <FloatLabel>
    <IconField iconPosition='left' className='w-full text-400'>
      <InputIcon className='pi pi-lock text-400 z-5'> </InputIcon>
      <Password
        id={id}
        name={name}
        value={value}
        className='w-full input-main'
        onChange={onChange}
        feedback={false}
        toggleMask={!disabled}
        disabled={disabled}
        autoComplete={autocomplete} // Add autocomplete
      />
    </IconField>
    <label htmlFor={id} className='left-3 text-400'>
      {label}
    </label>
  </FloatLabel>
);

PasswordInput.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  autocomplete: PropTypes.string, // New prop
};

export default PasswordInput;

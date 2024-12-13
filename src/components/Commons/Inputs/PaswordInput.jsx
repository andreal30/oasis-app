import PropTypes from "prop-types";
import { FloatLabel } from "primereact/floatlabel";
import { Password } from "primereact/password";
import { Divider } from "primereact/divider";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";

const PasswordInput = ({
  id,
  name,
  value,
  onChange,
  label,
  disabled = false,
  autoComplete = "current-password",
  isNew = false,
}) => {
  const header = isNew ? (
    <div className='font-bold mb-3'>Let&apos;s secure your account!</div>
  ) : null;
  const footer = isNew ? (
    <>
      <Divider />
      <p className='mt-2'>Password tips:</p>
      <ul className='pl-3 ml-2 mt-0 line-height-3'>
        <li>Include at least one lowercase letter</li>
        <li>Add one uppercase letter</li>
        <li>Use at least one number</li>
        <li>Make it 8 characters or longer</li>
      </ul>
    </>
  ) : null;

  return (
    <FloatLabel>
      <IconField iconPosition='left' className='w-full text-400'>
        <InputIcon className='pi pi-lock text-400 z-5'> </InputIcon>
        <Password
          inputId={id}
          name={name}
          value={value}
          className='w-full input-main'
          onChange={onChange}
          disabled={disabled}
          autoComplete={autoComplete}
          toggleMask={!disabled}
          feedback={isNew} // Show feedback only for new password creation
          header={header}
          footer={footer}
          promptLabel='Create a strong password'
          weakLabel="Hmm, that's too simple"
          mediumLabel='Looks decent, but could be better'
          strongLabel='Great! Your password is strong'
        />
      </IconField>
      <label htmlFor={id} className='text-gray-500 left-3'>
        {label || "Password"}
      </label>
    </FloatLabel>
  );
};

PasswordInput.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string,
  disabled: PropTypes.bool,
  autoComplete: PropTypes.string,
  isNew: PropTypes.bool,
};

export default PasswordInput;

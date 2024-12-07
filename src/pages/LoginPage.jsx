import { FloatLabel } from "primereact/floatlabel";
import GeneralInput from "../components/Commons/Inputs/GeneralInput";
import { InputText } from "primereact/inputtext";

const LoginPage = () => {
  return (
    <>
      <GeneralInput
        id='email'
        name='email'
        value=' '
        onChange={(e) => console.log(e.target.value)}
        iconClass='pi pi-at text-500'
        label='Email'
      />
      <br />
      <FloatLabel>
        <InputText
          id='username'
          value=' '
          onChange={(e) => setValue(e.target.value)}
        />
        <label htmlFor='username'>Username</label>
      </FloatLabel>
    </>
  );
};

export default LoginPage;

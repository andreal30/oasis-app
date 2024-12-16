import LogoWhite from "./../../images/SVG/logo-white.svg";
import { Image } from "primereact/image";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import Navbar from "./Navbar";
import IconButton from "./Buttons/IconButton";

const Header = () => {
  const [visible, setVisible] = useState(false);
  const { user } = useAuth();

  return (
    <>
      <header
        id='header'
        className='header flex w-full bg-main-800 text-white p-3 justify-content-between fixed z-5'
      >
        <div className='flex gap-3 align-items-center'>
          <a href='/home'>
            <Image src={LogoWhite} alt='Image' width='50' />
          </a>
          <p>Hello {user?.firstName}!</p>
        </div>
        <IconButton
          iconClass='bars'
          label='Menu'
          onClick={() => setVisible(true)}
        />
      </header>
      <Navbar visible={visible} setVisible={setVisible} />
    </>
  );
};

export default Header;

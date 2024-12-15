import Logo from "./../../images/SVG/logo.svg";
import { Sidebar } from "primereact/sidebar";
import { Image } from "primereact/image";
import PropTypes from "prop-types";
import MainNavigation from "./MainNavigation";
import IconButton from "./Buttons/IconButton";

const Navbar = ({ visible, setVisible }) => {
  return (
    <div className='card flex justify-content-center'>
      <Sidebar
        // visible={visible}
        // position="right"
        // onHide={() => setVisible(false)}
        // content={({ closeIconRef, hide }) => (
        visible={visible}
        position='right'
        onHide={() => setVisible(false)}
        content={() => (
          <div className='min-h-screen flex relative lg:static surface-ground'>
            <div
              id='app-sidebar-2'
              className='surface-section w-full h-screen block flex-shrink-0 absolute lg:static left-0 top-0 z-1 border-right-1 surface-border select-none'
              style={{ width: "280px" }}
            >
              <div className='flex flex-column h-full'>
                <div className='flex align-items-center justify-content-between px-4 pt-3 flex-shrink-0'>
                  <span className='inline-flex align-items-center gap-2'>
                    <span className='font-semibold text-2xl text-primary'>
                      <a
                        href='home.html'
                        className='no-underline flex align-items-center gap-3'
                      >
                        <Image src={Logo} alt='Image' width='45' />
                        <h1 className='text-main-700 font-bold text-3xl'>
                          oasis
                        </h1>
                      </a>
                    </span>
                  </span>
                  <span>
                    <IconButton
                      type='button'
                      iconClass='times'
                      onClick={() => setVisible(false)}
                      className='h-2rem w-2rem'
                      size='small'
                      label='Close'
                    />
                    {/* <Button
                      type="button"
                      ref={closeIconRef}
                      onClick={(e) => hide(e)}
                      icon="pi pi-times"
                      rounded
                      outlined
                      className="h-2rem w-2rem"
                    ></Button> */}
                  </span>
                </div>
                <MainNavigation setVisible={setVisible} />
              </div>
            </div>
          </div>
        )}
      ></Sidebar>
    </div>
  );
};

Navbar.propTypes = {
  visible: PropTypes.bool,
  setVisible: PropTypes.func,
};

export default Navbar;

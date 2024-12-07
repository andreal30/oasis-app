import { Outlet } from "react-router-dom";
import Header from "../components/Commons/Header";
import Footer from "../components/Commons/Footer";

const RootLayout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default RootLayout;

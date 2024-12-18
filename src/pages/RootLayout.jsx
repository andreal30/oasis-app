import { Outlet } from "react-router-dom";
import Header from "../components/Commons/Header";
import Footer from "../components/Commons/Footer";
import { getToken } from "../utils/tokenUtils";

const RootLayout = () => {
  const token = getToken();

  if (!token) {
    window.location.href = "/login";
  }
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

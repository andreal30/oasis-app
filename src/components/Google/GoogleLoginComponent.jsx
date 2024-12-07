import { GoogleLogin } from "react-google-login";
import axios from "axios";

// install before using
// npm install --save react-google-login
// npm install react-google-login

const GoogleLoginComponent = () => {
  const clientId = "YOUR_GOOGLE_CLIENT_ID";

  const onSuccess = async (response) => {
    try {
      const { data } = await axios.post("http://localhost:5000/auth/google", {
        token: response.tokenId,
      });
      console.log("User successfully logged in:", data);
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  const onFailure = (error) => {
    console.error("Google Login failed:", error);
  };

  return (
    <div>
      <GoogleLogin
        clientId={clientId}
        buttonText='Login with Google'
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={"single_host_origin"}
      />
    </div>
  );
};

export default GoogleLoginComponent;

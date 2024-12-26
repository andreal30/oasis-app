// import { GoogleLogin } from "@react-oauth/google";
// import { setLocal } from "../../utils/localStorage";

// const GoogleAuth = () => {
//   const handleLoginSuccess = async (response) => {
//     // Send the Google ID Token to the backend for verification
//     try {
//       const res = await fetch("http://localhost:8080/auth/google", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           token: response.credential, // Use `credential` instead of `tokenId`
//         }),
//       });

//       const data = await res.json();
//       console.log("data", data);
//       if (data.accessToken) {
//         localStorage.setItem("jwtToken", data.accessToken); // Store the JWT token in localStorage
//         console.log("User authenticated successfully");
//       } else {
//         console.error("Authentication failed");
//       }
//     } catch (error) {
//       console.error("Error sending token to backend:", error);
//     }
//   };

//   const handleLoginFailure = (error) => {
//     console.error("Google Login Failed:", error);
//   };
//   return (
//     <GoogleLogin onSuccess={handleLoginSuccess} onError={handleLoginFailure} />
//   );
// };

// export default GoogleAuth;

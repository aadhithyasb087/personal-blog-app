import React from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

const LoginButton = ({ onSuccess, onFailure }) => {
  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <GoogleLogin onSuccess={onSuccess} onError={onFailure} />
    </GoogleOAuthProvider>
  );
};

export default LoginButton;

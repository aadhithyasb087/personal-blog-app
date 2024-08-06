import React, { useState, useEffect } from "react";
import "./Login.css";
import ProfileImg from "../../assets/image/Aadhithya_Profile_Pic.png";
import { useNavigate } from "react-router-dom";
import { auth, googleProvider } from "../../firebase";
import { signInWithPopup } from "firebase/auth";
import Loading from "../../assets/icons/Loading/Loading";
import { useUser } from "../../contexts/UserContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const [loading, setLoading] = useState(true);
  const [guest, setGuest] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { saveUser } = useUser();
  const { user } = useUser();
  const notify = (content) =>
    toast.error(content, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  const notifySuccess = (content) =>
    toast.info(content, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  const guestSignIn = () => {
    saveUser({ displayName: "Guest", email: "guest@gmail.com" });

    setGuest(true);
    notifySuccess(
      "Successfully logged in as Guest. Remember for Demo purpose you logged using guest credentials where you can get access to all admin features such as add, view, edit and delete posts."
    );
    sessionStorage.setItem(
      "user",
      JSON.stringify({ displayName: "Guest", email: "guest@gmail.com" })
    );
    setTimeout(() => {
      navigate("/");
    }, 3500);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        if (user.email === process.env.REACT_APP_ADMIN_EMAIL) {
          saveUser(user);
          notifySuccess("Successfully logged in");
          setTimeout(() => {
            navigate("/");
          }, 1000);
        } else {
          auth.signOut();
          notify(
            "Only Admin can login. For Demo purpose you can login using guest credentials where you can get access to all admin features such as add, view, edit and delete posts."
          );
        }
      } else {
        saveUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signIn = async () => {
    try {
      setError("");

      const result = await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Error signing in with Google: ", error);
      setError("Error signing in. Please try again.");
    }
  };

  const signOut = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error("Error signing out: ", error);
      setError("Error signing out. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="login loading">
        <Loading />
        <h1>Loading...</h1>
      </div>
    );
  }

  // if (!user) {

  // }
  return (
    <div className="login">
      <ToastContainer />
      <img src={ProfileImg} alt="img" className="profile-img" />
      <h1>Welcome Admin of the ASB Blogs 👋</h1>
      <p>
        Visit our main website <a href="/">ASB Blogs</a>
      </p>
      <button onClick={signIn}>Login with google</button>
      <button onClick={guestSignIn} className="login-guest">
        Login with Guest User Credentials
      </button>
    </div>
  );
}

export default Login;

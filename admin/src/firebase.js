
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";


const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "personal-blog-app-admin.firebaseapp.com",
  projectId: "personal-blog-app-admin",
  storageBucket: "personal-blog-app-admin.appspot.com",
  messagingSenderId: "1045082629510",
  appId: "1:1045082629510:web:1b352b70b505921a8d7807",
  measurementId: "G-Z1ZVM0FJW8",
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };

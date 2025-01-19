import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyATTRzqGgNVcI8cyE9TzJndclQ9AQb6LJI",
  authDomain: "fir-2218e.firebaseapp.com",
  projectId: "fir-2218e",
  storageBucket: "fir-2218e.appspot.com",
  messagingSenderId: "384023233689",
  appId: "1:384023233689:web:95894587839a14f0f82408",
  measurementId: "G-NCM910T2KH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

export default app;

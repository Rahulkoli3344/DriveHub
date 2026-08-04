import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBhBnxyuvIi3em41MQiqzHpOE8PFyKlZMc",
  authDomain: "drivehub-fa004.firebaseapp.com",
  projectId: "drivehub-fa004",
  storageBucket: "drivehub-fa004.firebasestorage.app",
  messagingSenderId: "165568113218",
  appId: "1:165568113218:web:8a76e3a1d0e05b8ba51bdb",
  measurementId: "G-NZH4DK4FR8",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export default app;
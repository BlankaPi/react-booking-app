
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

export const firebaseConfig = {
  apiKey: "AIzaSyANO8Ta4FdXkuLqWwzvr4COL8yjuctrAw8",
  authDomain: "booking-app-5dd41.firebaseapp.com",
  projectId: "booking-app-5dd41",
  storageBucket: "booking-app-5dd41.appspot.com",
  messagingSenderId: "486117403381",
  appId: "1:486117403381:web:e7e149161275df628bf3bc"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const dataBase = getFirestore(app);
export const storage = getStorage(app);
export default app;
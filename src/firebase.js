import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCYcRcphibzF3nb32qsbbR9EQSoDXMwCmU",
  authDomain: "chitchat-0987.firebaseapp.com",
  projectId: "chitchat-0987",
  storageBucket: "chitchat-0987.appspot.com",
  messagingSenderId: "108806382151",
  appId: "1:108806382151:web:ea9081c3b4ae3ae6e3c762",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();

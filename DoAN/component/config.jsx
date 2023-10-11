// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDOhxUyYkhApKQsW0FOhqEIX3NtrmXKaM0",
  authDomain: "chat-app-32541.firebaseapp.com",
  databaseURL: "https://chat-app-32541-default-rtdb.firebaseio.com",
  projectId: "chat-app-32541",
  storageBucket: "chat-app-32541.appspot.com",
  messagingSenderId: "890050038626",
  appId: "1:890050038626:web:875a6a94a2ec7afcacba3b",
  measurementId: "G-WM3CZZG5EP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
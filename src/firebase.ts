// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA6PlQxzBPQgMneuOOytQ8GDyin6yvTJJc",
  authDomain: "expo-science-65641.firebaseapp.com",
  projectId: "expo-science-65641",
  storageBucket: "expo-science-65641.appspot.com",
  messagingSenderId: "974277177433",
  appId: "1:974277177433:web:0b0611fc353abb176dc148"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)
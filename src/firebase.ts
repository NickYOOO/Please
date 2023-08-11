import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';



const firebaseConfig = {
  apiKey: "AIzaSyAYJ1mrPHTNgWsqxAto02NOE9opOLA3EzI",
  authDomain: "please-b08ba.firebaseapp.com",
  projectId: "please-b08ba",
  storageBucket: "please-b08ba.appspot.com",
  messagingSenderId: "793528123214",
  appId: "1:793528123214:web:15f21afd8c629b4c6fe81f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA0Q4TJ1g9brKAEPSffBB0KZYeSw4Ic0fk",
  authDomain: "react-blog-26c12.firebaseapp.com",
  projectId: "react-blog-26c12",
  storageBucket: "react-blog-26c12.appspot.com",
  messagingSenderId: "860724346624",
  appId: "1:860724346624:web:4789847246bd2baf4bfde5",
  measurementId: "G-TMYW2V33HG",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBdFvE95Tix_rkWQ7wUBPSEurPuPchIF98",
  authDomain: "inventory-management-4337f.firebaseapp.com",
  projectId: "inventory-management-4337f",
  storageBucket: "inventory-management-4337f.appspot.com",
  messagingSenderId: "477499895967",
  appId: "1:477499895967:web:cbf264d33aceecbd3632aa",
  measurementId: "G-S1FQ5LGN8J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const firestore=getFirestore(app);

export {firestore}
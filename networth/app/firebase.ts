// firebase.js (or firebase.ts if you're using TypeScript)
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCE21-UmW2-l9Z1CQzWnmx-NOnFoSxuoCM",
    authDomain: "referral-290fa.firebaseapp.com",
    projectId: "referral-290fa",
    storageBucket: "referral-290fa.appspot.com",
    messagingSenderId: "1059819090403",
    appId: "1:1059819090403:web:439b2c4f33646581ccf0d6",
    measurementId: "G-TMCFV3MEZC"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

export { auth, firestore };

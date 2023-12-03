import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import React from "react";

    const firebaseConfig = {
        apiKey: "AIzaSyCU7Sd_SdDjbMD638AwJWwfuj6OoldBbJA",
        authDomain: "design-test-285a2.firebaseapp.com",
        projectId: "design-test-285a2",
        storageBucket: "design-test-285a2.appspot.com",
        messagingSenderId: "1075131391490",
        appId: "1:1075131391490:web:582724da6e86f8c1b2d11b",
        measurementId: "G-D1RT9W6N0K"
      };
        // Initialize Firebase outside of the component
        const app = initializeApp(firebaseConfig);
        const auth = getAuth(app);
        export const db = getFirestore(app);

        export { auth };
        export default app;


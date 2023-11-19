import styles from '../styles/Signup.module.css';
import Link from 'next/link';
import Navbar from '../components/navbar';
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import React, { useState, useEffect } from 'react';
import {auth} from './auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional


function SignUp() {
    
    const [warningId, setWarningId] = useState("");
    const [loggedIn, setLoggedIn] = useState(false);

onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      const uid = user.uid;
      console.log(user)
        setLoggedIn(true)
    } else {
      console.log("User Signed Out")
      setLoggedIn(false)
    }
  });



    if (typeof window !== "undefined") {

        document.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = document.getElementById("email-input").value
            const passwordInput = document.getElementById("password-input").value
            createUserWithEmailAndPassword(auth, emailInput, passwordInput)
                .then((userCredential) => {
                    // Signed up 
                    const user = userCredential.user;
                    // const url = new URL(window.location.href);
                    // url.searchParams.append('uid', user.uid);
                    // window.history.pushState({}, '', url.toString());
                    console.log(url)
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log(errorCode);
                    setWarningId(errorCode);
                })
        })
    }

    return (
        <div className={styles.container}>
            <Navbar loggedIn={loggedIn} 
    profile={loggedIn ? { name: "User" } : null}></Navbar>
            <div className={styles.welcomeSection}>
                <h1>Hello!</h1>
                <p>Make your detailed and personal plan in Helsinki. Make your detailed and personal</p>
                <Link href="/">
                    <button className={styles.learnMoreBtn}>Learn more</button>
                </Link>
            </div>

            {loggedIn ? "Signed up successfully! You have logged in!" : <div className={styles.signInSection}>
                <h2>Sign up</h2>
                <p>{warningId}</p>
                <form className={styles.signInForm}>
                    <input id="email-input" type="text" placeholder="Email" />
                    <input id="password-input" type="password" placeholder="Password" />
                    <button id="signupbutton" type="submit">Sign up</button>
                </form>
            </div>}
        </div>
    );
}

export default SignUp;

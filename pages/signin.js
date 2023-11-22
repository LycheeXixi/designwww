import styles from '../styles/Signin.module.css';
import Link from 'next/link';
import Navbar from '../components/navbar';
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import React, { useState, useEffect } from 'react';
import {auth} from '../public/auth';


function SignIn() {

const [warningId, setWarningId] = useState("");
const [loggedIn, setLoggedIn] = useState(false);
onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      const uid = user.uid;
      console.log(user)
        setLoggedIn(true)
        setTimeout(()=>{
            window.location.pathname = '/plannerHome';
        }, 2000)    
    } else {
      console.log("User Signed Out")
      setLoggedIn(false)
    }
  });

    const handleSubmit = (e) => {
        e.preventDefault();
        const emailInput = document.getElementById("email-input").value
        const passwordInput = document.getElementById("password-input").value
        
        //stripped from firebase console
        signInWithEmailAndPassword(auth, emailInput, passwordInput)
            .then((userCredential) => {
                // Signed up 
                const user = userCredential.user;
                // const url = new URL(window.location.href);
                // url.searchParams.append('uid', user.uid);
                // window.history.pushState({}, '', url.toString());
                console.log(user)
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode);
                console.log(errorMessage);
            })
    }

    return (
        <div className={styles.container}>
            <Navbar loggedIn={loggedIn} 
    profile={loggedIn ? { name: "User" } : null}></Navbar>
            {loggedIn ? "" : <div className={styles.welcomeSection}>
                <h1>Welcome!</h1>
                <p>Make your detailed and personal plan in Helsinki. Make your detailed and personal</p>
                <Link href="/">
                    <button className={styles.learnMoreBtn}>Learn more</button>
                </Link>
            </div>}

            {loggedIn ? "Logged In" : <div className={styles.signInSection}>
                
                <h2>Sign in</h2>
                <form className={styles.signInForm} onSubmit={handleSubmit}>
                    <input id="email-input" type="text" placeholder="Email"/>
                    <input id="password-input" type="password" placeholder="Password"/>
                    <div className={styles.formFooter}>
                        <label>
                            <input type="checkbox" />
                            Remember Me
                        </label>
                    </div>
                
                    <button type="submit">Sign in</button>
                </form>
            </div>}
        </div>
    );
}

export default SignIn;

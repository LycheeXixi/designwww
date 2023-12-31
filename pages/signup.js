import styles from '../styles/Signup.module.css';
import Link from 'next/link';
import Navbar from '../components/navbar';
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import React, { useState, useEffect } from 'react';
import {auth} from '../public/auth'
import { collection, addDoc } from "firebase/firestore";
import { db } from '../public/auth';
import { doc, setDoc } from "firebase/firestore";
import { useUserContext } from '../contexts/UserContext';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional


function SignUp() {
    
    const [warningId, setWarningId] = useState("");
    const [loggedIn, setLoggedIn] = useState(false);
    const { setUserUidValue } = useUserContext();


onAuthStateChanged(auth, (user) => {
    if (user) {
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
                    const uid = user.uid;

                // Store user data in Firestore
                // Example: Storing user information in a 'users' collection
                const userRef = doc(db, 'users', user.uid); // Create a reference with the user's UID
                setDoc(userRef, { uid, email: emailInput })
                    .then(() => {
                        console.log('Document written with ID:', uid);
                        if (typeof window !== "undefined") {
                            // Check if running in the browser
                            localStorage.setItem('uid', user.uid);
                          }
                    })
                    .catch((error) => {
                        console.error('Error adding document:', error);
                    });
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
    <div className={styles.pageContainer}>
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

                    <input id="email-input" type="text" className={styles.emailbox} placeholder="Email" />

              
                    <input id="password-input" type="password" className={styles.passwordbox} placeholder="Password" />
          
                    <button id="signupbutton" type="submit" className={styles.signupbutton}>Sign up</button>
                </form>
            </div>}
            </div>
        </div>
    );
}

export default SignUp;

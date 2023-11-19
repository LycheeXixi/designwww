import Head from 'next/head';
import styles from '../styles/plannerHome.module.css';
import Navbar from '../components/navbar';
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import React, { useState, useEffect } from 'react';
import {auth} from './auth';

export default function plannerHome() {
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
  
    return (
        <div className={styles.container}>
            <Navbar loggedIn={loggedIn} 
    profile={loggedIn ? { name: "User" } : null}></Navbar>
            <div className={styles.pageLayout}>
                <div className={styles.searchBarContainer}>
                <input type="text" className={styles.searchBar} placeholder="Search..." />
                <button type="submit" className={styles.searchButton}>
                        <img src="/Search.svg" alt="Search" />
                    </button>
                    </div>
                <div className={styles.title}>Get Ready</div>
                <div className={styles.text}>collection of the most beautiful places and experience </div>
                <img src="/Smile.svg" className={styles.smileSvg} />
            </div>

            <iframe width='100%' height='600px' src="https://api.mapbox.com/styles/v1/hongxi/clp33hkbs00bw01pcbq59f9gj.html?title=false&access_token=pk.eyJ1IjoiaG9uZ3hpIiwiYSI6ImNscDMzZTFzZTB5cGQyanBiejUxZWdqdnIifQ.4l3AoKgAdk0cZXRgVOw3oQ&zoomwheel=false#11.24/60.1861/24.9195" title="Streets" style={{border:'none', zIndex:1000}}></iframe>

            <img src="/Mask1.svg" className={styles.rotatingSvg} alt="Rotating SVG" />
        </div>
    )
}
import Head from 'next/head';
import styles from '../styles/plannerHome.module.css';
import Navbar from '../components/navbar';
import SearchBar from '../components/searchBar'
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import React, { useState, useEffect } from 'react';
import { auth } from '../public/auth';
import Map from '../components/map';
import SearchFunction from '../components/searchFunction';

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
            
            <SearchFunction></SearchFunction>
            <img src="/Mask1.svg" className={styles.rotatingSvg} alt="Rotating SVG" />
        </div>
    )
}
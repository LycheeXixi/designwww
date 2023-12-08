import Head from 'next/head';
import styles from '../styles/plannerHome.module.css';
import Navbar from '../components/navbar';
import SearchBar from '../components/searchBar'
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import React, { useState, useEffect,useRef } from 'react';
import { auth } from '../public/auth';
import Map from '../components/map';
import SearchFunction from '../components/searchFunction';

import { collection, addDoc } from "firebase/firestore";
import { db } from '../public/auth';
import { useRouter } from 'next/router';

export default function plannerHome() {
    const [loggedIn, setLoggedIn] = useState(false);


    const [uid, setUid] = useState(null);


        onAuthStateChanged(auth, (user) => {
            if (user) {
                const uid = user.uid;
                console.log(user);
                setLoggedIn(true);
                setUid(uid);
                console.log(uid);
            } else {
                console.log("User Signed Out");
                setLoggedIn(false);
                setUid(null);
                console.log(uid);
            }
        });

        console.log(uid+' plannerhome')


        return (
            <div className={styles.container}>
                <Navbar loggedIn={loggedIn}
                    profile={loggedIn ? { name: "User" } : null}></Navbar>
                <SearchFunction uid={uid}></SearchFunction>
                <img src="/Mask1.svg" className={styles.rotatingSvg} alt="Rotating SVG" />
            </div>
        )
}

import Link from 'next/link';
import styles from './Navbar.module.css';
import React, { useState, useEffect } from 'react';
import { auth } from '../pages/auth';
import { signOut } from 'firebase/auth';

function Navbar(e) {
    const [navbar, setNavbar] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false)
    const [profileName, setProfileName] = useState("");
    console.log("Nav State")
    console.log(e)

    const changeBackground = () => {
        if(window.scrollY >= 160) {
            setNavbar(true);
        } else {
            setNavbar(false);
        }
    }
    if (typeof window !== "undefined") {
        window.addEventListener('scroll', changeBackground);
    }
    // if(state){
    //     if(state.loggedIn == false){
    //         setLoggedIn(false)
    //     } else {
    //         setLoggedIn(true)
    //     }
    // }
    useEffect(() => {
        if (e) {
            setLoggedIn(e.loggedIn);
        }
        if (e.profile!=null) {
            setProfileName(e.profile.name);
            console.log(e.profile.name);
            console.log(profileName);
        } else{
            setProfileName(null)
        }
    }, [e]);
    
    const signOutFunction = () => {
        //Sign out from firebase
        signOut(auth).then(() => {
            console.log("Logged Out")
        })
        .catch((error) => {
            console.log("Logout Failed")
        })
    }
    
    return (
        <nav className={`${styles.navbar} ${navbar ? styles.opaque : ''}`}>
            
            <ul className={styles.navList}>
                <li className={styles.navItem}>
                    <a href="/#about">About</a>
                </li>
                <li className={styles.navItem}>
                    <a href="/#contact">Contact</a>
                </li>
                <div className={styles.logoContainer}>
                    <Link href="/">
                        <img src="/Logo.svg" alt="Company Logo" className={styles.logo} />
                    </Link>
                </div>
                <li className={styles.navItem}>
                    {loggedIn ?  <Link href="" onClick={signOutFunction}>Sign Out</Link> : <Link href="/signin">Sign In</Link>}
                </li>
                <li className={styles.navItem}>
                {profileName ? <Link href="/account">{profileName}</Link> : <Link href="/signup">Sign Up</Link> }
                    
                </li>
                {/* Add more links as needed */}
            </ul>
            <div className={styles.line}>

            </div>
        </nav>
    );
}

export default Navbar;
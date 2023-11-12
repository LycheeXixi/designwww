// components/Button.js
import Link from 'next/link';
import styles from './Navbar.module.css';
import React, { useState, useEffect } from 'react';


function Navbar(props) {
    const [navbar, setNavbar] = useState(false);

    const changeBackground = () => {
        if(window.scrollY >= 184) {
            setNavbar(true);
        } else{
            setNavbar(false);
        }
    }

   // window.addEventListener('scroll', changeBackground);


    return (
        <nav className={`${styles.navbar} ${navbar ? styles.opaque : ''}`}>
            
            <ul className={styles.navList}>
                <li className={styles.navItem}>
                    <a href="#about">About</a>
                </li>
                <li className={styles.navItem}>
                    <a href="#contact">Contact</a>
                </li>
                <div className={styles.logoContainer}>
                    <Link href="/">
                        <img src="/Logo.svg" alt="Company Logo" className={styles.logo} />
                    </Link>
                </div>
                <li className={styles.navItem}>
                    <Link href="/signin">Sign In</Link>
                </li>
                <li className={styles.navItem}>
                    <Link href="/signup">Sign up</Link>
                </li>
                {/* Add more links as needed */}
            </ul>
            <div className={styles.line}>

            </div>
        </nav>
    );
}

export default Navbar;
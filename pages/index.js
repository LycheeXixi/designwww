import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import Link from 'next/link';
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import React, { useState, useEffect } from 'react';
import {auth} from '../public/auth';

export default function Home() {

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
    // pages/index.js
    <div className={styles.gradientBackground}>
      <Head>
        <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0" />
      </Head>
      <Navbar></Navbar>

      <div className={styles.heroContainer}>
        <div className={styles.largeTextL}>Plan Your Travel More Flexibly.</div>
        {/* Plan your travel flexibly */}
        <div className={styles.smallTextL}>Make your detailed and personal plan in Helsinki.</div>
        {/* //Personalize your travel plan */}
        <Link href="/signin" className={styles.startPlanningButton}>
          Start Planning
        </Link>
        
        <div className={styles.introductionTextR}>
          Welcome to the Travel Planner website for Helsinki! Dive deep into personalized travel plans, tailored to your unique desires and interests. Start your adventure with us and explore Helsinki like never before.
        </div>
      </div>


      <div id="about" className={styles.aboutSection}> {/* Using "id" for navigation */}
        <h1>About Us</h1>
        <div className={styles.aboutText}>Travel Planner is a website</div>
        {/* Add your about content here */}
      </div>

      <div id="contact" className={styles.contactSection}> {/* Using "id" for navigation */}
        <h1>Contact Us</h1>
        <div className={styles.contactText}>If you need any help, please send us E-mail or call us.</div>
        {/* Add your contact content here */}
      </div>
      <Footer></Footer>
    </div>
  );
}
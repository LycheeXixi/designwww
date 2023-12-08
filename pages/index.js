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
      const uid = user.uid;
      console.log(user)
        setLoggedIn(true)
    } else {
      console.log("User Signed Out")
      setLoggedIn(false)
    }
  });
          
  return (
    <div className={styles.gradientBackground}>
      <Head>
        <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0" />
      </Head>
      <Navbar loggedIn={loggedIn} 
    profile={loggedIn ? { name: "User" } : null}></Navbar>

      <div className={styles.heroContainer}>
        <div className={styles.largeTextL}>Plan Your Travel More Flexibly.</div>

        <div className={styles.smallTextL}>Make your detailed and personal plan in Helsinki.</div>

        <Link href="/signin" className={styles.startPlanningButton}>
          Start Planning
        </Link>
        
        <div className={styles.introductionTextR}>
          Welcome to the Travel Planner website for Helsinki! Dive deep into personalized travel plans, tailored to your unique desires and interests. Start your adventure with us and explore Helsinki like never before.
        </div>
      </div>


      <div id="about" className={styles.aboutSection}> 
        <h1>About Us</h1>
        <div className={styles.aboutText}>Travel Planner is a website to make trip planning more flexible for users. It allows users to search for destinations, receive destination or attraction recommendations, create travel plans with existing templates, automatically add itineraries to their plan, freely add and remove the contents of the travel plan, as well as exporting the plan to share it with others.</div>
      </div>

      <div id="contact" className={styles.contactSection}> 
        <h1>Contact Us</h1>
        <div className={styles.contactText}>If you need any help, please send us E-mail or call us.</div>
      </div>
      <Footer></Footer>
    </div>
  );
}
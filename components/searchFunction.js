import Head from 'next/head';
import styles from '../styles/plannerHome.module.css';
import Navbar from './navbar';
import SearchBar from './searchBar'
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import React, { useState, useEffect } from 'react';
import { auth } from '../public/auth';
import Map from './map';

export default function SearchFunction() {
    const [jsonData, setJsonData] = useState(null);

    const handleSearchdata = (data) => {
        setJsonData(data);
    }

    return (
            <div className={styles.pageLayout}>
            <SearchBar onSearchData={handleSearchdata}/>
                <div className={`${styles.title} ${jsonData ? styles.disappear : ""}`}>Get Ready</div>
            <div className={`${styles.text}  ${jsonData ? styles.disappear : ""}`}>collection of the most beautiful places and experience </div>
                <img src="/Smile.svg" className={`${styles.smileSvg} ${jsonData ? styles.disappear : ""}`} />
                <div className={`${styles.mapContainer} ${jsonData ? styles.appear : ""}`}>
                <Map jsonData={jsonData} />
                </div>
            </div>
    )
}
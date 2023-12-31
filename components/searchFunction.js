import Head from 'next/head';
import styles from '../styles/plannerHome.module.css';
import Navbar from './navbar';
import SearchBar from './searchBar'
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import React, { useState, useEffect } from 'react';
import { auth } from '../public/auth';
import Map from './map';
import Filter from './Filter';
import { useUserContext } from '../contexts/UserContext';

export default function SearchFunction({uid}) {
    const [jsonData, setJsonData] = useState(null);
    const [queryText, setQueryText] = useState(null);
    const handleSearchdata = (data) => {
        setJsonData(data);
    }
    console.log('searchFunction '+uid)

    return (
            <div className={styles.pageLayout}>
            <SearchBar onSearchData={handleSearchdata} queryText={setQueryText}/>
                <div className={`${styles.title} ${jsonData ? styles.disappear : ""}`}>Get Ready</div>
            <div className={`${styles.text}  ${jsonData ? styles.disappear : ""}`}> Click the search icon directly to get recommendations. </div>
                <img src="/Smile.svg" className={`${styles.smileSvg} ${jsonData ? styles.disappear : ""}`} />
                <div className={`${styles.mapContainer} ${jsonData ? styles.appear : ""}`}>
                <Map jsonData={jsonData} queryText={queryText} uid={uid}/>
                </div>
            </div>
    )
}
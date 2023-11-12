import Head from 'next/head';
import styles from '../styles/plannerHome.module.css';
import Navbar from '../components/navbar';

export default function plannerHome(){
    return(
        <div className={styles.container}>
            <Navbar></Navbar>
            <div className={styles.searchBarContainer}>
                <input type="text" className={styles.searchBar} placeholder="Search..." />
            </div>
            <div className={styles.title}>Get Ready</div>
            <div className={styles.text}>collection of the most beautiful places and experience </div>
            <img src="/Smile.svg" className={styles.smileSvg}/>
            <img src="/Mask1.svg" className={styles.rotatingSvg} alt="Rotating SVG" />
        </div>
    )
}
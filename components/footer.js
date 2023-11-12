import styles from './Footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.siteFooter}>
            <div className={styles.footerContainer}>
                <div className={styles.footerSection}>
                    <h2>Contact</h2>
                    <p>Email: TravelPlanner@gmail.com</p>
                    <p>Phone: +1 123-456-7890</p>
                </div>
                <div className={styles.footerSection}>
                    <h2>Address</h2>
                    <p>Aalto University,</p>
                    <p>Otakaari 24, 02150 Espoo</p>
                </div>
                <div className={styles.footerSection}>
                    <h2>About Us</h2>
                    <p>We provide top-tier services...</p>
                </div>
            </div>
        </footer>
    );
}
import styles from '../styles/Signin.module.css';
import Link from 'next/link';


function SignIn() {
    return (
        <div className={styles.container}>
            
            <div className={styles.welcomeSection}>
                <h1>Welcome!</h1>
                <p>Make your detailed and personal plan in Helsinki. Make your detailed and personal</p>
                <Link href="/">
                    <button className={styles.learnMoreBtn}>Learn more</button>
                </Link>
            </div>

            <div className={styles.signInSection}>
                <h2>Sign in</h2>
                <form className={styles.signInForm}>
                    <input type="text" placeholder="Username"/>
                    <input type="password" placeholder="Password" />
                    <div className={styles.formFooter}>
                        <label>
                            <input type="checkbox" />
                            Remember Me
                        </label>
                    </div>
                    <button type="submit">Sign in</button>
                </form>
            </div>
        </div>
    );
}

export default SignIn;

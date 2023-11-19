import styles from '../styles/Signup.module.css';
import Link from 'next/link';



function SignUp() {
  
    return (
        <div className={styles.container}>
            <div className={styles.welcomeSection}>
                <h1>Hello!</h1>
                <p>Make your detailed and personal plan in Helsinki. Make your detailed and personal</p>
                <Link href="/">
                    <button className={styles.learnMoreBtn}>Learn more</button>
                </Link>
            </div>

            <div className={styles.signInSection}>
                <h2>Sign up</h2>
                <form className={styles.signInForm}>
                    <input type="text" placeholder="Email" />
                    <input type="password" placeholder="Password" />
                    <button type="submit">Sign up</button>
                </form>
            </div>
        </div>
    );
}

export default SignUp;

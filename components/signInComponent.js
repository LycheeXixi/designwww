
import React, {useState} from "react";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";



function SignInComponent() {
    const [email, setEmail]= useState('')
    const [password, setPassword] = useState('')

    const signIn = (e) => {e.preventDefault()}
    signInWithEmailAndPassword(auth, emailInput, passwordInput)
        .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
            const url = new URL(window.location.href);
            url.searchParams.append('uid', user.uid);
            window.history.pushState({}, '', url.toString());
            console.log(url)
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        })
    
        

    

    return (

        <form className={styles.signInForm}>
            <h2>Sign in</h2>
            <input id="email-input" 
            type="text" 
            value={email} 
            onChange={(e)=>{e.target.value}} 
            placeholder="Email" />
            <input id="password-input"
            value={email} 
            onChange={(e)=>{e.target.value}}  
            type="password" 
            placeholder="Password" />
            <div className={styles.formFooter}>
                <label>
                    <input type="checkbox" />
                    Remember Me
                </label>
            </div>
            <button type="submit">Sign in</button>
        </form>
    )
}

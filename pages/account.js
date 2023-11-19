import styles from '../styles/Account.module.css';
import Link from 'next/link';
import Navbar from '../components/navbar';

export default function Account(){
    return (
        <div className={styles.container}>    
          <Navbar></Navbar>
        </div>
      );
}
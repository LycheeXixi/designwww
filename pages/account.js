import styles from '../styles/Account.module.css';
import Link from 'next/link';
import Navbar from '../components/navbar';
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import React, { useState, useEffect, useRef } from 'react';
import { auth } from '../public/auth';
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { db } from '../public/auth';
import PlanList from '../components/planList';
import ExportPDFButton from '../components/exportBtn';

export default function Account() {

  const [loggedIn, setLoggedIn] = useState(false);
  const [plans, setPlans] = useState(null)
  let plansRef = useRef([])
  const [edit, setEdit] = useState(false);
  const [uid, setUid] = useState('');

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      setUid(user.uid);
      setLoggedIn(true)
      addDocumentData(uid);
    } else {
      console.log("User Signed Out")
      setLoggedIn(false)
    }
  });

  console.log('Plans')
  console.log(plans)


  const addDocumentData = async (uid) => {
    //Add data to state if null
    console.log('starting add document data')
    console.log(uid)
    if (plans == null) {
      try {
        const docRef = collection(db, "users", uid, "places");
        //Creates Path: {db}/users/{uid}/places
        const docSnap = await getDocs(docRef);
        console.log('getDocs')
        console.log(docSnap)
        const tempArray = [];
        var index = 0;
        docSnap.forEach((e) => {
          //{}, storage unit, object / js object
          const dataTemp = {
            key: index,
            id: e.id,
            data: e.data()
          };
          console.log('Data Temp')
          console.log(dataTemp)
          index++;
          //Array.push()
          tempArray.push(dataTemp);
          console.log("Plans")
          console.log(dataTemp); //null
        });
        setPlans(tempArray); // Update state with fetched data
        //[array]
        console.log(tempArray); // Log fetched data
      } catch (error) {
        console.error('Error checking document:', error);
      }
    }

  };

  useEffect(() => {
    // Fetch documents when component mounts
    // const uid = localStorage.getItem('uid');

    if (uid) {
      console.log(uid)
      addDocumentData(uid);
    }
  }, []);
  // plans = null
  // plans = ?
  // plans != array
  //plans == array, forEach / map

  function onEdit() {
    setEdit(true);
  }

  async function deleteList(i, planName) {
    const userDocRef = doc(db, 'users', uid, 'places', planName);
    deleteDoc(userDocRef)
      .then(() => {
        console.log('Document successfully deleted!');
        const updatedDataArray = [...plans];
        updatedDataArray.splice(i, 1);
        setPlans(updatedDataArray);

      })
      .catch((error) => {
        console.error('Error removing document: ', error);
      });
  }

  return (
    <div className={styles.container}>
      {/* <img src="/Mask1.svg" className={styles.rotatingSvg} alt="Rotating SVG" /> */}
      <Navbar loggedIn={loggedIn}
        profile={loggedIn ? { name: "User" } : null}></Navbar>
        <div className={styles.btnContainer}>
        <h1>My plans</h1>
        {plans && plans.length > 0 ? 
        <ExportPDFButton dataToExport={plans}></ExportPDFButton> : ""
      } 
        </div>
      <div className={styles.plansContainer}>
        {plans && plans.length > 0 ? (

          plans.map((e, i) => <div className={styles.planlist} id={`list-${i}`}>
            <div className={styles.title}>
            <input type="checkbox"></input>
              <h2>{e.id}</h2>
              {e && <button onClick={() => { deleteList(i, e.id) }} className={styles.deleteButton}>Delete</button>}
            </div>
            <PlanList
              plansData={e} uid={uid} className={styles.lines}>
            </PlanList>
          </div>



          )
        ) : (
          <div className={styles.noPlanContainer}>
            <div className={styles.noplan}>No plans created</div>
            <a href="/plannerHome" className={styles.newone}>Create a new plan +</a>
          </div>
        )}
        {plans && plans.length > 0 ? 
        <div className={styles.createnew}>
        <a href="/plannerHome">Edit or create a plan +</a>
      </div> : ""
      }
        

      </div>
    </div>
  );
}
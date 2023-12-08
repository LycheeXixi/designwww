import { collection, doc, updateDoc, arrayRemove, deleteDoc } from 'firebase/firestore';
import { db } from '../public/auth';
import styles from '../styles/planList.module.css';
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import React, { useState, useEffect } from 'react';
import {auth} from '../public/auth';

export default function PlanList({ plansData, uid }) {

  const [edit, setEdit] = useState(false);
  const [dataArray, setDataArray] = useState(plansData.data.dataArray);
  // const [loggedIn, setLoggedIn] = useState(false);
  const [tempUid, setTempUid] = useState('');

  console.log(plansData.id)
  const planName = plansData.id;
  

  if(uid!=tempUid){
    setTempUid(uid);
  }
  console.log(uid+ " planlist");

  function onEdit() {
    setEdit(!edit);
  }

  async function removeItemFromFirestore(index) {
    try {
      const userDocRef = doc(db, 'users', uid, 'places', planName);
      await updateDoc(userDocRef, {
        dataArray: arrayRemove(dataArray[index]) // placeholder
      });
      console.log(planName)

      console.log('Item removed from Firestore successfully!');
      const updatedDataArray = [...dataArray]
      // [1,3,5,7,9]
      //X updatedDataArray = array.splice(2, 1), output: 5
      updatedDataArray.splice(index, 1); //updatedDataArray.splice(2, 1); output:[1,3,7,9]
      console.log('ran')
      setDataArray(updatedDataArray);
    } catch (error) {
      console.error('Error removing item from Firestore:', error);
    }
  }

  async function deleteItem(destinationName) {
    removeItemFromFirestore(destinationName);

    // const updatedDataArray = dataArray.filter(item => item.destinationName !== destinationName);
    // setDataArray(updatedDataArray);
  }

  return (
    <div>
      {dataArray.map((data, i) => (
        <div className={styles.items}>
          <h3>{data.destinationName}</h3>
          <div className={styles.pAlign}>
            <p>{data.address}</p>
            {edit ? <button data-key={i} className={styles.everybutton} onClick={() => deleteItem(i)}><img src="/delete.svg" alt="Edit" /></button> : ""}
          </div>
        </div>
      ))}
      {dataArray.length < 1 ? "No items in this list" : ""}
      {dataArray.length > 0 && <button className={styles.editButton} onClick={onEdit}>Edit</button>}
    </div>
  )

}
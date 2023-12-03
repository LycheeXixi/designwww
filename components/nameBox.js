import styles from '../styles/Map.module.css';
import React, { useRef, useEffect, useState } from 'react';
import { collection, getDoc, doc, setDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '../public/auth';
export default function NameBox({selectedCheckbox}){
    console.log(selectedCheckbox)
    const [planName, setPlanName] = useState('')

    function handleFormSubmit(e){
        e.preventDefault()
        saveSelectedPlacesToFirestore()
        showAlert();
      }
    
      function onInput(e){
        setPlanName(e.target.value)
      }

      const saveSelectedPlacesToFirestore = async () => {
        console.log('saving')
        console.log(selectedCheckbox)
    
        try {
          if (typeof window !== "undefined") {
            console.log('saving-2')
            // Check if running in the browser
            console.table(selectedCheckbox)
            if (selectedCheckbox.length > 0) {
              console.log(selectedCheckbox)
              const uid = localStorage.getItem('uid');
              console.log(uid); // Use the uid as needed in your Map component
              if (uid) {
                const placesCollectionRef = collection(db, 'users', uid, 'places');
                const dataArray = []
                
                selectedCheckbox.forEach((e) => {
                  const obj = {
                    longitude: document.getElementById(e).querySelector('input').getAttribute('data-longitude'),
                    latitude: document.getElementById(e).querySelector('input').getAttribute('data-latitude'),
                    address: document.getElementById(e).querySelector('input').getAttribute('data-address'),
                    destinationName: document.getElementById(e).querySelector('input').getAttribute('data-destination-name'),
                  }
                  dataArray.push(obj)
                })
    
                //Check if file is available before pushing
                const docSnap = await getDoc(doc(placesCollectionRef, planName));
                console.log("got docref")
                if (docSnap.exists()) {
                  console.log("It Exists!!")
                  // Add a new document for each selected place under 'places' subcollection
                  await updateDoc(doc(placesCollectionRef, planName), {
                    dataArray: arrayUnion(...dataArray)
                  });
                } else {
                  await setDoc(doc(placesCollectionRef, planName), {
                    dataArray: dataArray
                  });
                }
                console.log(uid + 'Selected places saved successfully!');
                
              }
            }
    
          }
    
    
        } catch (error) {
          console.error('Error saving selected places:', error);
        }
      };

      const showAlert = () => {
        window.alert('Saved successfully!'); // Display alert when Save button is clicked
      };
    

    return(
        <form className={styles.settings}>
        <input placeholder='Name your plan' type='text' value={planName} onInput={onInput} required></input>
        <button className={styles.saveButton} onClick={handleFormSubmit}>Save</button>
      </form>
    )
}
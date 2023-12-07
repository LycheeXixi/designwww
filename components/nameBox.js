import styles from '../styles/Map.module.css';
import React, { useRef, useEffect, useState } from 'react';
import { collection, getDoc, getDocs, doc, setDoc, updateDoc, arrayUnion, query, where, orderBy, limit, onSnapshot, } from 'firebase/firestore';
import { db } from '../public/auth';

export default function NameBox({selectedCheckbox, uid}){
    const [planName, setPlanName] = useState('')
    const [existingPlans, setExistingPlans] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [uidState, setUidState] = useState('')
    if(uidState != uid){
      setUidState(uid)
    }


      const handleInputClick = () => {
        setShowDropdown(true);
      };
    
      const handleInputChange = (e) => {
      };
    
      const handlePlanSelect = (e, selectedPlan) => {
        console.log(selectedPlan)
        e.preventDefault();
        setPlanName(selectedPlan);
        setShowDropdown(false);
        handleFormSubmit();
      };

    function handleFormSubmit(e){
        if(e){
            e.preventDefault()
            
        }
        saveSelectedPlacesToFirestore();
            showAlert();
      }
    
      function onInput(e){
        if(e.target.value.length < 20){
          setPlanName(e.target.value);
        }
        
        console.log(e.target.value.length)
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
    
      useEffect(() => {
        // Fetch existing plans from Firestore
        const fetchExistingPlans = async () => {
          try {
            console.log("set"+uid)
            if(uid){
                const plansCollectionRef = collection(db, 'users', uid, 'places'); // Replace 'plans' with your actual collection name
                console.log(plansCollectionRef)
                const snapshot = await getDocs(plansCollectionRef);
                console.log('Snapshot')
                console.log(snapshot)
    
                // console.log(snapshot)
                const plans = snapshot.docs.map((doc) => doc.id);
                console.log(plans)
                setExistingPlans(plans);
            } else {
                console.log('No UID')
                console.log(localStorage.getItem('uid'))
            }

            
          } catch (error) {
            console.error('Error fetching existing plans:', error);
          }
        };
    
        fetchExistingPlans();
      }, [uid]);

    return(
        <form className={styles.settings}>
        <div className={styles.boxTitle} onClick={handleInputClick}>Click to save to collection:</div>
        {showDropdown && (
        <div className="dropdown">
          <div className={styles.boxContainer}>
            {existingPlans
              .map((existingPlan, i) => (
                <button className={styles.existingPlans} key={i} onClick={(e) => handlePlanSelect(e, existingPlan)}>
                  {existingPlan}
                </button>
              ))}
          </div>
          <input className={styles.textBox} placeholder='+ New Collection' type='text' value={planName} onInput={onInput} onChange={handleInputChange}required></input>
                <button className={styles.saveButton} onClick={handleFormSubmit}>Save</button>
        </div>
      )}
       
      </form>
    )
}
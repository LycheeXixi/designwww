

import React, { useState,useRef } from "react";
import styles from '../styles/plannerHome.module.css';
// import Filter from "./Filter";
import Filter from '../components/Filter';

const SearchBar = ({ onSearchData, queryText }) => {
    const [searchTerm, setSearchTerm] = useState(' ');
    const dropdownRef = useRef(null);
const [isOpen, setIsOpen] = useState(false);

    const handleInput = (event) => {
        setSearchTerm(event.target.value);
        console.log(event)
    }

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
          search();
        }
      };    

    const search = () => {
        
        console.log(searchTerm);

        const apiKey = 'AIzaSyCYgdGcRVj0aEzr-Y_AEDy6tGZZeEBZE0Q'; 
        const url = 'https://places.googleapis.com/v1/places:searchText';

        var data = {
            textQuery: searchTerm
        };
        console.log(data.textQuery.length)
        if(data.textQuery.length <= 1){
            data.textQuery = 'helsinki attractions'
        }
        console.log('textQuery')
        console.log(data.textQuery)

        const headers = {
            'Content-Type': 'application/json',
            'X-Goog-Api-Key': apiKey,
            'X-Goog-FieldMask': 'places.displayName,places.formattedAddress,places.priceLevel,places.location'
        };
        if(data.textQuery){
            fetch(url, {                            
                method: 'POST',
                headers: headers,
                body: JSON.stringify(data)
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok.');
                    }
                    return response.json();
                })
                .then(data => {
                    // Handle the response data here
                    console.log(data);
                    onSearchData(data);
                    queryText(searchTerm) //Sends data back to searchfunction.jsx
                })
                .catch(error => {
                    // Handle errors here
                    console.error('There was a problem with the fetch operation:', error);
                });
        } else {
            window.alert('No Query Param')
        }


    }

    return (
        <div className={styles.searchBarContainer}>
            <div className={styles.searchBar}>
            <input id="textbox" className={styles.textbox} type="text"
                value={searchTerm}
                onInput={handleInput}
                onKeyDown={handleKeyPress}
                placeholder="Search..." />
                <Filter isOpen={isOpen} setIsOpen={setIsOpen} dropdownRef={dropdownRef} />
            <button type="submit" onClick={search} className={styles.button}>
                <img src="/Search.svg" alt="Search" />
            </button>
            </div>
            
        </div>
    )

}

export default SearchBar;

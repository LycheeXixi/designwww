

import React, { useState,useRef } from "react";
import styles from '../styles/plannerHome.module.css';
import Filter from "./Filter";

const SearchBar = ({ onSearchData, queryText }) => {
    const [searchTerm, setSearchTerm] = useState(' ');

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

        const data = {
            textQuery: searchTerm
        };

        const headers = {
            'Content-Type': 'application/json',
            'X-Goog-Api-Key': apiKey,
            'X-Goog-FieldMask': 'places.displayName,places.formattedAddress,places.priceLevel,places.location'
        };

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

    }

    return (
        <div className={styles.searchBarContainer}>
            <input id="textbox" type="text"
                value={searchTerm}
                onInput={handleInput}
                className={styles.searchBar}
                onKeyDown={handleKeyPress}
                placeholder="Search..." />
            <button type="submit" onClick={search} className={styles.searchButton}>
                <img src="/Search.svg" alt="Search" />
            </button>
        </div>
    )

}

export default SearchBar;

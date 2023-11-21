import Head from 'next/head';
import styles from '../styles/Map.module.css';
import Navbar from './navbar';
import Footer from './footer';
import Link from 'next/link';
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import React, { useRef, useEffect, useState } from 'react';
import { auth } from '../pages/auth';
import mapboxgl from '!mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import ReactDOM from 'react-dom';

export default function Map({jsonData}) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(24.946);
  const [lat, setLat] = useState(60.163);
  const [zoom, setZoom] = useState(13);
  const [isLeftAligned, setLeftAligned] = useState(false);
  const [transformedData, setTransformedData] = useState(null);

  // const [mapData, setMapData] = useState(jsonData);
  // console.log(mapData);
  // if(mapData!=null){
    

  useEffect(() => { 
if(jsonData!=null){
  const transformedFromMap = jsonData.places.map(item => {
    // Here, you need to extract necessary information from your jsonData item
    const destinationName = item.displayName.text;
    const coordinates = [item.location.longitude,item.location.latitude] // Set coordinates - example: [-77.034084142948, 38.909671288923]
    const address = item.formattedAddress || ''; // Extract address
    const city = ''; // Extract city
    const country = ''; // Extract country
    const phone = ''; // Extract phone number
    // ... Extract other necessary properties
  
    // Return GeoJSON Feature object structure for each item
    return {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: coordinates
      },
      properties: {
        destinationName: destinationName,
        phoneFormatted: phone,
        phone: phone.replace(/\D/g, ''), // Remove non-numeric characters from phone number
        address: address,
        city: city,
        country: country
        // ... Add other properties accordingly
      }
    };
  });
  const transformedData = {features: transformedFromMap}
  setTransformedData(transformedData);

  console.log(transformedData)
}

  }, [jsonData]);

const stores = transformedData;

  mapboxgl.accessToken = 'pk.eyJ1IjoiaG9uZ3hpIiwiYSI6ImNscDM1NGlnOTExbHgycXM2b3ZpcmNyNmsifQ.DQH2qI0oG0PSGQE61L1Jrg';


  // const map = new mapboxgl.Map({
  //     container: 'map',
  //     style: 'mapbox://styles/mapbox/light-v11',
  //     center: [-77.034084, 38.909671],
  //     zoom: 13,
  //     scrollZoom: false
  // });

  useEffect(() => {
    if(stores!=null){
      if (map.current) return; // initialize map only once
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [lng, lat],
        zoom: zoom
      });
      if (map != null) {
        map.current.on('load', () => {
          // add markers to map
  
          /* Add the data to your map as a layer */
          map.current.addLayer({
            id: 'locations',
            type: 'circle',
            /* Add a GeoJSON source containing place coordinates and information. */
            source: {
              type: 'geojson',
              data: stores,
            }
          });
          buildLocationList(stores);
  
          for (const feature of stores.features) {
            // create a HTML element for each feature
            const el = document.createElement('div');
            el.style.backgroundImage = 'url(/RedDot.svg)';
            el.className = 'marker';
          
            // make a marker for each feature and add to the map
            new mapboxgl.Marker(el).setLngLat(feature.geometry.coordinates).addTo(map.current);
          }
        });
      }
      if (map != null) {
        map.current.on('click', (event) => {
          /* Determine if a feature in the "locations" layer exists at that point. */
          const features = map.current.queryRenderedFeatures(event.point, {
            layers: ['locations']
          });
  
          /* If it does not exist, return */
          if (!features.length) return;
  
          const clickedPoint = features[0];
  
          /* Fly to the point */
          flyToStore(clickedPoint);
  
          /* Close all other popups and display popup for clicked store */
          createPopUp(clickedPoint);
  
          /* Highlight listing in sidebar (and remove highlight for all other listings) */
          const activeItem = document.getElementsByClassName('active');
          if (activeItem[0]) {
            activeItem[0].classList.remove('active');
          }
          const listing = document.getElementById(
            `listing-${clickedPoint.properties.id}`
          );
          listing.classList.add('active');
        });
      }
    }

    function buildLocationList(stores) {
      for (const store of stores.features) {
        /* Add a new listing section to the sidebar. */
        const listings = document.getElementById('listings');
        const listing = listings.appendChild(document.createElement('a'));
        /* Assign a unique `id` to the listing. */
        listing.id = `listing-${store.properties.id}`;
        /* Assign the `item` class to each listing for styling. */
        listing.className = `${styles.item}`;
    
        /* Add the link to the individual listing created above. */
        const link = listing.appendChild(document.createElement('p'));
        link.href = '#';
        link.className = `${styles.title}`;
        link.id = `link-${store.properties.id}`;
        link.innerHTML = `${store.properties.destinationName}`;
        link.addEventListener('click', function () {
          for (const feature of stores.features) {
            if (this.id === `link-${feature.properties.id}`) {
              flyToStore(feature);
              createPopUp(feature);
              setLeftAligned(true);
            }
          }
          const activeItem = document.getElementsByClassName(`${styles.active}`);
          if (activeItem[0]) {
            activeItem[0].classList.remove(`${styles.active}`);
          }
          this.parentNode.classList.add(`${styles.active}`);
        });
    
        /* Add details to the individual listing. */
        const details = listing.appendChild(document.createElement('div'));
        details.innerHTML = `${store.properties.city}`;
        if (store.properties.phone) {
          details.innerHTML += ` · ${store.properties.phoneFormatted}`;
        }
        if (store.properties.distance) {
          const roundedDistance = Math.round(store.properties.distance * 100) / 100;
          details.innerHTML += `<div><strong>${roundedDistance} miles away</strong></div>`;
        }
      }
    }

    function flyToStore(currentFeature) {
  console.log(currentFeature.geometry.coordinates)
  map.current.flyTo({
    center: [currentFeature.geometry.coordinates[0] - 0.004, currentFeature.geometry.coordinates[1]],
    zoom: 15
  });
}

function createPopUp(currentFeature) {
  const popUps = document.getElementsByClassName('mapboxgl-popup');
  /** Check if there is already a popup on the map and if so, remove it */
  if (popUps[0]) popUps[0].remove();

    const popup = new mapboxgl.Popup({ closeOnClick: false })
      .setLngLat(currentFeature.geometry.coordinates)
      .setHTML(` <img src="/placeholder.webp" style="height: 120px; width: 100%; object-fit: cover;"><h3 className=${styles.popup}>${currentFeature.properties.destinationName}</h3><h4>${currentFeature.properties.address}</h4>`)
      .addTo(map.current);
  };
  });




if(stores!=null){
 /* Assign a unique ID to each store */
 stores.features.forEach(function (store, i) {
  store.properties.id = i;
});



}
 






return (
  <div className={styles.interactiveMap}>
    <div className={`${styles.sidebar} ${isLeftAligned ? "" : styles.centered}`}>
      <div className={styles.heading}>
        <h1>Our locations</h1>
      </div>
      <div id='listings' className={`${styles.listings}`}></div>
      
      
    </div>
    <div ref={mapContainer} className={styles.map} />
  </div>


)
}
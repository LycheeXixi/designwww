import Head from 'next/head';
import styles from '../styles/Map.module.css';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import Link from 'next/link';
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import React, { useRef, useEffect, useState } from 'react';
import { auth } from './auth';
import mapboxgl from '!mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import ReactDOM from 'react-dom';

export default function Map() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(24.946);
  const [lat, setLat] = useState(60.163);
  const [zoom, setZoom] = useState(13);
  const [isLeftAligned, setLeftAligned] = useState(false);

const transformedData = jsonData.map(item => {
  console.log(item)
  // Here, you need to extract necessary information from your jsonData item
  const coordinates = []; // Set coordinates - example: [-77.034084142948, 38.909671288923]
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
      phoneFormatted: phone,
      phone: phone.replace(/\D/g, ''), // Remove non-numeric characters from phone number
      address: address,
      city: city,
      country: country
      // ... Add other properties accordingly
    }
  };
});
console.log(transformedData)

const stores = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -77.034084142948,
          38.909671288923
        ]
      },
      "properties": {
        "phoneFormatted": "(202) 234-7336",
        "phone": "2022347336",
        "address": "1471 P St NW",
        "city": "Washington DC",
        "country": "United States",
        "crossStreet": "at 15th St NW",
        "postalCode": "20005",
        "state": "D.C."
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -77.049766,
          38.900772
        ]
      },
      "properties": {
        "phoneFormatted": "(202) 507-8357",
        "phone": "2025078357",
        "address": "2221 I St NW",
        "city": "Washington DC",
        "country": "United States",
        "crossStreet": "at 22nd St NW",
        "postalCode": "20037",
        "state": "D.C."
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -77.043929,
          38.910525
        ]
      },
      "properties": {
        "phoneFormatted": "(202) 387-9338",
        "phone": "2023879338",
        "address": "1512 Connecticut Ave NW",
        "city": "Washington DC",
        "country": "United States",
        "crossStreet": "at Dupont Circle",
        "postalCode": "20036",
        "state": "D.C."
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -77.0672,
          38.90516896
        ]
      },
      "properties": {
        "phoneFormatted": "(202) 337-9338",
        "phone": "2023379338",
        "address": "3333 M St NW",
        "city": "Washington DC",
        "country": "United States",
        "crossStreet": "at 34th St NW",
        "postalCode": "20007",
        "state": "D.C."
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -77.002583742142,
          38.887041080933
        ]
      },
      "properties": {
        "phoneFormatted": "(202) 547-9338",
        "phone": "2025479338",
        "address": "221 Pennsylvania Ave SE",
        "city": "Washington DC",
        "country": "United States",
        "crossStreet": "btwn 2nd & 3rd Sts. SE",
        "postalCode": "20003",
        "state": "D.C."
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -76.933492720127,
          38.99225245786
        ]
      },
      "properties": {
        "address": "8204 Baltimore Ave",
        "city": "College Park",
        "country": "United States",
        "postalCode": "20740",
        "state": "MD"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -77.097083330154,
          38.980979
        ]
      },
      "properties": {
        "phoneFormatted": "(301) 654-7336",
        "phone": "3016547336",
        "address": "4831 Bethesda Ave",
        "cc": "US",
        "city": "Bethesda",
        "country": "United States",
        "postalCode": "20814",
        "state": "MD"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -77.359425054188,
          38.958058116661
        ]
      },
      "properties": {
        "phoneFormatted": "(571) 203-0082",
        "phone": "5712030082",
        "address": "11935 Democracy Dr",
        "city": "Reston",
        "country": "United States",
        "crossStreet": "btw Explorer & Library",
        "postalCode": "20190",
        "state": "VA"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -77.10853099823,
          38.880100922392
        ]
      },
      "properties": {
        "phoneFormatted": "(703) 522-2016",
        "phone": "7035222016",
        "address": "4075 Wilson Blvd",
        "city": "Arlington",
        "country": "United States",
        "crossStreet": "at N Randolph St.",
        "postalCode": "22203",
        "state": "VA"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -75.28784,
          40.008008
        ]
      },
      "properties": {
        "phoneFormatted": "(610) 642-9400",
        "phone": "6106429400",
        "address": "68 Coulter Ave",
        "city": "Ardmore",
        "country": "United States",
        "postalCode": "19003",
        "state": "PA"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -75.20121216774,
          39.954030175164
        ]
      },
      "properties": {
        "phoneFormatted": "(215) 386-1365",
        "phone": "2153861365",
        "address": "3925 Walnut St",
        "city": "Philadelphia",
        "country": "United States",
        "postalCode": "19104",
        "state": "PA"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -77.043959498405,
          38.903883387232
        ]
      },
      "properties": {
        "phoneFormatted": "(202) 331-3355",
        "phone": "2023313355",
        "address": "1901 L St. NW",
        "city": "Washington DC",
        "country": "United States",
        "crossStreet": "at 19th St",
        "postalCode": "20036",
        "state": "D.C."
      }
    }
  ]
};

  mapboxgl.accessToken = 'pk.eyJ1IjoiaG9uZ3hpIiwiYSI6ImNscDM1NGlnOTExbHgycXM2b3ZpcmNyNmsifQ.DQH2qI0oG0PSGQE61L1Jrg';


  // const map = new mapboxgl.Map({
  //     container: 'map',
  //     style: 'mapbox://styles/mapbox/light-v11',
  //     center: [-77.034084, 38.909671],
  //     zoom: 13,
  //     scrollZoom: false
  // });

  useEffect(() => {
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
            data: stores
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
  });





  /* Assign a unique ID to each store */
  stores.features.forEach(function (store, i) {
    store.properties.id = i;
  });


  function flyToStore(currentFeature) {
    //console.log(currentFeature.geometry.coordinates)
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
        .setHTML(`<h3 className=${styles.popup}>Sweetgreen</h3><h4>${currentFeature.properties.address}</h4>`)
        .addTo(map.current);
    };
  

  function buildLocationList(stores) {
    for (const store of stores.features) {
      /* Add a new listing section to the sidebar. */
      const listings = document.getElementById('listings');
      const listing = listings.appendChild(document.createElement('div'));
      /* Assign a unique `id` to the listing. */
      listing.id = `listing-${store.properties.id}`;
      /* Assign the `item` class to each listing for styling. */
      listing.className = `${styles.item}`;

      /* Add the link to the individual listing created above. */
      const link = listing.appendChild(document.createElement('a'));
      link.href = '#';
      link.className = 'title';
      link.id = `link-${store.properties.id}`;
      link.innerHTML = `${store.properties.address}`;
      link.addEventListener('click', function () {
        for (const feature of stores.features) {
          if (this.id === `link-${feature.properties.id}`) {
            flyToStore(feature);
            createPopUp(feature);
            setLeftAligned(true);
          }
        }
        const activeItem = document.getElementsByClassName('active');
        if (activeItem[0]) {
          activeItem[0].classList.remove('active');
        }
        this.parentNode.classList.add('active');
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
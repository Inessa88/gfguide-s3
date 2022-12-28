import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import { useNavigate } from 'react-router-dom';
import coordinates from './CityCoordinates.json';
import './GFMap.css';



mapboxgl.accessToken = 'pk.eyJ1IjoiaW5lc3NhODgiLCJhIjoiY2xiejkyajZlMDZ5bzNvbzlhMTd2Z2RiZiJ9.19wJ7LCYAxTKUdbSHeE3yw';

export default function GFMap() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(34.781769);
  const [lat, setLat] = useState(32.085300);
  const [zoom, setZoom] = useState(8);
  const [city, setCity] = useState('Israel');

  const navigate = useNavigate()
  

  useEffect(() => {
      fetch('/map')
      .then(res => {
          if (res.status===200){
              return res.json()
          }else{
              navigate('/login')
          }
      })
      .then(data =>{
          const restaurants = data
          map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [lng, lat],
            zoom: zoom
          });
          for (let restaurant_id in restaurants) {
            let restaurant=restaurants[restaurant_id]
              new mapboxgl.Marker({
              color: "red",
              draggable: false
              })
            .setLngLat([restaurant.lng, restaurant.lat])
            .setPopup(new mapboxgl.Popup().setHTML(`<h5>${restaurant.name}</h5><p>${restaurant.address}</p>`))
            .addTo(map.current);  
          }
          
      })
      .catch(e=>{
          console.log(e);
      })
     
  });

  // useEffect(() => {
  //   if (!map.current) return; // wait for map to initialize
  //   map.current.on('move', () => {
  //     setLng(map.current.getCenter().lng.toFixed(4));
  //     setLat(map.current.getCenter().lat.toFixed(4));
  //     setZoom(map.current.getZoom().toFixed(2));
  //   });
  // },[]);


  const mystyle = {
    width: '12.5vw',
    height: '6vh',
    borderRadius: '5px',
    border: '1px solid gray',
    backgroundColor: 'transparent',
    color: '#5A5A5A',
    fontSize: '16px',
    paddingLeft: '10px',
    marginTop: '1vh',
    marginBottom: '1vh'
  };
  return (
    <div>
      {/* <div className="sidebar">
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom} | City: {city}
      </div> */}
        <div>
          <select style={mystyle} name='city' onChange={(e)=>{
            let cityData = JSON.parse(e.target.value)
            setCity(cityData['place']);
            setLng(cityData['longitude']);
            setLat(cityData['latitude']);
            setZoom(cityData['zoom']);
          }}>
          {
            coordinates.map((item, index)=>{
                    return(
                        <option key={index} value={JSON.stringify(item)}>{item.place}</option>
                    )
            })
          }
          </select>
        </div>
      <div ref={mapContainer} className="map-container" />


    </div>
  );
}

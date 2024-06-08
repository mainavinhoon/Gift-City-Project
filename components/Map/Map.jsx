"use client"
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const Map = () => {
  const center = [23.1489, 72.6922];
  const zoomLevel = 9;

  const locations = [
    { position: [23.1472, 72.6941], name: 'Gift City Tower' },
    { position: [23.1461, 72.6931], name: 'Gift City Road' },
    { position: [23.1503, 72.6915], name: 'Gift City Lake' },
    { position: [23.1445, 72.6906], name: 'Gift City Park' },
    { position: [23.1490, 72.6937], name: 'Gift City Mall' },
  ];

  const markerIcon = new L.Icon({
    iconUrl: 'https://th.bing.com/th/id/R.cfeb685873a3a5077dc10db481a6dc99?rik=teB5PdnarC%2fpkQ&riu=http%3a%2f%2ficons.iconarchive.com%2ficons%2fpaomedia%2fsmall-n-flat%2f1024%2fmap-marker-icon.png&ehk=pC%2fJ%2bLjlDSIfuJR2lALjyN0Z9Co8%2bYkDjrTFOL4oskc%3d&risl=&pid=ImgRaw&r=0',
    iconSize: [40, 40],
  });

  return (
    <div id='Map'>
      <div className="text-2xl font-medium py-4 underline">Map</div>
      <div>All events here in map</div>
      <div className=' z-0 relative mt-3 h-96 w-full'>
        <MapContainer  center={center} zoom={zoomLevel} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            url="https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=6hQHdjxKLOCvbPfNAr35"
            attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
          />

          {locations.map((location, index) => (
            <Marker key={index} position={location.position} icon={markerIcon}>
              <Popup>{location.name}</Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default Map;

import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { FaMapMarkerAlt } from 'react-icons/fa';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png').default,
  iconUrl:       require('leaflet/dist/images/marker-icon.png').default,
  shadowUrl:     require('leaflet/dist/images/marker-shadow.png').default,
});

const center = [23.1489, 72.6922];
const zoomLevel = 14;

const locations = [
  { position: [23.1472, 72.6941], name: 'GIFT City Tower 1',  desc: 'Iconic skyscraper housing major financial entities' },
  { position: [23.1461, 72.6931], name: 'GIFT City Road',     desc: 'Main arterial road of the financial district' },
  { position: [23.1503, 72.6915], name: 'GIFT City Lake',     desc: 'Beautiful lakefront recreational area' },
  { position: [23.1445, 72.6906], name: 'GIFT City Park',     desc: 'Green space for professionals to unwind' },
  { position: [23.1490, 72.6937], name: 'IFSC Banking Zone',  desc: 'Dedicated zone for international banking units' },
];

const markerIcon = new L.Icon({
  iconUrl: 'https://th.bing.com/th/id/R.cfeb685873a3a5077dc10db481a6dc99?rik=teB5PdnarC%2fpkQ&riu=http%3a%2f%2ficons.iconarchive.com%2ficons%2fpaomedia%2fsmall-n-flat%2f1024%2fmap-marker-icon.png&ehk=pC%2fJ%2bLjlDSIfuJR2lALjyN0Z9Co8%2bYkDjrTFOL4oskc%3d&risl=&pid=ImgRaw&r=0',
  iconSize: [36, 36],
  iconAnchor: [18, 36],
  popupAnchor: [0, -36],
});

const MapComponent = () => {
  return (
    <section id="Map" style={{ background: "var(--cream)", borderTop: "1px solid var(--rule)" }}>
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-16">
        <div className="mb-12">
          <p className="mono-label mb-2">🗺 Explore the District</p>
          <h2 className="display-md mb-4" style={{ color: "var(--ink)" }}>GIFT City Map.</h2>
          <p style={{ fontFamily: "var(--font-body)", color: "var(--ink-light)", fontSize: "1rem", maxWidth: "600px" }}>
            Navigate the infrastructure of India's first operational smart city. 
            Every pin is a landmark — click them to explore.
          </p>
        </div>

        <div className="relative border-2" style={{ height: '480px', borderColor: "var(--ink)", boxShadow: "8px 8px 0 var(--orange)" }}>
          {/* Legend overlay */}
          <div className="absolute top-4 right-4 z-[1000] p-4 border"
               style={{ background: "var(--cream)", borderColor: "var(--ink)", boxShadow: "4px 4px 0 var(--ink)", width: "220px" }}>
            <p className="mono-label mb-3" style={{ color: "var(--orange)" }}>Key Locations</p>
            <div className="space-y-2">
              {locations.map((loc) => (
                <div key={loc.name} className="flex items-start gap-2">
                  <FaMapMarkerAlt style={{ color: "var(--ink)", marginTop: "0.2rem" }} className="flex-shrink-0 text-xs" />
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", fontWeight: 700, color: "var(--ink)" }}>{loc.name}</span>
                </div>
              ))}
            </div>
          </div>

          <MapContainer center={center} zoom={zoomLevel} style={{ height: '100%', width: '100%' }} zoomControl={false}>
            <TileLayer
              url="https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=6hQHdjxKLOCvbPfNAr35"
              attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
            />
            {locations.map((location, index) => (
              <Marker key={index} position={location.position} icon={markerIcon}>
                <Popup>
                  <div className="p-1">
                    <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", fontWeight: 700, color: "var(--ink)", marginBottom: "0.25rem" }}>
                      {location.name}
                    </p>
                    <p style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem", color: "var(--ink-light)" }}>
                      {location.desc}
                    </p>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </section>
  );
};

export default MapComponent;

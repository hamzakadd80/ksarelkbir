'use client';

import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useEffect } from 'react';

// --- Correction des icônes Leaflet par défaut (bug connu en Next.js) ---
const iconUrl = 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png';
const iconRetinaUrl = 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png';
const shadowUrl = 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png';

const customIcon = new L.Icon({
    iconUrl: iconUrl,
    iconRetinaUrl: iconRetinaUrl,
    shadowUrl: shadowUrl,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

export default function Map() {
  // Coordonnées approximatives de Ksar El Kébir
  const position: [number, number] = [35.0017, -5.9053];
  
  // Simulation d'une zone inondée (près de l'Oued Loukkos)
  const dangerZone: [number, number] = [35.0050, -5.9100];

  return (
    <MapContainer 
      center={position} 
      zoom={13} 
      scrollWheelZoom={false} 
      className="h-full w-full rounded-b-2xl z-0"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* Marqueur du centre de secours (Exemple) */}
      <Marker position={position} icon={customIcon}>
        <Popup>
          Centre de coordination <br /> Ksar Entraide.
        </Popup>
      </Marker>

      {/* Zone Inondée (Cercle Rouge) */}
      <Circle 
        center={dangerZone}
        pathOptions={{ color: 'red', fillColor: 'red', fillOpacity: 0.4 }}
        radius={800}
      >
        <Popup>Zone à risque élevé (Oued Loukkos)</Popup>
      </Circle>

    </MapContainer>
  );
}
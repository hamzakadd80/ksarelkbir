'use client';

import { MapContainer, TileLayer, Marker, Popup, Circle, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// --- Configuration des icônes personnalisées (Code couleur) ---
// Note : Dans un vrai projet, on hébergerait ces images dans /public
const createIcon = (color: string) => new L.Icon({
  iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const icons = {
  danger: createIcon('red'),    // Rouge pour urgence/danger
  need: createIcon('orange'),   // Orange pour besoins
  offer: createIcon('blue'),    // Bleu pour offres
  safe: createIcon('green')     // Vert pour lieux sûrs
};

// --- Données simulées (Mock Data) ---
const DATA = {
  dangerZones: [
    { id: 1, pos: [35.0050, -5.9100], radius: 600, label: "Crue Oued Loukkos" },
    { id: 2, pos: [35.0120, -5.9050], radius: 300, label: "Zone Inondée Quartier X" },
  ],
  needs: [
    { id: 1, pos: [35.0030, -5.9080], title: "Besoin de couvertures", type: "Logement" },
    { id: 2, pos: [35.0010, -5.9020], title: "Lait pour bébé", type: "Alimentation" },
  ],
  offers: [
    { id: 1, pos: [35.0080, -5.9150], title: "Hébergement disponible (3 places)", type: "Logement" },
    { id: 2, pos: [34.9990, -5.9000], title: "Distribution repas chauds", type: "Alimentation" },
  ]
};

interface FullMapProps {
  filters: {
    showDanger: boolean;
    showNeeds: boolean;
    showOffers: boolean;
  }
}

export default function FullMap({ filters }: FullMapProps) {
  const position: [number, number] = [35.0017, -5.9053]; // Centre Ksar El Kébir

  return (
    <MapContainer center={position} zoom={14} className="h-full w-full z-0">
      <TileLayer
        attribution='&copy; OpenStreetMap'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* --- 1. ZONES DE DANGER (Cercles Rouges) --- */}
      {filters.showDanger && DATA.dangerZones.map(zone => (
        <Circle 
          key={zone.id}
          center={zone.pos as [number, number]}
          pathOptions={{ color: 'red', fillColor: '#ef4444', fillOpacity: 0.4, weight: 2 }}
          radius={zone.radius}
        >
          <Tooltip sticky>⚠️ {zone.label}</Tooltip>
        </Circle>
      ))}

      {/* --- 2. BESOINS (Marqueurs Oranges) --- */}
      {filters.showNeeds && DATA.needs.map(item => (
        <Marker key={`need-${item.id}`} position={item.pos as [number, number]} icon={icons.need}>
          <Popup>
            <strong className="text-orange-600">Besoin: {item.type}</strong><br/>
            {item.title}
          </Popup>
        </Marker>
      ))}

      {/* --- 3. OFFRES (Marqueurs Bleus) --- */}
      {filters.showOffers && DATA.offers.map(item => (
        <Marker key={`offer-${item.id}`} position={item.pos as [number, number]} icon={icons.offer}>
          <Popup>
            <strong className="text-blue-600">Offre: {item.type}</strong><br/>
            {item.title}
          </Popup>
        </Marker>
      ))}

    </MapContainer>
  );
}
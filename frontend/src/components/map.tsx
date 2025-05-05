'use client';

import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import { useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import Image from 'next/image';
import L from 'leaflet';
import 'leaflet.markercluster';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';

export type Caso = {
  id: number;
  latitude: number | string;
  longitude: number | string;
  gravidade: string;
  confirmado: boolean;
  data_registro: string;
  usuario_nome: string;
  [key: string]: unknown;
};

type Centro = [number, number];

type MapProps = {
  casos: Caso[];
  isLoading: boolean;
  center: Centro;
};

const ClusterMarkers = ({ casos }: { casos: Caso[] }) => {
  const map = useMap();

  useEffect(() => {
    if (!Array.isArray(casos) || casos.length === 0) {
      console.log("casos n é um array de Caso")
      return;
    }

    const clusterGroup = L.markerClusterGroup();

    for (const caso of casos) {
      const lat = parseFloat(String(caso.latitude));
      const lng = parseFloat(String(caso.longitude));

      const marker = L.marker([lat, lng], {
        icon: L.icon({
          iconUrl: '/icon.png',
          iconSize: [30, 30],
          iconAnchor: [15, 30],
          popupAnchor: [0, -30],
        }),
      });

      marker.bindPopup(
        `<div>Gravidade: ${caso.gravidade} <br/> Status: 
        ${caso.confirmado ? "Confirmado" : "Não confirmado"} <br/>
        ${caso.data_registro}
        </div>`,
        { closeButton: false }
      );

      clusterGroup.addLayer(marker);
    }

    map.addLayer(clusterGroup);

    return () => {
      map.removeLayer(clusterGroup);
    };
  }, [map, casos]);

  return null;
};

const Map = ({ casos, isLoading, center }: MapProps) => {
  if (isLoading) {
    return (
      <div className="flex w-full h-full rounded-lg justify-center items-center bg-white">
        <Image unoptimized src="/loading.svg" alt="loading" width={50} height={50} />
      </div>
    );
  }

  return (
    <MapContainer
      center={center}
      zoom={13}
      className="h-full w-full z-40"
      zoomControl={false}
      maxZoom={19}
      minZoom={5}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="©OpenStreetMap"
        noWrap
      />
      <ClusterMarkers casos={Array.isArray(casos) ? casos : []} />
    </MapContainer>
  );
};

export default Map;

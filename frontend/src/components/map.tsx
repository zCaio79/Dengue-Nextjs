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
      return;
    }

    const clusterGroup = L.markerClusterGroup({
      iconCreateFunction: (cluster) => {
        const count = cluster.getChildCount();
        let clusterColor = "bg-red-500";
        const textColor = "text-white";

        if (count < 10) {
          clusterColor = "bg-emerald-500";
        } else if (count < 30) {
          clusterColor = "bg-amber-500";
        }

        const size = count < 10 ? 40 : count < 30 ? 50 : 60;

        return L.divIcon({
          html: `
            <div class="flex items-center justify-center ${clusterColor} ${textColor} font-bold rounded-full border-2 text-md shadow-lg" 
                 style="width: ${size}px; height: ${size}px; line-height: ${size}px;">
              ${count}
            </div>
          `,
          className: "",
          iconSize: [size, size],
        });
      },
      maxClusterRadius: 50,
    });

    for (const caso of casos) {
      const lat = parseFloat(String(caso.latitude));
      const lng = parseFloat(String(caso.longitude));

      const marker = L.marker([lat, lng], {
        icon: L.icon({
          iconUrl: '/mosquitoicon.png',
          iconSize: [40, 40],
          iconAnchor: [20, 40],
          popupAnchor: [0, -40],
        }),
      });

      marker.bindPopup(
        `<div>
          <strong>Usuário:</strong> ${caso.usuario_nome} <br/>
          <strong>Gravidade:</strong> ${caso.gravidade} <br/>
          <strong>Status:</strong> ${caso.confirmado ? "Confirmado" : "Suspeita"} <br/>
          <strong>Data:</strong> ${caso.data_registro}
          
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
      zoom={12}
      className="h-full w-full z-40"
      zoomControl={false}
      maxZoom={19}
      minZoom={4}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="©OpenStreetMap"
        noWrap
      />
      <ClusterMarkers casos={casos} />
    </MapContainer>
  );
};

export default Map;

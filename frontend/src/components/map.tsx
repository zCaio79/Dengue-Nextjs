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
  latitude: number;
  longitude: number;
  nome: string;
};

type Centro = [number, number];

type MapProps = {
  casos: Caso[];
  isLoading: boolean;
  center: Centro;
};

const ClusterMarkers = ({ casos }: { casos: Caso[] }) => {
  const map = useMap();

  const agroupDistance = 45;

  useEffect(() => {
    if (!map) return;

    const markerCluster = L.markerClusterGroup({
      maxClusterRadius: agroupDistance,
      iconCreateFunction: (cluster: L.MarkerCluster) => {
        const count = cluster.getChildCount();
        let size = '30px';
        let color = '#aff957';

        if (count > 30) {
          size = '50px';
          color = '#f95757';
        } else if (count > 20) {
          size = '45px';
          color = '#f9b457';
        }

        return L.divIcon({
          html: `<div style="background-color: ${color}; width: ${size}; height: ${size}; border-radius: 50%; display: flex; justify-content: center; align-items: center; color: black; font-weight: bold; font-size: 12px;">${count}</div>`,
          className: 'leaflet-marker-cluster-custom',
          iconSize: new L.Point(parseInt(size), parseInt(size)),
        });
      },
    });

    casos.forEach((caso) => {
      const marker = L.marker([caso.latitude, caso.longitude], {
        icon: new L.Icon({
          iconUrl: '/icon.png',
          iconSize: [30, 30],
          iconAnchor: [15, 30],
          popupAnchor: [0, -30],
        }),
      });

      marker.bindPopup(
        `<div class='font-robotoMono font-semibold flex gap-2 items-center'>
          ${caso.nome} 
        </div>`,
        {
          closeButton: false,
        }
      );

      markerCluster.addLayer(marker);
    });

    map.addLayer(markerCluster);

    return () => {
      map.removeLayer(markerCluster);
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
      markerZoomAnimation={true}
      zoomControl={false}
      maxZoom={19}
      minZoom={5}
      whenReady={() => console.log("Mapa carregado!")}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="©OpenStreetMap"
        noWrap={true}
      />
      <ClusterMarkers casos={casos} />
    </MapContainer>

  );
};

export default Map;

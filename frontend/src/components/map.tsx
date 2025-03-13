'use client'

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Image from "next/image";
import L from "leaflet";

import { HeartPulse } from "lucide-react";


type Caso = {
  id: number;
  latitude: number;
  longitude: number;
  nome: string;
};

type Centro = [
  latitude : number,
  longitude : number
];

type MapProps = {
  casos: Caso[];
  isLoading: boolean;
  center: Centro;
};


const Map = (props: MapProps) => {

  const casos = props.casos;

  if(!casos || props.isLoading){
    return (
      <div className="flex w-full h-full rounded-lg justify-center items-center bg-white">
        <Image unoptimized src="/loading.svg" alt="loading" width={50} height={50} />
      </div>
    )
  }

  const icon = new L.Icon({
    iconUrl:"/icon.png",
    iconSize: [28, 28],
    iconAnchor: [14, 28],
    popupAnchor: [0, -28]
  });
  

  return (
    <MapContainer
      center={props.center}
      zoom={13}
      className="h-full w-full z-40"
      markerZoomAnimation={false}
      zoomControl={false}
      whenReady={() => console.log("Mapa carregado!")}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="https://www.openstreetmap.org/copyright"
      />

      {casos.map((caso) => (

        <Marker key={caso.id} position={[caso.latitude, caso.longitude]} icon={icon}>
          <Popup closeButton={false} className="font-robotoMono font-semibold">
            <span className="flex gap-2 items-center">{caso.nome} <HeartPulse className="size-5 text-red-500"/></span>
            </Popup>
        </Marker>

      ))}
    </MapContainer >
  );
};

export default Map;

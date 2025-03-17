"use client";

import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L, { LatLng } from "leaflet";
import Image from "next/image";

interface MapFormProps {
    position: LatLng | null;
    setPosition: (position: LatLng) => void;
}

export default function MapForm({ position, setPosition }: MapFormProps) {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const icon = L.icon({
        iconUrl: "/location-pin.png",
        iconSize: [28, 28],
        iconAnchor: [14, 28],
        popupAnchor: [0, -28],
    });

    function LocationMarker() {
        useMapEvents({
            click(e) {
                setPosition(e.latlng);
            },
        });

        return position ? <Marker position={position} icon={icon} /> : null;
    }

    if (!isClient) {
        return (
            <div className="flex w-full h-full rounded-lg justify-center items-center bg-white">
                <Image unoptimized src="/loading.svg" alt="loading" width={50} height={50} />
            </div>
        );
    }

    return (
        <div className="flex w-full h-[40vh] rounded-md items-center bg-zinc-900 p-2 flex-col gap-2">
            <p className="text-sm text-center font-semibold text-white">Selecione sua Localização</p>
            <MapContainer
                center={position ? [position.lat, position.lng] : [-24.2485, -51.6755]}
                zoom={13}
                className="h-full w-full rounded-md"
                markerZoomAnimation={true}
                zoomControl={false}
                whenReady={() => console.log("Mapa carregado!")}
                key={position ? position.lat + "," + position.lng : "default"}
            >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <LocationMarker />
            </MapContainer>
        </div>
    );
}

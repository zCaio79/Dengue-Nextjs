"use client";

import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L, { LatLng } from "leaflet";
import Image from "next/image";
import { useUser } from "@/context/UserContext";


interface MapFormProps {
    position: LatLng | null;
    setPosition: (position: LatLng) => void;
}

export default function MapForm({ position, setPosition }: MapFormProps) {
    const [isClient, setIsClient] = useState(false);
    const [center, setCenter] = useState<[number, number] | null>(null);
    const user = useUser().user;

    const buscarCoordenadas = async (query: string) => {
        if (!query.trim() || query == "") return;

        try {
            const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`);
            const data = await res.json();
            if (data.length > 0) {
                const { lat, lon } = data[0];
                setCenter([parseFloat(lat), parseFloat(lon)]);
            }
        } catch (err) {
            console.error("Erro ao buscar localização:", err);
        }
    }

    if (user != undefined) {
        buscarCoordenadas(user.cidade)
    }

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

    if (center != null) {
        return (
            <div className="flex w-full h-[40vh] rounded-md items-center bg-zinc-900 p-2 flex-col gap-2">
                <p className="text-sm text-center font-semibold text-white">Selecione sua Localização</p>
                <MapContainer
                    center={center}
                    zoom={12}
                    className="h-full w-full rounded-md"
                    markerZoomAnimation={true}
                    zoomControl={false}
                    key={position ? position.lat + "," + position.lng : "default"}
                >
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    <LocationMarker />
                </MapContainer>
            </div>
        );
    }

    return (
        <div className="flex w-full h-full rounded-lg justify-center items-center bg-white">
            <Image unoptimized src="/loading.svg" alt="loading" width={50} height={50} />
        </div>
    )
}

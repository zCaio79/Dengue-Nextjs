"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { LatLng } from "leaflet";
import Link from "next/link";
import dynamic from "next/dynamic";

const MapForm = dynamic(() => import("@/components/mapForm"), { ssr: false });

export default function NewcaseForm() {
  const [exame, setExame] = useState("");
  const [position, setPosition] = useState<LatLng | null>(null);

  function handleNewCase(event: React.FormEvent) {
    event.preventDefault();
    console.log("Posição selecionada:", position);
  }

  return (
    <form
      onSubmit={handleNewCase}
      className="flex flex-col gap-4 h-fit w-screen py-7 px-6 font-robotoMono
      text-zinc-900 font-semibold bg-white rounded-lg md:w-80"
    >
      <h1 className="flex items-center self-center font-bold text-lg gap-2 mb-4">
        <ChevronLeft className="size-5" />
        Novo Caso
        <ChevronRight className="size-5" />
      </h1>

      <div className="flex flex-col gap-2 items-center">
        <p className="text-sm font-semibold">Caso confirmado via Exame?</p>
        <div className="flex gap-2">
          <input
            id="positivo"
            name="exame"
            type="radio"
            value="positivo"
            onChange={(e) => setExame(e.target.value)}
            required
          />
          <label htmlFor="positivo" className="text-sm mr-2">
            Sim
          </label>

          <input
            id="negativo"
            name="exame"
            type="radio"
            value="negativo"
            onChange={(e) => setExame(e.target.value)}
            required
          />
          <label htmlFor="negativo" className="text-sm">
            Não
          </label>
        </div>
      </div>
      
      <MapForm position={position} setPosition={setPosition} />

      <hr className="border-t-2 border-dashed border-zinc-900" />

      <div className="flex gap-4 w-full justify-center">
        <Link
          href="/dashboard"
          className="flex self-center justify-center my-1 w-24 text-sm bg-red-500 rounded-lg py-1 text-white hover:bg-red-400"
        >
          Cancelar
        </Link>
        <button
          type="submit"
          className="flex self-center justify-center my-1 w-24 text-sm bg-emerald-500 rounded-lg py-1 text-white hover:bg-emerald-400"
        >
          Enviar
        </button>
      </div>
    </form>
  );
}

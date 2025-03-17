"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { LatLng } from "leaflet";
import Link from "next/link";
import dynamic from "next/dynamic";

const MapForm = dynamic(() => import("@/components/mapForm"), { ssr: false });

export default function NewcaseForm() {
  const [exame, setExame] = useState("");
  const [gravidade, setGravidade] = useState("");
  const [position, setPosition] = useState<LatLng | null>(null);
  const [error, setError] = useState<string | null>(null);

  function handleNewCase(event: React.FormEvent) {
    event.preventDefault();
    setError(null);
    
    if(!position){
      setError("Selecione uma localização no mapa.");
      return;
    }
    console.log("Novo caso registrado:", { position, gravidade, exame });
  }

  return (
    <form
      onSubmit={handleNewCase}
      className="flex flex-col gap-6 w-full py-6 px-8 font-robotoMono
      text-zinc-900 font-semibold bg-white rounded-lg shadow-md
      md:w-[45%]"
    >
      <h1 className="flex items-center self-center font-bold text-lg gap-2 mb-4">
        <ChevronLeft className="size-5" />
        Novo Caso
        <ChevronRight className="size-5" />
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-2">
        <div className="flex flex-col gap-8 md:gap-16">
          <fieldset className="flex flex-col gap-2">
            <legend className="text-sm font-semibold mb-4">Caso confirmado via Exame?</legend>
            <div className="flex gap-4">
              <label className="flex gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="exame"
                  value="positivo"
                  onChange={(e) => setExame(e.target.value)}
                  required
                />
                <span className="text-sm">Sim</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="exame"
                  value="negativo"
                  onChange={(e) => setExame(e.target.value)}
                  required
                />
                <span className="text-sm">Não</span>
              </label>
            </div>
          </fieldset>

          <fieldset className="flex flex-col">
            <legend className="text-sm font-semibold mb-4">Gravidade:</legend>
            <div className="flex flex-col gap-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="gravidade"
                  value="leve"
                  onChange={(e) => setGravidade(e.target.value)}
                  required
                />
                <span className="text-sm text-emerald-500">Leve</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="gravidade"
                  value="moderada"
                  onChange={(e) => setGravidade(e.target.value)}
                  required
                />
                <span className="text-sm text-amber-500">Moderada</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="gravidade"
                  value="grave"
                  onChange={(e) => setGravidade(e.target.value)}
                  required
                />
                <span className="text-sm text-red-500">Grave</span>
              </label>
            </div>
          </fieldset>
        </div>

        <MapForm position={position} setPosition={setPosition} />
      </div>

      {error && <div className="text-xs w-full text-center bg-red-500 text-white rounded-md py-1">{error}</div>}

      <hr className="border-t-2 border-dashed border-zinc-900" />

      <div className="flex gap-4 w-full justify-center">
        <Link
          href="/dashboard"
          className="flex items-center justify-center w-24 text-sm bg-red-500 rounded-lg py-1 text-white hover:bg-red-400 transition"
        >
          Cancelar
        </Link>
        <button
          type="submit"
          className="flex items-center justify-center w-24 text-sm bg-emerald-500 rounded-lg py-1 text-white hover:bg-emerald-400 transition"
        >
          Enviar
        </button>
      </div>
    </form>
  );
}

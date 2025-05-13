"use client";

import { BadgeCheck, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { LatLng } from "leaflet";
import Link from "next/link";
import dynamic from "next/dynamic";
import Image from "next/image";


const MapForm = dynamic(() => import("@/components/mapForm"), { ssr: false });

export default function NewcaseForm() {
  const [exame, setExame] = useState<boolean>(false);
  const [gravidade, setGravidade] = useState("");
  const [position, setPosition] = useState<LatLng | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isSucess, setIsSucess] = useState<boolean>(false)

  function getTokenFromCookie() {
    const cookieString = document.cookie;
    const cookies = cookieString.split("; ");

    for (const cookie of cookies) {
      const [name, value] = cookie.split("=");
      if (name === "token") return value;
    }

    return null;
  }

  async function handleNewCase(event: React.FormEvent) {
    event.preventDefault()
    setError(null)

    if (!position) {
      setError("Selecione uma localização no mapa.");
      return;
    }

    try {
      setIsLoading(true)
      const token = getTokenFromCookie();
      if (!token) {
        setIsLoading(false)
        setError("Identificação Inválida, Faça login novamente!");
        return;
      }

      const body = {
        latitude: position.lat,
        longitude: position.lng,
        confirmado: exame,
        gravidade: gravidade,
        data_registro : new Date().toISOString().replace('T', ' ').slice(0, 19)

      };

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/casos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const data = await response.json()
        setError("Um Erro ocorreu, tente novamente...")
        setIsLoading(false)
        throw new Error(data.message || "Erro ao registrar caso.")
      }

      console.log("Caso registrado com sucesso!");

      setIsSucess(true)
      setIsLoading(false)

    } catch (err) {
      setError("Erroao enviar caso...");
      console.log(err);
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex h-[80vh] w-full py-6 px-8 justify-center items-center font-robotoMono
      text-zinc-900 font-semibold bg-white rounded-lg shadow-md
      md:w-[45%]">
        <Image unoptimized src="/loading.svg" alt="loading" width={50} height={50} />
      </div>
    )
  }

  if (isSucess) {
    return (

      <div className="absolute inset-0 flex justify-center items-center bg-opacity-70 bg-zinc-800">
        <div className="flex justify-center items-center p-4 bg-white h-fit rounded-lg text-zinc-800 ">

          <div className="flex font-robotoMono flex-col font-semibold p-16 justify-center items-center gap-6
            rounded-lg border-4 border-dashed border-emerald-600">

            <p className="text-lg">Caso Adicionado! </p>
            <Link href="/dashboard" className="flex items-center gap-2 bg-emerald-600 py-2 px-4 rounded-md font-robotoMono 
            text-white text-sm hover:bg-emerald-400">Mapear <BadgeCheck className="size-5" />
            </Link>

          </div>
        </div>
      </div>

    )
  }

  return (
    <form
      onSubmit={handleNewCase}
      className="flex flex-col gap-8 w-full py-6 px-8 font-robotoMono
      text-zinc-900 font-semibold bg-white rounded-lg shadow-md
      md:w-[45%]"
    >
      <h1 className="flex items-center self-center font-bold text-lg gap-2 mb-4">
        <ChevronLeft className="size-5" />
        Novo Caso
        <ChevronRight className="size-5" />
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-2">
        <div className="flex border-2 border-dashed border-zinc-800 rounded-md p-6 flex-col gap-6 md:gap-16">
          <fieldset className="flex flex-col gap-2">
            <legend className="text-sm font-semibold mb-4">Caso confirmado via Exame?</legend>
            <div className="flex gap-4">
              <label className="flex gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="exame"
                  value="positivo"
                  onChange={() => setExame(true)}
                  required
                />
                <span className="text-sm">Sim</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="exame"
                  value="negativo"
                  onChange={() => setExame(false)}
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
                  value="moderado"
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

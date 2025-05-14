'use client'


import { useEffect, useState } from "react";
import RecentCase from "./recentCase"
import { Caso } from "./map"
import Image from "next/image";
import { ClockArrowUp, Laugh } from "lucide-react";


export default function RecentCases() {

    const [isLoading, setIsLoading] = useState(true)
    const [casos, setCasos] = useState<Caso[]>([]);

    useEffect(() => {
        const fetchCasos = async () => {

            try {
                const hoje = new Date().toLocaleDateString("en-CA");

                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/casos/recentes?data=${hoje}`);
                const { casos_recentes } = await res.json();
                setCasos(casos_recentes);
                setIsLoading(false);
            } catch (err) {
                console.error('Erro ao buscar casos:', err);
            }
        };

        fetchCasos();
    }, []);

    if (isLoading) {
        return (
            <Image unoptimized src="/loading.svg" alt="loading" width={40} height={40} />
        )
    }

    if (casos.length === 0) {
        return (
            <span className="flex flex-col gap-6 items-center font-robotoMono font-semibold self-center text-sm text-zinc-800">
                Nenhum caso foi encontrado Hoje... <Laugh className="size-6 animate-bounce text-emerald-500" /></span>
        )
    }

    return (
        <>
            <div className='flex w-full items-center gap-4 bg-red-500 rounded-lg p-2 mb-2 justify-center'>

                <h1 className='text-lg text-white font-robotoMono font-semibold text-center'>Casos Recentes</h1>
                <ClockArrowUp className="size-5 text-white" />

            </div>
            <article className='flex w-full font-robotoMono gap-3 pl-1 pr-2 h-full flex-col overflow-scroll scrollbar-thin'>

                {casos.map((caso, index) => (
                    <RecentCase key={index} confirmado={caso.confirmado} data={caso.data_registro} />
                ))}

            </article>
        </>
    )
}
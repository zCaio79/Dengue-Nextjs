'use client'

import RecentCases from "@/components/recentCases";
import { ArrowDown, ArrowLeft, Search, User2Icon, X, Plus } from "lucide-react";
import Link from 'next/link';
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Caso } from "@/components/map";
import { useUser } from "@/context/UserContext";
import Image from "next/image";

export default function Dashboard() {
    const [casos, setCasos] = useState<Caso[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [center, setCenter] = useState<[number, number] | null>(null);
    const [search, setSearch] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [selectedOption, setSelectedOption] = useState<string>("");
    const user = useUser().user;

    useEffect(() => {
        setIsLoggedIn(!!user);
        if (user != undefined) {
            buscarCoordenadas(user.cidade);
        } else {
            setCenter([-24.2483, -51.6797])
        }
    }, [user]);

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

    useEffect(() => {
    const fetchCasos = async () => {
        try {
            let url = `${process.env.NEXT_PUBLIC_API_URL}/casos`;

            if (selectedOption) {
                let startDate = new Date();
                const endDate = new Date();

                switch (selectedOption) {
                    case "semana":
                        startDate.setDate(startDate.getDate() - 7);
                        break;
                    case "mes":
                        startDate = new Date(startDate.getFullYear(), startDate.getMonth(), 1);
                        break;
                    case "ano":
                        startDate = new Date(startDate.getFullYear(), 0, 1);
                        break;
                    default:
                        console.warn("Opção desconhecida:", selectedOption);
                        return;
                }
                const startDateString = startDate.toLocaleDateString("en-CA");
                const endDateString = new Date(endDate.setDate(endDate.getDate() + 1)).toLocaleDateString("en-CA");

                url += `?data_inicio=${startDateString}&data_fim=${endDateString}`;
            }

            const res = await fetch(url);
            const { casos } = await res.json();
            setCasos(casos);
            
        } catch (err) {
            console.error('Erro ao buscar casos:', err);
        } finally {
            setIsLoading(false);
        }
    };

    fetchCasos();
}, [selectedOption]);


    const Map = dynamic(() => import("@/components/map"), { ssr: false });

    const handleLogout = () => {
        document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
        window.location.href = "/";
    }

    return (
        <div className="flex w-full flex-col p-4 min-h-screen bg-zinc-900 lg:p-6 lg:h-screen">

            <header className="flex flex-col w-full mb-4 gap-3 px-4 py-4 items-center justify-between bg-white rounded-lg lg:mb-6 lg:flex-row lg:gap-6 lg:px-6">

                <div className="flex items-center h-fit justify-center gap-2 text-zinc-900 lg:h-12">

                    <nav className="flex items-center gap-4">

                        <Link href="/" className="flex text-sm bg-white rounded-full p-2 font-bold font-robotoMono text-red-500 hover:bg-red-500 hover:text-white">
                            <ArrowLeft />
                        </Link>

                        {isLoggedIn ? (
                            <div className="flex gap-2 flex-wrap">
                                <div className="flex items-center text-nowrap gap-2 w-fit text-xs bg-red-500 rounded-lg px-4 py-3 font-bold font-robotoMono text-white sm:text-sm">
                                    <User2Icon className="size-5" />
                                    <p>{user?.name}</p>
                                </div>
                                <button type="button" onClick={handleLogout} className="flex h-full items-center gap-2 w-fit text-xs bg-zinc-900 rounded-lg px-4 py-3 font-bold font-robotoMono text-white hover:bg-zinc-600 sm:text-sm">
                                    <p>Sair</p>
                                    <X className="size-5" />
                                </button>
                            </div>
                        ) : (
                            <Link href="/login" className="flex h-full items-center gap-2 w-fit text-xs bg-red-500 rounded-lg px-4 py-3 font-bold font-robotoMono text-white hover:bg-red-400 sm:text-sm">
                                <User2Icon />
                                Convidado
                            </Link>
                        )}

                    </nav>
                </div>

                <div className="flex h-fit flex-col-reverse w-full gap-4 lg:w-7/12 md:flex-row md:itens-center lg:h-12">

                    <div className="flex flex-row-reverse gap-2 w-full justify-center itens-center md:gap-4 lg:flex-row">
                        <Link href="/newcase" className="flex items-center justify-center flex-grow  gap-2 h-full w-fit text-nowrap text-xs bg-red-500 rounded-lg px-3 py-3.5 font-bold font-robotoMono text-white hover:bg-red-400 sm:text-sm">
                            Adicionar Caso <Plus className="size-5" />
                        </Link>

                        <div className="relative z-50 flex flex-row items-center">
                            <div>
                                <select
                                    value={selectedOption}
                                    onChange={(e) => {
                                        setSelectedOption(e.target.value);
                                    }}
                                    className="flex flex-grow p-3.5 rounded-lg w-full bg-zinc-800 font-robotoMono font-bold text-white text-xs outline-none sm:text-sm"
                                >
                                    <option value="">Filtrar</option>
                                    <option value="semana">Casos da Semana</option>
                                    <option value="mes">Casos do Mês</option>
                                    <option value="ano">Casos do Ano</option>
                                </select>
                            </div>
                        </div>

                    </div>

                    <div className="relative flex w-full font-robotoMono font-medium text-sm">
                        <input
                            type="text"
                            className="flex flex-grow w-full py-2 px-3 pr-8 border-2  text-zinc-900 border-red-400 rounded-xl outline-none"
                            placeholder="Procurar localização"
                            onChange={(e) => setSearch(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    buscarCoordenadas(search);
                                }
                            }}
                            aria-label="Campo de busca de localização"
                        />

                        <button
                            type="button"
                            onClick={() => buscarCoordenadas(search)}
                            className="absolute inset-y-0 right-3 flex items-center justify-center outline-none">
                            <Search className="size-5 text-zinc-900 hover:text-red-500" />
                        </button>
                    </div>

                </div>

            </header>

            <main className="flex flex-col-reverse gap-2 w-full h-full justify-between overflow-hidden lg:flex-row lg:gap-8 md:flex-col">

                <section className="flex flex-col justify-center items-center gap-4 w-full min-w-fit p-4 h-[70vh] rounded-lg bg-white lg:w-2/5 lg:h-full h-lg:w-full">
                    <RecentCases />
                </section>

                <ArrowDown className="flex self-center text-white lg:hidden h-md:hidden" />

                <section className="flex w-full rounded-lg overflow-hidden bg-white">
                    <article className='flex justify-center items-center w-full h-[75vh] flex-col lg:h-full'>
                        {center != null ? <Map
                            casos={casos}
                            isLoading={isLoading}
                            center={center}
                        />
                            :
                            <div className="flex w-full h-full rounded-lg justify-center items-center bg-white">
                                <Image unoptimized src="/loading.svg" alt="loading" width={50} height={50} />
                            </div>
                        }
                    </article>
                </section>

            </main>

        </div>
    );
}

'use client'

import DateFilterBtn from "@/components/dateFilterBtn";
import RecentCases from "@/components/recentCases";
import { ArrowDown, ArrowLeft, Search, User2Icon, X, Plus } from "lucide-react";
import Link from 'next/link';
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

export default function Dashboard() {
    const Map = dynamic(() => import("@/components/map"), { ssr: false });

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        if (document.cookie.includes("token")) {
            setIsLoggedIn(true);
        }
    }, []);

    const user = {
        name: "Caio",
        subname: "Henrique"
    }

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

                        {isLoggedIn ?
                            <>
                                <Link href="#" className="flex items-center text-nowrap gap-2 w-fit text-xs bg-red-500 rounded-lg px-3 py-2 font-bold font-robotoMono text-white hover:bg-red-400 sm:text-sm">
                                    <User2Icon className="size-5" />
                                    <p>{user.name} {user.subname}</p>
                                </Link>
                                <button type="button" onClick={handleLogout} className="flex h-full items-center gap-2 w-fit text-xs bg-zinc-900 rounded-lg px-3 py-2 font-bold font-robotoMono text-white hover:bg-zinc-600 sm:text-sm">
                                    <p>Sair</p>
                                    <X className="size-5" />
                                </button>
                            </>
                            :
                            <Link href="/login" className="flex h-full items-center gap-2 w-fit text-xs bg-red-500 rounded-lg px-3 py-2 font-bold font-robotoMono text-white hover:bg-red-400 sm:text-sm">
                                <User2Icon />
                                Convidado
                            </Link>
                        }

                    </nav>
                </div>

                <div className="flex h-fit flex-col-reverse w-full gap-4 lg:w-7/12 md:flex-row md:itens-center lg:h-12">

                    <div className="flex flex-wrap flex-row-reverse gap-2 w-full justify-end itens-center md:gap-4 md:flex-row md:justify-center">
                        <Link href="/newcase" className="flex items-center gap-2 h-full w-fit text-nowrap text-xs bg-red-500 rounded-lg px-3
                        py-2 font-bold font-robotoMono text-white hover:bg-red-400 sm:text-sm">
                            Adicionar Caso <Plus className="size-5" />
                        </Link>

                        <DateFilterBtn />
                    </div>

                    <div className="relative flex w-full font-robotoMono font-medium text-sm">

                        <input type="text" className="flex flex-grow w-full py-2 px-3 pr-8 border-2 border-dashed text-zinc-900
                         border-red-500 rounded-xl outline-none" placeholder="Procurar localização" />
                        <button type="button" className="absolute inset-y-0 right-3 flex items-center justify-center outline-none">
                            <Search className="size-5 text-zinc-900" />
                        </button>

                    </div>


                </div>

            </header>

            <main className="flex flex-col-reverse gap-2 w-full h-full justify-between overflow-hidden lg:flex-row lg:gap-8 md:flex-col">

                <section className="flex flex-col gap-4 w-full min-w-fit p-4 h-[70vh] rounded-lg bg-white lg:w-2/5 lg:h-full h-lg:w-full">

                    <RecentCases />

                </section>

                <ArrowDown className="flex self-center text-white lg:hidden h-md:hidden" />

                <section className="flex w-full rounded-lg overflow-hidden bg-white">

                    <article className='flex justify-center items-center w-full h-[75vh] flex-col lg:h-full'>

                        <Map
                            casos={[
                                { id: 1, latitude: -24.248, longitude: -51.675, nome: "Local 1" },
                                { id: 2, latitude: -24.260, longitude: -51.680, nome: "Local 2" }
                            ]}
                            isLoading={false}
                            center={[-24.2485, -51.6755]}
                        />

                    </article>

                </section>

            </main>

        </div >
    )
}
'use client'

import DateFilterBtn from "@/components/dateFilterBtn";
import RecentCases from "@/components/recentCases";
import { ArrowDown, ArrowLeft, Search, User2Icon, X } from "lucide-react";
import Link from 'next/link';
import { useState, useEffect } from "react";

export default function Dashboard() {
    
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        if (document.cookie.includes("token")) {
            setIsLoggedIn(true);
        }
    }, []);

    const user = {
        name : "Caio",
        subname : "Henrique"
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
                            <Link href="#" className="flex h-full items-center gap-2 w-fit text-sm bg-red-500 rounded-lg px-3 py-2 font-bold font-robotoMono text-white hover:bg-red-400">
                                <User2Icon className="size-5"/>
                                <p>{user.name} {user.subname}</p>
                            </Link>
                            <button type="button" onClick={handleLogout} className="flex h-full items-center gap-2 w-fit text-sm bg-zinc-900 rounded-lg px-3 py-2 font-bold font-robotoMono text-white hover:bg-zinc-600">
                                <p>Sair</p>
                                <X className="size-5"/>
                            </button>
                            </>
                            :
                            <Link href="/login" className="flex h-full items-center gap-2 w-fit text-sm bg-red-500 rounded-lg px-3 py-2 font-bold font-robotoMono text-white hover:bg-red-400">
                                <User2Icon />
                                Convidado
                            </Link>
                        }

                    </nav>






                </div>

                <div className="flex h-fit flex-col-reverse w-full gap-4 lg:w-1/2 md:flex-row md:itens-center lg:h-12">
                    
                    <DateFilterBtn/>

                    <div className="relative flex w-full font-robotoMono font-medium text-sm">

                        <input type="text" className="flex w-full py-2 px-3 pr-8 border-2 border-dashed border-red-500 rounded-xl outline-none" placeholder="Procurar localização" />
                        <button type="button" className="absolute inset-y-0 right-3 flex items-center justify-center outline-none">
                            <Search className="size-5 text-zinc-900" />
                        </button>

                    </div>


                </div>

            </header>

            <main className="flex flex-col-reverse gap-2 w-full h-full justify-between overflow-hidden lg:flex-row lg:gap-8 h-sm:flex-col">

                <section className="flex flex-col gap-4 w-full min-w-fit p-4 h-[80vh] rounded-lg bg-white lg:w-2/5 lg:h-full h-lg:w-full">

                    <RecentCases />

                </section>

                <ArrowDown className="flex self-center text-white lg:hidden h-md:hidden" />

                <section className="flex w-full p-2 rounded-lg bg-white lg:p-4">

                    <article className='flex justify-center items-center w-full h-[80vh] flex-col rounded-lg lg:h-full'>

                        <p className="text-2xl font-robotoMono font-bold text-zinc-500">Map</p>

                    </article>

                </section>

            </main>

        </div >
    )
}
'use client'

import { Eye, EyeOff, ChevronRight, ChevronLeft, } from "lucide-react";
import { useState } from "react";
import Link from 'next/link';

export default function LoginForm() {

    const [showPassword, setShowPassword] = useState(false);

    const error = false

    const handleSubmitLogin = (e: React.FormEvent) => {
        e.preventDefault();
    }

    return (
        <form onSubmit={handleSubmitLogin} className="flex flex-col gap-4 h-fit w-screen py-7 px-6 font-robotoMono text-red-500 font-semibold bg-white rounded-lg md:w-80">

            <h1 className="flex items-center self-center font-bold text-lg gap-2 mb-2"><ChevronLeft className=" size-5" />Login<ChevronRight className="size-5" /></h1>

            <label htmlFor="email">e-mail :</label>
            <input
                id="email"
                type="text"
                className="p-2 border-2 border-dashed border-red-500 rounded-md text-zinc-900 text-sm outline-none"
                spellCheck="false"
            />

            <label htmlFor="password">senha :</label>
            <div className="relative flex w-full">
                <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    className="p-2 pr-8 w-full border-2 border-dashed border-red-500 rounded-md text-zinc-900 text-sm outline-none"
                    spellCheck="false"
                />
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-2 flex items-center justify-center outline-none"
                >
                    {showPassword ? <Eye className="size-5 text-red-500" /> : <EyeOff className="size-5 text-red-500" />}
                </button>
            </div>

            {error && <div className="text-xs w-full text-center bg-red-500 text-white rounded-md py-1">usuário ou senha inválidos!</div>}

            <button type="submit" className="flex self-center my-1 w-fit text-sm bg-red-500 rounded-lg py-1 px-3 text-white hover:bg-red-400">
                Entrar
            </button>

            <hr className="border-t-2 border-dashed border-red-500" />

            <Link href="/register" className="text-xs self-center underline text-red-500 hover:text-red-400">não possui uma conta?</Link>
        </form>
    )
}
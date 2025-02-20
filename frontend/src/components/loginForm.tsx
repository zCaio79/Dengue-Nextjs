'use client'

import { Eye, EyeOff, ChevronRight, ChevronLeft, } from "lucide-react";
import { useState } from "react";
import Link from 'next/link';
import Image from "next/image";


const APIKEY = process.env.NEXT_PUBLIC_API_URL;


export default function LoginForm() {

    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmitLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        setError(null)

        if (password.length < 8) {
            setError("Senha deve conter no mínimo 8 caracteres!");
            return;
        }

        const formData = {
            email: email,
            senha: password,
        };

        try {
            console.log("Enviando dados de login:", formData);
            setIsLoading(true)

            const response = await fetch(`${APIKEY}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                setError("Erro ao logar!");
                setIsLoading(false)
                return;
            }

            const data = await response.json();

            if (!data.token) {
                setError("Erro: Nenhum token recebido!");
                setIsLoading(false)
                return;
            }
            
            document.cookie = `token=${data.token}; path=/; max-age=${7 * 24 * 60 * 60}; SameSite=Lax`;

            console.log("Logado com sucesso");
            setIsLoading(false)

            window.location.href = "/dashboard";

        } catch (error) {
            console.error("Erro na requisição:", error);
            setError("Erro ao tentar logar. Tente novamente mais tarde.");
            setIsLoading(false)
        }
    };


    return (
        <form onSubmit={handleSubmitLogin} className="flex flex-col gap-4 h-fit w-screen py-7 px-6 font-robotoMono text-red-500 font-semibold bg-white rounded-lg md:w-80">

            <h1 className="flex items-center self-center font-bold text-lg gap-2 mb-2"><ChevronLeft className=" size-5" />Login<ChevronRight className="size-5" /></h1>

            <label htmlFor="email">e-mail :</label>
            <input
                id="email"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                className="p-2 border-2 border-dashed border-red-500 rounded-md text-zinc-900 text-sm outline-none"
                spellCheck="false"
                placeholder="ex: caio@gmail.com"
                required
            />

            <label htmlFor="password">senha :</label>
            <div className="relative flex w-full">
                <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    className="p-2 pr-8 w-full border-2 border-dashed border-red-500 rounded-md text-zinc-900 text-sm outline-none"
                    spellCheck="false"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-2 flex items-center justify-center outline-none"
                >
                    {showPassword ? <Eye className="size-5 text-red-500" /> : <EyeOff className="size-5 text-red-500" />}
                </button>
            </div>

            {error && <div className="text-xs w-full text-center p-2 bg-red-500 text-white rounded-md py-1">{error}</div>}

            {isLoading ?
                <div className="flex flex-row gap-6 justify-center w-full ">
                    <button className="flex self-center my-1 w-fit text-sm bg-red-500 rounded-lg py-1 px-3 text-white hover:bg-red-400">
                        Entrar
                    </button>
                    <Image unoptimized src="/loading.svg" alt="loading" width={40} height={40} />
                </div>
                :
                <button type="submit" className="flex self-center my-1 w-fit text-sm bg-red-500 rounded-lg py-1 px-3 text-white hover:bg-red-400">
                    Entrar
                </button>
            }

            <hr className="border-t-2 border-dashed border-red-500" />

            <Link href="/register" className="text-xs self-center underline text-red-500 hover:text-red-400">não possui uma conta?</Link>
        </form>
    )
}
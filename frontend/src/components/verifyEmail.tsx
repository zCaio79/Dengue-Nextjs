'use client'

import { ChevronLeft, ChevronRight, MailCheck, RotateCcw } from "lucide-react"
import { useState } from "react";
import Image from "next/image";

export default function VerifyEmail() {

    const APIKEY = process.env.NEXT_PUBLIC_API_URL;

    const [email, setEmail] = useState("");
    const [code, setCode] = useState("");
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [reenviar, setReenviar] = useState(true)
    const [isOk, setIsOk] = useState(false)

    async function handleResendEmail() {
        setIsLoading(true)
        setError(null)

        if (!email || email == ""){
            setError("Preencha o campo de e-mail.");
            setIsLoading(false)
            return
        }

        setReenviar(false)

        const formData = {
            email: email,
        }

        try {
            const response = await fetch(`${APIKEY}/resend-code`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                console.log("Código reenviado com sucesso!");
                setError(null);
            } else {
                console.log(response);
                setError("Erro ao reenviar código.");
            }

        } catch (error) {
            console.log("Erro ao enviar dados:", error);
            setError("Erro ao reenviar código.");
            setIsLoading(false)
        } finally {
            setIsLoading(false);

            setTimeout(() => {
                setReenviar(true);
            }, 300000);
        }
    }


    async function handleVerify(event: React.FormEvent) {
        event.preventDefault()

        const formData = {
            email: email,
            codigo: code
        }

        try {
            setIsLoading(true)
            setError(null)

            const response = await fetch(`${APIKEY}/verify-email`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                console.log("Email Validado com Sucesso!");
                setIsLoading(false)
                setIsOk(true)
                setTimeout(() => {
                    window.location.href = "/login"
                }, 3000);
            } else {
                console.log(response)
                setError("Erro ao Validar Email... ")
                setIsLoading(false)
            }
            return

        } catch (error) {
            console.log("Erro ao enviar dados:", error);
            setError("Erro ao Validar Email...");
            setIsLoading(false)
        }
    }


    return (
        <form onSubmit={handleVerify} className="flex flex-col gap-4 h-fit w-screen py-7 px-6 font-robotoMono text-zinc-900 font-semibold bg-white rounded-lg md:w-80">

            <h1 className="flex items-center self-center font-bold text-lg gap-2 mb-2"><ChevronLeft className=" size-5" />Ativar conta<ChevronRight className="size-5" /></h1>

            <label htmlFor="email">e-mail :</label>
            <input
                id="email"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                className="p-2 border-2 border-dashed border-zinc-900 rounded-md text-zinc-900 text-sm outline-none"
                spellCheck="false"
                placeholder="ex: caio@gmail.com"
                required
            />

            <label htmlFor="code">Código de verificação :</label>
            <div className="flex w-full">
                <input
                    id="code"
                    type="text"
                    className="p-2 pr-8 w-full border-2 border-dashed border-zinc-900 rounded-md text-zinc-900 text-sm outline-none"
                    spellCheck="false"
                    onChange={(e) => setCode(e.target.value)}
                    required
                />
            </div>

            {error && <div className="text-xs w-full text-center p-2 bg-red-500 text-white rounded-md py-1">{error}</div>}
            {isOk && <div className="text-xs w-full text-center p-2 bg-emerald-500 text-white rounded-md py-1">Email Verificado Com Sucesso!</div>}

            {isLoading || isOk ?
                <div className="w-full flex">
                    {!isOk &&
                        <div className="flex flex-row justify-center w-full ">
                            <Image unoptimized src="/loading.svg" alt="loading" width={40} height={40} />
                        </div>
                    }
                </div>

                :
                <div className="flex w-full gap-2 justify-between">
                    <button type="submit" className="flex self-center my-1 w-fit text-sm bg-red-500 rounded-lg py-2 px-3 text-white hover:bg-white hover:text-red-500">
                        Validar
                    </button>
                    {reenviar ?
                        <button type="button" onClick={handleResendEmail} className="flex gap-2 self-center my-1 w-fit text-sm bg-zinc-800 rounded-lg py-2 px-3 text-white hover:bg-white hover:text-zinc-800">
                            <RotateCcw className="size-5" /> Reenviar
                        </button>
                        :
                        <button type="button" disabled={true} className="flex gap-2 self-center my-1 w-fit text-sm bg-zinc-800 rounded-lg py-2 px-3 text-white">
                            <MailCheck className="size-5" />
                        </button>
                    }
                </div>

            }

            <hr className="border-t-2 border-dashed border-zinc-900" />
        </form>
    )
}

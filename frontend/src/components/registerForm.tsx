'use client'

import { Eye, EyeOff, ChevronRight, ChevronLeft, BadgeCheck } from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import Link from 'next/link';
import Image from "next/image";

const APIKEY = process.env.NEXT_PUBLIC_API_URL;

interface Cidade {
    id: number;
    municipio: string;
    estado: string;
}

interface ApiResponse {
    cidades: Cidade[];
}

const ufs = [
    "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA",
    "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN",
    "RS", "RO", "RR", "SC", "SP", "SE", "TO"
];

export default function RegisterForm() {

    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [name, setName] = useState("");
    const [subname, setSubname] = useState("");

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");

    const [selectedUF, setSelectedUF] = useState("");
    const [selectedCity, setSelectedCity] = useState("");

    const [cities, setCities] = useState<Cidade[]>([]);
    const [loadingCities, setLoadingCities] = useState(false);

    const [isLoading, setIsLoading] = useState(false)
    const [isRegistred, setIsRegistred] = useState(false)

    useEffect(() => {
        if (!selectedUF || !APIKEY) return;
    
        setLoadingCities(true);
        setCities([]);
    
        const controller = new AbortController();
        const { signal } = controller;
    
        let receivedText = ""; 
    
        const fetchCities = async () => {
            try {
                const response = await fetch(`${APIKEY}/localidades?uf=${selectedUF}`, { signal });
                if (!response.ok) throw new Error("Erro ao buscar cidades");
    
                const reader = response.body?.getReader();
                if (!reader) throw new Error("Erro ao obter stream de resposta");
    
                const decoder = new TextDecoder();
    
                while (true) {
                    const { done, value } = await reader.read();
                    if (done) break;
    
                    receivedText += decoder.decode(value, { stream: true });
    
                    try {
                        const parsedData: ApiResponse = JSON.parse(receivedText);
                        if (parsedData.cidades) {
                            setCities(parsedData.cidades.slice(0));
                        }
                    } catch (error) {
                        console.log(error)
                    }
                }
            } catch (error) {
                console.error("Abort:", error);
                
            } finally {
                if (!signal.aborted) {
                    setLoadingCities(false);
                    return
                }
            }
        };
    
        fetchCities();
    
        return () => controller.abort();
    }, [selectedUF]);
    

    const memoizedCities = useMemo(() => {
        return cities;
    }, [cities]);


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setShowPassword(false)
        setError(null)
        if (password !== passwordConfirm) {
            setError("Senhas não correspondem!");
            return;
        }

        if (password.length < 8) {
            setError("Senha deve conter no mínimo 8 caracteres!");
            return;
        }

        const formData = {
            nome: name + " " + subname,
            email: email,
            senha: password,
            cidade_id: Number(selectedCity),
            permissoes: ["usuarios"]
        };

        try {
            setIsLoading(true)
            console.log("Enviando dados:", JSON.stringify(formData));

            const response = await fetch(`${APIKEY}/cadastrar_usuario`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                console.log("Cadastro realizado com sucesso!");
                setIsLoading(false)
                setIsRegistred(true)
            }else{
                console.log(response)
                setError("Erro ao realizar cadastro...")
                setIsLoading(false)
            }
            return

        } catch (error) {
            console.log("Erro ao enviar dados:", error);
        }

    };

    return (
        <>
            <form onSubmit={handleSubmit} className="flex flex-col gap-6 h-fit w-screen p-7 font-robotoMono text-zinc-900 font-semibold
             bg-white rounded-lg md:w-[650px]">
                <h1 className="flex items-center self-center font-bold text-lg gap-2 mb-2">
                    <ChevronLeft className=" size-5" />Registro<ChevronRight className="size-5" />
                </h1>

                <div className="flex flex-col gap-4 md:flex-row md:gap-8">
                    <div className="flex flex-col gap-4 w-full md:w-1/2">
                        <label htmlFor="name">Nome:</label>
                        <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="p-2 border-2 border-dashed border-zinc-900 rounded-md text-zinc-900 text-sm outline-none"
                            spellCheck="false"
                            placeholder="ex: Caio"
                            autoComplete="off"
                            required
                        />

                        <label htmlFor="subname">Sobrenome:</label>
                        <input
                            id="subname"
                            type="text"
                            value={subname}
                            onChange={(e) => setSubname(e.target.value)}
                            className="p-2 border-2 border-dashed border-zinc-900 rounded-md text-zinc-900 text-sm outline-none"
                            spellCheck="false"
                            autoComplete="off"
                            placeholder="ex: Faria Mendes"
                            required
                        />

                        <label htmlFor="uf">Estado (UF):</label>
                        <select
                            id="uf"
                            value={selectedUF}
                            onChange={(e) => setSelectedUF(e.target.value)}
                            className="flex p-2 border-2 border-dashed border-zinc-900 rounded-md text-zinc-800 text-sm outline-none"
                            required
                        >
                            <option value="">Selecione seu estado</option>
                            {ufs.map((uf) => (
                                <option key={uf} value={uf}>{uf}</option>
                            ))}
                        </select>

                        {(selectedUF != "") &&
                            <>
                                <label htmlFor="city">Cidade:</label>
                                <div className="flex gap-6 w-full ">
                                    <select
                                        id="cidade"
                                        value={selectedCity}
                                        onChange={(e) => setSelectedCity(e.target.value)}
                                        className="flex w-full p-2 border-2 gap-1 border-dashed border-zinc-900 rounded-md text-zinc-800 text-sm outline-none over"
                                        disabled={!selectedUF || memoizedCities.length === 0 || loadingCities}
                                        required
                                    >
                                        <option value="">Selecione uma cidade</option>
                                        {memoizedCities.map((city: Cidade) => (
                                            <option key={city.id} value={city.id}>
                                                {city.municipio}
                                            </option>
                                        ))}
                                    </select>
                                    {loadingCities && <Image unoptimized src="/loading.svg" alt="loading" width={40} height={40} />}
                                </div>
                            </>
                        }
                    </div>

                    <div className="flex flex-col gap-4 w-full md:w-1/2">
                        <label htmlFor="email">E-mail:</label>
                        <input
                            id="email"
                            type="email"
                            onChange={(e) => setEmail(e.target.value)}
                            className="p-2 border-2 border-dashed border-zinc-900 rounded-md text-zinc-900 text-sm outline-none"
                            spellCheck="false"
                            placeholder="ex: caio@gmail.com"
                            required
                        />

                        <label htmlFor="password">Senha:</label>
                        <div className="relative flex w-full">
                            <input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                className="p-2 pr-8 w-full border-2 border-dashed border-zinc-900 rounded-md text-zinc-900 text-sm outline-none"
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

                        <label htmlFor="password-confirm">Confirmar senha:</label>
                        <div className="relative flex w-full">
                            <input
                                id="password-confirm"
                                type={showPassword ? "text" : "password"}
                                className="p-2 pr-8 w-full border-2 border-dashed border-zinc-900 rounded-md text-zinc-900 text-sm outline-none"
                                spellCheck="false"
                                onChange={(e) => setPasswordConfirm(e.target.value)}
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

                    </div>
                </div>

                {error && <div className="text-xs w-full text-center bg-red-500 text-white rounded-md py-1">{error}</div>}

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

                <hr className="border-t-2 border-dashed border-zinc-900" />

                <Link href="/login" className="text-xs self-center underline text-red-500 hover:text-red-400">Já possui uma conta?</Link>
            </form>

            {isRegistred &&
                <div className="absolute inset-0 flex justify-center items-center bg-opacity-70 bg-zinc-800">
                    <div className="flex justify-center items-center p-4 bg-white h-fit rounded-lg text-red-500 ">

                        <div className="flex font-robotoMono flex-col font-semibold p-16 justify-center items-center gap-6
                         rounded-lg border-4 border-dashed border-red-500">

                            <p className="text-lg">Cadastro Realizado! </p>
                            <Link href="/login" className="flex items-center gap-2 bg-red-500 py-2 px-4 rounded-md font-robotoMono
                             text-white text-sm hover:bg-red-400">Login <BadgeCheck className="size-5" />
                            </Link>

                        </div>
                    </div>
                </div>
            }
        </>
    );
}

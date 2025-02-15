'use client'

import { Eye, EyeOff, ChevronRight, ChevronLeft } from "lucide-react";
import { useState, useEffect } from "react";
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

    useEffect(() => {
        if (!selectedUF || !APIKEY) return;
    
        setLoadingCities(true);
        setCities([]);
    
        const controller = new AbortController();
        const { signal } = controller;
    
        const fetchCities = async () => {
            try {
                const response = await fetch(`${APIKEY}/localidades?uf=${selectedUF}`, { signal });
                const reader = response.body?.getReader();
                if (!reader) throw new Error("Erro ao obter stream de resposta");
    
                let receivedText = "";
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
                        console.log("erro de continuidade: ",error)
                    }
                }
            } catch (error) {
                {
                    console.error("Erro ao buscar cidades:", error);
                }
            } finally {
                setLoadingCities(false);
            }
        };
    
        fetchCities();
    
        return () => controller.abort();
    }, [selectedUF]);
    

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== passwordConfirm) {
            setError("Senhas não correspondem!");
            return;
        } else {
            const formData = {
                nome: name + " " + subname,
                email: email,
                senha: password,
                cidade_id: selectedCity
            };

            try {
                const response = await fetch(`${APIKEY}/cadastrar_usuario`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                });

                if (response.ok) {
                    alert("Cadastro realizado com sucesso!");
                }

            } catch (error) {
                console.log("Erro ao enviar dados:", error);
                setError("Erro ao enviar dados.");
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 h-fit w-screen p-7 font-robotoMono text-red-500 font-semibold bg-white rounded-lg md:w-[650px] md:h-fit">
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
                        className="p-2 border-2 border-dashed border-red-500 rounded-md text-zinc-900 text-sm outline-none" spellCheck="false" placeholder="ex: Caio" required />

                    <label htmlFor="subname">Sobrenome:</label>
                    <input
                        id="subname"
                        type="text"
                        value={subname}
                        onChange={(e) => setSubname(e.target.value)}
                        className="p-2 border-2 border-dashed border-red-500 rounded-md text-zinc-900 text-sm outline-none" spellCheck="false" placeholder="ex: Faria Mendes" required />

                    <label htmlFor="uf">Estado (UF):</label>
                    <select
                        id="uf"
                        value={selectedUF}
                        onChange={(e) => setSelectedUF(e.target.value)}
                        className="flex p-2 border-2 border-dashed border-red-500 rounded-md text-zinc-800 text-sm outline-none"
                        style={{ direction: "ltr" }}
                        required
                    >
                        <option value="">Selecione seu estado</option>
                        {ufs.map((uf) => (
                            <option key={uf} value={uf}>{uf}</option>
                        ))}
                    </select>

                    <label htmlFor="city">Cidade:</label>
                    <div className="flex gap-6 w-full">
                        <select
                            id="cidade"
                            value={selectedCity}
                            onChange={(e) => setSelectedCity(e.target.value)}
                            className="flex w-full p-2 border-2 border-dashed border-red-500 rounded-md text-zinc-800 text-sm outline-none"
                            style={{ direction: "ltr" }}
                            disabled={!selectedUF || cities.length === 0 || loadingCities}
                            required
                        >
                            <option value="">Selecione uma cidade</option>
                            {cities.map((city) => (
                                <option key={city.id} value={city.id}>
                                    {city.municipio}
                                </option>
                            ))}
                        </select>
                        {loadingCities && <Image unoptimized src="/loading.svg" alt="loading" width={40} height={40} />}
                    </div>
                </div>

                <div className="flex flex-col gap-4 w-full md:w-1/2">
                    <label htmlFor="email">E-mail:</label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="p-2 border-2 border-dashed border-red-500 rounded-md text-zinc-900 text-sm outline-none" spellCheck="false" placeholder="ex: caio@gmail.com" required />

                    <label htmlFor="password">Senha:</label>
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

                    <label htmlFor="password-confirm">Confirmar senha:</label>
                    <div className="relative flex w-full">
                        <input
                            id="password-confirm"
                            type={showPassword ? "text" : "password"}
                            className="p-2 pr-8 w-full border-2 border-dashed border-red-500 rounded-md text-zinc-900 text-sm outline-none"
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

            <button type="submit" className="flex self-center my-1 w-fit text-sm bg-red-500 rounded-lg py-1 px-3 text-white hover:bg-red-400">
                Registrar
            </button>

            <hr className="border-t-2 border-dashed border-red-500" />

            <Link href="/login" className="text-xs self-center underline text-red-500 hover:text-red-400">Já possui uma conta?</Link>
        </form>
    );
}

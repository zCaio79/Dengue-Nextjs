'use client'

import { Eye, EyeOff, ChevronRight, ChevronLeft, } from "lucide-react";
import { useState } from "react";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false)
  const [error_value, setErrorValue] = useState("")

  const [password, setPassword] = useState("");
  const [password_confirm, setPassword_confirm] = useState("");




  const handleSubmitLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if(password != password_confirm){ 
      setError(true)
      setErrorValue("senhas não correspondem!")
    }
    else{ 
      setError(false)
      setErrorValue("")
    }
  }

  return (
    <div className="text-white px-6 pt-6 pb-3 gap-4 font-pop flex min-h-screen flex-col w-full justify-center
     items-center bg-gradient-to-r from-red-500 via-orange-500 to-red-500 md:h-screen">

      <main className="flex w-full h-full py-4 items-center justify-center
       rounded-lg border-white border-4 border-dashed">

        <form onSubmit={handleSubmitLogin} className="flex flex-col gap-6 h-full w-60 p-7 font-robotoMono text-red-500 font-semibold bg-white rounded-lg md:w-fit md:h-fit">

          <h1 className="flex items-center self-center font-bold text-lg gap-2 mb-2"><ChevronLeft className=" size-5" />Registro<ChevronRight className="size-5" /></h1>

          <div className="flex flex-col gap-4 md:flex-row md:gap-8">

            <div className="flex flex-col gap-4 w-full md:w-1/2">
              <label htmlFor="name">nome :</label>
              <input
                id="name"
                type="text"
                className="p-2 border-2 border-dashed border-red-500 rounded-md text-zinc-900 text-sm outline-none"
                spellCheck="false"
                placeholder="ex: Caio"
                required
              />

              <label htmlFor="subname">sobrenome :</label>
              <input
                id="subname"
                type="text"
                className="p-2 border-2 border-dashed border-red-500 rounded-md text-zinc-900 text-sm outline-none"
                spellCheck="false"
                placeholder="ex: Faria Mendes"
                required
              />

              <label htmlFor="city">cidade :</label>
              <input
                id="city"
                type="text"
                className="p-2 border-2 border-dashed border-red-500 rounded-md text-zinc-900 text-sm outline-none"
                spellCheck="false"
                placeholder="ex: Ivaiporã"
                required
              />

            </div>

            <div className="flex flex-col gap-4 w-full md:w-1/2">
              <label htmlFor="email">e-mail :</label>
              <input
                id="email"
                type="email"
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

              <label htmlFor="password-confirm">confirmar senha :</label>
              <div className="relative flex w-full">
                <input
                  id="password-confirm"
                  type={showPassword ? "text" : "password"}
                  className="p-2 pr-8 w-full border-2 border-dashed border-red-500 rounded-md text-zinc-900 text-sm outline-none"
                  spellCheck="false"
                  onChange={(e) => setPassword_confirm(e.target.value)}
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

          {error && <div className="text-xs w-full text-center bg-red-500 text-white rounded-md py-1">{error_value}</div>}

          <button type="submit" className="flex self-center my-1 w-fit text-sm bg-red-500 rounded-lg py-1 px-3 text-white hover:bg-red-400">
            Registrar
          </button>

          <hr className="border-t-2 border-dashed border-red-500" />

          <a href="/login" className="text-xs self-center underline text-red-500 hover:text-red-400">já possui uma conta?</a>
        </form>

      </main>

      <footer className="flex w-full justify-center">
        <p className="text-xs font-semibold"> &#169;{new Date().getFullYear()} Dengue Zero</p>
      </footer>

    </div>
  );
}

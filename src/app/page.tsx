
import { ArrowDown, ArrowRight, } from 'lucide-react';

export default function intro() {
  return (
    <div className="text-white px-6 pt-6 pb-3 gap-4 font-pop flex h-full flex-col w-full justify-center
     items-center bg-gradient-to-r from-red-500 via-orange-500 to-red-500">

      <main className="flex w-full h-[90vh] items-center justify-around
       p-6 rounded-lg border-4 border-white border-dashed">


        <section className="flex flex-col gap-8 text-8xl p-2 drop-shadow-xl">

          <div className="flex flex-col uppercase font-bold">
            <h1>Dengue</h1>
            <h1>Zero</h1>
          </div>

          <span className="font-mono text-lg font-medium rounded-lg py-2 px-2">
            Mapa interativo de combate a <span className="font-bold">Dengue</span>
          </span>

          <div className="flex gap-4 text-lg font-mono font-medium items-center">
            <a className="bg-white rounded-lg py-1 px-3 text-red-500 hover:text-white hover:bg-opacity-30" href="">Login</a>
            <a className="rounded-md py-1 px-3 underline" href="#map">Mapear</a>
          </div>

        </section>

        <article className="flex items-center bg-white bg-opacity-80 border-2 border-white rounded-full p-2">

          <img className=" drop-shadow-xl"
            src="/mosquito.gif"
            alt="mosquito gif"
            width={350}
            height={200}
          />

        </article>

      </main>

      <ArrowDown />

      <section id="about" className="flex flex-col gap-6 w-fit p-8 h-[95vh] rounded-lg bg-red-50">

        <div className='flex flex-row h-fit gap-8 justify-center'>

          <article>

            <img className='bg-red-500 h-full rounded-2xl'
              src="/sickperson.png"
              alt="pessoa doente"
              width={350}
              height={200}
            />

          </article>

          <div className='flex flex-col gap-4 w-96 h-fit border-red-500 border-4 border-dashed rounded-lg p-6'>

            <p className='text-base font-mono text-black text-pretty'>A dengue é uma doença febril aguda, sistêmica, dinâmica, debilitante e autolimitada.
              A maioria dos doentes se recupera, porém, parte deles podem progredir para formas graves, inclusive virem a óbito.
              A quase totalidade dos óbitos por dengue é evitável e depende, na maioria das vezes, da qualidade da assistência prestada e organização da rede de serviços de saúde.
            </p>

            <a className="flex gap-2 w-fit font-mono self-end bg-red-500 rounded-lg py-1 px-3 text-white hover:text-red-500 hover:bg-opacity-30" href="https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/d/dengue"><ArrowRight/>Saiba mais</a>

          </div>


        </div>

        <div>
          <h1 className='font-mono text-lg bg-red-500 rounded-md p-1 text-center'>Sintomas</h1>
        </div>

      </section>

      <footer className="flex w-full justify-center">
        <p className="text-xs font-mono font-extralight"> &#169;{new Date().getFullYear()} Dengue Zero</p>
      </footer>

    </div>
  );
}

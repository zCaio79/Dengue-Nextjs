
import { ArrowDown, ArrowRight, ShieldPlus, Bug } from 'lucide-react';

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

          <span className="flex gap-2 items-center font-mono text-lg font-medium rounded-lg py-2 px-2">
            <ShieldPlus />
            Mapa interativo de combate a <span className="font-bold">Dengue</span>
          </span>

          <div className="flex gap-4 text-lg font-mono font-medium items-center">
            <a className="bg-white rounded-lg py-1 px-3 text-red-500 hover:text-white hover:bg-opacity-30" href="">Login</a>
            <a className="rounded-md py-1 px-3 underline" href="#map">Mapear</a>
          </div>

        </section>

        <article className="flex items-center bg-white bg-opacity-80 border-2 border-white rounded-full p-2">

          <a href="#about">
            <img className=" drop-shadow-xl"
              src="/mosquito.gif"
              alt="mosquito gif"
              width={350}
              height={200}
            />
          </a>

        </article>

      </main>

      <ArrowDown />

      <div className='flex gap-4 w-full justify-around'>

        <section id="about" className="flex flex-col gap-6 w-[55vw] p-8 h-fit rounded-lg bg-red-50">

          <div className='flex flex-row h-fit gap-8 justify-center'>

            <article>

              <img className='bg-red-500 h-full rounded-2xl'
                src="/sickperson.png"
                alt="pessoa doente"
                width={350}
                height={200}
              />

            </article>

            <article className='flex flex-col gap-4 w-96 h-fit border-red-500 border-4 border-dashed rounded-lg p-6'>

              <p className='text-base text-justify font-mono text-black text-pretty'>A dengue é uma doença febril aguda, sistêmica, dinâmica, debilitante e autolimitada.
                A maioria dos doentes se recupera, porém, parte deles podem progredir para formas graves, inclusive virem a <span className='text-red-500'>óbito</span>.
                A quase totalidade dos óbitos por dengue é evitável e depende, na maioria das vezes, da qualidade da assistência prestada e organização da rede de serviços de saúde.
              </p>

              <a className="flex gap-2 w-fit font-mono self-end bg-red-500 rounded-lg py-1 px-3 text-white hover:text-red-500 hover:bg-opacity-30" href="https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/d/dengue"><ArrowRight />Saiba mais</a>

            </article>


          </div>

          <div className='flex bg-red-500 rounded-md p-2 items-center justify-center'>

            <h1 className='font-mono text-lg text-center'>Sintomas</h1>

          </div>


          <article className='flex w-full gap-4 text-base font-mono font-medium justify-center flex-wrap rounded-md p-6 border-4 border-dashed border-red-500'>
            {sintomas()}
          </article>

        </section>

        <section className='flex flex-col gap-6 items-center w-[35vw] p-8 h-fit rounded-lg bg-red-50'>

          <div className='flex w-full bg-red-500 rounded-md gap-4 p-2 items-center justify-center'>

            <h1 className='itens-center font-mono text-lg text-center'>Transmissor </h1>
            <Bug />

          </div>

          <img className=' drop-shadow-lg'
            src="/transmissor1.png"
            alt="pessoa doente"
            width={300}
            height={200}
          />

          <article className='flex flex-col gap-4 w-full h-fit border-red-500 border-4 border-dashed rounded-lg p-6'>

            <p className='text-base text-justify font-mono text-black text-pretty'>O mosquito da dengue, <span className='text-red-500'>Aedes aegypti</span>, é o principal vetor do vírus da dengue, que causa uma doença febril aguda e debilitante.
              Ele transmite o vírus ao picar uma pessoa infectada e, em seguida, picar outra.
              A reprodução ocorre em ambientes com água parada, onde a fêmea deposita seus ovos.
              As larvas eclodem e se desenvolvem até se tornarem mosquitos adultos.
              A prevenção envolve eliminar criadouros e utilizar métodos de proteção, como repelentes e telas.
            </p>

            <p className='text-red-500 font-mono text-sm text-center font-semibold'>Em caso de foco procure pela secretaria da saúde do seu município</p>

          </article>

        </section>

      </div>

      <div className='flex my-2 w-full h-[1px] border-t-4 border-dashed border-white'></div>

      <footer className="flex w-full justify-center">
        <p className="text-xs font-mono font-extralight"> &#169;{new Date().getFullYear()} Dengue Zero</p>
      </footer>

    </div>

  );
}

export function sintomas() {
  const symptoms = [
    "Febre alta",
    "Dor muscular",
    "Dor articular",
    "Dor abdominal",
    "Dor ocular",
    "Manchas vermelhas",
    "Fraqueza geral",
    "Náuseas constantes",
    "Vômitos frequentes",
    "Perda de apetite",
  ];

  return (
    <>
      {symptoms.map((symptom, index) => (
        <p key={index} className="flex w-fit p-2 bg-red-500 rounded-md">
          {symptom}
        </p>
      ))}
    </>
  );
} 
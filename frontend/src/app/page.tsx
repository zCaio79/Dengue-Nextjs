
import { ArrowDown, ArrowRight, ShieldPlus, Bug } from 'lucide-react';

export default function intro() {
  return (
    <div className="text-white px-6 pt-6 pb-3 gap-4 font-pop flex h-full flex-col w-full justify-center
     items-center bg-gradient-to-r from-red-500 via-orange-500 to-red-500">

      <main className="flex flex-col w-full h-[90vh] items-center justify-around
       p-6 rounded-lg border-4 border-white border-dashed xl:flex-row ">


        <section className="flex flex-col gap-8 text-6xl  p-2 drop-shadow-xl xl:text-8xl ">

          <div className="flex flex-col uppercase font-bold text-center lg:text-left">
            <h1>Dengue</h1>
            <h1>Zero</h1>
          </div>

          <span className="flex flex-wrap gap-2 items-center justify-center text-sm font-robotoMono font-medium rounded-lg py-2 px-2 xl:flex-nowrap xl:text-lg xl:text-left xl:justify-start">
            <ShieldPlus />
            Mapa interativo de combate a <span className="font-bold">Dengue</span>
          </span>

          <div className="flex gap-4 font-robotoMono text-base font-medium justify-center items-center lg:justify-start">
            <a className="bg-white rounded-lg py-1 px-3 text-red-500 hover:text-white hover:bg-opacity-30" href="/login">Login</a>
            <a className="rounded-md py-1 px-3 underline" href="#map">Mapear</a>
          </div>

        </section>

        <article className="flex items-center bg-white bg-opacity-80 border-2 border-white rounded-full p-2 h-sm:hidden">

          <a href="#about">
            <img className="flex drop-shadow-xl"
              src="/mosquito.gif"
              alt="mosquito gif"
              width={350}
              height={200}
            />
          </a>

        </article>

      </main>

      <ArrowDown />

      <div className='flex flex-col gap-4 w-full justify-around xl:flex-row'>

        <section id="about" className="flex flex-col gap-6  p-8 h-fit rounded-lg bg-white xl:w-[55vw]">

          <div className='flex flex-row flex-wrap h-fit gap-8 justify-center sm:flex-nowrap'>

            <article>

              <img className='bg-red-500 h-full rounded-2xl'
                src="/sickperson.png"
                alt="pessoa doente"
                width={350}
                height={200}
              />

            </article>

            <article className='flex flex-col gap-4 w-96 h-fit border-red-500 border-4 border-dashed rounded-lg p-6'>

              <p className='text-sm font-semibold text-justify font-robotoMono text-black text-pretty xl:text-base'>A dengue é uma doença febril aguda, sistêmica, dinâmica, debilitante e autolimitada.
                A maioria dos doentes se recupera, porém, parte deles podem progredir para formas graves, inclusive virem a <span className='text-red-500'>óbito</span>.
                A quase totalidade dos óbitos por dengue é evitável e depende, na maioria das vezes, da qualidade da assistência prestada e organização da rede de serviços de saúde.
              </p>

              <a className="flex gap-2 w-fit font-robotoMono text-sm  font-semibold self-end bg-red-500 rounded-lg py-1 px-4 text-white hover:text-red-500 hover:bg-opacity-30 xl:text-base" href="https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/d/dengue"><ArrowRight />Saiba mais</a>

            </article>


          </div>

          <div className='flex bg-red-500 rounded-md p-2 items-center justify-center'>

            <h1 className=' text-lg font-robotoMono font-semibold text-center'>Sintomas</h1>

          </div>


          <article className='flex w-full gap-4 text-base font-medium justify-center flex-wrap rounded-md p-6 border-4 border-dashed border-red-500'>
            {sintomas()}
          </article>

        </section>

        <section className='flex flex-col gap-6 items-center p-8 h-fit rounded-lg bg-white xl:w-[35vw]'>

          <div className='flex w-full bg-red-500 rounded-md gap-4 p-2 items-center justify-center'>

            <h1 className='itens-center font-robotoMono font-semibold text-lg text-center'>Transmissor </h1>
            <Bug />

          </div>

          <img className=' drop-shadow-lg'
            src="/transmissor1.png"
            alt="pessoa doente"
            width={300}
            height={200}
          />

          <article className='flex flex-col gap-4 w-full h-fit border-red-500 border-4 border-dashed rounded-lg p-6'>

            <p className='text-sm text-justify font-semibold font-robotoMono text-black text-pretty lg:text-base'>O mosquito da dengue, <span className='text-red-500'>Aedes aegypti</span>, é o principal vetor do vírus da dengue, que causa uma doença febril aguda e debilitante.
              Ele transmite o vírus ao picar uma pessoa infectada e, em seguida, picar outra.
              A reprodução ocorre em ambientes com água parada, onde a fêmea deposita seus ovos.
              As larvas eclodem e se desenvolvem até se tornarem mosquitos adultos.
              A prevenção envolve eliminar criadouros e utilizar métodos de proteção, como repelentes e telas.
            </p>

            <p className='text-red-500 font-robotoMono text-sm text-center font-semibold'>Em caso de foco procure pela secretaria da saúde do seu município</p>

          </article>

        </section>

      </div>

      <div className='flex my-2 w-full h-[1px] border-t-4 border-dashed border-white'></div>

      <footer className="flex w-full justify-center">
        <p className="font-robotoMono text-xs font-semibold"> &#169;{new Date().getFullYear()} Dengue Zero</p>
      </footer>

    </div>

  );
}

export function sintomas() {
  const symptoms = [
    "Febre alta",
    "Náuseas constantes",
    "Dor muscular",
    "Dor articular",
    "Dor abdominal",
    "Dor ocular",
    "Fraqueza geral",
    "Vômitos frequentes",
    "Perda de apetite",
  ];

  return (
    <>
      {symptoms.map((symptom, index) => (
        <p key={index} className="flex py-2 px-4 font-robotoMono bg-red-500 rounded-md text-sm xl:text-base">
          {symptom}
        </p>
      ))}
    </>
  );
} 
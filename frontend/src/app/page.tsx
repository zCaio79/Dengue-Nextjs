
import Footer from '@/components/footer';
import { ArrowDown, ArrowRight, ShieldPlus, Bug } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function intro() {
  return (
    <div className="text-white px-6 pt-6 pb-3 gap-4 font-pop flex h-full flex-col w-full justify-center
     items-center bg-zinc-900">

      <main className="flex flex-col w-full h-[90vh] items-center justify-around
       py-6 px-8 rounded-lg border-4 border-white border-dashed lg:flex-row ">


        <section className="flex flex-col gap-8 text-6xl  p-2 drop-shadow-xl xl:text-8xl ">

          <div className="flex flex-col font-sans uppercase font-bold text-center lg:text-left">
            <h1>Dengue</h1>
            <h1>Zero</h1>
          </div>

          <span className="flex flex-wrap gap-2 items-center justify-center text-center text-sm font-robotoMono
           font-medium rounded-lg py-2 px-2 xl:flex-nowrap xl:text-lg xl:text-left xl:justify-start">
            <ShieldPlus />
            Mapa interativo de combate a <span className="font-bold">Dengue</span>
          </span>

          <div className="flex gap-4 font-robotoMono text-base font-medium justify-center items-center lg:justify-start">
            <Link className="bg-red-500 rounded-lg py-1 px-3 text-white hover:bg-opacity-30" href="/login">Login</Link>
            <Link className="rounded-md py-1 px-3 underline" href="/dashboard">Mapear</Link>
          </div>

        </section>

        
        <article className="flex items-center bg-white bg-opacity-80 border-2 border-white rounded-full p-2 h-md:hidden">

          <a href="#about">
            <Image
              unoptimized
              className="flex drop-shadow-xl"
              src="/mosquito.gif"
              alt="mosquito gif"
              width={350}
              height={200}
              priority
            />
          </a>

        </article>

      </main>

      <ArrowDown />

      <div className='flex flex-col gap-4 w-full justify-around xl:flex-row'>

        <section id="about" className="flex flex-col gap-6 p-8 h-fit rounded-lg bg-white xl:w-[55vw]">

          <div className='flex flex-row flex-wrap h-fit gap-8 justify-center sm:flex-nowrap'>

            <article className='flex'>
              
              <Image className='bg-zinc-900 h-full rounded-2xl'
                src="/sickperson.png"
                alt="pessoa doente"
                width={350}
                height={200}
              />

            </article>

            <article className='flex flex-col gap-4 w-96 justify-around border-4 border-dashed border-zinc-900 rounded-lg p-6'>

              <p className='text-sm font-semibold text-justify font-robotoMono text-zinc-900 text-pretty xl:text-base'>
                A dengue é uma doença febril aguda, sistêmica, dinâmica, debilitante e autolimitada.
                A maioria dos doentes se recupera, porém, parte deles podem progredir para formas graves, inclusive virem a <span className='text-red-500'>óbito</span>.
                A quase totalidade dos óbitos por dengue é evitável e depende, na maioria das vezes, da qualidade da assistência prestada e organização da rede de serviços de saúde.
              </p>

              <a className="flex gap-2 w-fit font-robotoMono text-sm  font-semibold self-end bg-zinc-900
               rounded-lg py-1 px-4 text-white hover:bg-opacity-50 xl:text-base"
              href="https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/d/dengue">
                <ArrowRight />Saiba mais
              </a>

            </article>


          </div>

          <div className='flex bg-zinc-900 rounded-md p-2 items-center justify-center'>

            <h1 className=' text-base font-robotoMono font-semibold text-center'>Sintomas</h1>

          </div>

          <article className='flex w-full gap-4 text-base font-medium justify-center
           flex-wrap rounded-md p-6 border-4 border-dashed border-zinc-900'>
            {sintomas()}
          </article>

        </section>

        <section className='flex flex-col gap-6 items-center p-8 h-full rounded-lg bg-white xl:w-[35vw]'>

          <div className='flex w-full bg-zinc-900 rounded-md gap-4 p-2 items-center justify-center'>

            <h1 className='itens-center font-robotoMono font-semibold text-base text-center'>Transmissor </h1>
            <Bug />

          </div>

          <Image className=' drop-shadow-lg'
            src="/transmissor1.png"
            alt="mosquito da dengue"
            width={300}
            height={200}
          />

          <article className='flex flex-col justify-around gap-4 w-full h-full border-4 border-dashed border-zinc-900 text-zinc-900 rounded-lg p-6'>

            <p className='text-sm text-justify font-semibold font-robotoMono text-pretty lg:text-base'>
              O mosquito da dengue, <span className='text-red-500'>Aedes aegypti</span>, 
              é o principal vetor do vírus da dengue, que causa uma doença febril aguda e debilitante.
              Ele transmite o vírus ao picar uma pessoa infectada e, em seguida, picar outra.
              A reprodução ocorre em ambientes com água parada, onde a fêmea deposita seus ovos.
              As larvas eclodem e se desenvolvem até se tornarem mosquitos adultos.
              A prevenção envolve eliminar criadouros e utilizar métodos de proteção, como repelentes e telas.
            </p>

            <p className='text-red-500 font-robotoMono text-sm text-center font-semibold'>
              Em caso de foco procure pela secretaria da saúde do seu município ⚠️
            </p>

          </article>

        </section>

      </div>

      <div className='flex mt-4 mb-2 w-full h-[1px] border-t-4 border-dashed border-white'></div>

      <Footer/>

    </div>

  );
}

export function sintomas() {
  const symptoms = [
    "Febre alta 🤒",
    "Náuseas constantes 🤢",
    "Dor muscular 💪🏻",
    "Dor articular 🦵🏻",
    "Dor abdominal 😣",
    "Dor ocular 👁️",
    "Fraqueza geral 😪",
    "Vômitos frequentes 🤮",
    "Perda de apetite 🍖",
  ];

  return (
    <>
      {symptoms.map((symptom, index) => (
        <p key={index} className="flex py-2 px-4 w-full justify-center font-robotoMono text-center bg-zinc-900 rounded-md text-xs xl:text-base sm:w-fit">
          {symptom}
        </p>
      ))}
    </>
  );
}
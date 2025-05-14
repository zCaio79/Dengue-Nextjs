type sitomaProps = {
    symptoms: string[];
}


export default function Sintomas(props : sitomaProps){
    return (
    <>
      {props.symptoms.map((symptom, index) => (
        <p key={index} className="flex py-2 px-4 w-full justify-center font-robotoMono text-center bg-zinc-900 rounded-md text-xs xl:text-base sm:w-fit">
          {symptom}
        </p>
      ))}
    </>
  );
}
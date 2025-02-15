import RecentCase from "./recentCase"


export default function RecentCases() {

    const cases = [
        {
            rua: "Avenida Brasil",
            cidade: "Ivaiporã PR",
            hora: "20:00"
        },
        {
            rua: "Avenida Brasil",
            cidade: "Ivaiporã PR",
            hora: "20:00"
        },
        {
            rua: "Avenida Brasil",
            cidade: "Ivaiporã PR",
            hora: "20:00"
        },
        {
            rua: "Avenida Brasil",
            cidade: "Ivaiporã PR",
            hora: "20:00"
        },
        {
            rua: "Avenida Brasil",
            cidade: "Ivaiporã PR",
            hora: "20:00"
        },
        {
            rua: "Avenida Brasil",
            cidade: "Ivaiporã PR",
            hora: "20:00"
        },
        {
            rua: "Avenida Brasil",
            cidade: "Ivaiporã PR",
            hora: "20:00"
        },
        {
            rua: "Avenida Brasil",
            cidade: "Ivaiporã PR",
            hora: "20:00"
        },
        {
            rua: "Avenida Brasil",
            cidade: "Ivaiporã PR",
            hora: "20:00"
        },
        {
            rua: "Avenida Brasil",
            cidade: "Ivaiporã PR",
            hora: "20:00"
        }
    ]

    return (
        <>
            <div className='flex bg-red-500 rounded-lg p-2 items-center justify-center'>

                <h1 className='text-lg text-white font-robotoMono font-semibold text-center'>Casos Recentes</h1>

            </div>
            <article className='flex w-full font-robotoMono gap-3 pl-1 pr-2 h-full flex-col overflow-scroll scrollbar-thin'>

                {cases.map((caso, index) => (
                    <RecentCase key={index} rua={caso.rua} cidade={caso.cidade} hora={caso.hora} />
                ))}

            </article>
        </>
    )
}
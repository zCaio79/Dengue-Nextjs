import { Pin } from "lucide-react"


interface RecentCaseProps {
    rua: string;
    cidade: string;
    hora: string;
}


export default function RecentCase(props : RecentCaseProps) {
    return (
        <div className='flex font-robotoMono gap-6 font-semibold text-zinc-900 border-2 border-red-500 border-dashed rounded-lg p-3 items-center justify-between'>

            <div className="flex text-sm gap-4">
                <p>{props.rua}</p>
                <p>{props.cidade}</p>
            </div>
            <div className="flex text-sm gap-4">
                <p >{props.hora}</p>
                <Pin className="size-5" />
            </div>

        </div>

    )
}
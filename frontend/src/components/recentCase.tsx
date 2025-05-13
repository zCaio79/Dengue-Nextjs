import { Check, Pin, Speech } from "lucide-react"

interface RecentCaseProps {
    data: string;
    confirmado: boolean;
}

export default function RecentCase(props : RecentCaseProps) {
    return (
        <div className='flex font-robotoMono gap-6 font-semibold text-zinc-900 border-2 border-red-300 border-dashed rounded-lg p-3 items-center justify-between'>

            <div className="flex text-sm gap-4">
                {props.confirmado ? 
                <p className="flex gap-3"> <Check className="text-emerald-600 size-5"/>Confirmado</p> 
                :
                <p className="flex gap-3"><Speech className="text-amber-600 size-5"/>Suspeita </p>}
            </div>
            <div className="flex text-sm gap-6">
                <p className="text-center" >{props.data.split("horário:")}</p>
                <Pin className="size-5" />
            </div>

        </div>

    )
}
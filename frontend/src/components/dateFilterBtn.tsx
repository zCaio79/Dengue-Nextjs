import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Calendar } from "lucide-react";

export default function DateFilterBtn() {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [showDatePicker, setShowDatePicker] = useState(false);

    return (
        <div className="relative flex items-center">
            
            <button
                type="button"
                className="flex items-center gap-2 h-full w-fit text-nowrap text-sm bg-red-500 rounded-lg px-3 py-2 font-bold font-robotoMono text-white hover:bg-red-400"
                onClick={() => setShowDatePicker(!showDatePicker)}
            >
                <p>Filtrar Data</p>
                <Calendar className="size-5" />
            </button>

            
            {showDatePicker && (
                <div className="absolute top-full left-0 mt-2 bg-white border-2 border-zinc-300 flex items-center shadow-lg rounded-lg p-3 z-10">
                    <DatePicker
                        maxDate={new Date()}
                        selected={selectedDate}
                        onChange={(date) => setSelectedDate(date)}
                        inline
                    />
                </div>
            )}
        </div>
    );
}

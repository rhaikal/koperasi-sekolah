import { MdPictureAsPdf } from "react-icons/md";
import { primaryButtonClass } from "../Button/PrimaryButton";
import Datepicker from "../Input/Datepicker";

export default function ExportForm({href, valueStartDate, valueEndDate, handleStartDate, handleEndDate, disabled, className}){
    return (
        <form action={href} target="__blank" className={`flex items-center ${className}`}>
            <Datepicker
                onChange={handleStartDate}
                value={valueStartDate}
                label="Start date"
                name="startDate"
                disabled={disabled}
                className="w-[9.5rem]"
            />
            <span className={`mx-4 ${disabled ? 'text-gray-400' : 'text-gray-500'}`}>to</span>
            <Datepicker
                onChange={handleEndDate}
                value={valueEndDate}
                label="End date"
                name="endDate"
                minDate={valueStartDate}
                disabled={disabled}
                className="w-[9.5rem]"
            />
            <button type="submit" className={primaryButtonClass + ` ml-4 w-fit ${disabled && 'pointer-events-none cursor-default bg-indigo-400'}`}><MdPictureAsPdf className="mr-2 w-4 h-4" /> Export</button>
        </form>
    )
}

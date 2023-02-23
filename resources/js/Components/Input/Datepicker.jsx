import { TextField } from "@mui/material";
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";

export default function Datepicker({disablePast, name, className, label, value, disabled, onChange, errors, minDate}){
    return (
        <LocalizationProvider dateAdapter={AdapterMoment}>
            <DatePicker
                disablePast={disablePast}
                views={['year', 'month', 'day']}
                className={className}
                label={label}
                value={value}
                minDate={minDate}
                onChange={onChange}
                disabled={disabled}
                renderInput={(params) => <TextField name={name} sx={ (errors) ?
                {"& .MuiOutlinedInput-root": {
                    "& fieldset": {
                        borderColor: "red"
                    },
                    "&:hover fieldset": {
                        borderColor: "red"
                    }
                }} :
                { "& .MuiOutlinedInput-root": {
                    "&:hover fieldset": {
                        border: "1px solid rgb(209 213 219)"
                    }
                }}
                } size="small" {...params} />}
            />
        </LocalizationProvider>
    );
}

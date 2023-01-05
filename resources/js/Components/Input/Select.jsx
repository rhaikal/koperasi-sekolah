import React from "react";
import Select from "react-select";

export default function FormSelect({options, name, placeholder, onChange, hasErrors}) {
    return (
        <Select
            name={name}
            styles={{
                // Fixes the overlapping problem of the component
                menu: provided => ({ ...provided, zIndex: 9999 }),
                control: (base, state) => ({
                    ...base,
                    borderColor: state.isFocused ? base.borderColor : hasErrors ? 'red' : base.borderColor,
                    '&:hover': {borderColor: state.isFocused ? base.borderColor : hasErrors ? 'red' : base.borderColor}
                }),
            }}
            placeholder={placeholder}
            classNamePrefix="react-select"
            options={options}
            onChange={onChange}
        />
    )
}

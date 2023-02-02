import React from "react";
import Select from "react-select";

export default function FormSelect({options, name, placeholder, onChange, hasErrors, defaultValue, isSearchable = true, required = true}) {
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
                valueContainer: (base, state) => ({
                    ...base,
                    cursor: isSearchable ? 'text' : 'pointer'
                })
            }}
            isSearchable={isSearchable}
            placeholder={placeholder}
            classNamePrefix="react-select"
            value={options.find(({value}) => value == defaultValue)}
            options={options}
            onChange={onChange}
            // required={required}
        />
    )
}

import React from "react";
import './InputDrop.css';

function InputDrop({ id, type , label, name, value, onChange, required = false }) {
    const { input, unit } = value;

    return (
        <div className="inputdrop">
            <label htmlFor={id}>{label} {required && "*"}</label>
            <div className="inputdrop_field">
                <input
                    className="inputdrop_input"
                    name={`${name}-input`} 
                    value={input}
                    onChange={(e) => onChange({ ...value, input: e.target.value })}
                    type={type}
                />
                <select
                    className="inputdrop_select"
                    name={`${name}-select`} 
                    value={unit}
                    onChange={(e) => onChange({ ...value, unit: e.target.value })}
                >
                    <option value="Cent">Cent</option>
                    <option value="sq ft">sq ft</option>
                </select>
            </div>
        </div>
    );
}

export default InputDrop;

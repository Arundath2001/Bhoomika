import React from "react";
import './SelectNormal.css';

function SelectNormal({id , label , required = false , onChange}){
    return(
        <div className="selectnormal">
            <label htmlFor={id}>{label} {required && "*"}</label>

            <select onChange={onChange} className="selectnormal_select" defaultValue="Select Property Type">
                <option>Select Property Type</option>
                <option>Land</option>
                <option>Commercial</option>
                <option>House</option>
                <option>Villa</option>
            </select>
        </div>
    );
}

export default SelectNormal;
import React from "react";
import './Iconpara.css';

function Iconpara(props){

    return(
        <div className={`iconpara ${props.addclass}`}>
            
            <img src={props.img} alt={props.text} />
            {
                props.mail ? <a href={`mailto:${props.mail}`}>{props.mail}</a> : <p className="iconpara_text">{props.text}</p>
            }  
               
        </div>
    );

}

export default Iconpara;
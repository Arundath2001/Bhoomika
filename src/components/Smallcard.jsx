import React from "react";
import Iconpara from "./Iconpara";
import call from "../assets/call.png";
import loc from "../assets/loc.png";
import mail from "../assets/email.png";
import Icongroup from "./Icongroup";
import './Smallcard.css';


function Smallcard(){

    const contactdata = [
        {img : call , text : "7994352926"},
        {img : mail , mail : "arundatharun44@gmail.com" , text : ""},
        {img : loc , text : "Kozhikode, Kerala, India"}
    ];

    return(
        <div className="smallcard">
            <p className="smallcard_mainpara">
                Say something to start a live chat! 
            </p>

            <div className="smallcard_down">
                {
                    contactdata.map((data , index)=>(
                        <Iconpara addclass="smallcard_text" key={index} img={data.img} text={data.text} mail={data.mail} />
                    ))
                }
            </div>

            <div className="smallcard_icons">
                <Icongroup addclass="iconswhite" />
             </div>

        </div>
    );

}

export default Smallcard;
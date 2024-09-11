import React from "react";
import './BlackCard.css';
import ButtonMain from "./ButtonMain";

function BlackCard(){
    return(
        <div className="blackcard">
            <div className="blackcard_text">List Your Property with Confidence</div>
            <ButtonMain svg={ <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256"><path fill="currentColor" d="m220.24 132.24l-72 72a6 6 0 0 1-8.48-8.48L201.51 134H40a6 6 0 0 1 0-12h161.51l-61.75-61.76a6 6 0 0 1 8.48-8.48l72 72a6 6 0 0 1 0 8.48"/></svg> } value="Sell Your Properties" bgColor="buttonmain_white" textColor="buttonmain_greytxt" />
        </div>
    );
}

export default BlackCard;
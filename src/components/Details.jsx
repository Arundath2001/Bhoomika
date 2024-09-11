import React, { useState } from "react";
import './Details.css';
import MainHead from "./MainHead";
import DetailsCard from "./DetailsCard";
import housedoc from "../assets/housedoc.png";
import housebuy from "../assets/housebuy.png";
import trust from "../assets/trust.png";

function Details() {
    const details = [
        { img: housedoc, maintext: "Wide Range of Properties", subtext: "We offer a diverse range of properties and lands to choose from." },
        { img: housebuy, maintext: "Buy or Sell Lands", subtext: "We sell your property at the best market price and very quickly as well." },
        { img: trust, maintext: "Trusted by Thousands", subtext: "Thousands of clients have trusted us. Your satisfaction is our mission." }
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    const nextCard = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % details.length);
    };

    const prevCard = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + details.length) % details.length);
    };

    return (
        <div className="details">
            <MainHead maintext="Why Partnering with Us is Your Best Choice" subtext="Experience Excellence in Every Step" />
            <div className="details_cards">
                {details.map((detail, index) => (
                    <div
                        key={index}
                        className={`details_card ${index === currentIndex ? 'active' : ''}`}
                    >
                        <DetailsCard img={detail.img} maintext={detail.maintext} subtext={detail.subtext} />
                    </div>
                ))}
                <div className="details_carousel">
                    <button className="details_carouselbtn" onClick={prevCard}>❮</button>
                    <button className="details_carouselbtn" onClick={nextCard}>❯</button>
                </div>
            </div>
        </div>
    );
}

export default Details;

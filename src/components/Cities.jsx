import React, { useEffect, useState } from "react";
import './Cities.css';
import MainHead from "./MainHead";
import CityCard from "./CityCard";
import LinkIcon from "./LinkIcon";

function Cities() {
    const [cities, setCities] = useState([]);

    useEffect(() => {
        const fetchCities = async () => {
            try {
                const response = await fetch('https://traveling-earthy-swim.glitch.me//cities'); 
                if (response.ok) {
                    const data = await response.json();
                    setCities(data);
                } else {
                    console.error('Failed to fetch cities');
                }
            } catch (error) {
                console.error('Error fetching cities:', error);
            }
        };

        fetchCities();
    }, []);

    const displayedCities = cities.slice(0, 4);

    return (
        <div className="cities">
            <MainHead maintext="Discover Your Dream Property in These Cities" subtext="Uncover Hidden Gems in Prime Locations" />

            <div className="cities_cont">
                <div className="cities_cards">
                    {displayedCities.map(city => (
                        <CityCard key={city.id} city={city} />
                    ))}
                </div>
                <LinkIcon link="/all-cities" text="View All Cities" svg2={<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256"><path fill="currentColor" d="m220.24 132.24l-72 72a6 6 0 0 1-8.48-8.48L201.51 134H40a6 6 0 0 1 0-12h161.51l-61.75-61.76a6 6 0 0 1 8.48-8.48l72 72a6 6 0 0 1 0 8.48"/></svg>} />
            </div>
        </div>
    );
}

export default Cities;

import React from "react";
import './PropNav.css';

function PropNav({ selectedType, onSelect }) {
    const handleSelect = (item) => {
        onSelect(item);
    };

    return (
        <div className="propnav-container">
            <div className="propnav">
                <div
                    className={selectedType === "All Properties" ? "active" : ""}
                    onClick={() => handleSelect("All Properties")}
                >
                    All Properties
                </div>
                <div
                    className={selectedType === "House" ? "active" : ""}
                    onClick={() => handleSelect("House")}
                >
                    House
                </div>
                <div
                    className={selectedType === "Villa" ? "active" : ""}
                    onClick={() => handleSelect("Villa")}
                >
                    Villa
                </div>
                <div
                    className={selectedType === "Land" ? "active" : ""}
                    onClick={() => handleSelect("Land")}
                >
                    Lands
                </div>
                <div
                    className={selectedType === "Commercial" ? "active" : ""}
                    onClick={() => handleSelect("Commercial")}
                >
                    Commercial
                </div>                
                <div
                    className={selectedType === "Rental" ? "active" : ""}
                    onClick={() => handleSelect("Rental")}
                >
                    Rental
                </div>
                <div
                    className={selectedType === "Farm Land" ? "active" : ""}
                    onClick={() => handleSelect("Farm Land")}
                >
                    Farm Land
                </div>
                <div
                    className={selectedType === "Industrial" ? "active" : ""}
                    onClick={() => handleSelect("Industrial")}
                >
                    Industrial
                </div>
            </div>
        </div>
    );
}

export default PropNav;

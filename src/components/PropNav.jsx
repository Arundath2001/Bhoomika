import React, { useState } from "react";
import './PropNav.css';

function PropNav({ selectedType, onSelect }) {

    const handleSelect = (item) => {
        onSelect(item);
    };

    return (
        <div className="propnav">
            <div
                className={selectedType === "All Properties" ? "active" : ""}
                onClick={() => handleSelect("All Properties")}
            >
                All Properties
            </div>
            <div
                className={selectedType === "Commercial" ? "active" : ""}
                onClick={() => handleSelect("Commercial")}
            >
                Commercial
            </div>
            <div
                className={selectedType === "Land" ? "active" : ""}
                onClick={() => handleSelect("Land")}
            >
                Lands
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
        </div>
    );
}

export default PropNav;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Navbar.css';
import logo from "../assets/logo.png";
import logo1 from "../assets/mainlogo.png";
import navmob from "../assets/navmob.png";
import LinkIcon from "./LinkIcon";
import { Link } from "react-router-dom"; 

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };
    const handleContactClick = () => {
        navigate('/'); 
        setTimeout(() => {
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
            }
        }, 100); 
    };

    return (
        <div className="navbar">
            <img className="navbar_logo" src={logo1} alt="logo" />

            <div className="navbar_links">
                <Link className="navbar_link" to="/">Home</Link>
                <Link className="navbar_link" to="/properties">Properties</Link>
                <button className="navbar_link" onClick={handleContactClick}>Contact</button>
            </div>

            <div className="navbar_contact">
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256">
                    <path fill="currentColor" d="m222.37 158.46l-47.11-21.11l-.13-.06a16 16 0 0 0-15.17 1.4a8 8 0 0 0-.75.56L134.87 160c-15.42-7.49-31.34-23.29-38.83-38.51l20.78-24.71c.2-.25.39-.5.57-.77a16 16 0 0 0 1.32-15.06v-.12L97.54 33.64a16 16 0 0 0-16.62-9.52A56.26 56.26 0 0 0 32 80c0 79.4 64.6 144 144 144a56.26 56.26 0 0 0 55.88-48.92a16 16 0 0 0-9.51-16.62M176 208A128.14 128.14 0 0 1 48 80a40.2 40.2 0 0 1 34.87-40a.6.6 0 0 0 0 .12l21 47l-20.67 24.74a6 6 0 0 0-.57.77a16 16 0 0 0-1 15.7c9.06 18.53 27.73 37.06 46.46 46.11a16 16 0 0 0 15.75-1.14a8 8 0 0 0 .74-.56L168.89 152l47 21.05h.11A40.21 40.21 0 0 1 176 208"/>
                </svg>
                <a href="tel:8129677597" className="navbar_link">+91-8129677597</a>
            </div>

            <div className="navbar_hamburger" onClick={toggleMenu}>
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 15 15">
                    <path fill="currentColor" fillRule="evenodd" d="M1.5 3a.5.5 0 0 0 0 1h12a.5.5 0 0 0 0-1zM1 7.5a.5.5 0 0 1 .5-.5h12a.5.5 0 0 1 0 1h-12a.5.5 0 0 1-.5-.5m0 4a.5.5 0 0 1 .5-.5h12a.5.5 0 0 1 0 1h-12a.5.5 0 0 1-.5-.5" clipRule="evenodd"/>
                </svg>
            </div>

            {isOpen && (
                <div className="navbar_overlay">
                    <div className="navbar_close" onClick={toggleMenu}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16">
                            <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
                                <path d="m10.25 5.75l-4.5 4.5m0-4.5l4.5 4.5"/>
                                <circle cx="8" cy="8" r="6.25"/>
                            </g>
                        </svg>
                    </div>

                    <img src={navmob} alt="logo" />

                    <div className="navbar_overlaylinks">
                        <Link className="navbar_overlaylink" to="/" onClick={toggleMenu}>Home</Link>
                        <Link className="navbar_overlaylink" to="/properties" onClick={toggleMenu}>Properties</Link>
                        <Link className="navbar_overlaylink" to="/all-cities" onClick={toggleMenu}>Cities</Link>
                        <button className="navbar_overlaylink" onClick={() => {
                            toggleMenu();
                            handleContactClick();
                        }}>Contact</button>
                    </div>

                    <div className="navbar_overlaycontact">
                        <LinkIcon textColor="greytext" text="+91-8129677597" svg1={<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256"><path fill="currentColor" d="m222.37 158.46l-47.11-21.11l-.13-.06a16 16 0 0 0-15.17 1.4a8 8 0 0 0-.75.56L134.87 160c-15.42-7.49-31.34-23.29-38.83-38.51l20.78-24.71c.2-.25.39-.5.57-.77a16 16 0 0 0 1.32-15.06v-.12L97.54 33.64a16 16 0 0 0-16.62-9.52A56.26 56.26 0 0 0 32 80c0 79.4 64.6 144 144 144a56.26 56.26 0 0 0 55.88-48.92a16 16 0 0 0-9.51-16.62M176 208A128.14 128.14 0 0 1 48 80a40.2 40.2 0 0 1 34.87-40a.6.6 0 0 0 0 .12l21 47l-20.67 24.74a6 6 0 0 0-.57.77a16 16 0 0 0-1 15.7c9.06 18.53 27.73 37.06 46.46 46.11a16 16 0 0 0 15.75-1.14a8 8 0 0 0 .74-.56L168.89 152l47 21.05h.11A40.21 40.21 0 0 1 176 208"/></svg>} />
                        <LinkIcon textColor="greytext" text="dilna@bhoomikarealestate.com" svg1={<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M4 20q-.825 0-1.412-.587T2 18V6q0-.825.588-1.412T4 4h16q.825 0 1.413.588T22 6v12q0 .825-.587 1.413T20 20zm8-7L4 8v10h16V8zm0-2l8-5H4zM4 8V6v12z"/></svg>} />
                    </div>
                </div>
            )}
        </div>
    );
}

export default Navbar;

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
                <a className="navbar_link" href="">+91-1234567891</a>
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
                        <LinkIcon textColor="greytext" text="+91-1234567891" svg1={<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256"><path fill="currentColor" d="m222.37 158.46l-47.11-21.11l-.13-.06a16 16 0 0 0-15.17 1.4a8 8 0 0 0-.75.56L134.87 160c-15.42-7.49-31.34-23.29-38.83-38.51l20.78-24.71c.2-.25.39-.5.57-.77a16 16 0 0 0 1.32-15.06v-.12L97.54 33.64a16 16 0 0 0-16.62-9.52A56.26 56.26 0 0 0 32 80c0 79.4 64.6 144 144 144a56.26 56.26 0 0 0 55.88-48.92a16 16 0 0 0-9.51-16.62M176 208A128.14 128.14 0 0 1 48 80a40.2 40.2 0 0 1 34.87-40a.6.6 0 0 0 0 .12l21 47l-20.67 24.74a6 6 0 0 0-.57.77a16 16 0 0 0-1 15.7c9.06 18.53 27.73 37.06 46.46 46.11a16 16 0 0 0 15.75-1.14a8 8 0 0 0 .74-.56L168.89 152l47 21.05h.11A40.21 40.21 0 0 1 176 208"/></svg>} />
                        <LinkIcon textColor="greytext" text="contactbhoomika@gamil.com" svg1={<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C6.5 2 2 6.5 2 12c0 4.8 3.2 8.8 7.6 10.2c.6.1.8-.2.8-.7v-2.4c-2.8-.5-3.3-1.4-3.3-1.4c-.5-1.3-1.3-1.7-1.3-1.7c-1.1-.7.1-.7.1-.7c1.3 0 2 .7 2.4 1.3c1.4 2.3 3.8 1.6 4.7 1.2c.1-1 .5-1.6 1.1-2.1c-2.2-.2-4.6-1.1-4.6-4.8c0-1.1.4-2 1.1-2.7c-.1-.3-.5-1.6.1-3.3c0 0 .8-.3 2.6 1c1.5-.4 3.2-.4 4.7 0c1.8-1.3 2.5-1 2.5-1c.7 1.7.2 3 .1 3.3c.7.7 1.1 1.7 1.1 2.7c0 3.8-2.5 4.6-4.8 4.8c.5.5 1 1.2 1.2 2.1v2.4c0 .5.2.8.8.7C20.8 20.8 24 16.8 24 12C24 6.5 19.5 2 12 2Z"/></svg>} />
                    </div>
                </div>
            )}
        </div>
    );
}

export default Navbar;

import React, { useState, useEffect, useRef } from "react";
import './Home.css';
import ButtonMain from "./ButtonMain";
import house from "../assets/house.png";
import cart from "../assets/cart.png";
import enquiry from "../assets/enquiry.png";
import Avatar from "./Avatar";
import Avatar1 from "./Avatar1";
import ScrollDown from "./ScrollDown";
import Cities from "./Cities";
import Details from "./Details";
import BlackCard from "./BlackCard";
import Properties from "./Properties";
import Reviews from "./Reviews";
import Contact from "./Contact";
import PopupForm1 from "./PopupForm1";
import PopupForm2 from "./PopupForm2";
import Navbar from "./Navbar";
import Footer from "./Footer";

function Home() {
    const [isPopupVisible1, SetPopupVisible1] = useState(false);
    const [isPopupVisible2, SetPopupVisible2] = useState(false);
    
    const propertiesRef = useRef(null);

    useEffect(() => {
        if (isPopupVisible1 || isPopupVisible2) {
            document.body.classList.add("noscroll");
        } else {
            document.body.classList.remove("noscroll");
        }
    }, [isPopupVisible1, isPopupVisible2]);

    const handleOpenPopup1 = () => {
        SetPopupVisible1(true);
    };

    const handleClosePopup1 = () => {
        SetPopupVisible1(false);
    };

    const handleOpenPopup2 = () => {
        SetPopupVisible2(true);
    };

    const handleClosePopup2 = () => {
        SetPopupVisible2(false);
    };

    const scrollToProperties = () => {
        if (propertiesRef.current) {
            const offset = 80;
            const propertiesTop = propertiesRef.current.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({
                top: propertiesTop - offset,
                behavior: "smooth"
            });
        }
    };
    

    return (
        <div className="home">
            <Navbar />
            <div className="home_top">
                <div className="home_head">
                    <h2>Discover Your <br /> Dream Place</h2>
                    <p>Find the perfect property that meets all your needs and desires.</p>
                </div>

                <div className="home_btn">
                    <ButtonMain
                        bgColor="buttonmain_black"
                        textColor="buttonmain_whitetxt"
                        value="Browse Properties"
                        img={house}
                        onClick={scrollToProperties}
                    />
                    <ButtonMain
                        onClick={handleOpenPopup2}
                        bgColor="buttonmain_black"
                        textColor="buttonmain_whitetxt"
                        value="Sell Properties"
                        img={cart}
                    />
                    <ButtonMain
                        onClick={handleOpenPopup1}
                        bgColor="buttonmain_black"
                        textColor="buttonmain_whitetxt"
                        value="Enquiry"
                        img={enquiry}
                    />
                </div>

                <Avatar />

                <Avatar1 />

                <ScrollDown />
            </div>

            <div className="home_data1">
                <Cities />

                <Details />
            </div>

            <BlackCard />

            <div ref={propertiesRef}>
                <Properties />
            </div>

            <Reviews />

            <div id="contact">
            <Contact />
            </div>

            {isPopupVisible1 && (
                <div className="home_popupform1">
                    <PopupForm1 onClose={handleClosePopup1} />
                </div>
            )}

            {isPopupVisible2 && (
                <div className="home_popupform1">
                    <PopupForm2 onClose={handleClosePopup2} />
                </div>
            )}

            <Footer />
        </div>
    );
}

export default Home;

import React, { useState } from "react";
import './PopupForm3.css';
import DateInput from "./DateInput";
import InputNormal from "./InputNormal";
import PhoneInput from "./PhoneInput";
import ButtonNormal from "./ButtonNormal";
import TimeInput from "./TimeInput";
import axios from 'axios';
import LoadingScreen from "./LoadingScreen";

function PopupForm3({ onClose, propertyDetails }) {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [visitDate, setVisitDate] = useState('');
    const [visitTime, setVisitTime] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await axios.post('http://localhost:5000/schedule-visit', {
                fullName,
                email,
                phoneNumber,
                visitDate,
                visitTime,
                propertyName: propertyDetails.propertyName,
                locationDetails: propertyDetails.locationDetails
            });
            alert('Visit scheduled successfully');
            onClose(); 
        } catch (err) {
            console.error(err);
            alert('Error scheduling visit');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="popupform3">
            <LoadingScreen isVisible={loading} text="Scheduling your visit..." />
            <h6>Schedule Your Visit</h6>
            <form className="popupform3_fields" onSubmit={handleSubmit}>
                <div className="popupform3_row1">
                    <InputNormal type="text" label="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
                    <InputNormal type="email" label="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <PhoneInput type="number" label="Phone Number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
                <div className="popupform3_row2">
                    <DateInput label="Date" value={visitDate} onChange={setVisitDate} required />
                    <TimeInput label="Time" value={visitTime} onChange={setVisitTime} required />
                </div>

                <div className="popupform1_btns">
                    <ButtonNormal onClick={onClose} text="Cancel" btn_color="btn_white" />
                    <ButtonNormal type="submit" text="Submit" btn_color="btn_black" />
                </div>
            </form>
        </div>
    );
}

export default PopupForm3;

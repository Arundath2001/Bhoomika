import React, { useState } from "react";
import axios from "axios";
import './PopupForm2.css';
import InputNormal from "./InputNormal";
import InputDrop from "./InputDrop";
import PhoneInput from "./PhoneInput";
import ButtonNormal from "./ButtonNormal";
import TextArea from "./TextArea";
import SelectNormal from "./SelectNormal";
import InputUpload from "./InputUpload";
import ImagePreview from "./ImagePreview";
import LoadingScreen from "./LoadingScreen";
import AlertMessage from "./AlertMessage";

function PopupForm2({ onClose }) {
    const [propertyType, setPropertyType] = useState('');
    const [plotSize, setPlotSize] = useState({ input: '', unit: 'Cent' });
    const [fullName, setFullName] = useState('');
    const [phone, setPhone] = useState('');
    const [propertyName, setPropertyName] = useState('');
    const [numOfRooms, setNumOfRooms] = useState('');
    const [numOfToilets, setNumOfToilets] = useState('');
    const [locationDetails, setLocationDetails] = useState('');
    const [budget, setBudget] = useState('');
    const [description, setDescription] = useState(''); 
    const [files, setFiles] = useState([]);
    const [filePreviews, setFilePreviews] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [alertVisible, setAlertVisible] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [isError, setIsError] = useState(false);

    const handlePropertyChange = (e) => {
        setPropertyType(e.target.value);
    };

    const handlePlotSizeChange = (newValue) => {
        setPlotSize(newValue);
    };

    const handleFileChange = (event) => {
        const selectedFiles = Array.from(event.target.files);
        setFiles([...files, ...selectedFiles]);

        const newPreviews = selectedFiles.map(file => URL.createObjectURL(file));
        setFilePreviews([...filePreviews, ...newPreviews]);
    };

    const handleRemovePreview = (index) => {
        const newFiles = [...files];
        const newPreviews = [...filePreviews];

        newFiles.splice(index, 1);
        newPreviews.splice(index, 1);

        setFiles(newFiles);
        setFilePreviews(newPreviews);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const formData = new FormData();
        formData.append('fullName', fullName);
        formData.append('phone', phone);
        formData.append('propertyType', propertyType);
        formData.append('locationDetails', locationDetails);
        formData.append('plotSize', `${plotSize.input} ${plotSize.unit}`);
        formData.append('budget', budget);

        if (propertyType === 'House' || propertyType === 'Villa') {
            formData.append('propertyName', propertyName);
            formData.append('numOfRooms', numOfRooms);
            formData.append('numOfToilets', numOfToilets);
        }

        if (propertyType === 'Land' || description) {
            formData.append('description', description);
        }

        files.forEach(file => {
            formData.append('files', file);
        });

        try {
            const response = await axios.post('http://localhost:5000/selling-info', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.status === 201) {
                setAlertMessage('Form submitted successfully!');
                setIsError(false);
                setAlertVisible(true);
                onClose();
            }
        } catch (error) {
            setAlertMessage('Error submitting the form');
            setIsError(true);
            setAlertVisible(true);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="popupform2">
            <LoadingScreen isVisible={isLoading} text="Submitting your form..." />
            <AlertMessage isVisible={alertVisible} message={alertMessage} onClose={() => setAlertVisible(false)} isError={isError} />

            <h6>Sell Your Property Fast: Get Started Here!</h6>

            <form className="popupform2_fields" onSubmit={handleSubmit}>
                <InputNormal label="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
                <PhoneInput type="number" label="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                <SelectNormal onChange={handlePropertyChange} label="Property Type" required />

                {(propertyType === 'House' || propertyType === 'Villa') && (
                    <div className="popupform2_rowmain">
                        <InputNormal label="Property Name" value={propertyName} onChange={(e) => setPropertyName(e.target.value)} required />
                        <div className="popupform2_row1">
                            <InputNormal label="Number of Rooms" value={numOfRooms} onChange={(e) => setNumOfRooms(e.target.value)} required />
                            <InputNormal label="Number of Toilets" value={numOfToilets} onChange={(e) => setNumOfToilets(e.target.value)} required />
                        </div>
                    </div>
                )}

                <TextArea label="Location Details" value={locationDetails} onChange={(e) => setLocationDetails(e.target.value)} required />

                <TextArea 
                    label="Description" 
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)} 
                    required={propertyType === 'Land'} 
                />

                <InputUpload label="Upload Images/Video" onChange={handleFileChange} required />

                <ImagePreview previews={filePreviews} onRemove={handleRemovePreview} />

                <div className="popupform2_row2">
                    <InputDrop 
                        label="Size of Plot" 
                        value={plotSize} 
                        onChange={handlePlotSizeChange} 
                        required 
                    />
                    <InputNormal label="Budget" value={budget} onChange={(e) => setBudget(e.target.value)} required />
                </div>
                <div className="popupform1_btns">
                    <ButtonNormal onClick={onClose} text="Cancel" btn_color="btn_white" />
                    <ButtonNormal text="Submit" btn_color="btn_black" type="submit" />
                </div>
            </form>
        </div>
    );
}

export default PopupForm2;

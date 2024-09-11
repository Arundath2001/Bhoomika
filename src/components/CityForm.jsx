import React, { useState, useEffect } from "react";
import './CityForm.css';
import InputNormal from "./InputNormal";
import InputUpload from "./InputUpload";
import ButtonNormal from "./ButtonNormal";
import axios from 'axios';
import AlertMessage from "./AlertMessage";
import LoadingScreen from "./LoadingScreen";
import ImagePreview from "./ImagePreview";

function CityForm({ mode, cityData, setIsFormOpen }) {
    const [cityName, setCityName] = useState('');
    const [file, setFile] = useState(null);
    const [newPreviews, setNewPreviews] = useState([]);
    const [existingImages, setExistingImages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [loadingText, setLoadingText] = useState('');
    const [alertMessage, setAlertMessage] = useState({ isVisible: false, message: '', isError: false });

    useEffect(() => {
        if (mode === 'edit' && cityData) {
            setCityName(cityData.cityname || '');
            setExistingImages(cityData.imageurl ? [cityData.imageurl] : []);
        }
    }, [mode, cityData]);

    const handleCloseForm = () => {
        setIsFormOpen(false);
    };

    const handleFileChange = (event) => {
        const newFile = event.target.files[0];
        setFile(newFile);
        if (newFile) {
            const url = URL.createObjectURL(newFile);
            setNewPreviews([url]);
        }
    };

    const handleRemovePreview = (index, isNew = true) => {
        if (isNew) {
            setNewPreviews(newPreviews.filter((_, i) => i !== index));
        } else {
            const updatedImages = existingImages.filter((_, i) => i !== index);
            setExistingImages(updatedImages);
        }
    };

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append('cityName', cityName);
        if (file) {
            formData.append('file', file);
        }

        setIsLoading(true);
        setLoadingText(mode === 'edit' ? 'Updating city...' : 'Adding city...');

        try {
            if (mode === 'edit' && cityData) {
                await axios.put(`http://localhost:5000/cities/${cityData.id}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                setAlertMessage({ isVisible: true, message: 'City updated successfully!', isError: false });
            } else {
                await axios.post('http://localhost:5000/cities', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                setAlertMessage({ isVisible: true, message: 'City added successfully!', isError: false });
            }
            setIsFormOpen(false);
        } catch (error) {
            console.error("Error submitting form", error);
            setAlertMessage({ isVisible: true, message: 'Failed to submit form. Please try again.', isError: true });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="cityform">
            <h6>
                {mode === 'edit' ? (
                    <>
                        <span>Edit</span> {cityName}
                    </>
                ) : (
                    <>
                        <span>Add</span> a New City
                    </>
                )}
            </h6>

            <div className="cityform_fields">
                <InputNormal
                    label="City Name"
                    required
                    value={cityName}
                    onChange={(e) => setCityName(e.target.value)}
                />
                <InputUpload
                    label="Upload Images"
                    required={false}
                    onChange={handleFileChange}
                />
                <ImagePreview
                    previews={newPreviews}
                    onRemove={(index) => handleRemovePreview(index, true)}
                />
                <ImagePreview
                    previews={existingImages}
                    onRemove={(index) => handleRemovePreview(index, false)}
                />
                <div className="cityform_btns">
                    <ButtonNormal onClick={handleCloseForm} btn_color="btn_white" text="Cancel" />
                    <ButtonNormal onClick={handleSubmit} btn_color="btn_black" text="Submit" />
                </div>
            </div>

            <AlertMessage
                isVisible={alertMessage.isVisible}
                message={alertMessage.message}
                isError={alertMessage.isError}
                onClose={() => setAlertMessage({ ...alertMessage, isVisible: false })}
            />

            <LoadingScreen isVisible={isLoading} text={loadingText} />
        </div>
    );
}

export default CityForm;

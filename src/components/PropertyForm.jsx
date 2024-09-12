import React, { useState, useEffect } from "react";
import './PropertyForm.css';
import SelectNormal from "./SelectNormal";
import TextArea from "./TextArea";
import InputUpload from "./InputUpload";
import InputDrop from "./InputDrop";
import InputNormal from "./InputNormal";
import PhoneInput from "./PhoneInput";
import ButtonNormal from "./ButtonNormal";
import ImagePreview from "./ImagePreview";
import axios from 'axios';
import AlertMessage from "./AlertMessage";
import LoadingScreen from "./LoadingScreen";
import imageCompression from 'browser-image-compression';

function PropertyForm({ mode, setIsFormOpen, propertyData, onSubmit, setSelectedIds }) {
    const [propertyType, setPropertyType] = useState('');
    const [fullName, setFullName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [propertyName, setPropertyName] = useState('');
    const [numOfRooms, setNumOfRooms] = useState('');
    const [numOfToilets, setNumOfToilets] = useState('');
    const [locationDetails, setLocationDetails] = useState('');
    const [plotSize, setPlotSize] = useState({ input: '', unit: 'Cent' });
    const [budget, setBudget] = useState({ input: '', unit: 'Lakhs' });
    const [description, setDescription] = useState('');
    const [files, setFiles] = useState([]);
    const [previews, setPreviews] = useState([]);
    const [existingImages, setExistingImages] = useState([]);
    const [alertMessage, setAlertMessage] = useState({ isVisible: false, message: '', isError: false });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (mode === 'edit' && propertyData) {
            setPropertyType(propertyData.propertytype);
            setFullName(propertyData.fullname);
            setPhoneNumber(propertyData.phonenumber);
            setPropertyName(propertyData.propertyname);
            setNumOfRooms(propertyData.numofrooms);
            setNumOfToilets(propertyData.numoftoilets);
            setLocationDetails(propertyData.locationdetails);

            const [input, unit] = propertyData.plotsize.split(' ');
            setPlotSize({ input: input || '', unit: unit || 'Cent' });
            const [budgetInput, budgetUnit] = propertyData.budget.split(' ');
            setBudget({ input: budgetInput || '', unit: budgetUnit || 'Lakhs' });
            setDescription(propertyData.description || '');

            setExistingImages(propertyData.imageurls || []);
        }
    }, [mode, propertyData]);

    const handleFileChange = async (e) => {
        const selectedFiles = Array.from(e.target.files);

        if (files.length + selectedFiles.length > 6) {
            setAlertMessage({ isVisible: true, message: 'You can only upload up to 6 images.', isError: true });
            return;
        }

        const compressedFilesPromises = selectedFiles.map(async (file) => {
            const options = {
                maxSizeMB: 1,
                maxWidthOrHeight: 800, 
                useWebWorker: true,
            };

            try {
                const compressedFile = await imageCompression(file, options);
                return compressedFile;
            } catch (error) {
                console.error('Error compressing file', error);
                return file; 
            }
        });

        const compressedFiles = await Promise.all(compressedFilesPromises);

        setFiles(prevFiles => [...prevFiles, ...compressedFiles]);

        const newPreviews = compressedFiles.map(file => URL.createObjectURL(file));
        setPreviews(prevPreviews => [...prevPreviews, ...newPreviews]);
    };

    const handleRemoveImage = (index, isNew = true) => {
        if (isNew) {
            const updatedFiles = files.filter((_, i) => i !== index);
            const updatedPreviews = previews.filter((_, i) => i !== index);
            setFiles(updatedFiles);
            setPreviews(updatedPreviews);
        } else {
            const updatedImages = existingImages.filter((_, i) => i !== index);
            setExistingImages(updatedImages);
        }
    };

    const handleCloseForm = () => {
        setIsFormOpen(false);
        setSelectedIds([]);
    };

    const handleSubmit = async () => {
        if (!propertyType || !fullName || !phoneNumber || !locationDetails || !plotSize.input || !budget.input) {
            setAlertMessage({ isVisible: true, message: 'Please fill in all the required fields.', isError: true });
            return;
        }

        if (propertyType === 'Land' && !description) {
            setAlertMessage({ isVisible: true, message: 'Please provide a description for the land.', isError: true });
            return;
        }

        if (phoneNumber.length !== 10) {
            setAlertMessage({ isVisible: true, message: 'Phone number must be exactly 10 digits.', isError: true });
            return;
        }

        setLoading(true);

        const combinedPlotSize = `${plotSize.input} ${plotSize.unit}`;
        const combinedBudget = `${budget.input} ${budget.unit}`;

        const formData = new FormData();
        formData.append('propertyType', propertyType || '');
        formData.append('fullName', fullName || '');
        formData.append('phoneNumber', phoneNumber || '');
        formData.append('propertyName', propertyName || '');
        formData.append('numOfRooms', Number(numOfRooms) || 0);
        formData.append('numOfToilets', Number(numOfToilets) || 0);
        formData.append('locationDetails', locationDetails || '');
        formData.append('plotSize', combinedPlotSize || '');
        formData.append('budget', combinedBudget || '');
        formData.append('description', description || '');
        files.forEach(file => formData.append('files', file));

        try {
            let response;
            if (mode === 'edit' && propertyData) {
                response = await axios.put(`https://traveling-earthy-swim.glitch.me/properties/${propertyData.id}`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
            } else {
                response = await axios.post('https://traveling-earthy-swim.glitch.me/properties', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
            }

            setSelectedIds([]);

            setAlertMessage({ isVisible: true, message: 'Property submitted successfully!', isError: false });
            setTimeout(() => {
                handleCloseForm();
                onSubmit(response.data);
            }, 2000);
        } catch (error) {
            console.error("Error submitting form", error);
            setAlertMessage({ isVisible: true, message: 'Failed to submit form. Please try again.', isError: true });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="propertyform">
            <h6>
                {mode === "edit" ? (
                    <>
                        <span>Edit</span> {propertyData ? propertyData.propertyName : ''}
                    </>
                ) : (
                    <>
                        <span>Add</span> a New Property
                    </>
                )}
            </h6>

            <div className="propertyform_fields">
                <SelectNormal onChange={(e) => setPropertyType(e.target.value)} label="Property Type" value={propertyType} required />

                {(propertyType === "House" || propertyType === "Villa") && (
                    <>
                        <InputNormal type="text" label="Full Name" required value={fullName} onChange={(e) => setFullName(e.target.value)} />
                        <PhoneInput type="number" label="Phone Number" required value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                        <InputNormal type="text" label="Property Name" required value={propertyName} onChange={(e) => setPropertyName(e.target.value)} />
                        <div className="propertyform_row1">
                            <InputNormal type="number" label="Number of Rooms" required value={numOfRooms} onChange={(e) => setNumOfRooms(e.target.value)} />
                            <InputNormal type="number" label="Number of Baths" required value={numOfToilets} onChange={(e) => setNumOfToilets(e.target.value)} />
                        </div>
                        <TextArea label="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
                    </>
                )}

                {(propertyType === "Commercial" || propertyType === "Land") && (
                    <>
                        <InputNormal type="text" label="Full Name" required value={fullName} onChange={(e) => setFullName(e.target.value)} />
                        <PhoneInput type="number" label="Phone Number" required value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                        <TextArea label="Description" required={propertyType === "Land"} value={description} onChange={(e) => setDescription(e.target.value)} />
                    </>
                )}

                <TextArea label="Location Details" required value={locationDetails} onChange={(e) => setLocationDetails(e.target.value)} />
                <InputUpload label="Upload Images" required onChange={handleFileChange} />
                <ImagePreview
                    previews={[...previews, ...existingImages]}
                    onRemove={handleRemoveImage}
                />

                <div className="propertyform_row2">
                    <InputDrop type="number" label="Size of Plot" required value={plotSize} onChange={(value) => setPlotSize(value)} />
                    <InputDrop type="text" label="Budget" required value={budget} onChange={(value) => setBudget(value)} />
                </div>

                <div className="propertyform_btns">
                    <ButtonNormal onClick={handleCloseForm} text="Cancel" btn_color="btn_white" />
                    <ButtonNormal onClick={handleSubmit} text="Submit" btn_color="btn_black" />
                </div>
            </div>

            <AlertMessage 
                isVisible={alertMessage.isVisible} 
                message={alertMessage.message} 
                isError={alertMessage.isError}
                onClose={() => setAlertMessage({ ...alertMessage, isVisible: false })}
            />

            <LoadingScreen 
                isVisible={loading} 
                text="Submitting form..." 
            />
        </div>
    );
}

export default PropertyForm;

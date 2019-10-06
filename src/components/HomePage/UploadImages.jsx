import React from 'react';

const UploadImage = ({ handleUploadChange }) => {
    return (
        <input
        value=""
        onChange={handleUploadChange}
        name="upload"
        className="contact-cv-input"
        type="file"
        accept="application/pdf, .jpg, .png" />
    )
}

export default UploadImage;
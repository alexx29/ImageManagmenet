import React from 'react';
import './SheduleImages.scss';

const SheduleImages = ({ images, redirectEditElement }) => {
    return (
        <div className="sheduleImages">
            {
                images.map(element => (
                <img onClick={redirectEditElement(element.idImage)} className="image" src={element.image} />
              )
            )}
        </div>
    );
};

export default SheduleImages;

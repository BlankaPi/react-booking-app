import React, { useState } from 'react'
import "./slider.scss";
import * as RiIcons from "react-icons/ri";

const Slider = (props) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const sliderLength = props.imageUrl.length;
    console.log(sliderLength);

    const nextSlide = () => {
        setCurrentSlide(currentSlide === sliderLength - 1 ? 0 : currentSlide + 1)
    };
    const prevSlide = () => {
        setCurrentSlide(currentSlide === 0 ? sliderLength - 1 : currentSlide - 1)
    };

    return (
        <div className='photo-album '>

            <RiIcons.RiArrowLeftSLine className='arrow left' onClick={prevSlide} />
            <RiIcons.RiArrowRightSLine className='arrow right' onClick={nextSlide} />

            {props.imageUrl.map((photo, index) => (
                <div key={index} className={index === currentSlide ? "current slide" : "slide"}  >
                    {index === currentSlide && (
                        <img src={photo} alt="house" />
                    )}
                </div>
            ))}
        </div>
    )
}

export default Slider
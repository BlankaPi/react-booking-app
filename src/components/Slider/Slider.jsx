import React, { useEffect, useState } from 'react'
import "./slider.scss";
import * as RiIcons from "react-icons/ri";

const Slider = ({ photoUrl, ...props }) => {
    const sliderLength = props.imageUrl.length;
    const imgArray = props.imageUrl;
    console.log(sliderLength);

    const [x, setX] = useState(0);
    const goLeft = () => {
        x === 0 ? setX(-100 * (sliderLength - 1)) : setX(x + 100);
    }

    const goRight = () => {
        x === -100 * (sliderLength - 1) ? setX(0) : setX(x - 100);
    }

    useEffect(() => {
        if (photoUrl) {
            const indexUrl = imgArray.indexOf(`${photoUrl}`);
            setX(-100 * indexUrl);
        }
    }, [photoUrl, imgArray])

    return (
        <div className='photo-album'>

            <RiIcons.RiArrowLeftSLine className='arrow left' onClick={goLeft} />
            <RiIcons.RiArrowRightSLine className='arrow right' onClick={goRight} />

            {props.imageUrl.map((photo, index) => (
                <div key={index} className="slide" style={{ transform: `translateX(${x}%)` }}>
                    <img src={photo} alt="house" />
                </div>
            ))}
        </div>
    )
}

export default Slider
import React from 'react';
import * as RiIcons from "react-icons/ri";
import "./button.scss"


const ArrowButton = (props) => {
    return (
        <button className="arrow-button" type={props.type} onClick={props.handleClick}>
            <RiIcons.RiArrowLeftSLine />
            <p>{props.text}</p>
        </button>
    )
}

export default ArrowButton
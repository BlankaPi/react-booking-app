import React from 'react';
import "./button.scss";
import * as RiIcons from "react-icons/ri";

const IconButton = (props) => {
    return (
        <button
            className={`${props.color} icon`}
            type={props.type}
            onClick={props.handleClick}
        >
            <RiIcons.RiImageFill />
            <p>{props.text}</p>
        </button>
    )
}

export default IconButton
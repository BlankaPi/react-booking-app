import React from 'react';
import "./button.scss"

const Button = (props) => {
    return (
        <button className={`${props.color} rectangle`} type={props.type}
        onClick={props.handleClick}>
            {props.text}
        </button>
    )
}

export default Button
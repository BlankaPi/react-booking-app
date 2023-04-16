import React from 'react';
import * as RiIcons from "react-icons/ri";
import "./button.scss"

const CircleButton = (props) => {
  return (
    <button className='circle' type={props.type} onClick={props.handleClick}>
        {props.func === "add" ? <RiIcons.RiAddLine /> : <RiIcons.RiSubtractLine />}
    </button>
  )
}

export default CircleButton
import React from 'react';
import Button from '../Button/Button';
import "./houses.scss";
// import { Link } from 'react-router-dom';

const HouseDetailCard = (props) => {
    return (
        <article className="house-detail-card">
            <div className='multi-img-container'>
                <img src={props.imageUrl[0]} alt="house" />
                <img src={props.imageUrl[1]} alt="house" />
                <img src={props.imageUrl[2]} alt="house" />
            </div>
            <Button text={props.type} color="orange" type="button" disabled />
            <div className='details-container'>
                <h3>{props.title}</h3>
                <h3>{props.price} $/day</h3>
                <p>{props.description}</p>
            </div>
        </article>
    )
}

export default HouseDetailCard
import React from 'react';
import Button from '../Button/Button';
import "./houses.scss";
import { Link } from 'react-router-dom';

const HouseCard = (props) => {
    return (
        <article key={props.id} className="house-card">
            <Link to={`/${props.id}`}>
                <div className='img-container'>
                    <img src={props.imageUrl[0]} alt="house" />
                </div>
                <div className='title-container'>
                    <h3>{props.title}</h3>
                    <h3>{props.price} $/day</h3>
                </div>
                <Button text={props.type} color="orange" type="button" />
            </Link>
        </article>
    )
}

export default HouseCard
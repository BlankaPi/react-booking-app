import React from 'react';
import Button from '../Button/Button';
import "./houses.scss";
import { Link } from 'react-router-dom';
import * as FaIcons from "react-icons/fa";

const HouseCard = (props) => {
    return (
        <article key={props.id} className="house-card">
            <Link to={`/${props.id}`}>
                <div className='img-container'>
                    <img src={props.imageUrl[0]} alt="house" />
                </div>
                <div className='title-container'>
                    <h4>{props.title}</h4>
                    <h4>{props.price} $/day</h4>
                </div>
                <div className='detail-container'>
                    <Button text={props.type} color="orange" type="button" />
                    {
                        props.petFriendly && <FaIcons.FaDog />
                    }
                </div>

            </Link>
        </article>
    )
}

export default HouseCard
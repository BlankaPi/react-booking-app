import React from 'react';
import Button from '../Button/Button';
import "./houseDetail.scss";
// import { Link } from 'react-router-dom';

const HouseDetailCard = ({handleClickOn, ...props}) => {
    return (
        <article className="house-detail-card">
            <div className='multi-img-container'>
            <Button text="Go to gallery" type="button" handleClick={handleClickOn}/>
                <div className='big-img-container img' onClick={handleClickOn}>
                    <img src={props.imageUrl[0]} alt="house" />
                </div>
                {props.imageUrl[1] && (
                    <div className='small-img-container'>
                        <div className='img' onClick={handleClickOn}>
                            <img src={props.imageUrl[1]} alt="house" />
                        </div>
                        <div className='img' onClick={handleClickOn}>
                            <img src={props.imageUrl[2]} alt="house" />
                        </div >
                    </div>
                )}
            </div>
            <Button text={props.type} color="orange disabled" type="button" disabled />
            <div className='details-container'>
                <h3>{props.title}</h3>
                <h3>{props.price} $/day</h3>
                <p>{props.description}</p>
            </div>
        </article>
    )
}

export default HouseDetailCard
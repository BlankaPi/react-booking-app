import React from 'react';
import Button from '../Button/Button';
import IconButton from '../Button/IconButton';
import "./houseDetail.scss";
// import { Link } from 'react-router-dom';
import ReservationForm from '../reservation/ReservationForm';

const HouseDetailCard = ({ handleClickOn, changeState, ...props }) => {
    return (
        <article className="house-detail-card">
            <div className='multi-img-container'>
                <IconButton text="Go to gallery" type="button" handleClick={handleClickOn} color="white"/>
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

            <div className='form-details-container'>

                <div className='form-container'>
                    <ReservationForm />
                </div>

                <div className='details-container'>
                    <div>
                        <p>House standard:</p>
                        <Button text={props.type} color="orange disabled" type="button" disabled />
                    </div>

                    <h3>{props.title}</h3>
                    <h3>{props.price} $/day</h3>
                    <p>{props.description}</p>
                </div>



            </div >
        </article>
    )
}

export default HouseDetailCard
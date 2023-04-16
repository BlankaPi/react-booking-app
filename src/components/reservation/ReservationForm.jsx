import React, { useState } from 'react';
import "./reservation.scss";
import CircleButton from '../Button/CircleButton';
import Button from '../Button/Button';

const ReservationForm = () => {
  const initialState = {
    checkIn: "",
    checkOut: "",
    guestNum: 0,
    pet: true
  }

  const [reservation, setReservation] = useState({
    ...initialState
  })

  const handleInputChange = (event) => {
    console.log(event.target.value);
    const { name, value, type, checked } = event.target;
    setReservation(prevData => {
      return {
        ...prevData,
        [name]: type === "checkbox" ? checked : value
      }
    })
  }

  const addGuest = () => {
    if (reservation.guestNum === 5) {
      return
    }

    setReservation(prev => {
      return {
        ...prev,
        guestNum: prev.guestNum + 1
      }
    });
  }

  const substractGuest = () => {
    if (reservation.guestNum === 0) {
      return
    }

    setReservation(prev => {
      return {
        ...prev,
        guestNum: prev.guestNum - 1
      }
    });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(reservation)
  }

  return (
    <form className='reservation-form' onSubmit={handleSubmit}>
      <div className='input-container'>
        <label>Check in:</label>
        <input
          type="date"
          onChange={handleInputChange}
          name="checkIn"
          value={reservation.checkIn}
        />
      </div>
      <div className='input-container'>
        <label>Check out:</label>
        <input
          type="date"
          onChange={handleInputChange}
          name="checkOut"
          value={reservation.checkOut}
        />
      </div>
      <div className='input-container'>
        <label>Number of guests:</label>
        <div className='guest-number'>
          <CircleButton func="substract" handleClick={substractGuest} type="button" />
          <input
            name="guestNum"
            className='value'
            value={reservation.guestNum}
            onChange={handleInputChange}
          />
          <CircleButton func="add" handleClick={addGuest} type="button" />
        </div>
      </div>
      <div className='input-container pet'>
        <input
          type="checkbox"
          id="pet"
          name="pet"
          value={reservation.pet}
          onChange={handleInputChange}
        />
        <label htmlFor='pet'>Traveling with pet?</label>
      </div>
      <Button type="submit" text="Reserve" color="green" />
    </form>
  )
}

export default ReservationForm
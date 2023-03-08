import React from 'react';
import { useState } from 'react';
import Button from '../Button/Button';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { storage } from '../../firebase/config';
import { db } from '../../firebase/config';
import "../../pages/Admin/admin.scss";

const initialState = {
  description: "",
  imageUrl: [],
  petFriendly: true,
  price: "",
  title: "",
  type: "Basic"
}

const AddHouses = () => {
  const [house, setHouse] = useState({
    ...initialState
  })

  const [imgCount, setImgCount] = useState(0);
  const [message, setMessage] = useState("");

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    setHouse(prevData => {
      return {
        ...prevData,
        [name]: type === "checkbox" ? checked : value
      }
    })
  }

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    console.log(file);

    const storageRef = ref(storage, `booking/${Date.now()}${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
      },
      (error) => {
        //set error message
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setHouse(prevData => {
            return {
              ...prevData,
              imageUrl: [...prevData.imageUrl, downloadURL]
            }
          });
          setImgCount(prev => prev + 1)
        });
      }
    );
    console.log(house.imageUrl.length);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(house);

    try {
      const docRef = addDoc(collection(db, "houses"), {
        description: house.description,
        imageUrl: house.imageUrl,
        petFriendly: house.petFriendly,
        price: house.price,
        title: house.title,
        type: house.type,
        createAt: Timestamp.now().toDate()
      });
      setHouse({ ...initialState });
      setMessage("House uploaded succesfully");
    } catch (error) {
      setMessage(error.message)
    }
  }

  return (
    <div>
      <h2>Add new house</h2>
      <form onSubmit={handleSubmit} className="admin-form">
        <label className='main-label'>House Title:</label>
        <input
          type="text"
          name="title"
          required
          placeholder='House title'
          value={house.title}
          onChange={handleInputChange}
        />

        <fieldset>
          <legend className='main-label'>Type of a house:</legend>
          <input
            type="radio"
            id="Basic"
            name="type"
            value="Basic"
            checked={house.type === "Basic"}
            onChange={handleInputChange}
          />
          <label htmlFor='Basic'>Basic</label>

          <input
            type="radio"
            id="High"
            name="type"
            value="High"
            checked={house.type === "High"}
            onChange={handleInputChange}
          />
          <label htmlFor='High'>High</label>
        </fieldset>

        <label className='main-label'>House Price:</label>
        <input
          type="text"
          name="price"
          required
          placeholder='Price / day'
          value={house.price}
          onChange={handleInputChange}
        />
        <fieldset>
          <input
            type="checkbox"
            id="petFriendly"
            name="petFriendly"
            value={house.petFriendly}
            onChange={handleInputChange}
          />
          <label htmlFor='petFriendly'>Pet Friendly</label>
        </fieldset>

        <label className='main-label'>Description:</label>
        <textarea
          rows="5"
          name="description"
          required
          placeholder='Description'
          value={house.description}
          onChange={handleInputChange}
        />


        <label className='main-label'>House Images:</label>
        <input
          className='input-file'
          type="file"
          accept='image/*'
          name="image"
          onChange={handleImageChange}
        />
        <div className='form-img'>
          <input
            className='url-holder'
            type="text"
            name="imageUrl"
            // required
            disabled
            value={imgCount}
          />
          <label>Images Added</label>
        </div>


        <Button color="black" type="submit" text="Add a house" />
        {
          message && (
            <h4 className='error'>{message}</h4>
          )
        }
      </form>
    </div>
  )
}

export default AddHouses
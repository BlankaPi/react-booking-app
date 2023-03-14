import React from 'react';
import { useState } from 'react';
import Button from '../Button/Button';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { storage } from '../../firebase/config';
import { db } from '../../firebase/config';
import "../../pages/Admin/admin.scss";
import * as RiIcons from "react-icons/ri";

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

  const [message, setMessage] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    setHouse(prevData => {
      return {
        ...prevData,
        [name]: type === "checkbox" ? checked : value
      }
    })
  }

  const handleDragOver = (event) => {
    event.preventDefault();
    event.target.classList.add("drag-active");
  }

  const handleDragLeave = (event) => {
    event.preventDefault();
    event.target.classList.remove("drag-active");
  }

  const handleImageChange = (event) => {
    event.preventDefault();
    event.target.classList.remove("drag-active");
    const data = event.target.classList.contains('dropzone') ? event.dataTransfer.files : event.target.files;
    const photos = Array.from(data);

    photos.map((photo) => {
      const storageRef = ref(storage, `booking/${Date.now()}${photo.name}`);
      const uploadTask = uploadBytesResumable(storageRef, photo);

      uploadTask.on('state_changed',
        (snapshot) => {
          const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          // console.log('Upload is ' + progress + '% done');
          setUploadProgress(progress)
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
          });
        }
      );
      console.log(house.imageUrl.length);
    })
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
      setUploadProgress(0);
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
          <legend className='main-label'>House Standard:</legend>
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
        <div className='form-img'>
          <div
            className="dropzone"
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleImageChange}
          ></div>
          <div className='form-img-button'>
            <RiIcons.RiImageAddLine />
            <p>Drag and drop to upload photos or</p>
            <input
              className='input-file'
              type="file"
              accept='image/*'
              name="image"
              multiple
              onChange={handleImageChange}
            />
          </div>
        </div >

        {uploadProgress === 0 ? null : (
          <div className='progress'>
            <div className='progress-bar' style={{ width: `${uploadProgress}%` }}></div>
            <div className='progress-text'>
              {uploadProgress < 100 ? `Uploading ${uploadProgress}%` : `Upload Complete ${uploadProgress}%`}
            </div>
          </div>
        )}

        {house.imageUrl.length === 0 ? null : (
          <div className='progress-img'>
            {house.imageUrl.map((img, index) => {
              return (
                <img src={img} alt="house-loading" key={index} />
              )
            })}
          </div>
        )}

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
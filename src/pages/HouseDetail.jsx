import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import LoaderDetail from '../components/Loader/LoaderDetail';
import HouseDetailCard from '../components/houses/HouseDetailCard';
import { doc, getDoc } from "firebase/firestore";
import { db } from '../firebase/config';
import Slider from '../components/Slider/Slider';
import ArrowButton from '../components/Button/ArrowButton';

const HouseDetail = () => {
    const { id } = useParams();
    const [house, setHouse] = useState(null);
    const [showAllPhotos, setShowAllPhotos] = useState(false);
    const [photoUrl, SetPhotoUrl] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        getHouse()
    }, [])

    const getHouse = async () => {
        const docRef = doc(db, "houses", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            setHouse(docSnap.data())
        } else {
            // set error
        }
    }

    const handleClickOff = () => {
        setShowAllPhotos(false);
    }

    const handleClickOn = (event) => {
        setShowAllPhotos(true);
        event.target.tagName === "IMG" ? SetPhotoUrl(event.target.src) : SetPhotoUrl("");
    }

    const handleGoHome = () => {
        navigate("/");
    }

    if (house && showAllPhotos) {
        return (
            <div className='container'>
                <ArrowButton type="button" text="Go back" handleClick={handleClickOff} />
                <div className='slider-container'>
                    <Slider {...house} photoUrl={photoUrl} />
                </div >
            </div>

        )
    }

    return (
        <div className='container'>
            <ArrowButton type="button" text="Go back" handleClick={handleGoHome}/>
            {house ? (
                <HouseDetailCard {...house} handleClickOn={handleClickOn}/>
            ) : <LoaderDetail />}
        </div>
    )
}



export default HouseDetail
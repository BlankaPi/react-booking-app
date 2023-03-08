import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import LoaderDetail from '../components/Loader/LoaderDetail';
import HouseDetailCard from '../components/houses/HouseDetailCard';
import { doc, getDoc } from "firebase/firestore";
import { db } from '../firebase/config';

const HouseDetail = () => {
    const { id } = useParams();
    const [house, setHouse] = useState(null);

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

    return (
        <div className='container'>
            {house ? (
                <HouseDetailCard {...house} />
            ) : <LoaderDetail />}
        </div>
    )
}



export default HouseDetail
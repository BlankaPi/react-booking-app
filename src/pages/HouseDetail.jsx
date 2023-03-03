import React from 'react';
import { useParams } from 'react-router-dom';
import useFetchCollection from '../customHooks/useFetchCollection';
import LoaderDetail from '../components/Loader/LoaderDetail';
import HouseDetailCard from '../components/houses/HouseDetailCard';

const HouseDetail = () => {
    const { data } = useFetchCollection();
    const params = useParams();
    const house = data[params.id - 1];

    return (
        <div className='container'>
            {house ? (
                <HouseDetailCard {...house}/>
            ) : <LoaderDetail />}
        </div>
    )
}

export default HouseDetail
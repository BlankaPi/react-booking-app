import React from 'react';
import useFetchCollection from '../../customHooks/useFetchCollection';
import Loader from '../../components/Loader/Loader';
import HouseCard from '../../components/houses/HouseCard';
import "../../components/houses/houses.scss";
import "./home.scss"

const Home = () => {
  const { data, isLoading } = useFetchCollection();
  console.log(data);

  return (
    <>
    {isLoading && <Loader />}
      <div className='container'>
        <h2>Explore our options</h2>
        <div className='cards'>
          {data.map(house => {
            return (
              <HouseCard key={house.id} {...house}/>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default Home


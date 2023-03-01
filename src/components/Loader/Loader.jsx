import React from 'react';
import ReactDOM from 'react-dom';
import "./loader.scss";


const Loader = () => {
  return ReactDOM.createPortal(
    <div className='wrapper'>
        <div className='loader'></div>
    </div>,
    document.getElementById('loader')
  )
}

export default Loader
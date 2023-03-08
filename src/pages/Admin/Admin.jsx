import React from 'react';
import { Route, Routes } from 'react-router-dom';
import "./admin.scss"

import Navbar from '../../components/admin/Navbar';
import AddHouses from '../../components/admin/AddHouses';
import AllHouses from '../../components/admin/AllHouses';

const Admin = () => {
    return (
        <div className='container'>
            <Navbar />
            <div className='admin-content'>
                <Routes>
                    <Route path="all" element={<AllHouses />} />
                    <Route path="add" element={<AddHouses />} />
                </Routes>
            </div>
        </div>
    )
}

export default Admin
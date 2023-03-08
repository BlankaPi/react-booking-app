import React from 'react'
import { NavLink } from 'react-router-dom'
import Button from '../Button/Button'


const Navbar = () => {
    return (
        <nav className='admin-navbar'>
            <NavLink to="/admin/add" className={({ isActive }) => isActive ? "active" : ""}>
                <Button color="black" type="button" text="Add new house" />
            </NavLink>
            <NavLink to="/admin/all" className={({ isActive }) => isActive ? "active" : ""}>
                <Button color="black" type="button" text="All houses" />
            </NavLink>
        </nav>
    )
}

export default Navbar
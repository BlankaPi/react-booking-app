import { React, useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from "react-router-dom";
import * as RiIcons from "react-icons/ri";
import "./navbar.scss";
import { useAuth } from '../../context/AuthContext';
import { ShowOnLogin, ShowOnLogOut } from "../../privateRoute/HiddenLinks"

const Navbar = () => {
    const [userName, setUserName] = useState("");
    const [message, setMessage] = useState("");

    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        currentUser && setUserName(currentUser.email.slice(0, currentUser.email.indexOf("@")))
    }, [currentUser, logout])

    const handleLogout = async () => {
        setMessage("");

        try {
            await logout();
            navigate("/login")
            setUserName("")
        } catch {
            setMessage("Failed to log out")
        }
    }

    return (
        <nav className='navbar'>
            <Link to="/">
                <RiIcons.RiHomeHeartLine />
                <h1>CAMP</h1>
            </Link>
            <ul>
                <li>
                    <NavLink to="/dashboard">
                        <RiIcons.RiChatSmile3Line className='user-logo' transform="scale(-1, 1)" />
                        Hi! {currentUser && userName}
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/about">
                        About
                    </NavLink>
                </li>
                <ShowOnLogOut>
                    <li>
                        <NavLink to="/login">
                            Login
                        </NavLink>
                    </li>
                </ShowOnLogOut>
                <ShowOnLogin>
                    <li>
                        <NavLink to="/" onClick={handleLogout}>
                            Logout
                        </NavLink>
                    </li>
                </ShowOnLogin>
            </ul>
        </nav>
    )
}

export default Navbar
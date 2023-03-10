import { React, useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from "react-router-dom";
import * as RiIcons from "react-icons/ri";
import "./navbar.scss";
import { useAuth } from '../../context/AuthContext';
import { ShowOnLogin, ShowOnLogOut } from "../../privateRoute/HiddenLinks";
import Button from '../Button/Button';
import AdminOnlyLinks from '../adminOnlyRoute/AdminOnlyLinks';

const Navbar = () => {
    const [userName, setUserName] = useState("");
    const [message, setMessage] = useState("");
    const [isNavShowing, setNavShowing] = useState(false);

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
            setNavShowing(false)
        } catch {
            setMessage("Failed to log out")
        }
    }

    return (
        <nav className='navbar'>
            <Link to="/" onClick={() => setNavShowing(false)}>
                <RiIcons.RiHomeHeartLine />
                <h1>CAMP</h1>
            </Link>

            {/* MENU BAR */}
            <ul className={`nav-links ${isNavShowing ? "shov_nav" : "hide_nav"}`} >
                {/* BUTTON SHOWING ONLY FOR ADMIN */}
                <AdminOnlyLinks>
                    {
                        <li>
                            <Link to="/admin/add" onClick={() => setNavShowing(prev => !prev)}>
                                <Button color="green" type="button" text="Admin" />
                            </Link>
                        </li>
                    }
                </AdminOnlyLinks>
                <ShowOnLogin>
                    <li>
                        <NavLink to="/dashboard" onClick={() => setNavShowing(prev => !prev)}>
                            <RiIcons.RiChatSmile3Line className='user-logo' transform="scale(-1, 1)" />
                            Hi! {currentUser && userName}
                        </NavLink>
                    </li>
                </ShowOnLogin>
                <li>
                    <NavLink to="/about" onClick={() => setNavShowing(prev => !prev)}>
                        About
                    </NavLink>
                </li>
                <ShowOnLogOut>
                    <li>
                        <NavLink to="/login" onClick={() => setNavShowing(prev => !prev)}>
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
            <button className='nav__toggle-btn' onClick={() => setNavShowing(prev => !prev)}>
                {
                    isNavShowing ? <RiIcons.RiCloseLine /> : <RiIcons.RiMenuFill />
                }
            </button>
        </nav>
    )
}

export default Navbar
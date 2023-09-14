import { Link, redirect, useLocation } from 'react-router-dom'
import image from '../assets/images/logo-light.svg'
import PersonIcon from '@mui/icons-material/Person';
import { useEffect, useState } from 'react';
const MainNavigationBar = () => {
    const isAuthenticated = localStorage.getItem('TOKEN')
    const location = useLocation()
    const [showDropdown, setShowdropdown] = useState(false)

    useEffect(() => {
        setShowdropdown(false)
    }, [location])

    const showDropdownHandler = () => {
        setShowdropdown(prev => !prev)
    }

    const logoutHandler = () => {
        localStorage.removeItem('TOKEN')
        redirect('/signup')
    }

    return (
        <header>
            <div className="container">

                <nav className="navbar">

                    <a href='/'>
                        <img src={image} alt="Devblog's logo" width="150" height="40" className="logo-light" />
                    </a>

                    <div className="btn-group">

                        <button className="theme-btn theme-btn-mobile light">
                            <ion-icon name="moon" className="moon"></ion-icon>
                            <ion-icon name="sunny" className="sun"></ion-icon>
                        </button>

                        <button className="nav-menu-btn">
                            <ion-icon name="menu-outline"></ion-icon>
                        </button>

                    </div>

                    <div className="flex-wrapper">

                        <ul className="desktop-nav">

                            <li>
                                <Link to="/" refresh='true' className="nav-link">Home</Link>
                            </li>

                            {!isAuthenticated && <li>
                                <Link to="/signup" className="nav-link">Signup</Link>
                            </li>}
                            {isAuthenticated && <li>
                                <div className="dropdown">
                                    <button className="dropbtn" onClick={showDropdownHandler}><PersonIcon fontSize='large' /></button>
                                    {showDropdown && <div className="dropdown-content">
                                        <Link to="/profile" >Profile</Link>
                                        <Link to="/profile/update" >Profile Update</Link>
                                        <Link to="/profile/addskills" >Add Skills</Link>
                                        <Link to='/blogs/new'>New Blog</Link>
                                        <Link to='/signup' onClick={logoutHandler}>Logout</Link>
                                    </div>}
                                </div>
                            </li>}

                        </ul>

                    </div>

                    <div className="mobile-nav">

                        <button className="nav-close-btn">
                            <ion-icon name="close-outline"></ion-icon>
                        </button>

                        <div className="wrapper">

                            <p className="h3 nav-title">Main Menu</p>

                            <ul>
                                <li className="nav-item">
                                    <a href="/" className="nav-link">Home</a>
                                </li>

                                <li className="nav-item">
                                    <a href="/" className="nav-link">About Me</a>
                                </li>

                                <li className="nav-item">
                                    <a href="/" className="nav-link">Contact</a>
                                </li>
                            </ul>

                        </div>

                        <div>

                            <p className="h3 nav-title">Topics</p>

                            <ul>
                                <li className="nav-item">
                                    <a href="/" className="nav-link">Database</a>
                                </li>

                                <li className="nav-item">
                                    <a href="/" className="nav-link">Accessibility</a>
                                </li>

                                <li className="nav-item">
                                    <a href="/" className="nav-link">Web Performance</a>
                                </li>
                            </ul>

                        </div>

                    </div>

                </nav>

            </div>
        </header>
    )
}

export default MainNavigationBar
import React from 'react';
import { useUser } from '../UserContext/UserContext';
import { Link } from 'react-router-dom';
import "./NavBar.css"

const NavBar: React.FC = () => {
    const { isLoggedIn, isAdmin } = useUser();

    return (
        <header className='navbar navbar-expand-md navbar-dark bd-navbar'>
            <nav className="navbar navbar-expand-lg navbar-toggleable-sm navbar-light bg-white border-bottom box-shadow mb-3 fixedElement">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">AutoVade:PRO</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target=".navbar-collapse" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="navbar-collapse collapse d-sm-inline-flex justify-content-between" id="menuItems">
                        <ul className="navbar-nav flex-grow-1">
                            <li className="nav-item">
                                <Link className="nav-link text-dark" to="/">Home</Link>
                            </li>
                            {isLoggedIn ? (
                                <li className="nav-item">
                                    <Link className="nav-link text-dark" to="/User/SignOut">Sign-Out</Link>
                                </li>
                            ) : (
                                <li className="nav-item">
                                    <Link className="nav-link text-dark" to="/User/SignIn">Sign-In</Link>
                                </li>
                            )}
                            {/* {isAdmin && ( */}
                            {isAdmin===true && (
                                <li className="nav-item">
                                    <Link className="nav-link text-dark" to="/User/Create">Add Employee</Link>
                                </li>
                            )}
                            {isLoggedIn ? (<>
                            <li className="nav-item">
                                <Link className="nav-link text-dark" to="/User/List">List of Employees</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-dark" to="/Ticket/Create">Create Ticket</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-dark" to="/Ticket/List">List of Tickets</Link>
                            </li></>):null}
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default NavBar;
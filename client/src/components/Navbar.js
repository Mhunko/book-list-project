import React, {useContext} from "react";
import {NavLink, useHistory} from "react-router-dom";
import {AuthContext} from "../context/AuthContext";

export const Navbar = () => {
    const history = useHistory()
    const auth = useContext(AuthContext)
    const logoutHandler = (event) => {
        event.preventDefault()
        auth.logout()
        history.push('/')
    }


    return (
        <nav>
            <div className="nav-wrapper teal darken-4" style={{padding: '0 2rem'}}>
                <NavLink to="/books" className="brand-logo left">Book List</NavLink>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><NavLink to='/create'>Create</NavLink></li>
                    <li><NavLink to='/books'>Books</NavLink></li>
                    <li><a href='/' onClick={logoutHandler}>Logout</a></li>
                </ul>
            </div>
        </nav>

    )
}
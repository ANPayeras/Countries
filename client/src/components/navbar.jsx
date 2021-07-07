import React from 'react'
import { Link } from 'react-router-dom';

import './navbar.css'

function NavBar() {
    return (
        <div className='navbar'>
            <h2>NAV BAR</h2>
            <Link to='/home'>Home</Link>
            <Link to='/postactivity'>Crear Actividad</Link>
        </div>
    )
}

export default NavBar;

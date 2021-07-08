import React from 'react'
import { Link } from 'react-router-dom';

import './navbar.css'

function NavBar() {
    return (
        <>
            <div className='navbar'>
                <Link className='linkNav' to='/home'>Home</Link>
                <Link className='linkNav' to='/postactivity'>Crear Actividad</Link>
            </div>
        </>
    )
}

export default NavBar;

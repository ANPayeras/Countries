import React, { useContext } from 'react';
import UserContext from '../context/UserContext';
import { Link } from 'react-router-dom';

function PaisesBuscados() {

    const { searchedCountry } = useContext(UserContext);

    return (
        <div>
            <Link to='/home'>Atras</Link>
            <h1>{searchedCountry[0].name}</h1>
            <img src={searchedCountry[0].flagimage} alt="" />
        </div>
    )
}

export default PaisesBuscados;

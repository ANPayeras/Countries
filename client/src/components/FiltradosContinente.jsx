import React, { useContext } from 'react';
import Filtros from './Filtros';
import UserContext from '../context/UserContext';

// Components
import NavBar from './navbar';

function FiltradosContinente() {

    const { countriesByContinent } = useContext(UserContext);

    return (
        <div>
            <NavBar />
            <Filtros />
            <ul>
                {
                    countriesByContinent.map((e, i) => (
                        <div>
                            <li key={i}>{e.name}</li>
                            <img src={e.flagimage} alt="" />
                        </div>
                    ))
                }
            </ul>
        </div>
    )
}

export default FiltradosContinente;

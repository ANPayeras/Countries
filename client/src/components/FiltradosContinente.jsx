import React, { useContext } from 'react';
import Filtros from './Filtros';
import UserContext from '../context/UserContext';

function FiltradosContinente() {

    const { countriesByContinent } = useContext(UserContext);

    return (
        <div>
            <Filtros />
            <ul>
                {
                    countriesByContinent.map(e => (
                        <div>
                            <li key={e.id}>{e.name}</li>
                            <img src={e.flagimage} alt="" />
                        </div>
                    ))
                }
            </ul>
        </div>
    )
}

export default FiltradosContinente;

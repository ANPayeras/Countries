import React, { useContext } from 'react';
import UserContext from '../context/UserContext';

// Filtros Bar
import Filtros from './Filtros';

function PaisesBuscados() {

    const { searchedCountry } = useContext(UserContext);
    console.log(searchedCountry)


    return (
        <div>
            <Filtros />
            <ul>

                {
                    searchedCountry.map(e => (
                        <li key={e.id}>
                            <h1>{e.name || e.msg}</h1>
                            <img src={e.flagimage} alt="" />
                        </li>
                    ))
                }

            </ul>


        </div>
    )
}

export default PaisesBuscados;

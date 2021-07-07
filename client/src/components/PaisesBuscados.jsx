import React, { useContext } from 'react';
import UserContext from '../context/UserContext';
import { Link } from 'react-router-dom';

import Filtros from './Filtros';

function PaisesBuscados() {

    const { searchedCountry } = useContext(UserContext);

    return (
        <div>
            <Filtros />
            {
                searchedCountry.map((e, i) => (
                    <div key={i}>
                        <h1>{e.msg}</h1>
                        <Link to={`/detallepais/${e.id}`}>
                            <h1>{e.name}</h1>
                        </Link>
                        <img src={e.flagimage} alt="" />
                    </div>
                ))
            }
        </div>
    )
}

export default PaisesBuscados;

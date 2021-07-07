import React, { useContext } from 'react';
import Filtros from './Filtros';
import UserContext from '../context/UserContext';

function PopulationFilter() {
    const { countriesByContinent } = useContext(UserContext);
    return (
        <div>
            Hola
        </div>
    )
}

export default PopulationFilter

import React, { useContext } from 'react';
import Filtros from './Filtros';
import UserContext from '../context/UserContext';

function PopulationFilter() {
    const { populationOrder } = useContext(UserContext);
    return (
        <div>
            <Filtros />
            {
                populationOrder[0] && populationOrder.map(e => (
                    <div key={e.id}>
                        <h1>{e.name}</h1>
                        <h1>{e.population}</h1>
                    </div>
                ))
            }
        </div>
    )
}

export default PopulationFilter

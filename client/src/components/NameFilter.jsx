import React, { useContext } from 'react';
import Filtros from './Filtros';
import UserContext from '../context/UserContext';

// Components
import NavBar from './navbar';

function NameFilter() {
    const { nameOrder } = useContext(UserContext);

    return (
        <div>
            <NavBar />
            <Filtros />
            {
                nameOrder[0] && nameOrder.map(e => (
                    <div key={e.id}>{e.name}</div>
                ))
            }
        </div>
    )
}

export default NameFilter

import React, { useContext } from 'react';
import Filtros from './Filtros';
import UserContext from '../context/UserContext';

function NameFilter() {
    const { orderAsc, orderDesc } = useContext(UserContext);

    return (
        <div>
            <Filtros />
            {
                orderAsc ? orderAsc.map(e => (
                    <div key={e.id}>{e.name}</div>
                )) : orderDesc.map(e => (
                    <div key={e.id}>{e.name}</div>
                ))
            }
        </div>
    )
}

export default NameFilter

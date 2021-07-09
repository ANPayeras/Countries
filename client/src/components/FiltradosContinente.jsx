import React from 'react';
import { Link } from 'react-router-dom';
// Redux
import { useSelector } from 'react-redux';

function FiltradosContinente() {

    const countriesByContinent = useSelector(state => state.countriesByContinent)
 
    return (
        <div>
            <ul>
                {
                    countriesByContinent.map(e => (
                        <div>
                            <li key={e.id}>
                                <Link to={`/detallepais/${e.id}`}>
                                    {e.name}
                                </Link>
                            </li>
                            <img src={e.flagimage} />
                        </div>
                    ))
                }
            </ul>
        </div>
    )
}

export default FiltradosContinente;

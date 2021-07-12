import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// Redux
import { useSelector } from 'react-redux';

// Components
import Filtros from './Filtros';
import NavBar from './navbar';

function FiltradosContinente() {

    const countriesByContinent = useSelector(state => state.countriesByContinent)
    console.log(countriesByContinent)
    const [showComponents, setShowComponents] = useState(false)

    const showFilters = () => {
        setShowComponents(!showComponents)
    }

    /*   useEffect(() => {
          setShowComponents(true)
      }, []) */

    return (
        <div>
            {/* <NavBar showFilters={showFilters} />
            <div className='filtros' hidden={!showComponents ? true : false}><Filtros /></div> */}

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

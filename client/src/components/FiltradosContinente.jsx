import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// Redux
import { useSelector } from 'react-redux';

// Components
import Filtros from './Filtros';
import NavBar from './navbar';

function FiltradosContinente({ page, setPage, continent }) {

    const countriesByContinent = useSelector(state => state.countriesByContinent)
    console.log(countriesByContinent)

    useEffect(() => {
        const changePages = () => {
            setPage({
                ...page,
                currentPage: 0,
                nextPage: 1,
                prevPage: 0,
                totalPages: Math.ceil(countriesByContinent.length / 10)
            })
        }
        changePages()
    }, [continent.continent])




    return (
        <div>
            <h3>{page.currentPage + 1} - {page.totalPages} </h3>
            <ul>
                {
                    countriesByContinent[0] && countriesByContinent.slice(page.currentPage * page.limit, page.nextPage * page.limit).map(e => (
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

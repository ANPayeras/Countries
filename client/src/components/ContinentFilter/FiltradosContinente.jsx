import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
// Redux
import { useSelector } from 'react-redux';

function FiltradosContinente({ page, setPage, watcher }) {

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
    }, [watcher.continent])




    return (
        <div>
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

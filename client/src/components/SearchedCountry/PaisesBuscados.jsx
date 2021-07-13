import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

// Redux
import { useSelector } from 'react-redux';

function PaisesBuscados({ page, setPage, watcher }) {

    const searchedCountry = useSelector(state => state.searchedCountry)
    console.log(searchedCountry.length / 10)
    console.log(watcher.country)

    useEffect(() => {
        const changePages = () => {
            setPage({
                ...page,
                currentPage: 0,
                nextPage: 1,
                prevPage: 0,
                totalPages: Math.ceil(searchedCountry.length / 10)
            })
        }
        changePages()
    }, [watcher.country])


    return (
        <div>
            {
                searchedCountry[0] && searchedCountry.slice(page.currentPage * page.limit, page.nextPage * page.limit).map((e, i) => (
                    <div key={i}>
                        <Link to={`/detallepais/${e.id}`}>
                            <h1>Nombre: {e.name}</h1>
                        </Link>
                        <h2>Continente: {e.continente}</h2>
                        <img src={e.flagimage} />
                    </div>
                ))
            }
        </div>
    )
}

export default PaisesBuscados;

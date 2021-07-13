import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

// Redux
import { useSelector } from 'react-redux';
// Styles 
import style from '../Home/Home.module.css';

function FiltradosContinente({ page, setPage, watcher }) {

    const countriesByContinent = useSelector(state => state.countriesByContinent)
    // console.log(countriesByContinent)

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
        <div className={style.container}>
            {
                countriesByContinent[0] && countriesByContinent.slice(page.currentPage * page.limit, page.nextPage * page.limit).map(e => (
                    <Link to={`/detallepais/${e.id}`}>
                        <div key={e.id} className={style.country}>
                            <div >
                                <h3>{e.name}</h3>
                                <h3>{e.continente}</h3>
                            </div>
                            <img className={style.flag} src={e.flagimage} alt="..." />
                        </div>
                    </Link>
                ))
            }
        </div >
    )
}

export default FiltradosContinente;

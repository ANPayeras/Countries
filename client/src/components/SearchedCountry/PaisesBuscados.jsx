import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

// Redux
import { useSelector } from 'react-redux';
// Styles
import style from '../Home/Home.module.css';

function PaisesBuscados({ page, setPage, watcher }) {

    const searchedCountry = useSelector(state => state.searchedCountry)
    console.log(searchedCountry.length / 10)
    console.log(watcher.country)
    console.log(searchedCountry)


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
        <div className={style.container}>
            {
                searchedCountry[0] && searchedCountry[0].msg ? searchedCountry.map(e => (<span className={style.msg}>{e.msg}</span>))
                    : searchedCountry.slice(page.currentPage * page.limit, page.nextPage * page.limit).map((e, i) => (
                        <Link to={`/detallepais/${e.id}`}>
                            <div key={e.id} className={style.country}>
                                <div>
                                    <h1>{e.msg}</h1>
                                    <h3>{e.name}</h3>
                                    <h3>{e.continente}</h3>
                                </div>
                                <img className={style.flag} src={e.flagimage} alt="..." />
                            </div>
                        </Link>
                    ))
            }
        </div>
    )
}

export default PaisesBuscados;

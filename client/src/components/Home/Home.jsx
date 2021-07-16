import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// Styles
import style from './Home.module.css'

// Redux 
import { useDispatch, useSelector } from 'react-redux';
import { getAllCountries } from 'C:/Users/Angel/Desktop/PI/PI-Countries/client/src/Redux/actions/actions.js';

// Components
import Filtros from '../Filters/Filtros';
import NavBar from '../NavBar/NavBar';
import SearchBar from '../SearchBar/SearchBar';
import OrderFilter from '../OrderFilter/OrderFilter';
import FiltradosContinente from '../ContinentFilter/FiltradosContinente';
import PaisesBuscados from '../SearchedCountry/PaisesBuscados';
import FiltradosActividad from '../ActivityFilter/FiltradosActividad';

function Home() {

    const dispatch = useDispatch()
    const allCountries = useSelector(state => state.allCountries)
    const searchedCountry = useSelector(state => state.searchedCountry)

    const api = 'http://localhost:3001/countries?page=';

    useEffect(() => {
        countriesByPage();
        dispatch(getAllCountries());
    }, [dispatch])

    const [page, setPage] = useState({
        currentPage: 0,
        nextPage: 0,
        prevPage: 0,
        totalPages: 0,
        limit: 0
    })
    const { currentPage, nextPage, totalPages, limit } = page;

    const countriesByPage = async () => {
        const listadoDePaises = await axios.get(`${api}0`);
        const totalPages = Math.ceil(listadoDePaises.data.total / listadoDePaises.data.limit);
        setPage({
            ...page,
            currentPage: listadoDePaises.data.currentPage,
            nextPage: listadoDePaises.data.nextPage,
            prevPage: listadoDePaises.data.previousPage,
            totalPages: totalPages,
            limit: listadoDePaises.data.limit
        })
    }

    const changePage = (e) => {
        let { nextPage, totalPages, prevPage } = page;
        console.log(e.target.name)
        if (e.target.name === 'siguiente' && !showCountry) {
            if (nextPage >= totalPages) return null
            getPages(nextPage)
        } else if (e.target.name === 'siguiente' && showCountry) {
            if (nextPage >= Math.ceil(searchedCountry.length / limit)) return null
            getPages(nextPage)
        } else {
            if (prevPage < 0) return null;
            getPages(prevPage)
        }
    }

    const getPages = async (pages) => {
        const listadoDePaises = await axios.get(`${api}${pages}`);
        setPage({
            ...page,
            currentPage: listadoDePaises.data.currentPage,
            nextPage: listadoDePaises.data.nextPage,
            prevPage: listadoDePaises.data.previousPage
        })
    }

    const [showComponents, setShowComponents] = useState(true)
    const [showCountry, setShowCountry] = useState(false)
    const [showOrder, setShowOrder] = useState(false)
    const [showByContinent, setShowContinent] = useState(false)
    const [showActivityFilter, setShowActivityFilter] = useState(false)

    const showFilters = () => {
        setShowComponents(!showComponents)
    }

    const showAll = () => {
        setShowCountry(false)
        setShowOrder(false)
        setShowContinent(false)
        setShowActivityFilter(false)
        setPage({
            ...page,
            currentPage: 0,
            nextPage: 1,
            prevPage: 0,
            totalPages: Math.ceil(allCountries.length / limit)
        })
    }

    const [watcher, setWatcher] = useState({
        continent: '',
        orders: ''
    })
    // console.log(watcher.country)

    const watcherFunction = (e) => {
        if (e === 'Nombre' || e === 'Poblacion' || e === 'Ascendente' || e === 'Descendente') {
            setWatcher({
                ...watcher,
                orders: e
            })
        } else {
            setWatcher({
                ...watcher,
                continent: e
            })
        }
    }

    return (
        <div >
            <NavBar showFilters={showFilters} showAll={showAll} />
            <div className={showComponents ? style.filtersOff : style.filters} /* hidden={showComponents ? true : false} */>
                <Filtros showAll={showAll} showOrder={showOrder} setShowOrder={setShowOrder}
                    setShowContinent={setShowContinent} watcherFunction={watcherFunction} setShowActivityFilter={setShowActivityFilter}
                    setShowCountry={setShowCountry} showOrder={showOrder} showByContinent={showByContinent}
                    showActivityFilter={showActivityFilter}
                /></div>
            {
                showActivityFilter ? null :
                    <div className={style.searchBarContainer}>
                        <SearchBar showCountry={showCountry} setShowCountry={setShowCountry}
                            setShowOrder={setShowOrder} setShowContinent={setShowContinent}
                            page={page} setPage={setPage}
                        />
                    </div>
            }
            {
                showActivityFilter ? <FiltradosActividad /> :

                    showByContinent ? <FiltradosContinente page={page} setPage={setPage} watcher={watcher} /> :

                        showOrder ? <OrderFilter page={page} setPage={setPage} watcher={watcher} /> :

                            showCountry ? <PaisesBuscados page={page} /> :

                                allCountries ?
                                    <div className={style.container}>
                                        {

                                            allCountries.slice(currentPage * limit, nextPage * limit).map((e, i) => (
                                                <Link to={`/detallepais/${e.id}`}>
                                                    <div key={i} className={style.country}>
                                                        <div>
                                                            <h3>{e.name}</h3>
                                                            <h3>{e.continente ? e.continente : <br />}</h3>
                                                        </div>
                                                        <img className={style.flag} src={e.flagimage} alt="..." />
                                                    </div>
                                                </Link>
                                            ))
                                        }
                                    </div> : <p className={style.loading}>Cargando...</p>
            }
            {showActivityFilter || !allCountries[0] ? null :
                <div className={style.pages}>
                    <button name='anterior' onClick={changePage}>🢀</button>
                    <h3>Pagina {currentPage + 1} de {showCountry ? Math.ceil(searchedCountry.length / limit) : totalPages}</h3>
                    <button name='siguiente' onClick={changePage}>🢂</button>
                </div>
            }
        </div>
    )
}

export default Home;

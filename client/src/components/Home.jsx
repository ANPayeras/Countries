import axios from 'axios';
import React, { useEffect, useState } from 'react';
// import UserContext from '../context/UserContext';

import './Home.css'

// Redux 
import { useDispatch, useSelector } from 'react-redux';
import { getAllCountries } from '../Redux/actions/actions';

// Components
import Filtros from './Filtros';
import NavBar from './navbar';
// import OrderFilter from './OrderFilter';
import FiltradosContinente from './FiltradosContinente';
import PaisesBuscados from './PaisesBuscados';

function Home() {

    const dispatch = useDispatch()
    const allCountries = useSelector(state => state.allCountries)

    const api = 'http://localhost:3001/countries?page=';
    const [showComponents, setShowComponents] = useState(false)
    const [showContinents, setShowContinets] = useState(false)
    const [showCountry, setShowCountry] = useState(false)
    const [page, setPage] = useState({
        actualpage: 0,
        nextPage: 0,
        prevPage: 0,
        totalPages: 0,
        limit: 0
    })
    const { actualpage, nextPage, totalPages, limit } = page;

    useEffect(() => {
        countriesByPage();
        dispatch(getAllCountries());
    }, [])

    const countriesByPage = async () => {
        const listadoDePaises = await axios.get(`${api}0`);
        const totalPages = Math.ceil(listadoDePaises.data.total / listadoDePaises.data.limit);
        setPage({
            ...page,
            actualpage: listadoDePaises.data.currentPage,
            nextPage: listadoDePaises.data.nextPage,
            prevPage: listadoDePaises.data.previousPage,
            totalPages: totalPages,
            limit: listadoDePaises.data.limit
        })
    }

    const changePage = (e) => {
        let { nextPage, totalPages, prevPage } = page;
        if (e.target.name === 'siguiente') {
            if (nextPage >= totalPages) return null
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
            actualpage: listadoDePaises.data.currentPage,
            nextPage: listadoDePaises.data.nextPage,
            prevPage: listadoDePaises.data.previousPage
        })
    }

    const showFil = () => {
        setShowComponents(!showComponents)
    }

    const showAll = () => {
        setShowContinets(!showContinents)
    }

    const showCountrySearched = (l) => {
        if (l[0] === '') {
            setShowCountry(false)
        } else {
            setShowCountry(true)
        }
    }
    console.log(showCountry)
    return (
        <div>
            <NavBar />
            <div className='filtros' hidden={showComponents ? true : false}><Filtros showAll={showAll} showCountrySearched={showCountrySearched} /></div>
            <h1 >HOME</h1>
            <button onClick={showFil}>Filtros</button>
            <button disabled={!showContinents ? true : false} onClick={showAll}>Mostrar Todos</button>
            <p></p>
            {
                showContinents ? <FiltradosContinente /> :

                    showCountry ? <PaisesBuscados /> :
                        <div>
                            <button name='anterior' onClick={changePage}>Anterior</button>
                            <button name='siguiente' onClick={changePage}>Siguiente</button>
                            <h3>{actualpage + 1} - {totalPages} </h3>
                            <ul>
                                {
                                    allCountries ? allCountries.slice(actualpage * limit, nextPage * limit).map(e => (
                                        <li key={e.id}>
                                            <h1>Nombre {e.name}</h1>
                                            <h2>Continente {e.continente}</h2>
                                            <img src={e.flagimage} alt="" />
                                        </li>
                                    )) : <p>No hay paises</p>
                                }
                            </ul>
                        </div>

            }
        </div>
    )
}

export default Home;

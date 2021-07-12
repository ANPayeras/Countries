import axios from 'axios';
import React, { useEffect, useState } from 'react';
// import UserContext from '../context/UserContext';
import { WiAlien } from "react-icons/wi";


import './Home.css'

// Redux 
import { useDispatch, useSelector } from 'react-redux';
import { getAllCountries } from '../Redux/actions/actions';

// Components
import Filtros from './Filtros';
import NavBar from './navbar';
import SearchBar from './SearchBar';


import OrderFilter from './OrderFilter';
import FiltradosContinente from './FiltradosContinente';
import PaisesBuscados from './PaisesBuscados';

function Home() {

    const dispatch = useDispatch()
    const allCountries = useSelector(state => state.allCountries)

    const api = 'http://localhost:3001/countries?page=';
    const [showComponents, setShowComponents] = useState(false)
    const [showCountry, setShowCountry] = useState(false)
    const [page, setPage] = useState({
        currentPage: 0,
        nextPage: 0,
        prevPage: 0,
        totalPages: 0,
        limit: 0
    })
    const { currentPage, nextPage, totalPages, limit } = page;

    useEffect(() => {
        countriesByPage();
        dispatch(getAllCountries());
    }, [])

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
            currentPage: listadoDePaises.data.currentPage,
            nextPage: listadoDePaises.data.nextPage,
            prevPage: listadoDePaises.data.previousPage
        })
    }

    const showFilters = () => {
        setShowComponents(!showComponents)
    }

    const showAll = () => {
        setShowCountry(false)
        setShowOrder(false)
        setShowContinent(false)
    }



    const [showOrder, setShowOrder] = useState(false)
    const [showByContinent, setShowContinent] = useState(false)
    console.log(showByContinent)

    return (
        <div>
            <NavBar showFilters={showFilters} />
            <div className='filtros' hidden={showComponents ? true : false}><Filtros showAll={showAll} setShowOrder={setShowOrder} setShowContinent={setShowContinent} /></div>
            <h1 >HOME </h1>

            <SearchBar showCountry={showCountry} setShowCountry={setShowCountry} setShowOrder={setShowOrder} setShowContinent={setShowContinent}/>

            <p></p>
            {
                showByContinent ? <FiltradosContinente /> :

                    showOrder ? <OrderFilter /> :

                        showCountry ? <PaisesBuscados /> :
                            <div>
                                <button name='anterior' onClick={changePage}>Anterior</button>
                                <button name='siguiente' onClick={changePage}>Siguiente</button>
                                <h3>{currentPage + 1} - {totalPages} </h3>
                                <ul>
                                    {
                                        allCountries ? allCountries.slice(currentPage * limit, nextPage * limit).map(e => (
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

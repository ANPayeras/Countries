import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../context/UserContext';


function Home() {

    const { getSearchedCountry, getAllCountries, allCountries } = useContext(UserContext);

    const [paises, setPaises] = useState([]);
    const [page, setPage] = useState({
        actualpage: 0,
        nextPage: 0,
        prevPage: 0,
        totalPages: 0
    })

    useEffect(() => {
        countriesByPage();
        getAllCountries();
    }, [])

    const countriesByPage = async () => {
        const listadoDePaises = await axios.get(`http://localhost:3001/countries?page=0`);
        const datos = listadoDePaises.data.data;
        const totalPages = Math.ceil(listadoDePaises.data.total / listadoDePaises.data.data.length)
        setPaises(datos);
        setPage({
            ...page,
            actualpage: listadoDePaises.data.currentPage + 1,
            nextPage: listadoDePaises.data.nextPage,
            prevPage: listadoDePaises.data.previousPage,
            totalPages: totalPages
        })
    }

    const sigPage = async (e) => {
        let { nextPage, totalPages } = page;
        if (nextPage >= totalPages) return null

        const listadoDePaises = await axios.get(`http://localhost:3001/countries?page=${nextPage}`);
        const datos = listadoDePaises.data.data;
        setPaises(datos);
        setPage({
            ...page,
            actualpage: listadoDePaises.data.currentPage + 1,
            nextPage: listadoDePaises.data.nextPage,
            prevPage: listadoDePaises.data.previousPage
        })
    }

    const antPage = async (e) => {
        let { prevPage } = page;
        if (prevPage < 0) return null;

        const listadoDePaises = await axios.get(`http://localhost:3001/countries?page=${prevPage}`);
        const datos = listadoDePaises.data.data;
        setPaises(datos);
        setPage({
            ...page,
            actualpage: listadoDePaises.data.currentPage + 1,
            nextPage: listadoDePaises.data.nextPage,
            prevPage: listadoDePaises.data.previousPage
        })
    }

    const handlerSubmit = (e) => {
        e.preventDefault();
        if (!e.target.value) return null
    }

    const handlerChange = (e) => {
        let target = e.target.value
        if (target) {
            let buscando = allCountries.filter(e => e.name === target)
            console.log(buscando[0]);
            if (buscando[0]) {
                getSearchedCountry(buscando[0].name)
            }
        } else {
            return null
        }
    }

    const handlerOption = (e) => {
        let target = e.target.value;
        if (target === 'Continente') {
            let filtro = allCountries.filter(e => e.name && e.continente)
            console.log(filtro)
        }
    }

    return (
        <div>
            <h1>Home</h1>

            <h2>Buscar Por:</h2>
            <select onChange={handlerOption}>
                <option></option>
                <option value="Continente" >Contiente</option>
                <option value="Actividad Turistica">Actividad Turistica</option>
            </select>

            <form action="" onSubmit={handlerSubmit}>
                <input type="text" placeholder='Buscar Pais' onChange={handlerChange} name='input' />
                <Link to='/paisesbuscados'>
                    <button>Buscar</button>
                </Link>
            </form>
            <button onClick={antPage}>Anterior</button>
            <button onClick={sigPage}>Siguiente</button>
            <h3>{page.actualpage} - {page.totalPages} </h3>
            <ul>
                {
                    paises.map(e => (
                        <li key={e.id}>
                            <h1>Nombre {e.name}</h1>
                            <h2>Continente {e.continente}</h2>
                            <img src={e.flagimage} alt="" />
                        </li>
                    ))
                }
            </ul>


        </div>
    )
}

export default Home

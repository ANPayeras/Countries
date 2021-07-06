import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../context/UserContext';
import './filtros.css'

function Filtros() {

    const { getSearchedCountry, getAllCountries, allCountries, getActivities, activities } = useContext(UserContext);

    const [paises, setPaises] = useState([]);
    const [page, setPage] = useState({
        actualpage: 0,
        nextPage: 0,
        prevPage: 0,
        totalPages: 0
    })
    const [estado, setEstado] = useState({
        porContinente: [],
        porActividad: []
    })

    useEffect(() => {
        countriesByPage();
        getAllCountries();
        getActivities();
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

    const handlerOptionContinent = (e) => {
        let target = e.target.value;

        let filtro = allCountries.filter(e => e.continente === target)
        setEstado({
            ...estado,
            porContinente: filtro
        })
    }

    const handlerOptionActivity = (e) => {
        let target = e.target.value;
        console.log(target)
        let filtro = activities.filter(e => e.name === target)
        setEstado({
            ...estado,
            porActividad: filtro
        })
        console.log(filtro)
    }
    // Sacando los repetidos
    // Continente
    let continentes = allCountries.map(e => {
        return e.continente
    })
    const continentesFiltrados = new Set(continentes);
    let resultContinentes = [...continentesFiltrados];
    // Actividad
    let actividades = activities.map(e => {
        return e.name
    })
    const actividadesFiltradas = new Set(actividades);
    let resultActividades = [...actividadesFiltradas];

    //---
    return (
        <div className="filtros">
            <h1>Home</h1>


            <h2>Buscar Por Contienente:</h2>

            <select onChange={handlerOptionContinent}>
                <option></option>

                {
                    resultContinentes.map(e => (
                        <option value={e}>{e}</option>
                    ))

                }
            </select>
            <Link>
                <button>Buscar</button>
            </Link>
            <h2>Buscar Por Actividad Turistica:</h2>

            <select onChange={handlerOptionActivity} >
                <option></option>
                {
                    resultActividades.map(e => (
                        <option value={e}>{e}</option>
                    ))

                }
            </select>
            <Link>
                <button>Buscar</button>
            </Link>

            <form action="" onSubmit={handlerSubmit}>
                <input type="text" placeholder='Buscar Pais' onChange={handlerChange} name='input' />
                <Link to='/paisesbuscados'>
                    <button>Buscar</button>
                </Link>
            </form>
        </div>
    )
}

export default Filtros;

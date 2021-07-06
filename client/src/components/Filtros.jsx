import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../context/UserContext';
import './filtros.css'

function Filtros() {

    const { getSearchedCountry, getAllCountries, allCountries, getActivities, activities, getContinents, getActivitiesByCountry } = useContext(UserContext);
    // console.log(activitiesByCountry)

    useEffect(() => {
        getAllCountries();
        getActivities();
    }, [])

    const handlerSubmit = (e) => {
        e.preventDefault();


    }

    const handlerChange = (e) => {
        let target = e.target.value
        console.log(target)
        if (target) {
            // let buscando = allCountries.filter(e => e.name === target)
            // console.log(buscando)
            getSearchedCountry(target)
            /*   if (buscando[0]) {
                  getSearchedCountry(buscando[0].name)
              } else {
                  console.log('No hay pais')
              } */
        } else {
            return null
        }
    }

    const handlerOptionContinent = (e) => {
        let target = e.target.value;
        getContinents(target);
    }

    const handlerOptionActivity = (e) => {
        let target = e.target.value;
        getActivitiesByCountry(target)
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
            <Link to='/filtradoscontinente'>
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
            <Link to='/filtradosactividad'>
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
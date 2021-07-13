import React from 'react';

// Redux
import { useSelector } from 'react-redux';
// Styles
import style from './ActivityFilter.module.css'

function ActivityFilter() {

    const activitiesByCountry = useSelector(state => state.activitiesByCountry)

    let actividades = activitiesByCountry.map(e => {
        return e.name
    })
    const actividadesFiltradas = new Set(actividades);
    let resultActividades = [...actividadesFiltradas];
    console.log(resultActividades)

    let paises = activitiesByCountry.map(e => e.countries)
    // console.log(paises) // array con array de paises

    let nombresdePaises = [];
    paises.map(e => e.map(e => nombresdePaises.push(e.name)))  // unico array con todos los nombres


    const paisesFiltrados = new Set(nombresdePaises);
    let resultPaises = [...paisesFiltrados]; // array sin duplicados

    // console.log(resultPaises)

    return (
        <div className={style.container}>

            <h1>Actividad Turistica: {resultActividades[0] && resultActividades}</h1>
            <h2>{resultActividades[0] ? 'Paises donde se realiza:' : null}</h2>
            {
                resultPaises.map((e, i) => (
                    <div className={style.countries} key={i}>
                        <h4>{e}</h4>
                    </div>
                ))}
        </div>
    )
}

export default ActivityFilter;

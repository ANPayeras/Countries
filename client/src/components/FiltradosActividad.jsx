import React from 'react';


// Components
import NavBar from './navbar';
import Filtros from './Filtros';

// Redux
import { useSelector } from 'react-redux';

function ActivityFilter() {

    const activitiesByCountry = useSelector(state => state.activitiesByCountry)

    let actividades = activitiesByCountry.map(e => {
        return e.name
    })
    const actividadesFiltradas = new Set(actividades);
    let resultActividades = [...actividadesFiltradas];
    // console.log(resultActividades)

    let paises = activitiesByCountry.map(e => e.countries)
    // console.log(paises) // array con array de paises

    let nombresdePaises = [];
    paises.map(e => e.map(e => nombresdePaises.push(e.name)))  // unico array con todos los nombres


    const paisesFiltrados = new Set(nombresdePaises);
    let resultPaises = [...paisesFiltrados]; // array sin duplicados

    // console.log(nombresdePaises)


    return (
        <div>
            <NavBar />
            <Filtros />
            <ul>
                <div>Actividad: {resultActividades}</div>
                <p></p>
                {
                    resultPaises.map((e, i) => (
                        <div>
                            <li key={i}>{e}</li>
                        </div>
                    ))
                }
            </ul>
        </div>
    )
}

export default ActivityFilter;

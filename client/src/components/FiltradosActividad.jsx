import React, { useContext, useEffect } from 'react';
import Filtros from './Filtros';
import UserContext from '../context/UserContext';
import axios from 'axios';

function FiltradosActividad() {

    const { activitiesByCountry } = useContext(UserContext);
    console.log(activitiesByCountry)

    let actividades = activitiesByCountry.map(e => {
        return e.name
    })
    const actividadesFiltradas = new Set(actividades);
    let resultActividades = [...actividadesFiltradas];
    // console.log(resultActividades)

   

    let paises = activitiesByCountry.map(e => e.countries)
    console.log(paises) // array con array de nombres

    let a = paises.join(',')
    console.log(a)


    let algo = [];
    paises && paises.map(e => algo.push(e[0].name))

    const paisesFiltrados = new Set(algo);
    let resultPaises = [...paisesFiltrados];

    console.log(resultPaises)

    return (
        <div>
            <Filtros />
            <ul>
                <li>{resultActividades}</li>
                {
                    resultPaises.map(e => (
                        <li>{e}</li>
                    ))
                }


            </ul>
        </div>
    )
}

export default FiltradosActividad;

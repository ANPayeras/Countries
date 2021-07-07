import React, { useContext } from 'react';
import Filtros from './Filtros';
import UserContext from '../context/UserContext';

function FiltradosActividad() {

    const { activitiesByCountry } = useContext(UserContext);
    // console.log(activitiesByCountry)

    let actividades = activitiesByCountry.map(e => {
        return e.name
    })
    const actividadesFiltradas = new Set(actividades);
    let resultActividades = [...actividadesFiltradas];
    // console.log(resultActividades)

    let paises = activitiesByCountry.map(e => e.countries)
    // console.log(paises) // array con array de paises

    let nombresdePaises = [];
    paises.map(e => nombresdePaises.push(e[0].name)) // unico array con todos los nombres

    const paisesFiltrados = new Set(nombresdePaises);
    let resultPaises = [...paisesFiltrados]; // array sin duplicados

    // console.log(resultPaises)

    return (
        <div>
            <Filtros />
            <ul>
                <div>Actividad: {resultActividades}</div>
                <p></p>
                {
                    resultPaises.map((e, i) => (
                        <li key={i}>{e}</li>
                    ))
                }
            </ul>
        </div>
    )
}

export default FiltradosActividad;

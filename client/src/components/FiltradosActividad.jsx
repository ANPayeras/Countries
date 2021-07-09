import React, { _useContext } from 'react';
import Filtros from './Filtros';
// import UserContext from '../context/UserContext';

// Components
import NavBar from './navbar';

// Redux
import { useSelector } from 'react-redux';

function FiltradosActividad() {

    // const { activitiesByCountry } = useContext(UserContext);
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
    paises.map(e => nombresdePaises.push(e[0].name)) // unico array con todos los nombres

    const paisesFiltrados = new Set(nombresdePaises);
    let resultPaises = [...paisesFiltrados]; // array sin duplicados

    // console.log(resultPaises)

    return (
        <div>
            <NavBar />
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

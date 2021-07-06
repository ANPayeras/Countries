import React, { useContext, useEffect } from 'react';
import Filtros from './Filtros';
import UserContext from '../context/UserContext';
import axios from 'axios';

function FiltradosActividad() {

    const { activitiesByCountry } = useContext(UserContext);

    useEffect(() => {
        paisesid()
    }, [])

    const paisesid = async () => {

        console.log(activitiesByCountry)
        const paises = activitiesByCountry.map(e => e.countries)
        console.log(paises);
        let duplicados = [];
        const a = paises.map(e => e.map(el => duplicados.push(el.id)))
        console.log(a)

        console.log(duplicados)

        const continentesFiltrados = new Set(duplicados);
        let resultContinentes = [...continentesFiltrados];
        console.log(resultContinentes)

        // const result = resultContinentes.map(e => axios.get(`http://localhost:3001/countries/${e}`));
        for (let i = 0; i < resultContinentes.length; i++) {
            var result = await axios.get(`http://localhost:3001/countries/${resultContinentes[i]}`)
            var otro = result.data
            
        }
        console.log(otro)
    }

    return (
        <div>
            <Filtros />
            <ul>


            </ul>
        </div>
    )
}

export default FiltradosActividad;

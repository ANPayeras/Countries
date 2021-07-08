import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../context/UserContext';
import NavBar from './navbar';



function DetallePais({ match }) {

    const { countryById, getCountryById } = useContext(UserContext);

    useEffect(() => {
        getCountryById(match.params.id)
    }, [])

    return (
        <div>
            <NavBar />
            Detalle Pais
            <Link to='/paisesbuscados'>Volver</Link>
            <div key={countryById.id}>
                <h1>{countryById.name}</h1>
                <h1>{countryById.id}</h1>
                <h1>{countryById.continente}</h1>
                <h1>{countryById.capital}</h1>
                <h1>{countryById.subRegion}</h1>
                <h1>Poblacion: {countryById.population}</h1>
                <h1>Area: {countryById.area}</h1>
                <img src={countryById.flagimage} alt="" />
                Actividades:
                {countryById.activities ?
                    countryById.activities.map(e => (
                        <div key={e.id}>
                            <h3>{e.name}</h3>
                            <h3>{e.dificulty}</h3>
                            <h3>{e.duration}</h3>
                            <h3>{e.season}</h3>
                        </div>
                    ))
                    : <h1>El Pais no tiene actividades</h1>
                }
            </div>
        </div>
    )
}

export default DetallePais;

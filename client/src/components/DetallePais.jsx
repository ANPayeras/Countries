import React, { useContext, useEffect } from 'react';
import UserContext from '../context/UserContext';

function DetallePais({ match }) {

    const { countryById, getCountryById } = useContext(UserContext);
    console.log(countryById.activities)
    useEffect(() => {
        getCountryById(match.params.id)
    }, [])
    return (
        <div>
            Detalle Pais


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
                {
                    countryById.activities.map(e => (
                        <div key={e.id}>
                            <h3>{e.name}</h3>
                            <h3>{e.dificulty}</h3>
                            <h3>{e.duration}</h3>
                            <h3>{e.season}</h3>
                        </div>
                    ))
                }
            </div>




        </div>
    )
}

export default DetallePais;

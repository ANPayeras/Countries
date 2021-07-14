import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

// Components
import NavBarDetail from '../NavBarDetail/NavBarDetail';
// Redux
import { useSelector, useDispatch } from 'react-redux';
import { getCountryById } from 'C:/Users/Angel/Desktop/PI/PI-Countries/client/src/Redux/actions/actions.js';
// Styles
import style from './CountryDetail.module.css';


function DetallePais({ match }) {

    const countryById = useSelector(state => state.countryById)
    const dispatch = useDispatch()

    const { id, name, continente, capital, subRegion, population, area, flagimage, activities } = countryById

    useEffect(() => {
        dispatch(getCountryById(match.params.id));
    }, [])

    return (
        <>
            <NavBarDetail />

            <div className={style.container}>
                <div className={style.data}>
                    <h1>Nombre: </h1>
                    <h1>ID: </h1>
                    <h1>Continente: </h1>
                    <h1>Capital: </h1>
                    <h1>SubRegion: </h1>
                    <h1>Poblacion: </h1>
                    <h1>Area: </h1>
                </div>
                <div className={style.data}>
                    <h1>{name}</h1>
                    <h1>{id}</h1>
                    <h1>{continente}</h1>
                    <h1>{capital}</h1>
                    <h1>{subRegion}</h1>
                    <h1>{population} Millones</h1>
                    <h1>{area} Km2</h1>
                </div>
                <div className={style.flagContainer}>
                    <img src={flagimage} className={style.flag} />
                </div>
            </div>

            <div>
                <h1 className={style.title}>Actividades Turisticas:</h1>
                <div className={activities && activities[0] ? style.activitiesContainer : null}>
                    {activities && activities[0] ?
                        activities.map(e => (
                            <div key={e.id}>
                                <h3>Nombre: {e.name}</h3>
                                <h3>Dificultad: {e.dificulty}</h3>
                                <h3>Duracion: {e.duration}</h3>
                                <h3>Temporada: {e.season}</h3>
                            </div>
                        ))
                        : <h1 className={style.msg}>El Pais no tiene actividades</h1>
                    }
                </div>
            </div>
        </>
    )
}

export default DetallePais;

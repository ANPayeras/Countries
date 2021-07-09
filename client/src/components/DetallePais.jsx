import React, { _useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
// import UserContext from '../context/UserContext';
import NavBar from './navbar';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { getCountryById } from '../Redux/actions/actions';


function DetallePais({ match }) {

    // const { countryById, getCountryById } = useContext(UserContext);

    const countryById = useSelector(state => state.countryById)
    const dispatch = useDispatch()

    const { id, name, continente, capital, subRegion, population, area, flagimage, activities } = countryById

    useEffect(() => {
        dispatch(getCountryById(match.params.id));
    }, [])

    return (
        <div>
            <NavBar />
            Detalle Pais
            <Link to='/paisesbuscados'>Volver</Link>
            <div key={id}>
                <h1>{name}</h1>
                <h1>{id}</h1>
                <h1>{continente}</h1>
                <h1>{capital}</h1>
                <h1>{subRegion}</h1>
                <h1>Poblacion: {population}</h1>
                <h1>Area: {area}</h1>
                <img src={flagimage} alt="" />
                Actividades:
                {activities ?
                    activities.map(e => (
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

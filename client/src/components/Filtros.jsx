import React, { useEffect, useState, _useContext } from 'react';
import { Link } from 'react-router-dom';
// import UserContext from '../context/UserContext';
import './filtros.css'

// Redux
import { useSelector, useDispatch } from 'react-redux';
// Actions
import { getAllCountries, getActivities, getSearchedCountry, getContinents, getActivitiesByCountry, order } from '../Redux/actions/actions';

function Filtros({ showAll, showCountrySearched }) {

    // const { getSearchedCountry, searchedCountry, getAllCountries, allCountries, getActivities, activities, getContinents, getActivitiesByCountry, order } = useContext(UserContext);
    // console.log(activitiesByCountry)
    const searchedCountry = useSelector(state => state.searchedCountry)
    const allCountries = useSelector(state => state.allCountries)
    const activities = useSelector(state => state.activities)
    const dispatch = useDispatch()
    console.log(searchedCountry)

    useEffect(() => {
        dispatch(getAllCountries());
        dispatch(getActivities());

    }, [dispatch])

    const handlerSubmit = (e) => {
        e.preventDefault();
    }

    const handlerChange = (e) => {
        let target = e.target.value
        let arr = [];
        arr.push(target)
        showCountrySearched(arr)
        dispatch(getSearchedCountry(target))
    }

    const handlerOptionContinent = (e) => {
        let target = e.target.value;
        dispatch(getContinents(target, allCountries));
    }

    const handlerOptionActivity = (e) => {
        let target = e.target.value;
        dispatch(getActivitiesByCountry(target, activities));
    }
    // Sacando los repetidos
    // Continente
    let continentes = allCountries.map(e => {
        return e.continente
    })
    const continentesFiltrados = new Set(continentes);
    let resultContinentes = [...continentesFiltrados];
    // Actividad
    let actividades = activities.map(e => {
        return e.name
    })
    const actividadesFiltradas = new Set(actividades);
    let resultActividades = [...actividadesFiltradas];

    // Orfer Filters
    const [orderFilter, setOrderFilter] = useState({
        select: true
    })
    // console.log(orderFilter)
    const orderHandler = (e) => {
        setOrderFilter({
            ...orderFilter,
            [e.target.name]: e.target.value
        })
        /*   const { option1, option2 } = orderFilter
          if (option1 && option2) {
              dispatch(order(option1, option2, allCountries))
          } */
    }
    const orderNow = (e) => {
        e.preventDefault();
        const { option1, option2 } = orderFilter
        if (option1 && option2) {
            dispatch(order(option1, option2, allCountries))
        }
    }

    const activateOrder = () => {
        setOrderFilter({
            select: !orderFilter.select
        })
    }
    //---
    return (

        <div className="filtros">

            <h2>Ordenar por:</h2>
            <button onClick={activateOrder}>Buscar</button>
            <form onChange={orderHandler} onClick={orderNow} hidden={orderFilter.select ? true : false}>
                <select name='option1' >
                    <option>Seleccionar</option>
                    <option value="Nombre">Nombre</option>
                    <option value="Poblacion">Poblacion</option>
                </select>
                <select hidden={orderFilter.option1 ? false : true} name='option2' >
                    <option>Seleccionar</option>
                    <option value="Ascendente">Ascendente</option>
                    <option value="Descendente">Descendente</option>
                </select>
                <Link to='/OrderFilter'>
                    <button type='button'>Buscar</button>
                </Link>
            </form>
            <form>
                <h2 onClick={showAll}>Buscar Por Contienente:</h2>

                <select onChange={handlerOptionContinent}>
                    {
                        resultContinentes.map(e => (
                            <option value={e}>{e}</option>
                        ))

                    }
                </select>
                <Link to='/filtradoscontinente'>
                    <button>Buscar</button>
                </Link>
            </form>
            <div>
                <h2>Buscar Por Actividad Turistica:</h2>

                <select onChange={handlerOptionActivity} >
                    {
                        resultActividades[0] ? resultActividades.map(e => (
                            <option value={e}>{e}</option>
                        )) : <option> No Hay Actividades </option>

                    }
                </select>
                <Link to='/filtradosactividad'>
                    <button>Buscar</button>
                </Link>
            </div>

            <form onSubmit={handlerSubmit}>
                <input type="text" placeholder='Buscar Pais' onChange={handlerChange}/>
                <Link to='/paisesbuscados'>
                    <button disabled={!searchedCountry[0] ? true : false}>Buscar</button>
                </Link>
            </form>
        </div >
    )
}

export default Filtros;

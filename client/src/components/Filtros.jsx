import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './filtros.css'

// Redux
import { useSelector, useDispatch } from 'react-redux';
// Actions
import { getAllCountries, getActivities, getContinents, getActivitiesByCountry, order } from '../Redux/actions/actions';

function Filtros({ showAll, setShowOrder, setShowContinent }) {

    const allCountries = useSelector(state => state.allCountries)
    const activities = useSelector(state => state.activities)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllCountries());
        dispatch(getActivities());
    }, [])

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

    console.log(resultContinentes)
    // Actividad
    let actividades = activities.map(e => {
        return e.name
    })
    const actividadesFiltradas = new Set(actividades);
    let resultActividades = [...actividadesFiltradas];

    // Orfer Filters
    const [orderFilter, setOrderFilter] = useState({
        name: false,
        population: true,
        option1: '',
        option2: ''
    })
    const { option1, option2 } = orderFilter

    useEffect(() => {
        const dispatchOrder = () => {
            console.log(option1, option2)
            if (option1 && option2) {
                dispatch(order(option1, option2, allCountries))
            }
        }
        dispatchOrder()
    }, [orderFilter])

    const orderHandler = (e) => {
        setOrderFilter({
            ...orderFilter,
            [e.target.name]: e.target.value
        })
    }

    const orderNow = (e) => {
        e.preventDefault();
        const { option1, option2 } = orderFilter
        console.log(option1, option2)
        if (option1 && option2) {
            dispatch(order(option1, option2, allCountries))
        }
    }

    /* const activateOrder = (e) => {
        let target = e.target.name
        const { option1, option2 } = orderFilter

        console.log(option1, option2)
        if (target === 'Nombre') {
            setOrderFilter({
                ...orderFilter,
                name: !orderFilter.name,
                option1: e.target.value
            })
        } else if (target === 'Poblacion') {
            setOrderFilter({
                ...orderFilter,
                population: !orderFilter.population,
                option1: e.target.value
            })
        } else if (e.target.name === 'Ascendente' || e.target.name === 'Descendente') {
            setOrderFilter({
                ...orderFilter,
                option2: e.target.value
            })
        }
    } */

    const showOptions = () => {
        setOrderFilter({
            ...orderFilter,
            name: !orderFilter.name
        })
    }

    const [showOpCont, setshowOpCont] = useState(true)
    const showOpCont2 = () => {
        setshowOpCont(!showOpCont)
    }

    const changeView = () => {
        setShowOrder(true)
        setShowContinent(false)
    }
    //---
    return (

        <div className="filtros">

            <Link to='/home'>
                <button onClick={showAll}>Mostrar Todos</button>
            </Link>

            {/* <Link to='/OrderFilter'>
                <button name='Nombre' value='Nombre' onClick={activateOrder}>Por Nombre</button>
            </Link>
            <div hidden={orderFilter.name ? true : false} >

                <Link to='/OrderFilter'>
                    <button name='Descendente' value="Descendente" onClick={activateOrder}>Descendente</button>
                    <button name='Ascendente' value="Ascendente" onClick={activateOrder}>Ascendente</button>
                </Link>
            </div>

            <Link to='/OrderFilter'>
                <button name='Poblacion' value='Poblacion' onClick={activateOrder}>Por Poblacion</button>
            </Link>
            <div hidden={orderFilter.population ? true : false} onClick={activateOrder}>

                <button name='Descendente' value="Descendente" onClick={activateOrder}>Descendente</button>
                <button name='Ascendente' value="Ascendente" onClick={activateOrder}>Ascendente</button>

            </div> */}

            {/* <Link to='/OrderFilter'>
                <button onClick={activateOrder}>Buscar</button>
            </Link> */}

            <button type='button' onClick={showOptions}>Bucar Por Nombre y Poblacion</button>


            <form onChange={orderHandler} onClick={orderNow} hidden={orderFilter.name ? false : true}>
                <select name='option1' >
                    <option>Seleccionar</option>
                    <option value="Nombre">Nombre</option>
                    <option value="Poblacion">Poblacion</option>
                </select>
                <select hidden={orderFilter.name ? false : true} name='option2' >
                    <option>Seleccionar</option>
                    <option value="Ascendente">Ascendente</option>
                    <option value="Descendente">Descendente</option>
                </select>
                <Link to='/Home'>
                    <button type='button' onClick={changeView}>Buscar</button>
                </Link>
            </form>

            <button onClick={showOpCont2}>Buscar Por Contienente:</button>
            <form>
                <select onChange={handlerOptionContinent} hidden={showOpCont ? true : false} onFocus={() => setShowContinent(true)}>
                    {
                        resultContinentes.map(e => (
                            <option value={e} >{e}</option>
                        ))

                    }
                </select>
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
                    <button disabled={!resultActividades[0] ? true : false}>Buscar</button>
                </Link>
            </div>

        </div >
    )
}

export default Filtros;

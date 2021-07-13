import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// Styles
import style from './Filters.module.css'

// Redux
import { useSelector, useDispatch } from 'react-redux';
// Actions
import { getAllCountries, getActivities, getContinents, getActivitiesByCountry, order } from 'C:/Users/Angel/Desktop/PI/PI-Countries/client/src/Redux/actions/actions.js';

function Filtros({ showAll, setShowOrder, showOrder, setShowContinent, watcherFunction, setShowActivityFilter }) {

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
        watcherFunction(target)
        setShowActivityFilter(false)
    }

    const handlerOptionActivity = (e) => {
        let target = e.target.value;
        dispatch(getActivitiesByCountry(target, activities));
        setShowActivityFilter(true)
    }
    // Sacando los repetidos
    // Continente
    let continentes = allCountries.map(e => {
        return e.continente
    })
    const continentesFiltrados = new Set(continentes);
    let resultContinentes = [...continentesFiltrados];

    // console.log(resultContinentes)
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
            // console.log(option1, option2)
            if (option1 && option2) {
                dispatch(order(option1, option2, allCountries))
                setShowOrder(true)
                setShowContinent(false)
            }
        }
        dispatchOrder()
    }, [orderFilter])

    const orderHandler = (e) => {
        let target = e.target.value
        console.log(target)
        setOrderFilter({
            ...orderFilter,
            [e.target.name]: target
        })
        watcherFunction(target)
        setShowActivityFilter(false)
        
    }

    const orderNow = (e) => {
        e.preventDefault();
        // const { option1, option2 } = orderFilter
        // console.log(option1, option2)
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

    const [showActivityMenu, setShowActivityMenu] = useState(false)
    const showSelect = () => {
        setShowActivityMenu(!showActivityMenu)
    }

    //---
    return (

        <div className={style.container}>

            <div className={style.showAll}>
                <Link to='/home'><button className={style.showAllButton} onClick={showAll}>Mostrar Todos Los Paises</button></Link>
            </div>

            <div>
                <button className={style.filterButtons} type='button' onClick={showOptions}>Bucar Por Nombre y Poblacion</button>

                <form onChange={orderHandler} onClick={orderNow} hidden={orderFilter.name ? false : true}>
                    <select className={style.select} name='option1' >
                        <option className={style.options}>Seleccionar</option>
                        <option className={style.options} value="Nombre">Nombre</option>
                        <option className={style.options} value="Poblacion">Poblacion</option>
                    </select>
                    <select className={style.select} hidden={orderFilter.name ? false : true} name='option2' >
                        <option className={style.options}>Seleccionar</option>
                        <option className={style.options} value="Ascendente">Ascendente</option>
                        <option className={style.options} value="Descendente">Descendente</option>
                    </select>
                </form>
            </div>

            <div>
                <button className={style.filterButtons} onClick={showOpCont2}>Buscar Por Contienente</button>
                <form >
                    <select className={style.selectWidth} onChange={handlerOptionContinent} hidden={showOpCont ? true : false} onFocus={() => setShowContinent(true)}>
                        {
                            resultContinentes.map(e => (
                                <option className={style.options} value={e} >{e}</option>
                            ))

                        }
                    </select>
                </form>
            </div>

            <div>
                <button className={style.filterButtons} onClick={showSelect}>Buscar Por Actividad Turistica</button>
                <div hidden={showActivityMenu ? false : true}>
                    <select className={style.selectWidth} onChange={handlerOptionActivity} >
                        <option></option>
                        {
                            resultActividades[0] ? resultActividades.map(e => (

                                <option className={style.options} value={e}>{e}</option>
                            )) : <option> No Hay Actividades </option>

                        }
                    </select>
                   {/*  <Link to='/filtradosactividad'>
                        <button disabled={!resultActividades[0] ? true : false}>Buscar</button>
                    </Link> */}
                </div>
            </div>
        </div >
    )
}

export default Filtros;

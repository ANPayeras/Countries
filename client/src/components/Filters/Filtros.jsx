import React, { useEffect, useState } from 'react';

// Styles
import style from './Filters.module.css'

// Redux
import { useSelector, useDispatch } from 'react-redux';
// Actions
import { getAllCountries, getActivities, getContinents, getActivitiesByCountry, order } from 'C:/Users/Angel/Desktop/PI/PI-Countries/client/src/Redux/actions/actions.js';

function Filtros({ showAll, setShowOrder, setShowCountry, setShowContinent, setShowActivityFilter, watcherFunction, showOrder, showByContinent, showActivityFilter }) {

    const allCountries = useSelector(state => state.allCountries)
    const activities = useSelector(state => state.activities)
    const countriesByContinent = useSelector(state => state.countriesByContinent)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllCountries());
        dispatch(getActivities());
    }, [])

    const [reset, setReset] = useState({
        continent: 'Empty',
        activity: ''
    })
    console.log(reset)


    const handlerOptionContinent = (e) => {
        let target = e.target.value;
        // console.log(target)
        if (target !== 'Empty') {
            setReset({
                ...reset,
                continent: e.target.value
            })
            dispatch(getContinents(target, allCountries));
            watcherFunction(target)
            setShowContinent(true)
            setShowActivityFilter(false)
            setShowCountry(false)
            setShowOrder(false)


        }
    }



    const handlerOptionActivity = (e) => {
        let target = e.target.value;
        // console.log(target)
        if (target === 'Empty' || target === 'No Activity') {
            return null
        } else {
            setReset({
                ...reset,
                activity: e.target.value
            })
            dispatch(getActivitiesByCountry(target, activities));
            setShowActivityFilter(true)
            setShowOrder(false)
            setShowContinent(false)


        }
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
        name: false,
        option1: '',
        option2: ''
    })
    const { option1, option2 } = orderFilter

    useEffect(() => {
        const dispatchOrder = () => {
            // console.log(option1, option2)
            if (option1 && option2) {
                if (!showOrder && !showByContinent) {
                    dispatch(order(option1, option2, allCountries))
                    setShowOrder(true)
                    setShowContinent(false)
                    setShowCountry(false)
                    setShowActivityFilter(false)
                } else {
                    dispatch(order(option1, option2, countriesByContinent))
                    setShowOrder(true)
                    setShowContinent(false)
                    setShowCountry(false)
                    setShowActivityFilter(false)
                }
            }
        }
        dispatchOrder()
    }, [orderFilter])

    useEffect(() => {
        const onOff = () => {

            if (!showOrder && !showByContinent) {
                setOrderFilter({
                    ...orderFilter,
                    option1: '',
                    option2: ''
                })
                setReset({
                    ...reset,
                    continent: 'Empty'
                })
            }
            if (!showActivityFilter) {
                setReset({
                    ...reset,
                    activity: 'Empty'
                })
            }
        }
        onOff()
        console.log(showOrder, showByContinent, showActivityFilter)
    }, [showOrder, showByContinent, showActivityFilter])
    console.log(showOrder, showByContinent, showActivityFilter)

    const orderHandler = (e) => {
        let target = e.target.value
        // console.log(target)
        setOrderFilter({
            ...orderFilter,
            [e.target.name]: target
        })
        watcherFunction(target)
    }

    const [showSelectOp, setShowSelectOp] = useState({
        continenyOP: false,
        activityOp: false
    })

    const showSelect = (e) => {
        let target = e.target.name
        if (target === 'Name Population') {
            setOrderFilter({
                ...orderFilter,
                name: !orderFilter.name
            })
        }
        if (target === 'Continent Select') {
            setShowSelectOp({
                ...showSelectOp,
                continenyOP: !showSelectOp.continenyOP
            })
        }
        if (target === 'Activity Select') {
            setShowSelectOp({
                ...showSelectOp,
                activityOp: !showSelectOp.activityOp
            })
        }
    }

    //---
    return (

        <div className={style.container}>

            <div className={style.showAll}>
                <button className={style.showAllButton} onClick={showAll}>Mostrar Todos Los Paises</button>
            </div>

            <div>
                <button className={style.filterButtons} type='button' name='Name Population' onClick={showSelect}>Bucar Por Nombre y Poblacion</button>

                <div onChange={orderHandler} hidden={orderFilter.name ? false : true}>
                    <select className={style.select} name='option1' value={orderFilter.option1}>
                        <option className={style.options}>Seleccionar</option>
                        <option className={style.options} value="Nombre">Nombre</option>
                        <option className={style.options} value="Poblacion">Poblacion</option>
                    </select>
                    <select className={style.select} name='option2' value={orderFilter.option2}>
                        <option className={style.options}>Seleccionar</option>
                        <option className={style.options} value="Ascendente">Ascendente</option>
                        <option className={style.options} value="Descendente">Descendente</option>
                    </select>
                </div>
            </div>

            <div>
                <button className={style.filterButtons} onClick={showSelect} name='Continent Select'>Buscar Por Contienente</button>
                <div >
                    <select className={style.selectWidth} onChange={handlerOptionContinent} hidden={showSelectOp.continenyOP ? false : true} value={reset.continent}>
                        <option value='Empty'>Seleccionar</option>
                        {
                            resultContinentes.map((e, i) => (
                                <option key={i} className={style.options} value={e}>{e}</option>
                            ))

                        }
                    </select>
                </div>
            </div>

            <div>
                <button className={style.filterButtons} onClick={showSelect} name='Activity Select'>Buscar Por Actividad Turistica</button>
                <div hidden={showSelectOp.activityOp ? false : true}>
                    <select className={style.selectWidth} onChange={handlerOptionActivity} value={reset.activity}>
                        <option value='Empty'>Seleccionar</option>
                        {
                            resultActividades[0] ? resultActividades.map(e => (

                                <option className={style.options} value={e}>{e}</option>
                            )) : <option value='No Activity'> No Hay Actividades </option>

                        }
                    </select>
                </div>
            </div>
        </div >
    )
}

export default Filtros;

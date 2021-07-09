import React, { useReducer } from 'react';
import UserReducer from './UserReducer';
import UserContext from './UserContext';
import axios from 'axios';

const UserState = (props) => {

    const initialState = {
        allCountries: [],
        searchedCountry: [],
        activities: [],
        countriesByContinent: [],
        activitiesByCountry: [],
        countryById: {},
        nameOrder: [],
        populationOrder: []

    }

    const [state, dispatch] = useReducer(UserReducer, initialState);

    const getAllCountries = async () => {
        const res = await axios.get('http://localhost:3001/countries')
        dispatch({
            type: 'GET_ALLCOUNTRIES',
            payload: res.data
        })
    }

    const getSearchedCountry = async (country) => {
        try {
            if (country) {
                const res = await axios.get(`http://localhost:3001/countries?name=${country}`)
                dispatch({
                    type: 'GET_COUNTRYBYNAME',
                    payload: res.data
                })
            } else {
                console.log('No hay Pais')
            }
        } catch (error) {
            console.log(error)
        }
    }

    const getActivities = async () => {
        const res = await axios.get('http://localhost:3001/activity')
        dispatch({
            type: 'GET_ACTIVITIES',
            payload: res.data.respuesta
        })
    }

    const getContinents = (target) => {
        let filtro = state.allCountries.filter(e => e.continente === target)
        dispatch({
            type: 'GET_CONTINENTES',
            payload: filtro
        })
    }

    const getActivitiesByCountry = (target) => {
        let filtro = state.activities.filter(e => e.name === target)
        dispatch({
            type: 'GET_ACTBYCOUN',
            payload: filtro
        })
    }

    const getCountryById = async (id) => {
        const res = await axios.get(`http://localhost:3001/countries/${id}`)
        dispatch({
            type: 'GET_COUNTRYBYID',
            payload: res.data.respuesta
        })
    }

    const order = (option, direcction) => {
        let allCountries2 = state.allCountries;
        console.log(option, direcction)
        if (option === 'Nombre' && direcction === 'Ascendente') {
            const orderAsc = allCountries2.sort((a, b) => (a.name > b.name ? 1 : a.name < b.name ? -1 : 0))
            dispatch({
                type: 'NAME_ORDER',
                payload: orderAsc
            })
        } else if (option === 'Nombre' && direcction === 'Descendente') {
            const orderDesc = allCountries2.sort((a, b) => (a.name > b.name ? -1 : a.name < b.name ? 1 : 0))
            dispatch({
                type: 'NAME_ORDER',
                payload: orderDesc
            })
        } else if (option === 'Poblacion' && direcction === 'Ascendente') {
            const populationAsc = allCountries2.sort((a, b) => (a.population > b.population ? 1 : a.population < b.population ? -1 : 0))
            console.log(populationAsc)
            dispatch({
                type: 'POPULATION_ORDER',
                payload: populationAsc
            })
        } else if (option === 'Poblacion' && direcction === 'Descendente') {
            const populationDesc = allCountries2.sort((a, b) => (a.population > b.population ? -1 : a.population < b.population ? 1 : 0))
            console.log(populationDesc)
            dispatch({
                type: 'POPULATION_ORDER',
                payload: populationDesc
            })
        } else {
            console.log('Seleccione bien')
        }
    }

    const { allCountries, searchedCountry, activities, countriesByContinent, activitiesByCountry, countryById, populationOrder, nameOrder } = state;
    return (

        <UserContext.Provider value={{
            allCountries,
            searchedCountry,
            activities,
            countriesByContinent,
            activitiesByCountry,
            countryById,
            nameOrder,
            populationOrder,
            getAllCountries,
            getSearchedCountry,
            getActivities,
            getContinents,
            getActivitiesByCountry,
            getCountryById,
            order

        }}>

            {props.children}

        </UserContext.Provider>
    )
}

export default UserState;
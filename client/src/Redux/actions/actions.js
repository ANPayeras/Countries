import axios from 'axios';

export function getAllCountries() {
    return function (dispatch) {
        return axios.get('http://localhost:3001/countries')
            .then(res => dispatch({
                type: 'GET_ALLCOUNTRIES', payload: res.data
            }))
    }
}

export const getSearchedCountry = (country) => {
    return async function (dispatch) {
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
}


export const getActivities = () => {
    return async function (dispatch) {
        const res = await axios.get('http://localhost:3001/activity')
        dispatch({
            type: 'GET_ACTIVITIES',
            payload: res.data.respuesta
        })
    }
}

export const getCountryById = (id) => {
    return async function (dispatch) {
        const res = await axios.get(`http://localhost:3001/countries/${id}`)
        dispatch({
            type: 'GET_COUNTRYBYID',
            payload: res.data.respuesta
        })
    }
}

export const getContinents = (target, allCoun) => {
    return function (dispatch) {
        let filtro = allCoun.filter(e => e.continente === target)
        dispatch({
            type: 'GET_CONTINENTES',
            payload: filtro
        })
    }
}

export const getActivitiesByCountry = (target, allCoun) => {
    return function (dispatch) {
        let filtro = allCoun.filter(e => e.name === target)
        dispatch({
            type: 'GET_ACTBYCOUN',
            payload: filtro
        })
    }
}

export const order = (option, direcction, allCoun) => {
    return function (dispatch) {
        let allCountries2 = allCoun;
        console.log(option, direcction)
        if (option === 'Nombre' && direcction === 'Ascendente') {
            const orderAsc = allCountries2.sort((a, b) => (a.name > b.name ? 1 : a.name < b.name ? -1 : 0))
            console.log(orderAsc)
            dispatch({
                type: 'ORDER',
                payload: orderAsc
            })
        } else if (option === 'Nombre' && direcction === 'Descendente') {
            const orderDesc = allCountries2.sort((a, b) => (a.name > b.name ? -1 : a.name < b.name ? 1 : 0))
            dispatch({
                type: 'ORDER',
                payload: orderDesc
            })
        } else if (option === 'Poblacion' && direcction === 'Ascendente') {
            const populationAsc = allCountries2.sort((a, b) => (a.population > b.population ? 1 : a.population < b.population ? -1 : 0))
            console.log(populationAsc)
            dispatch({
                type: 'ORDER',
                payload: populationAsc
            })
        } else if (option === 'Poblacion' && direcction === 'Descendente') {
            const populationDesc = allCountries2.sort((a, b) => (a.population > b.population ? -1 : a.population < b.population ? 1 : 0))
            console.log(populationDesc)
            dispatch({
                type: 'ORDER',
                payload: populationDesc
            })
        } else {
            console.log('Seleccione bien')
        }
    }
}
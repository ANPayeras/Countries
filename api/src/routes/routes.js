
const axios = require('axios');
const { Country } = require('../db');

const countries = async (_req, res) => {
    const response = await axios.get('https://restcountries.eu/rest/v2/all')

    const name = response.data.map(pais => {
        return pais.name
    })

    const id = response.data.map(pais => {
        return pais.alpha3Code
    })

    const flag = response.data.map(pais => {
        return pais.flag
    })
    const region = response.data.map(pais => {
        return pais.region
    })
    const capital = response.data.map(pais => {
        return pais.capital
    })
    const subregion = response.data.map(pais => {
        return pais.subregion
    })
    const area = response.data.map(pais => {
        return pais.area
    })
    const population = response.data.map(pais => {
        return pais.population
    })



    Country.create({
        id: id,
        name: name,
        flagimage: flag,
        continente: region,
        capital: capital,
        subregion: subregion,
        area: area,
        population: population
    })
    // console.log(response)
    /* const resultado = response.json();
    console.log('Hola mundo')
    res.json(resultado) */
    res.send(id)
}

const countriesById = (req, res) => {
    const { id } = req.params;
    console.log('Hola mundo')
    res.send('Hola mundo' + id)
}

const countriesByName = (req, res) => {
    console.log('Hola mundo')
    res.send('Hola mundo' + req.query.name)
}

const createActivity = (req, res) => {
    const { activity, hour } = req.body
    console.log('Hola mundo')
    res.json({ msg: 'actividad agregada' })
}


module.exports = {
    countries,
    countriesById,
    countriesByName,
    createActivity
}
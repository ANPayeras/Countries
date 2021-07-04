
const axios = require('axios');
const { Country, Activity } = require('../db');

const allCountries = async (_req, _res, next) => {
    try {
        const response = await axios.get('https://restcountries.eu/rest/v2/all')
        const paises = response.data;

        for (let i = 0; i < paises.length; i++) {

            Country.create({
                id: paises[i].alpha3Code,
                name: paises[i].name,
                flagimage: paises[i].flag,
                continente: paises[i].region,
                capital: paises[i].capital,
                subRegion: paises[i].subregion,
                area: paises[i].area,
                population: paises[i].population
            })
        }
    } catch (error) {
        next(error);
    }
}

const countries = async (req, res, next) => {
    allCountries();
    if (req.query.name) {
        try {
            const country = await Country.findAll({ where: { name: req.query.name }, attributes: { exclude: ['createdAt', 'updatedAt'] } })
            if (country[0]) {
                res.json(country);
            } else {
                res.json('El pais no existe')
            }
        } catch (error) {
            next(error)
        }
    } else {
        Country.findAll({ limit: 10 })
            .then(r => res.json(r))
            .catch(error => next(error))
    }
}

/* const countries = async (_req, res, next) => {
    allCountries();
    try {

        const countries = await Country.findAll({ limit: 10 });
        res.json(countries)

    } catch (error) {
        next(error);
    }
} */

const countriesById = (req, res, next) => {
    allCountries();
    const { idPais } = req.params;
    Country.findOne({
        where: { id: idPais },
        attributes: ['id', 'name', 'flagimage', 'continente', 'capital', 'subRegion', 'area', 'population'],
        include: [Activity]
    })
        .then(respuesta => { res.json({ respuesta }) })
        .catch(error => next(error))
}

const createActivity = (req, res) => {
    allCountries();
    const { activity, hour } = req.body
    console.log('Hola mundo')
    res.json({ msg: 'actividad agregada' })
}

module.exports = {
    allCountries,
    countries,
    countriesById,
    createActivity
}
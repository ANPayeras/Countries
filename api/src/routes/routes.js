
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
    if (req.query.name) {
        try {
            const country = await Country.findAll({ where: { name: req.query.name } })
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
    const { idPais } = req.params;
    Country.findOne({
        where: { id: idPais },
        attributes: ['id', 'name', 'flagimage', 'continente', 'capital', 'subRegion', 'area', 'population'],
        include: [Activity]
    })
        .then(respuesta => { res.json({ respuesta }) })
        .catch(error => next(error))
}

const createActivity = async (req, res, next) => {
    const { name, dificulty, duration, season, countryId } = req.body
    try {
        const activity = await Activity.create({ name, dificulty, duration, season })
        let idPaises;
        if (Array.isArray(countryId)) {
            idPaises = await Promise.all(countryId.map(value => Country.findByPk(value)))
        } else {
            idPaises = await Promise.all([Country.findByPk(countryId)])
        }

        await activity.setCountries(idPaises); // seteamos la relacion de la actividad recien creada con los paises pasados por body

        res.json({ msg: 'Actividad Agregada' })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    allCountries,
    countries,
    countriesById,
    createActivity
}
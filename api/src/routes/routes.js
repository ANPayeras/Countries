const axios = require('axios');
const { Op } = require("sequelize");
const { Country, Activity } = require('../db');

const { paginate } = require('./pagination');

const allCountries = async (_req, _res, next) => {
    try {
        const response = await axios.get('https://restcountries.eu/rest/v2/all')
        const paises = response.data;

        paises.map(e => {
            Country.create({
                id: e.alpha3Code,
                name: e.name,
                flagimage: e.flag,
                continente: e.region,
                capital: e.capital,
                subRegion: e.subregion,
                area: e.area,
                population: e.population
            })
        })

    } catch (error) {
        next(error);
    }
}



const countries = async (req, res, next) => {
    const { name, page } = req.query

    if (name && !page) {
        try {
            const country = await Country.findAll({
                where: {
                    name: {
                        [Op.iLike]: `%${name}%`
                    }
                }
            })
            if (country[0]) {
                res.json(country);
            } else {
                res.json([{ msg: 'El Pais no Existe' }])
            }
        } catch (error) {
            next(error)
        }
    } else if (page) {
        /* Country.findAndCountAll({ limit: 10, offset: page })
            .then(r => res.json(r))
            .catch(error => next(error)) */
        paginate(page, 10)
            .then(r => res.json(r))
            .catch(error => next(error))
    } else {
        Country.findAll()
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

const getActivities = (_req, res, next) => {
    Activity.findAll({
        attributes: ['id', 'name', 'dificulty', 'duration', 'season'],
        include: [Country]
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
    createActivity,
    getActivities
}
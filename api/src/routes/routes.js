
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

const createActivity = async (req, res) => {
    const { name, dificulty, duration, season, countryId } = req.body
    // const { id, name, flagimage, continente, capital, subRegion, area, population } = req.body
    const activity = await Activity.create({ name, dificulty, duration, season })
    // await Activity.findOrCreate({ where: { name, dificulty, duration, season } }),

    /* let [activity] = await Promise.all([
        Activity.Create({ where: { name, dificulty, duration, season } })
    ])  */

    // console.log(activity)

    let idResult;
    idResult = await Promise.all(countryId.map(value => Country.findByPk(value)))
    console.log(idResult)
    const a = await activity.setCountries(idResult); 
    console.log(a)
    res.json({ msg: 'Actividad Agregada' })
}

module.exports = {
    allCountries,
    countries,
    countriesById,
    createActivity
}
// const axios = require('axios');
const { conn, Country } = require('../db');
/* let paises = async () => {

    const response = await axios.get('https://restcountries.eu/rest/v2/all')
    console.log(response.data[0].name)

}

paises(); */



conn.sync()
    .then(function () {

        Country.create({
            nombre: "Autos",

        });

    })



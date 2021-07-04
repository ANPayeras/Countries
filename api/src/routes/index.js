const { Router } = require('express');
const { countries, countriesById, createActivity, allCountries } = require('./routes')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');



const router = Router(); 

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/countries', countries)
router.get('/countries/:idPais', countriesById)
router.post('/activity', createActivity)

module.exports = router;

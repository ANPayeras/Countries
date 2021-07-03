const { Router } = require('express');
const { countries, countriesById, countriesByName, createActivity } = require('./routes')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');



const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/countries', countries)
router.get('/countries', countriesByName)
router.get('/countries/:id', countriesById)
router.post('/activity', createActivity)




module.exports = router;

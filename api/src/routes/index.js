const { Router } = require('express');
const { countries, countriesById, createActivity, allCountries, getActivities } = require('./routes')

const router = Router();

router.get('/countries', countries)
router.get('/countries/:idPais', countriesById)
router.get('/activity', getActivities)
router.post('/activity', createActivity)

allCountries();
module.exports = router;

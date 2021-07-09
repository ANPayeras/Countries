export default (state, action) => {

    const { payload, type } = action

    switch (type) {
        case 'GET_ALLCOUNTRIES':
            return {
                ...state,
                allCountries: payload,
            };
        case 'GET_COUNTRYBYNAME':
            return {
                ...state,
                searchedCountry: payload,
            };
        case 'GET_ACTIVITIES':
            return {
                ...state,
                activities: payload,
            };
        case 'GET_CONTINENTES':
            return {
                ...state,
                countriesByContinent: payload,
            };
        case 'GET_ACTBYCOUN':
            return {
                ...state,
                activitiesByCountry: payload,
            };
        case 'GET_COUNTRYBYID':
            return {
                ...state,
                countryById: payload,
            };
        case 'NAME_ORDER':
            return {
                ...state,
                nameOrder: payload,
            };
        case 'POPULATION_ORDER':
            return {
                ...state,
                populationOrder: payload,
            }
        default:
            return state;
    }
}
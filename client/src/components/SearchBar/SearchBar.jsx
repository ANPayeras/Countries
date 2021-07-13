import React from 'react';

import { useDispatch } from 'react-redux';
import { getSearchedCountry } from 'C:/Users/Angel/Desktop/PI/PI-Countries/client/src/Redux/actions/actions.js';

function SearchBar({ setShowCountry, showCountry, setShowOrder, setShowContinent, searchWatcher }) {
    const dispatch = useDispatch()

    const handlerChange = (e) => {
        let target = e.target.value
        let arr = [];
        arr.push(target)
        showCountrySearched(arr)
        dispatch(getSearchedCountry(target))
        searchWatcher(target)
        setShowOrder(false)
        setShowContinent(false)
    }

    const showCountrySearched = (l) => {
        if (l[0] === '') {
            setShowCountry(false)
        } else {
            setShowCountry(true)
        }
    }

    return (
        <div>
            <form >
                <input type="text" placeholder='Buscar Pais' onChange={handlerChange} value={!showCountry ? '' : null} />
            </form>
        </div>
    )
}

export default SearchBar


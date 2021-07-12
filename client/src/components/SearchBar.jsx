import React from 'react';

import { useDispatch } from 'react-redux';
import { getSearchedCountry } from '../Redux/actions/actions';

function SearchBar({ setShowCountry, showCountry, setShowOrder, setShowContinent }) {
    const dispatch = useDispatch()

    const handlerChange = (e) => {
        let target = e.target.value
        let arr = [];
        arr.push(target)
        showCountrySearched(arr)
        dispatch(getSearchedCountry(target))
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


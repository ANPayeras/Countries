import React from 'react';

// Redux
import { useDispatch } from 'react-redux';
import { getSearchedCountry } from 'C:/Users/Angel/Desktop/PI/PI-Countries/client/src/Redux/actions/actions.js';
// Styles
import style from './SearchBar.module.css';

function SearchBar({ setShowCountry, showCountry, setShowOrder, setShowContinent, page, setPage }) {
    const dispatch = useDispatch()

    const handlerChange = (e) => {
        let target = e.target.value
        let arr = [];
        arr.push(target)
        showCountrySearched(arr)
        dispatch(getSearchedCountry(target))
        setShowOrder(false)
        setShowContinent(false)
        setPage({
            ...page,
            currentPage: 0,
            nextPage: 1,
            prevPage: 0
        })
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
            <input type="text" placeholder='Buscar Pais'
                onChange={handlerChange} value={!showCountry ? '' : null}
                className={style.input}
            />
        </div>
    )
}

export default SearchBar


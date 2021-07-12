import React from 'react';
import { Link } from 'react-router-dom';

// Redux
import { useSelector } from 'react-redux';

function PaisesBuscados() {

    const searchedCountry = useSelector(state => state.searchedCountry)
    console.log(searchedCountry)
    return (
        <div>
            {
                searchedCountry.map((e, i) => (
                    <div key={i}>
                        <h1>{e.msg}</h1>
                        <Link to={`/detallepais/${e.id}`}>
                            <h1>{e.name}</h1>
                        </Link>
                        <img src={e.flagimage} alt="" />
                    </div>
                ))
            }
        </div>
    )
}

export default PaisesBuscados;

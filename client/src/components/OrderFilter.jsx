import React, { useEffect, useState } from 'react';

// Components
import Filtros from './Filtros';
import NavBar from './navbar';

// Redux
import { useSelector } from 'react-redux';

function OrderFilter() {

    const orderFilter = useSelector(state => state.orderFilter);

    console.log('Order Filter', orderFilter)

    const [showComponents, setShowComponents] = useState(true)
    const showFilters = () => {
        setShowComponents(!showComponents)
    }

    return (
        <div>
            {/* <NavBar showFilters={showFilters} />
            <div className='filtros' hidden={!showComponents ? true : false}><Filtros /></div> */}

            {
                orderFilter[0] && orderFilter.map(e => (
                    <div key={e.id}>
                        {e.name}
                        <br />
                        {e.population}
                    </div>
                ))
            }
        </div>
    )
}

export default OrderFilter;

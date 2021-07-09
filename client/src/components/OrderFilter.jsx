import React from 'react';

// Components
import Filtros from './Filtros';
import NavBar from './navbar';

// Redux
import { useSelector } from 'react-redux';

function OrderFilter() {

    // const nameOrder = useSelector(state => state.nameOrder);
    const orderFilter = useSelector(state => state.orderFilter);
    // console.log(orderFilter)
    return (
        <div>
            <NavBar />
            <Filtros />
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

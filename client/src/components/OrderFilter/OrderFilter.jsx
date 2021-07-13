import React, { useEffect } from 'react';

// Redux
import { useSelector } from 'react-redux';

function OrderFilter({ page, setPage, watcher }) {

    const orderFilter = useSelector(state => state.orderFilter);
    console.log('Order Filter', watcher.orders)

    useEffect(() => {
        const changePages = () => {
            setPage({
                ...page,
                currentPage: 0,
                nextPage: 1,
                prevPage: 0,
                totalPages: Math.ceil(orderFilter.length / 10)
            })
        }
        changePages()
    }, [watcher.orders])

    return (
        <div>
            {
                orderFilter[0] && orderFilter.slice(page.currentPage * page.limit, page.nextPage * page.limit).map(e => (
                    <div key={e.id}>
                        <h1>Nombre: {e.name}</h1>
                        <h2>Continente: {e.continente}</h2>
                        <img src={e.flagimage} alt="" />
                    </div>
                ))
            }
        </div>
    )
}

export default OrderFilter;

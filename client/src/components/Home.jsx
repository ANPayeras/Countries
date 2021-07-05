import axios from 'axios';
import React, { useEffect, useState } from 'react';


function Home() {

    const [paises, setPaises] = useState([]);
    const [page, setPage] = useState({
        actualpage: 0,
        nextPage: 0,
        prevPage: 0,
        totalPages: 0
    })


    useEffect(() => {
        countries()
    }, [])


    const countries = async () => {
        const listadoDePaises = await axios.get(`http://localhost:3001/countries?page=0`);
        console.log(listadoDePaises.data)
        const datos = listadoDePaises.data.data;
        const totalPages = Math.ceil(listadoDePaises.data.total / listadoDePaises.data.data.length)
        setPaises(datos);
        setPage({
            ...page,
            actualpage: listadoDePaises.data.currentPage + 1,
            nextPage: listadoDePaises.data.nextPage,
            prevPage: listadoDePaises.data.previousPage,
            totalPages: totalPages
        })
    }

    const { actualpage, nextPage, prevPage, totalPages } = page;
    console.log('pagina actual', actualpage, 'total de paginas', totalPages, 'next', nextPage, 'prev', prevPage)

    const sigPage = async (e) => {
        let { nextPage, totalPages } = page;
        if (nextPage >= totalPages) return null

        const listadoDePaises = await axios.get(`http://localhost:3001/countries?page=${nextPage}`);
        const datos = listadoDePaises.data.data;
        setPaises(datos);
        setPage({
            ...page,
            actualpage: listadoDePaises.data.currentPage + 1,
            nextPage: listadoDePaises.data.nextPage,
            prevPage: listadoDePaises.data.previousPage
        })
    }

    const antPage = async (e) => {
        let { prevPage, totalPages } = page;
        if (prevPage < 0) return null;

        const listadoDePaises = await axios.get(`http://localhost:3001/countries?page=${prevPage}`);
        const datos = listadoDePaises.data.data;
        setPaises(datos);
        setPage({
            ...page,
            actualpage: listadoDePaises.data.currentPage + 1,
            nextPage: listadoDePaises.data.nextPage,
            prevPage: listadoDePaises.data.previousPage
        })
    }


    return (
        <div>
            <h1>Home</h1>
            <button onClick={antPage}>Anterior</button>
            <button onClick={sigPage}>Siguiente</button>
            <h3>{page.actualpage} - {page.totalPages} </h3>
            <ul>
                {
                    paises.map(e => (
                        <li key={e.id}>
                            <h1>Nombre {e.name}</h1>
                            <h2>Continente {e.continente}</h2>
                            <img src={e.flagimage} alt="" />
                        </li>
                    ))
                }
            </ul>


        </div>
    )
}

export default Home

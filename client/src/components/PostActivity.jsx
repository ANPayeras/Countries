import axios from 'axios';
import React, { useState, useContext } from 'react';
import UserContext from '../context/UserContext';

// Components
import NavBarActivity from './NavBarActivity';
import { Link } from 'react-router-dom';


function PostActivity() {

    const { allCountries, searchedCountry, getSearchedCountry } = useContext(UserContext);

    const [activity, setActivity] = useState({
        name: '',
        dificulty: '',
        duration: '',
        season: '',
        countryId: [],
        msg: ''
    })
    const { name, dificulty, duration, season } = activity;

    const [errors, setErrors] = useState('')
    const [showCountries, setshowCountries] = useState({
        show: false,
        input: ''
    })
    console.log(showCountries)
    const handlerChange = (e) => {
        let target = e.target.value;
        if (e.target.name === 'dificulty') {

            validate(target);
        }
        if (e.target.name === 'id') {
            setActivity({
                ...activity,
                countryId: [...activity.countryId, target]
            });
        } else {
            setActivity({
                ...activity,
                [e.target.name]: target
            });
        }
    }

    const handlerSubmit = async (e) => {
        e.preventDefault();
        const msg = await sendActivity(activity);
        alert(msg);
        setActivity({
            name: '',
            dificulty: '',
            duration: '',
            season: '',
            countryId: [],
            msg
        });

    }

    const sendActivity = async (activity) => {
        const { name, dificulty, duration, season, countryId } = activity;
        const result = await axios.post('http://localhost:3001/activity', {
            name,
            dificulty,
            duration,
            season,
            countryId
        })
        return result.data.msg
    }

    const validate = (e) => {
        if (!/^[0-5]$/.test(e)) {
            setErrors('Debe ser entre 1 y 5')
        } else {
            setErrors('');
        }
    }

    const searchBar = (e) => {
        let target = e.target.value
        if (target) {
            getSearchedCountry(target)
            setshowCountries({
                ...showCountries,
                input: target
            })
        } else {
            return null
        }
    }

    const showAll = () => {
        setshowCountries({
            ...showCountries,
            show: !showCountries.show,
            input: ''
        });

    }

    return (

        <div>
            <NavBarActivity />
            <button onClick={showAll} disabled={showCountries.input ? false : true}>Mostar Todos</button>

            <form action="" onChange={handlerChange} onSubmit={handlerSubmit}>
                <input type="text" name='name' placeholder='Nombre' value={name} />
                <input type="text" name='dificulty' placeholder='Dificultad' value={dificulty} />
                {errors && <h3>{errors}</h3>}
                <input type="text" name='duration' placeholder='Duracion' value={duration} />
                <h3>Temporada:</h3>
                <select name="season" value={season}>
                    <option ></option>
                    <option value="Verano">Verano</option>
                    <option value="Primavera">Primavera</option>
                    <option value="Otoño">Otoño</option>
                    <option value="Invierno">Invierno</option>
                </select>


                <input type="text" placeholder='Buscar Pais' onChange={searchBar} value={showCountries.input} />




                {
                    searchedCountry[0] && !searchedCountry[0].msg ? searchedCountry.map(e => (
                        <div key={e.id}>
                            <input type="checkbox" name='id' value={e.id} />
                            <Link to={`/detallepais/${e.id}`}>{e.name}</Link>
                        </div>
                    )) : searchedCountry[0] && searchedCountry[0].msg && showCountries.show ? <h1>{searchedCountry[0].msg}</h1> :
                        allCountries.map(e => (
                            <div key={e.id}>
                                <input type="checkbox" name='id' value={e.id} />
                                <Link to={`/detallepais/${e.id}`}>{e.name}</Link>
                            </div>
                        ))

                }
                <input type="submit" />
            </form>
        </div>
    )
}

export default PostActivity;

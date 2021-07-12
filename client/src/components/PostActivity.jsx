import axios from 'axios';
import React, { useState, useEffect } from 'react';

// Components
import NavBarActivity from './NavBarActivity';
import { Link } from 'react-router-dom';

// Redux
import { useSelector, useDispatch } from 'react-redux';
// Actions
import { getAllCountries } from '../Redux/actions/actions';

function PostActivity() {
    const dispatch = useDispatch()

    const allCountries = useSelector(state => state.allCountries)

    const [activity, setActivity] = useState({
        name: '',
        dificulty: '',
        duration: '',
        season: '',
        countryId: [],
        msg: '',
        chek: null
    })
    console.log(activity.chek)

    useEffect(() => {
        dispatch(getAllCountries())
    }, [])

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
            msg,
            chek: false
        });

    }
    const { name, dificulty, duration, season } = activity;

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

    const changeCheck = () => {
        setActivity({
            ...activity,
            chek: null
        })
    }

    return (

        <div>
            <NavBarActivity />

            <form action="" onChange={handlerChange} onSubmit={handlerSubmit}>
                <input type="text" name='name' placeholder='Nombre' value={name} />
                <input type="text" name='dificulty' placeholder='Dificultad' value={dificulty} />
                {errors && <p>{errors}</p>}
                <input type="text" name='duration' placeholder='Duracion' value={duration} />
                <h3>Temporada:</h3>
                <select name="season" value={season}>
                    <option ></option>
                    <option value="Verano">Verano</option>
                    <option value="Primavera">Primavera</option>
                    <option value="Otoño">Otoño</option>
                    <option value="Invierno">Invierno</option>
                </select>

                {

                    allCountries.map(e => (
                        <div key={e.id}>
                            <input type="checkbox" name='id' value={e.id} checked={activity.chek} onFocus={changeCheck} />
                            <text>{e.name}</text>
                        </div>
                    ))

                }
                <input type="submit" />
            </form>
        </div>
    )
}

export default PostActivity;

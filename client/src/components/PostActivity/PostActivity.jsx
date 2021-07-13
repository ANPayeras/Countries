import axios from 'axios';
import React, { useState, useEffect } from 'react';

// Components
import NavBarActivity from '../NavBarActivity/NavBarActivity';

// Redux
import { useSelector, useDispatch } from 'react-redux';
// Actions
import { getAllCountries } from 'C:/Users/Angel/Desktop/PI/PI-Countries/client/src/Redux/actions/actions.js';
// Styles 
import styles from './PostActivity.module.css';

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

    useEffect(() => {
        dispatch(getAllCountries())
    }, [])

    const [errors, setErrors] = useState('')

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
        if(msg) alert(msg);
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
    console.log(activity)
    const sendActivity = async (activity) => {
        const { name, dificulty, duration, season, countryId } = activity;
        if(!name || !dificulty || !duration || !season || !countryId) return alert('Todos los campos son obligatorios')
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

            <form onChange={handlerChange} onSubmit={handlerSubmit} className={styles.container}>
                <div className={styles.form}>
                    <input className={styles.options} type="text" name='name' placeholder='Nombre' value={name} />
                    <input className={styles.options} type="text" name='dificulty' placeholder='Dificultad' value={dificulty} />
                    {/* {errors && alert(errors)} */}
                    <input className={styles.options} type="text" name='duration' placeholder='Duracion' value={duration} />
                    <select className={styles.options} name="season" value={season}>
                        <option className={styles.options}>Temporada</option>
                        <option className={styles.options} value="Verano">Verano</option>
                        <option className={styles.options} value="Primavera">Primavera</option>
                        <option className={styles.options} value="Otoño">Otoño</option>
                        <option className={styles.options} value="Invierno">Invierno</option>
                    </select>

                    <input className={styles.submit}type="submit" />
                </div>
                <div className={styles.countries}>
                    {
                        allCountries.map(e => (
                            <div key={e.id}>
                                <input type="checkbox" name='id' value={e.id} checked={activity.chek} onFocus={changeCheck} />
                                <text>{e.name}</text>
                            </div>
                        ))
                    }
                </div>
            </form>
        </div>
    )
}

export default PostActivity;
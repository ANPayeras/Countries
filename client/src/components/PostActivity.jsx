import axios from 'axios';
import React, { useState, useContext } from 'react';
import UserContext from '../context/UserContext';


function PostActivity() {

    const { allCountries } = useContext(UserContext);

    const [activity, setActivity] = useState({
        name: '',
        dificulty: '',
        duration: '',
        season: '',
        countryId: [],
        msg: ''
    })
    const { name, dificulty, duration, season } = activity;
    console.log(activity)
    const handlerChange = (e) => {
        let target = e.target.value;
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


    return (

        <div>
            Crear Actividad Turistica:


            <form action="" onChange={handlerChange} onSubmit={handlerSubmit}>
                <input type="text" name='name' placeholder='Nombre' value={name} />
                <input type="text" name='dificulty' placeholder='Dificultad' value={dificulty} />
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
                            <input type="checkbox" name='id' value={e.id} /> {e.name}
                        </div>
                    ))
                }
                <input type="submit" />
            </form>
        </div>
    )
}

export default PostActivity;

import React, { useState } from 'react'
import { useWorkoutContext } from '../hooks/useWorkoutContext'


// create for the dispatch actions
const Workoutform = () => {


    const { dispatch } = useWorkoutContext();

    // we need some data like title rep ... for this we use useState
    const [title, setTitle] = useState('')
    const [load, setLoad] = useState('')
    const [reps, setReps] = useState('')
    const [error, setError] = useState(null)


    const [emptyFields, setEmptyFields] = useState([])
    //    handelling an event 
    const handleSubmit = async (e) => {
        e.preventDefault()

        // res > POST > create a new workout
        const workout = { title, load, reps };

        const response = await fetch("/api/workouts", {
            method: 'POST',
            body: JSON.stringify(workout),
            // convert data back into json format 
            headers: {
                'content-type': 'application/json'
            }
        })
        const json = await response.json();

        if (!response.ok) {
            setError(json.error);
            setEmptyFields(json.emptyFields)
        } else {
            setError(null);
            setTitle('')
            setLoad('')
            setReps('')
            setEmptyFields([])  // clearing in final
            console.log('new weokout added ', json)
            // to push in global storage workouts
            dispatch({ type: 'CREATE_WORKOUT', payload: json })
        }
    }

    return (
        // this data will be added in the post req in backend
        <form className='create' onSubmit={handleSubmit}>
            <h3>New workout </h3>
            <label htmlFor="title">Exercise title :</label>
            <input type='text' value={title} onChange={(e) => setTitle(e.target.value)}
                className={emptyFields?.includes('title') ? 'error' : ''}
            ></input>

            <label htmlFor="load">Load ( in kgs) :</label>
            <input type='number' value={load} onChange={(e) => setLoad(e.target.value)}
                className={emptyFields?.includes('load') ? 'error' : ''}
            ></input>
            <label htmlFor="reps">Reps :</label>
            <input type='number' value={reps} onChange={(e) => setReps(e.target.value)}
                className={emptyFields?.includes('reps') ? 'error' : ''}
            ></input>
            <button type='submit' >Add Workout</button>
            {error && <div className='error'> {error}</div>}

        </form>
    )
}

export default Workoutform
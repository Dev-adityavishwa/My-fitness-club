import React from 'react'
import { useWorkoutContext } from '../hooks/useWorkoutContext'


// workout details component is to display the data

// getting a prop and destructutring 
const Workoutdetails = ({ workout }) => {

    const { dispatch } = useWorkoutContext();

    const handleClick = async () => {
        const response = await fetch('/api/workouts/' + workout._id, {
            method: 'DELETE'
        })

        // const json = await response.json();

        // for this use the hooks and dispatch method for distructre
        if (response.ok) {
            dispatch({ type: 'DELETE_WORKOUT', payload: workout._id })  
        }

    }

    return (
        <div className='workout-details'>

            <h4>{workout.title}</h4>
            <p><strong>Load (in kgs)</strong>{workout.load}</p>
            <p> <strong>reps</strong>{workout.reps} </p>
            <p> {workout.createdAt} </p>
            <span onClick={handleClick} class="material-symbols-outlined">
                delete
            </span>
        </div>
    )
}

export default Workoutdetails
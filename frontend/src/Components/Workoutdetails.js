import React from 'react'
import { useWorkoutContext } from '../hooks/useWorkoutContext'

import { useAuthContext } from '../hooks/useAuthContext'
// workout details component is to display the data

// getting a prop and destructutring 
const Workoutdetails = ({ workout }) => {

    const { dispatch } = useWorkoutContext();
    const { user } = useAuthContext();

    const handleClick = async () => {


        if (!user) {
            return
        }

        const response = await fetch('/api/workouts/' + workout._id, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`  // we need to pass the token in the headers of the request to the backend to access the protected routes in the backend
            }
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
            <span onClick={handleClick} className="material-symbols-outlined">
                delete
            </span>
        </div>
    )
}

export default Workoutdetails
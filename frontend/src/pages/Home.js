import React, { useEffect } from 'react'
import Workoutdetails from '../Components/Workoutdetails' // it has all the workouts as props
import Workoutform from '../Components/Workoutform'
import { useWorkoutContext } from '../hooks/useWorkoutContext'
import { useAuthContext } from '../hooks/useAuthContext'
const Home = () => {
    // useState 
    // const [workouts, setWorkouts] = useState([])
    //  now using useContext


    const { workouts, dispatch } = useWorkoutContext();  // states > workout array
    const { user } = useAuthContext();


    useEffect(() => {

        const fetchWorkouts = async () => {
            try {
                const response = await fetch('/api/workouts/', {
                    headers: {
                        'Authorization': `Bearer ${user.token}`  // we need to pass the token in the headers of the request to the backend to access the protected routes in the backend
                    }
                })
                const json = await response.json()

                if (response.ok) {
                    // useState way
                    // setWorkouts(json) 
                    // now using useContext
                    dispatch({ type: 'SET_WORKOUTS', payload: json })

                }
            } catch (error) {
                console.error(error)
            }
        }

        if (user) {  // we need to check if the user is logged in or not ( we are getting the user from the useAuthContext )      
            fetchWorkouts();
        }
    }, [dispatch, user]) // we need to add dispatch and user as dependencies in the useEffect hook ( because we are using them in the useEffect hook ) ( if the user changes then we need to fetch the workouts again )
    //    key : key={workout._id}
    return (
        <div className='home'>
            <div className='workouts'>
                {workouts?.map((workout) => (  // map loop 
                    <Workoutdetails key={workout._id} workout={workout} />  // workout details render
                ))}
            </div>
            <Workoutform />
        </div>
    )
}

export default Home
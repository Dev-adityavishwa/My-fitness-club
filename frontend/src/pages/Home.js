import React, { useEffect } from 'react'
import Workoutdetails from '../Components/Workoutdetails' // it has all the workouts as props
import Workoutform from '../Components/Workoutform'
import { useWorkoutContext } from '../hooks/useWorkoutContext'


const Home = () => {
    // useState 
    // const [workouts, setWorkouts] = useState([])
    //  now using useContext


    const {workouts, dispatch} = useWorkoutContext();  // states > workout array

    useEffect(() => {

        const fetchWorkouts = async () => {
            try {
                const response = await fetch('/api/workouts/')
                const json = await response.json() 

                if (response.ok) {
                    // useState way
                    // setWorkouts(json) 
                    // now using useContext
                    dispatch({type : 'SET_WORKOUTS', payload: json})

                }
            } catch (error) {
                console.error(error)
            }
        }
        fetchWorkouts()
    }, [dispatch])
//    key : key={workout._id}
    return (
        <div className='home'>
            <div className='workouts'>
                {workouts?.map((workout) => (  // map loop 
                   <Workoutdetails key={workout._id} workout= {workout}/>  // workout details render
                ))}
            </div>
            <Workoutform />
        </div>
    )
}

export default Home
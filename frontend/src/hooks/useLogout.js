//import useworkoutcontext to update the global state of the application when the user logs out
import { useWorkoutContext } from "./useWorkoutContext";
const { useAuthContext } = require("./useAuthContext");


export const useLogout = () => {
    const { dispatch } = useAuthContext();
    const { dispatch: workoutDispatch } = useWorkoutContext(); // changes in the global state of the application when the user logs out ( we need to clear the workouts from the global state when the user logs out )


    const logout = () => {
        // remove the user from local storage
        localStorage.removeItem('user')
        //remove the user from local storage and update the auth context to null when the user logs out
        // we also need to remove from globall context API 
        dispatch({ type: 'LOGOUT' })
        workoutDispatch({ type: 'SET_WORKOUTS', payload: null }) // clear the workouts from the global state when the user logs out ( we need to set the workouts to an empty array when the user logs out )
    }

    return { logout }

}
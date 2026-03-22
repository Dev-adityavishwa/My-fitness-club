import React, { createContext, useReducer } from 'react'

export const WorkoutContext = createContext();


// we are getting props 
export const workoutsReducer = (state, action) => {
    switch (action.type) {  // in case of fetch something (we will have actions)
        case 'SET_WORKOUTS':
            return {
                workouts: action.payload //payload getting from db
            }
        case 'CREATE_WORKOUT':
            return {
                workouts: [action.payload, ...state.workouts]
            }
        case 'DELETE_WORKOUT':
            return {
                workouts: state.workouts.filter((each)=> each._id !== action.payload)
            }
        default:
            return state

    }
}

export const WorkoutsContextProvider = ({ children }) => {

    //  const[state, dispatch method] =useReducer
    const [state, dispatch] = useReducer(workoutsReducer, {
        workouts: [] // initial state  // this is global variable we can use it anywhere (use State make the variable only in that components where we need to pass th props )
    })
    //  we can have multiple dispatches
    // dispatch({ type: 'DELETE_WORKOUT', payload: })  // dispatch is a function (action perform ) for the WorkoutReducer 

    return (

        <WorkoutContext.Provider value={{...state, dispatch}} >
            {children}
        </WorkoutContext.Provider>

    )
} 

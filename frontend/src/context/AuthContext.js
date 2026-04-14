import { createContext, useReducer, useEffect } from "react";


export const AuthContext = createContext();  // context created 

// reducer function to handle the actions ( login and logout ) > it will take the current state and the action as arguments and return the new state based on the action type
export const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return { user: action.payload }
        case 'LOGOUT':
            return { user: null }
        default:
            return state
    }
}


// this is context rovider component which will wrap our app and provide the context to all the components in the app
export const AuthContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(authReducer, {
        user: null
    });

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user')) // get the user from local storage and parse it to json format
        if (user) {
            dispatch({ type: 'LOGIN', payload: user });
        }
    }, []);


    // console.log('AuthContext state:', state); // Debugging line to check the state
    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    )
}


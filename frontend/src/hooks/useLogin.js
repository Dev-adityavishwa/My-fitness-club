import { useAuthContext } from "./useAuthContext";
import { useState } from "react";


export const useLogin = () => {

    const [error, setError] = useState(null)
    const [isloading, setIsloading] = useState(null)

    const { dispatch } = useAuthContext();


    const login = async (email, password) => {
        setIsloading(true)
        setError(null)

        const response = await fetch('/api/user/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const json = await response.json();

        if (!response.ok) {
            setIsloading(false)

            setError(json.error) // as in backend we are sending error in json format with key error
        }
        if (response.ok) {
            // save the user to browsers local storage  (use method .setItem to save data in local storage and we need to convert json data into string format using JSON.stringify() method before saving it in local storage)
            localStorage.setItem('user', JSON.stringify(json))
        }
        // update the auth context (dispatch an action to update the auth context and we need to pass the user data in payload to update the auth context)
        dispatch({ type: 'LOGIN', payload: json }) // as in backend we are sending user data in json format and we need to pass it in payload to update the auth context
        setIsloading(false)
    }

    return { login, isloading, error }
}







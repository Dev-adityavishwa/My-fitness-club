
const { useAuthContext } = require("./useAuthContext");

export const useLogout = () => {
    const { dispatch } = useAuthContext();

    const logout = () => {
        // remove the user from local storage
        localStorage.removeItem('user')
        //remove the user from local storage and update the auth context to null when the user logs out
        // we also need to remove from globall context API 
        dispatch({ type: 'LOGOUT' })
    }

    return { logout }

}
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

// in case if we try to use this hook outside of the context provider then we will throw an error 
// to  let the developer know that they are using the hook outside of the context provider and they need 
// to wrap their component with the context provider to use this hook
export const useAuthContext = () => {

    const context  = useContext(AuthContext)
    if(!context){
        throw Error('useAuthContext must be used inside an AuthContextProvider')
    }

    return context;
}















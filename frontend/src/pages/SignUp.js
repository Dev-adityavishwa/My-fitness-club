
import {useState } from 'react'
import { useSignUp } from '../hooks/useSignUp';

const SignUp = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { signUp, isloading, error } = useSignUp();

    const handleSubmit = async (e) => {
        e.preventDefault();

        await signUp(email,password)

    }

    return (
        <form className='signUp' onSubmit={handleSubmit}>

            <h2>Sign Up</h2>

            <label htmlFor="email">Email :</label>
            <input type='email' name='email' id='email' onChange={(e) => setEmail(e.target.value)}></input>

            <label htmlFor="password">Password :</label>
            <input type='password' name='password' id='password' onChange={(e) => setPassword(e.target.value)}></input>

            <button disabled={isloading}>Sign Up</button>
            {
                error && <div className='error'> {error} </div>
            }

        </form>
    )
}

export default SignUp;



import {useState } from 'react'
import { useLogin } from '../hooks/useLogin';
 

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
      const { login, isloading, error } = useLogin();

    const handleSubmit = async (e) => {
        e.preventDefault();

        await login(email,password);

    }

    return (
        <form className='login' onSubmit={handleSubmit}>

            <h2>Login</h2>

            <label htmlFor="email">Email :</label>
            <input type='email' name='email' id='email' onChange={(e) => setEmail(e.target.value)}></input>

            <label htmlFor="password">Password :</label>
            <input type='password' name='password' id='password' onChange={(e) => setPassword(e.target.value)}></input>

            <button disabled={isloading}>Login</button>
            {
                error && <div className='error'> {error} </div>
            }

        </form>
    )
}

export default Login;


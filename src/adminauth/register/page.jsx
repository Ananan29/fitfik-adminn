import React, {useState} from 'react'
import '../auth.css'
import { ToastContainer, toast } from 'react-toastify'
import config from '../../config';
import "react-toastify/dist/ReactToastify.css"
const SignupPage = () => {

    const [name, setName ] = useState('');
    const [email, setEmail ] = useState('');
    const [password, setPassword ] = useState('');

    const handleSignup = async () => {
    //     try {
        const response = await fetch(config.API_BASE_URL + '/admin/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({ name, email, password }),
            credentials: "include"
        })
        const data = await response.json();
        if (data.ok) {
            
            // Handle successful signup,e-g-, show a success message
            console. log('Admin registration successful', data);
            console.log("first")
            // toast.success('Admin Registration Successful', {
            //     position: toast.POSITION.TOP_CENTER,
            // });
            console.log("first")
        }
        else {
        // Handle signup error
        console.error ('Admin registration failed', response.statusText);
        toast.error ('Admin Registration Failed', {
            position: toast.POSITION.TOP_CENTER,
        });
        }
    //     }
    //     catch (error) {
    //         toast.error('An error occured during registeration');
    //         console.error('An error occured during registeration')
    //     }
    }

  return (
    <div className='formpage'>
        <input
            type='text'
            placeholder='Name'
            value={name}
            onChange={(e) => setName(e.target.value)}
        />
        <input
            type='email'
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
        />
        <input
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleSignup}>Sign up</button>
    </div>
  )
}

export default SignupPage
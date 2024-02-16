import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate()

    const setCookie = (name, value) => {
        document.cookie = `${name}=${value};path=/`;
    };

    const LoginUser = async (event) => {
        event.preventDefault();
        const data = {
          "email": email,
          "password": password
        }

        await fetch("http://localhost:5000/api/v1/auth/login/",{
            method: "POST",
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(data)
            }).then(res => res.json()).then(d => setCookie('token',d.token))
            navigate('/Home')
        }

  return (
    <div className=' ml-56 mt-32 flex flex-row'>
        <div className='flex flex-col mt-10 ml-72 font-mono text-white'>
            <p className='font-extrabold text-2xl'>Log in to your account</p><br/>
            <form>
                <label className='block text-sm font-medium leading-6'>Email Address</label>
                <input type="email" placeholder='Email' className='w-96 h-8 text-center rounded-lg mt-5 bg-gray-300 text-black' onChange={(e) => {
                    setEmail(e.target.value)
                }} /><br/><br/>
                <label>Password</label><br/>
                <input type="password" placeholder='Password' className='w-96 h-8 text-center rounded-lg mt-5 bg-gray-300 text-black' onChange={(e) => {
                    setPassword(e.target.value)
                }} /><br/><br/>
                <div>
                   <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" onClick={LoginUser}>Log in</button>
                </div>
            </form>
            <p className="mt-10 text-center text-sm">
                Don't have an account?
                <Link to={'/SignUp'} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"> Create an account</Link>
            </p>    
        </div>    
    </div>
  )
}

export default Login
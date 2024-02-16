import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import image from '../images/main.png'
//import Axios from 'axios';

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [email, setEmail] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [accept, setAccept] = useState(false);
  const navigate = useNavigate()

  const setCookie = (name, value) => {
    document.cookie = `${name}=${value};path=/`;
  };

  const registerUser = async (event) => {
    event.preventDefault();
    const data = {
      "username": username,
      "email": email,
      "phonenumber": phonenumber,
      "password": password
    }
    if (accept){
      if (password === confirm){
        fetch("http://localhost:5000/api/v1/auth/register/",{
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        }).then(res => res.json()).then(d => setCookie('token',d.token))
        navigate('/Home')
      }
    }
}

  return (
    <div className='flex flex-row'>
      <div className='flex flex-col mt-10 ml-72 font-mono text-white'>
        <div className=' font-extrabold text-4xl'>
          Sign Up
        </div>
        <p className=' font-serif font-light'>Create an account to manage your financial transactions.</p>
        <form>
          <label>User Name:</label><br/>
          <input type="text" placeholder='User Name' className='w-96 h-8 text-center rounded-lg mt-5 bg-gray-300 text-black' onChange={(e) =>{
            setUsername(e.target.value)
          }} /><br/>
          <label>Email Address:</label><br/>
          <input type="email" placeholder='Email' className='w-96 h-8 text-center rounded-lg mt-5 bg-gray-300 text-black' onChange={(e) => {
            setEmail(e.target.value)
          }} /><br/>
          <label>Phone Number:</label><br/>
          <input type="tel" placeholder='Phone Number' className='w-96 h-8 text-center rounded-lg mt-5 bg-gray-300 text-black' onChange={(e) => {
            setPhonenumber(e.target.value)
          }} /><br/>
          <label>Password:</label><br/>
          <input type="password" placeholder='Password' className='w-96 h-8 text-center rounded-lg mt-5 bg-gray-300 text-black' onChange={(e) => {
            setPassword(e.target.value)
          }} /><br/>
          <label>Confirm Password:</label><br/>
          <input type="password" placeholder='Confirm Password' className='w-96 h-8 text-center rounded-lg mt-5 bg-gray-300 text-black' onChange={(e) => {
            setConfirm(e.target.value)
          }} /><br/>
          <input type="checkbox" onClick={() => {setAccept(true) }}/>By signing up, you agree to our Terms of Service and Privacy Policy.<br/>
          <button className='w-96 h-8 text-center rounded-lg mt-5 bg-blue-950 text-black' onClick={registerUser}>Sign Up</button>
          <p>Already have an account?<Link to={'/'} className=' text-sky-500 hover:underline'>Log In</Link></p>
        </form>
      </div>
      <img className='flex flex-row-reverse mr-12' src={image} alt='Logo' style={{ width: '400px', height: '400px' }}/>
    </div>

  )
}

export default SignUp
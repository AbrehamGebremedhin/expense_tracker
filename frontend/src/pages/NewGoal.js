import React, { useState } from 'react';
import Sidebar from '../components/SideBar';
import { useNavigate } from 'react-router-dom'

const NewGoal = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [goal, setGoal] = useState();
    const navigate = useNavigate();

    const getCookieValue = (cookieName) => {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.startsWith(cookieName + '=')) {
                return cookie.substring(cookieName.length + 1);
            }
        }
        return null; // Cookie not found
    };

    const addGoal = (e) => {
        e.preventDefault();
        const data = {
            "name": name,
            "description": description,
            "goal": goal
        }
        fetch("http://localhost:5000/api/v1/goals/",{
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getCookieValue("token")}`
          },
          body: JSON.stringify(data)
        }).then(res => res.json()).then(d => console.log(d));

        navigate('/Goal');
    }

    return (
        <div>
            <Sidebar />
            <div className='mx-32 my-6'>
                <h2 className='text-2xl font-bold tracking-tight text-white'>Add new Goal</h2>
                <br />
                <form>
                    <label>Name</label>
                    <br />
                    <input
                        type='text'
                        placeholder='Goal Name'
                        className='w-96 h-8 text-center rounded-lg mt-5 bg-gray-300 text-black'
                        onChange={(e) => {
                            setName(e.target.value);
                        }}
                    />
                    <br />
                    <br />
                    <label>Description</label>
                    <br />
                    <input
                        type='text'
                        placeholder='Goal Description'
                        className='w-96 h-8 text-center rounded-lg mt-5 bg-gray-300 text-black'
                        onChange={(e) => {
                            setDescription(e.target.value);
                        }}
                    />
                    <br />
                    <br />
                    <label>Goal</label>
                    <br />
                    <input
                        type='Number'
                        placeholder='Goal to reach'
                        className='w-96 h-8 text-center rounded-lg mt-5 bg-gray-300 text-black'
                        onChange={(e) => {
                            setGoal(e.target.value);
                        }}
                    />
                    <br />
                    <br />
                    <button className='w-96 h-8 text-center rounded-lg mt-5 bg-blue-950 text-black' onClick={addGoal}>Add Budget</button>
                </form>
            </div>
        </div>
    );
};

export default NewGoal;

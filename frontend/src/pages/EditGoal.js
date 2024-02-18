import React, { useState, useEffect } from 'react';
import Sidebar from '../components/SideBar';
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

const NewGoal = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [goal, setGoal] = useState();
    const [current, setCurrent] = useState();
    const navigate = useNavigate();
    let { id } = useParams();

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

    const editGoal = (e) =>{
        //e.preventDefault();
        let data = JSON.stringify({
            "name": name,
            "description": description,
            "goal": goal,
            "current": current
        });
          
        let config = {
            method: 'put',
            maxBodyLength: Infinity,
            url: `http://localhost:5000/api/v1/goals/${id}/`,
            headers: { 
              'Content-Type': 'application/json', 
              'Authorization': `Bearer ${getCookieValue("token")}`
            },
            data : data
        };
          
          axios.request(config)
          .then((response) => {})
          .catch((error) => {});

        navigate('/Goal');
    }

    useEffect(() => {
        const fetchGoal = async () => {
            try {
              const response = await axios.get(`http://localhost:5000/api/v1/goals/${id}/`, {
                headers: {
                  'Authorization': `Bearer ${getCookieValue("token")}`
                }
              });
            setName(response.data.data.name);
            setDescription(response.data.data.description);
            setGoal(response.data.data.goal);
            setCurrent(response.data.data.current);
            } catch (error) {}
          };    
      
          fetchGoal();

    }, [id]);

    return (
        <div>
            <Sidebar />
            <div className='mx-32 my-6'>
                <h2 className='text-2xl font-bold tracking-tight text-white'>Edit Goal</h2>
                <br />
                <form>
                    <label>Name</label>
                    <br />
                    <input
                        type='text'
                        placeholder={name}
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
                    <label>Current</label>
                    <br />
                    <input
                        type='Number'
                        placeholder='Current saved for goal '
                        className='w-96 h-8 text-center rounded-lg mt-5 bg-gray-300 text-black'
                        onChange={(e) => {
                            setCurrent(e.target.value);
                        }}
                    />
                    <br />
                    <br />
                    <button className='w-96 h-8 text-center rounded-lg mt-5 bg-blue-950 text-black' onClick={editGoal}>Edit Goal</button>
                </form>
            </div>
        </div>
    );
};

export default NewGoal;

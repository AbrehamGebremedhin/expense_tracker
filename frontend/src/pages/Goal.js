import React, { useState, useEffect } from 'react';
import Sidebar from '../components/SideBar';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Goal = () => {
    const [goals, setGoals] = useState([]);
    const [error, setError] = useState(null);

    const getCookieValue = cookieName => {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.startsWith(cookieName + '=')) {
                return cookie.substring(cookieName.length + 1);
            }
        }
        return null; // Cookie not found
    };

    const handleDelete = (id) => {
        let config = {
          method: 'delete',
          maxBodyLength: Infinity,
          url: `http://localhost:5000/api/v1/goals/${id}/`,
          headers: { 
            'Authorization': `Bearer ${getCookieValue('token')}`
          }
        };
        
        axios.request(config)
        .then((response) => {})
        .catch((error) => {});
        window.location.reload();
    }

    useEffect(() => {
        // Fetch budgets data from an API or use dummy data
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/v1/goals/', {
                    headers: {
                        'Authorization': `Bearer ${getCookieValue("token")}`
                    }
                });
                setGoals(response.data.data);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchCategories();
    }, []);

    return (
        <div>
            <Sidebar />
            <div className='mx-32 my-8 space-y-1'>
                <div>
                    <h2 className='text-2xl font-bold tracking-tight text-white'>Budgets</h2><br></br>
                    {error && <p className="text-red-500">Error: {error}</p>}
                    {goals.map(goal => (
                        <div key={goal._id}>
                            <div className="flex justify-between mb-1">
                                <span className="text-base font-medium text-blue-700 dark:text-white">{goal.name}</span>
                                <span className="text-sm font-medium text-blue-700 dark:text-white">{goal.goal}</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 relative" title={`Saved: ${goal.current}`}>
                                <div className="bg-blue-600 h-2.5 rounded-full group" style={{ width: `${(goal.current / goal.goal) * 100}%` }}>
                                    <span className="progressbar-tooltip group-hover:scale-100 absolute bottom-auto top-auto bg-gray-900 text-white text-xs font-bold rounded-md shadow-md p-2 min-w-max transition-all duration-300 origin-bottom left-1/2 transform -translate-x-1/2">
                                        Saved: {goal.current}
                                    </span>
                                </div>
                            </div>
                            <p>{goal.description}</p>
                            <Link to={`/EditGoal/${goal._id}`} state={goal._id}  type="button" className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-3 py-1.25 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Edit</Link>
                            <button type="button" className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-3 py-1.25 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" onClick={() => handleDelete(goal._id)}>Delete</button>
                            <br></br><br></br>
                        </div>
                    ))}     
                    <Link to={'/NewGoal'} className="mt-4 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">Add New goal</Link>
    
                </div>
            </div>
        </div>
    );
};

export default Goal;

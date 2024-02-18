import React, { useState, useEffect } from 'react';
import Sidebar from '../components/SideBar';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Budget = () => {
    const [budgets, setBudgets] = useState([]);
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
          url: `http://localhost:5000/api/v1/budgets/${id}/`,
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
                const response = await axios.get('http://localhost:5000/api/v1/budgets/', {
                    headers: {
                        'Authorization': `Bearer ${getCookieValue("token")}`
                    }
                });
                setBudgets(response.data.data);
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
                    {budgets.map(budget => (
                        <div key={budget._id}>
                            <div className="flex justify-between mb-1">
                                <span className="text-base font-medium text-blue-700 dark:text-white">{budget.category.name}</span>
                                <span className="text-sm font-medium text-blue-700 dark:text-white">{budget.spent}</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                                <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${(budget.spent / budget.limit) * 100}%` }}></div>
                            </div>
                            <Link to={`/EditBudget/${budget._id}`} state={budget._id}  type="button" className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-3 py-1.25 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Edit</Link>
                            <button type="button" className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-3 py-1.25 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" onClick={() => handleDelete(budget._id)}>Delete</button>
                            <br></br><br></br>
                        </div>
                    ))}     
                    <Link to={'/NewBudget'} className="mt-4 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">Add New Budget</Link>
    
                </div>
            </div>
        </div>
    );
};

export default Budget;

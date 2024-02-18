import React, { useState, useEffect } from 'react'
import Sidebar from '../components/SideBar'
import {useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';

const EditBudget = () => {
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [limit, setLimit] = useState();
    const [spent, setSpent] = useState();
    const [category, setCategory] = useState();
    const [categories, setCategories] = useState([]);
    const [budget, setBudget] = useState({});
    const [error, setError] = useState(null);
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

    const editBudget = (e) =>{
        //e.preventDefault();
        let data = JSON.stringify({
            "limit": limit,
            "startDate": startDate,
            "endDate": endDate,
            "category": category,
            "spent": spent
        });
          
        let config = {
            method: 'put',
            maxBodyLength: Infinity,
            url: `http://localhost:5000/api/v1/budgets/${id}/`,
            headers: { 
              'Content-Type': 'application/json', 
              'Authorization': `Bearer ${getCookieValue("token")}`
            },
            data : data
        };
          
          axios.request(config)
          .then((response) => {})
          .catch((error) => {});

        navigate('/Budget');
    }

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/v1/categories/', {
                    headers: {
                        Authorization: `Bearer ${getCookieValue('token')}`,
                    },
                });
                setCategories(response.data.data);
            } catch (error) {
                setError(error.message);
            }
        };
        const fetchAccounts = async () => {
            try {
              const response = await axios.get(`http://localhost:5000/api/v1/budgets/${id}/`, {
                headers: {
                  'Authorization': `Bearer ${getCookieValue("token")}`
                }
              });
            setBudget(response.data.data);
            setLimit(response.data.data.limit);
            setStartDate(response.data.data.startDate);
            setEndDate(response.data.data.endDate);
            setCategory(response.data.data.category);
            setSpent(response.data.data.spent);
            } catch (error) {
              setError(error.message);
            }
          };    
      
          fetchAccounts();

        fetchCategories();
    }, [id]);

    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
    };

    const formatDate = (date) => {
        const formattedDate = new Date(date).toISOString().split('T')[0];
        return formattedDate;
    };

  return (
    <div>
        <Sidebar/>
        <div className='mx-32 my-6'>
                <h2 className='text-2xl font-bold tracking-tight text-white'>Edit Budget</h2>
                <br />
                {error && <p className="text-red-500">Error: {error}</p>}
                <form>
                    <label>Limit</label>
                    <br />
                    <input
                        type='Number'
                        placeholder={budget.limit}
                        className='w-96 h-8 text-center rounded-lg mt-5 bg-gray-300 text-black'
                        onChange={(e) => {
                            setLimit(e.target.value);
                        }}
                    />
                    <br />
                    <br />
                    <label>Spent</label>
                    <br />
                    <input
                        type='Number'
                        placeholder={budget.spent}
                        className='w-96 h-8 text-center rounded-lg mt-5 bg-gray-300 text-black'
                        onChange={(e) => {
                            setSpent(e.target.value);
                        }}
                    />
                    <br />
                    <br />
                    <label>Category</label>
                    <br />
                    <select
                        value={category}
                        onChange={handleCategoryChange}
                        className='w-96 h-8 text-center rounded-lg mt-5 bg-gray-300 text-black'
                    >
                        <option value=''>Select Category</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.name}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                    <br />
                    <br />
                    <label>Start Date</label>
                    <br />
                    <input
                        type='date'
                        className='w-96 h-8 text-center rounded-lg mt-5 bg-gray-300 text-black'
                        onChange={(e) => {
                            setStartDate(formatDate(e.target.value));
                        }}
                    />
                    <br />
                    <br />
                    <label>End Date</label>
                    <br />
                    <input
                        type='date'
                        className='w-96 h-8 text-center rounded-lg mt-5 bg-gray-300 text-black'
                        onChange={(e) => {
                            setEndDate(formatDate(e.target.value));
                        }}
                    />
                    <br />
                    <br />
                    <button className='w-96 h-8 text-center rounded-lg mt-5 bg-blue-950 text-black' onClick={editBudget}>Edit Budget</button>
                </form>
            </div>
    </div>
  )
}

export default EditBudget
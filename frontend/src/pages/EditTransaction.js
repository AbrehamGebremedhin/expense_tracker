import React, { useState, useEffect } from 'react';
import Sidebar from '../components/SideBar';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditTransaction = () => {
    const [type, setType] = useState('');
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [category, setCategory] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');
    const [account, setAccount] = useState({});
    const [categories, setCategories] = useState([]);
    const [accounts, setAccounts] = useState([]);
    const [error, setError] = useState(null);
    let { id } = useParams();
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

    const addTransaction = async (e) => {
        e.preventDefault();
        
        let data = JSON.stringify({
            "date": date,
            "amount": amount,
            "description": description,
            "type": type,
            "category": category,
            "paymentMethod": paymentMethod
        });
        let config = {
            method: 'put',
            maxBodyLength: Infinity,
            url: `http://localhost:5000/api/v1/expenses/${id}/`,
            headers: { 
              'Content-Type': 'application/json', 
              'Authorization': `Bearer ${getCookieValue("token")}`
            },
            data : data
         };
              
        axios.request(config)
            .then((response) => {})
            .catch((error) => {});

        navigate('/Expense');
    };

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
                const response = await axios.get('http://localhost:5000/api/v1/account/', {
                    headers: {
                        Authorization: `Bearer ${getCookieValue('token')}`,
                    },
                });
                setAccounts(response.data.data);
            } catch (error) {
                setError(error.message);
            }
        };
        const fetchExpense = async () => {
            try {
              const response = await axios.get(`http://localhost:5000/api/v1/expenses/${id}/`, {
                headers: {
                  'Authorization': `Bearer ${getCookieValue("token")}`
                }
              });
            setAccount(response.data.data)
            setAmount(response.data.data.name);
            setDescription(response.data.data.description);
            setCategory(response.data.data.goal);
            setDate(response.data.data.current);
            setPaymentMethod(response.data.data.goal);
            setType(response.data.data.current);
            } catch (error) {}
          };    
      
        fetchExpense();    
        fetchCategories();
        fetchAccounts();
    }, [id]);

    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
    };

    const handleTypeChange = (e) => {
        setType(e.target.value);
    };

    const handleAccountChange = (e) => {
        setPaymentMethod(e.target.value);
    };

    const formatDate = (date) => {
        const formattedDate = new Date(date).toISOString().split('T')[0];
        return formattedDate;
    };

    return (
        <div>
            <Sidebar />
            <div className='mx-32 my-6'>
                <h2 className='text-2xl font-bold tracking-tight text-white'>Add new Budget</h2>
                <br />
                {error && <p className="text-red-500">Error: {error}</p>}
                <form>
                    <label>Type</label>
                    <br />
                    <select
                        value={account.type}
                        onChange={handleTypeChange}
                        className='w-96 h-8 text-center rounded-lg mt-5 bg-gray-300 text-black'
                    >
                        <option value=''>Select Type</option>
                        <option value='Income'>Income</option>
                        <option value='Expenditure'>Expenditure</option>
                    </select>
                    <br />
                    <br />
                    <label>Category</label>
                    <br />
                    <select
                        value={account.category}
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
                    <label>Account</label>
                    <br />
                    <select
                        value={account.paymentMethod}
                        onChange={handleAccountChange}
                        className='w-96 h-8 text-center rounded-lg mt-5 bg-gray-300 text-black'
                    >
                        <option value=''>Select Account</option>
                        {accounts.map((account) => (
                            <option key={account.id} value={account.name}>
                                {account.name}
                            </option>
                        ))}
                    </select>
                    <br />
                    <br />
                    <label>Transaction Date</label>
                    <br />
                    <input
                        type='date'
                        className='w-96 h-8 text-center rounded-lg mt-5 bg-gray-300 text-black'
                        onChange={(e) => {
                            setDate(formatDate(e.target.value));
                        }}
                    />
                    <br />
                    <br />
                    <label>Amount</label>
                    <br />
                    <input
                        type='Number'
                        placeholder={account.amount}
                        className='w-96 h-8 text-center rounded-lg mt-5 bg-gray-300 text-black'
                        onChange={(e) => {
                            setAmount(e.target.value);
                        }}
                    />
                    <br />
                    <br />
                    <label>Description</label>
                    <br />
                    <input
                        type='text'
                        placeholder={account.description}
                        className='w-96 h-8 text-center rounded-lg mt-5 bg-gray-300 text-black'
                        onChange={(e) => {
                            setDescription(e.target.value);
                        }}
                    />
                    <br />
                    <br />
                    {/* Other form fields */}
                    <button className='w-96 h-8 text-center rounded-lg mt-5 bg-blue-950 text-black' onClick={addTransaction}>Add Transaction</button>
                </form>
            </div>
        </div>
    );
};

export default EditTransaction;

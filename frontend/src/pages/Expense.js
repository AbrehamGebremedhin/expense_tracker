import React, { useEffect, useState } from 'react'
import Sidebar from '../components/SideBar'
import axios from 'axios'
import { Link } from 'react-router-dom';

const Expense = () => {
    const [expenses, setExpenses] = useState([]);
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

  const deleteExpense = (id) => {
    let config = {
      method: 'delete',
      maxBodyLength: Infinity,
      url: `http://localhost:5000/api/v1/expenses/${id}/`,
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
    const fetchExpenses = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/v1/expenses/', {
          headers: {
            'Authorization': `Bearer ${getCookieValue("token")}`
          }
        });
        setExpenses(response.data.data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchExpenses();
  }, []);
  console.log(expenses)

  return (
    <div>
        <Sidebar/>
        <div className='mx-32 my-8'>
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-white">Expenses Overview</h2>
          <br />
          <div className="relative overflow-x-auto">
            {error && <p className="text-red-500">Error: {error}</p>}
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3 rounded-s-lg">Category</th>
                  <th scope="col" className="px-6 py-3">Amount</th>
                  <th scope="col" className="px-6 py-3">Type</th>
                  <th scope="col" className="px-6 py-3">Description</th>
                  <th scope="col" className="px-6 py-3">Payment Method</th>
                  <th scope="col" className="px-6 py-3 rounded-e-lg">Actions</th>
                </tr>
              </thead>
              <tbody>
                {expenses.map(expense => (
                  <tr key={expense._id} className="bg-white dark:bg-gray-800">
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      <Link to={`/expense/${expense.id}`}>{expense.category.name}</Link>
                    </td>
                    <td className="px-6 py-4">{expense.amount}</td>
                    <td className="px-6 py-4">{expense.type}</td>
                    <td className="px-6 py-4">{expense.description}</td>
                    <td className="px-6 py-4">{expense.paymentMethod.name}</td>
                    <td className="px-6 py-4 text-right space-x-4">
                      <Link to={`/EditTransaction/${expense._id}`} state={expense._id}  className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</Link>
                      <button className="font-medium text-red-600 dark:text-red-500 hover:underline" onClick={()=>{deleteExpense(expense._id)}}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr key="total" className="font-semibold text-gray-900 dark:text-white">
                    <td className="px-6 py-3 text-base">Total</td>
                    <td className="px-6 py-3">
                    {expenses.filter(expense => expense.type === "Expenditure").length}
                    </td>
                    <td className="px-6 py-3">
                    {expenses
                        .filter(expense => expense.type === "Expenditure")
                        .reduce((total, expense) => total + expense.amount, 0)}
                    </td>
                </tr>
                <tr key="total-income" className="font-semibold text-gray-900 dark:text-white">
                    <td className="px-6 py-3 text-base">Total Income</td>
                    <td className="px-6 py-3">
                    {expenses.filter(expense => expense.type === "Income").length}
                    </td>
                    <td className="px-6 py-3">
                    {expenses
                        .filter(expense => expense.type === "Income")
                        .reduce((total, expense) => total + expense.amount, 0)}
                    </td>
                </tr>
                </tfoot>
            </table>
            <Link to={'/NewTransaction'} type="button" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Add new expense</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Expense
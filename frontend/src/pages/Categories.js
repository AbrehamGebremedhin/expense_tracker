import React, { useEffect, useState } from 'react'
import Sidebar from '../components/SideBar'
import { Link } from 'react-router-dom';
import axios from 'axios'

const Categories = () => {
    const [categories, setCategories] = useState([]);
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

    
  const deleteCategory = (id) => {
    let config = {
      method: 'delete',
      maxBodyLength: Infinity,
      url: `http://localhost:5000/api/v1/categories/${id}/`,
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
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/v1/categories/', {
          headers: {
            'Authorization': `Bearer ${getCookieValue("token")}`
          }
        });
        setCategories(response.data.data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchCategories();
  }, []);
  return (
    <div>
        <Sidebar/>
        <div className='mx-32 my-8'>
            <div>
                <h2 className="text-2xl font-bold tracking-tight text-white">Categories Overview</h2>
                <br/>
                <div className="relative overflow-x-auto">
                    {error && <p className="text-red-500">Error: {error}</p>}
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                        <th scope="col" className="px-6 py-3 rounded-s-lg">Name</th>
                        <th scope="col" className="px-6 py-3">Description</th>
                        <th scope="col" className="px-6 py-3 rounded-e-lg">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map(category => (
                        <tr key={category._id} className="bg-white dark:bg-gray-800">
                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            <Link to={`/category/${category.id}`}>{category.name}</Link>
                            </td>
                            <td className="px-6 py-4">{category.description}</td>
                            <td className="px-6 py-4 text-right space-x-4">
                                <button className="font-medium text-red-600 dark:text-red-500 hover:underline" onClick={()=>{deleteCategory(category._id)}}>Delete</button>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr key={categories._id} className="font-semibold text-gray-900 dark:text-white">
                        <td className="px-6 py-3 text-base">Total</td>
                        <td className="px-6 py-3">{categories.length}</td>
                        </tr>
                    </tfoot>
                    </table>
                    <Link to={'/NewCategory'} type="button" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Add new category</Link>
                </div>
            </div>

        </div>
    </div>
  )
}

export default Categories
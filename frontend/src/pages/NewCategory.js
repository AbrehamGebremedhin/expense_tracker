import React, {useState} from 'react';
import Sidebar from '../components/SideBar';
import {useNavigate} from 'react-router-dom'

const NewCategory = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

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

    const addCategory = (e) =>{
        e.preventDefault();
        const data = {
            "name": name,
            "description": description
        }
        fetch("http://localhost:5000/api/v1/categories/",{
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getCookieValue("token")}`
          },
          body: JSON.stringify(data)
        }).then(res => res.json()).then(d => console.log(d));

        navigate('/Categories');
    }

  return (
    <div>
      <Sidebar/>
      <div className='mx-32 my-6'>
            <h2 className="text-2xl font-bold tracking-tight text-white">Add new Category</h2><br/>
            <form>
          <label>Category Name</label><br/>
          <input type="text" placeholder='Category Name' className='w-96 h-8 text-center rounded-lg mt-5 bg-gray-300 text-black' onChange={(e) => {
            setName(e.target.value)
          }} /><br/><br/>
          <label>Category Description</label><br/>
          <input type="text" placeholder='Category Description' className='w-96 h-8 text-center rounded-lg mt-5 bg-gray-300 text-black' onChange={(e) => {
            setDescription(e.target.value)
          }} /><br/><br/>
          <button className='w-96 h-8 text-center rounded-lg mt-5 bg-blue-950 text-black' onClick={addCategory}>Add Category</button>
        </form>
        </div>
    </div>
  )
}

export default NewCategory
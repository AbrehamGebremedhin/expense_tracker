import React, {useState} from 'react'
import Sidebar from '../components/SideBar'
import { useNavigate } from 'react-router-dom'

const NewAccount = () => {
    const [accountName, setAccountName] = useState("");
    const [accountNumber, setAccountNumber] = useState("");
    const [balance, setBalance] = useState();
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

    const addAccount = (e) =>{
        e.preventDefault();
        const data = {
            "name": accountName,
            "accountNumber": accountNumber,
            "balance": balance
        }
        fetch("http://localhost:5000/api/v1/account/",{
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getCookieValue("token")}`
          },
          body: JSON.stringify(data)
        }).then(res => res.json()).then(d => console.log(d));

        navigate('/Accounts');
    }

  return (
    <div>
        <Sidebar/>
        <div className='mx-32 my-6'>
            <h2 className="text-2xl font-bold tracking-tight text-white">Add new Account</h2><br/>
            <form>
          <label>Account Name</label><br/>
          <input type="text" placeholder='Account Name' className='w-96 h-8 text-center rounded-lg mt-5 bg-gray-300 text-black' onChange={(e) => {
            setAccountName(e.target.value)
          }} /><br/><br/>
          <label>Account Number</label><br/>
          <input type="text" placeholder='Account Number' className='w-96 h-8 text-center rounded-lg mt-5 bg-gray-300 text-black' onChange={(e) => {
            setAccountNumber(e.target.value)
          }} /><br/><br/>
          <label>Balance</label><br/>
          <input type="number" placeholder='Balance' className='w-96 h-8 text-center rounded-lg mt-5 bg-gray-300 text-black' onChange={(e) => {
            setBalance(e.target.value)
          }} /><br/><br/>
          <button className='w-96 h-8 text-center rounded-lg mt-5 bg-blue-950 text-black' onClick={addAccount}>Add Account</button>
        </form>
        </div>
    </div>
  )
}

export default NewAccount
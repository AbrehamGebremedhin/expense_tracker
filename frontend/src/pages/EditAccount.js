import React, {useState, useEffect} from 'react'
import Sidebar from '../components/SideBar'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

const EditAccount = () => {
    const [accountName, setAccountName] = useState("");
    const [accountNumber, setAccountNumber] = useState("");
    const [balance, setBalance] = useState();
    const [accounts, setAccounts] = useState({});
    const [error, setError] = useState(null);
    let { id } = useParams();
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
      
    
    const editAccount = (e) =>{
        //e.preventDefault();
        let data = JSON.stringify({
            "name": accountName,
            "accountNumber": accountNumber,
            "balance": balance
        });
          
        let config = {
            method: 'put',
            maxBodyLength: Infinity,
            url: `http://localhost:5000/api/v1/account/${id}/`,
            headers: { 
              'Content-Type': 'application/json', 
              'Authorization': `Bearer ${getCookieValue("token")}`
            },
            data : data
        };
          
          axios.request(config)
          .then((response) => {})
          .catch((error) => {});

        navigate('/Accounts');
    }

    useEffect(() => {
        const fetchAccounts = async () => {
          try {
            const response = await axios.get(`http://localhost:5000/api/v1/account/${id}/`, {
              headers: {
                'Authorization': `Bearer ${getCookieValue("token")}`
              }
            });
            setAccounts(response.data.data);
            setAccountName(response.data.data.name);
            setAccountNumber(response.data.data.accountNumber);
            setBalance(response.data.data.balance);
          } catch (error) {
            setError(error.message);
          }
        };    
    
        fetchAccounts();
      }, [id]);

  return (
    <div>
        <Sidebar/>
        <div className='mx-32 my-6'>
            <h2 className="text-2xl font-bold tracking-tight text-white">Edit Account</h2><br/>
            <form>
          <label>Account Name</label><br/>
          <input type="text" placeholder={`${accounts.name}`} className='w-96 h-8 text-center rounded-lg mt-5 bg-gray-300 text-black' onChange={(e) => {
            setAccountName(e.target.value)
          }} /><br/><br/>
          <label>Account Number</label><br/>
          <input type="text" placeholder={`${accounts.accountNumber}`} className='w-96 h-8 text-center rounded-lg mt-5 bg-gray-300 text-black' onChange={(e) => {
            setAccountNumber(e.target.value)
          }} /><br/><br/>
          <label>Balance</label><br/>
          <input type="number" placeholder={`${accounts.balance}`} className='w-96 h-8 text-center rounded-lg mt-5 bg-gray-300 text-black' onChange={(e) => {
            setBalance(e.target.value)
          }} /><br/><br/>
          <button className='w-96 h-8 text-center rounded-lg mt-5 bg-blue-950 text-black' onClick={()=>{editAccount()}}>Edit Account</button>
        </form>
        {error && <p className="text-red-500">Error: {error}</p>}
        </div>
    </div>
  )
}

export default EditAccount
import React from 'react'
import SideBar from '../components/SideBar'
import { GiPiggyBank } from "react-icons/gi";

const Accounts = () => {
  return (
    <div>
        <SideBar/>
        <div className='mx-32 my-4'>
          <p className=' text-white font-serif text-2xl font-extrabold'>Accounts Overview</p><br/>
          <div className='flex flex-col rounded-lg shadow-2xl bg-gray-950 text-white'>
            <GiPiggyBank size={128}/><br/>
            <p>Name goes here</p>
            <p>Balance goes here</p>
          </div>
        </div>
    </div>
  )
}

export default Accounts
import React from 'react'
import { BiCategory } from 'react-icons/bi'
import { BsGearFill } from 'react-icons/bs'
import { GrTransaction } from "react-icons/gr";
import { MdTableRows } from "react-icons/md";
import { CiBank, CiMoneyBill } from 'react-icons/ci';
import { GoGoal } from 'react-icons/go';
import { IoIosLogOut } from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate()
  const deleteCookie = (name) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  };

  const logoutUser = () => {
    // Delete the user cookie and redirect to login page
    deleteCookie('token')
    navigate('/')
  }

  return (
    <div className="fixed top-0 m-0 h-screen w-16 first-letter
                    flex flex-col bg-gray-900 text-white shadow-lg">
        <Link to={'/Home'}><SidebarIcon icon={<CiMoneyBill size={28}/>} text={'Home'}/></Link>
        <Link><SidebarIcon icon={<GrTransaction size={28}/>} text={'Manage Transaction'}/></Link>
        <Link to={'/Accounts'}><SidebarIcon icon={<CiBank size={28}/>} text={'Financial Accounts'} /></Link>
        <Link><SidebarIcon icon={<GoGoal size={28}/>} text={'Goals'}/></Link>
        <Link><SidebarIcon icon={<BiCategory size={28}/>} text={'Manage Categories'}/></Link>
        <Link><SidebarIcon icon={<MdTableRows size={28}/>} text={'Manage Budget'}/></Link>
        <Link><SidebarIcon icon={<BsGearFill size={28}/>} text={'Settings'}/></Link>
        <button onClick={logoutUser}><SidebarIcon icon={<IoIosLogOut size={28}/>} text={'Logout'}/></button>
    </div>
  )
}

const SidebarIcon = ({icon, text}) => (
    <div className="sidebar-icon group">
        {icon}

        <span className="sidebar-tooltip group-hover:scale-100">
            {text}
        </span>
    </div>
);

export default Sidebar
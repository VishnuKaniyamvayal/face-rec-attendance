import React, { useContext } from 'react'
import { AuthContext } from '../../Context/AuthContext'
import { useNavigate } from 'react-router-dom'

const Header = () => {

  const { user } = useContext(AuthContext)

  const { dispatch } = useContext(AuthContext)

  const navigate = useNavigate();

  return (
    <>
    <nav className='flex flex-row justify-between px-6 py-4 items-center'>
        {/* Name */}
        <h1 className='font-semibold text-2xl text-teal-800'>Attendance System Admin</h1>
        {/* Admin logo */}
        <div className='flex flex-row gap-3 items-center'>
        <img className='w-[50px] h-[50px] object-cover border border-teal-400 rounded-full' src={user.photo} alt="" />
        <p>{user.userFullName}</p>
        <button onClick={()=> { dispatch({type: "LOGOUT"}); navigate("/login")}} className='font-semibold ml-10'>Logout</button>
        </div>
    </nav>
    </>
  )
}

export default Header
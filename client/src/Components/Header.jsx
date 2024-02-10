import React from 'react'
import { useNavigate } from 'react-router-dom'

const Header = () => {
  const navigate = useNavigate();
  return (
    <>
        <nav className='grid-cols-1'>
            {/* System Name */}
            <div className='w-full flex justify-center align-middle py-6'>
                <h1 className='text-5xl font-bold text-teal-900'>Attendance System</h1>
            </div>
            {/* other options like login */}
            <div>
                <button onClick={()=>{navigate("/login")}} className='bg-gray-300 px-4 py-1 rounded-md hover:bg-gray-500 hover:text-white'>Admin Login</button>
            </div>
        </nav>
    </>
  )
}

export default Header
import React from 'react'

const Header = () => {
  return (
    <>
    <nav className='flex flex-row justify-between px-6 py-4 items-center'>
        {/* Name */}
        <h1 className='font-semibold text-2xl text-teal-800'>Attendance System Admin</h1>
        {/* Admin logo */}
        <div className='flex flex-row gap-3 items-center'>
        <img className='w-[50px] h-[50px] object-cover border border-teal-400 rounded-full' src="https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg" alt="" />
        <p>Admin</p>
        </div>
    </nav>
    </>
  )
}

export default Header
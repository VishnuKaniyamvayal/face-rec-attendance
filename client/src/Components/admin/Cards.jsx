import React from 'react'

const Cards = () => {
  return (
    <div className='grid grid-cols-4 mx-5 gap-3 mt-5'>
        <div className='bg-white rounded-md shadow-md flex-col justify-start px-5 py-4'>
            <h4 className='text-left font-bold text-2xl text-teal-600'>Total Students</h4>
            <p className='text-left text-xl'>{"1230"}</p>
        </div>
        <div className='bg-white rounded-md shadow-md flex-col justify-start px-5 py-4'>
            <h4 className='text-left font-bold text-2xl text-green-800'>Students Persent</h4>
            <p className='text-left text-xl'>{"1230"}</p>
        </div>
        <div className='bg-white rounded-md shadow-md flex-col justify-start px-5 py-4'>
            <h4 className='text-left font-bold text-2xl text-red-800'>Students Absent</h4>
            <p className='text-left text-xl'>{"1230"}</p>
        </div>
        <div className='bg-white rounded-md shadow-md flex-col justify-start px-5 py-4'>
            <h4 className='text-left font-bold text-2xl text-orange-800'>Attendance Percentage</h4>
            <p className='text-left text-xl'>{"1230"}</p>
        </div>
        <div className='bg-white rounded-md shadow-md flex-col justify-start px-5 py-4'>
            <h4 className='text-left font-bold text-2xl text-amber-800'>Late</h4>
            <p className='text-left text-xl'>{"1230"}</p>
        </div>
        
    </div>
  )
}

export default Cards
import React, { useEffect, useState } from 'react'
import axios from "axios"
const Cards = () => {

    const [ totalStudents , setTotalStudents ] = useState("");
    const [ studentsPresent , setstudentsPresent ] = useState("");
    const [ absent , setAbsent ] = useState("");
    const [ attendancePer , setAttendancePer ] = useState("");
    const [ late , setLate ] = useState("");

    const fetchData = async()=>{
        const total = await axios.get(process.env.REACT_APP_BASE_URL + "api/student/getallstudents");
        setTotalStudents(total.data.length)
        const Present = await axios.get(process.env.REACT_APP_BASE_URL + "api/student/getstudentswithstatus");
        const studentsWithStatus = Present.data.filter(student => student.status == "Present");
        console.log(Present.data)
        setstudentsPresent(studentsWithStatus.length)
        const studentsAbsent = Present.data.filter(student => student.status == "Absent");
        setAbsent(studentsAbsent.length)
        const studentsLate = Present.data.filter(student => student.status == "Late");
        setLate(studentsLate.length)
        setAttendancePer(Math.floor((studentsPresent/totalStudents)*100) + "%" )
    }

    useEffect(()=>{
        fetchData();
    },[])
    
    

  return (
    <div className='grid grid-cols-4 mx-5 gap-3 mt-5'>
        <div className='bg-white rounded-md shadow-md flex-col justify-start px-5 py-4'>
            <h4 className='text-left font-bold text-2xl text-teal-600'>Total Students</h4>
            <p className='text-left text-xl'>{totalStudents}</p>
        </div>
        <div className='bg-white rounded-md shadow-md flex-col justify-start px-5 py-4'>
            <h4 className='text-left font-bold text-2xl text-green-800'>Students Present</h4>
            <p className='text-left text-xl'>{studentsPresent}</p>
        </div>
        <div className='bg-white rounded-md shadow-md flex-col justify-start px-5 py-4'>
            <h4 className='text-left font-bold text-2xl text-red-800'>Students Absent</h4>
            <p className='text-left text-xl'>{absent}</p>
        </div>
        <div className='bg-white rounded-md shadow-md flex-col justify-start px-5 py-4'>
            <h4 className='text-left font-bold text-2xl text-orange-800'>Attendance Percentage</h4>
            <p className='text-left text-xl'>{attendancePer}</p>
        </div>
        <div className='bg-white rounded-md shadow-md flex-col justify-start px-5 py-4'>
            <h4 className='text-left font-bold text-2xl text-amber-800'>Late</h4>
            <p className='text-left text-xl'>{late}</p>
        </div>
        
    </div>
  )
}

export default Cards
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import { MdAdd } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import axios from "axios"

const StudentMain = () => {

    const [searchDep  , setSearchDep] = useState();
    const [searchYear  , setSearchYear] = useState();
    const [searchField  , setSearchField] = useState();
    const [data  , setData] = useState();

    const BASE_URL = process.env.REACT_APP_BASE_URL

    const navigate = useNavigate();

    const fetchStudent = async() =>{
        try {
            const response = await axios.get(BASE_URL+"api/student/getallstudents");
            setData(response.data);
        } catch (error) {
            console.log(error)
        }
    }

    const deleteStudent = async(su_id)=>{
        try {
            const response = await axios.delete(BASE_URL + "api/student/removestudent/"+su_id)
            setData((prevData) => prevData.filter((record) => record.su_id !== su_id));
            alert(response.data.message);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        
        fetchStudent();

    },[])

    const columns = [
        {
            name: 'S No',
            cell: (row, index) => index + 1,
            sortable: true,
            maxWidth:"10px"
        },
        {
            name: 'Student Name',
            selector: row => row.studentName,
            sortable: true,
        },
        {
            name: 'Roll Number',
            selector: row => row.roll,
            sortable: true,
        },
        {
            name: 'Department',
            selector: row => row.department,
            sortable: true,
        },
        {
            name: 'Gender',
            selector: row => row.gender,
            sortable: true,
        },
        {
            name: 'Year',
            selector: row => row.year,
            sortable: true,
        },
        ,
        {
            name: 'Action',
            width:"150px",
            cell:(row)=>{return(
                <div className='flex flex-row gap-4'>
                <button
                    className="bg-sky-500 px-2 rounded-md py-1 text-white"
                    id={row.su_ids}
                    onClick={()=>{ navigate("/editstudent/"+row.su_id) }} // replace with su_id
                    >
                    EDIT
                </button>
                <button onClick={()=>{deleteStudent(row.su_id)}} className='bg-red-500 px-2 rounded-md py-1 text-white'>DELETE</button> 
                </div>
            
            )}
            
        },
    ];


  return (
    <div>
        <div className='flex justify-end px-[200px] gap-5'>
        {/* <button className='bg-sky-500 text-white px-4 py-1 rounded-md mr-[200px]'>Add student</button> */}
        {/* dropdown Year */}
        <select id="countries" defaultValue={0} className="bg-white shadow-md border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5">
                <option value={0}>Year</option>
                <option >1st year</option>
                <option >2nd Year</option>
                <option >3rd year</option>
                <option >4th Year</option>
        </select>

         {/* dropdown Department */}

        <select id="countries" defaultValue={0} className="bg-white shadow-md border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5">
                <option value={0}>Department</option>
                <option>CSE</option>
                <option>ECE</option>
                <option>Mech</option>
                <option>EEE</option>
                <option>Civil</option>
        </select>
        <div className='flex flex-row rounded-lg items-center justify-center gap-1 bg-sky-400 px-3 hover:bg-sky-500' onClick={()=>{navigate("/addstudent")}}>
            <MdAdd size={"21"} className='text-white'/>
            <button className='text-nowrap text-white'>Add Student</button>
        </div>        
        </div>
        <DataTable className='max-w-5xl mx-auto border rounded-lg mt-4'
            columns={columns}
            data={data}
            pagination
            highlightOnHover={true}
            paginationPerPage={"8"}
        />
    </div>
  )
}

export default StudentMain
import React, { useContext, useEffect, useState } from 'react'
import axios from "axios"
import { AuthContext } from "../../Context/AuthContext"
import DataTable from 'react-data-table-component'

const StudentList = () => {

    const [ data , setData ] = useState();

    // const[punchId , setPunchId] = useState(null);
    // const[status , setStatus] = useState(null);

    const { user } = useContext(AuthContext)

    const fetchData = async()=>{
        try{
            const response = await axios.get(process.env.REACT_APP_BASE_URL + "api/student/getstudentswithstatus/");
            setData(response.data)
            console.log(response.data)
        }
        catch(err){
            console.log(err)
        }
    }

    const handleChange = async( punchId , status )=>{
        try{
            const response = await axios.post( process.env.REACT_APP_BASE_URL + "api/student/updatepunch/"+ punchId ,{ isInformed:status });
            if(response.status)
            {
                alert("Updated");
            };

        }
        catch(error){
            console.log(error)
        }
        
    }

    useEffect(()=>{
        fetchData();
    },[]);

    const columns = [
        {
            name: 'S No',
            cell: (row, index) => index + 1,
            sortable: true,
            maxWidth:"10px"
        },
        {
            name: 'Student Name',
            selector: row => row.student.studentName,
            sortable: true,
        },
        {
            name: 'Roll Number',
            selector: row => row.student.roll,
            sortable: true,
        },
        {
            name: 'Department',
            selector: row => row.student.department,
            sortable: true,
        },
        {
            name: 'Gender',
            selector: row => row.student.gender,
            sortable: true,
        },
        {
            name: 'Year',
            selector: row => row.student.year,
            sortable: true,
        },
        ,
        {
            name: 'Status',
            width:"150px",
            cell:(row)=>{return(
                <div className=''>
                {
                    row.status == "Present" ? <p className="text-green-500"> "Present" </p> : (row.status == "Late" ? <p className="text-yellow-600">Late</p>:<p className="text-red-500">Absent</p>)
                }
                </div>
            
            )}
            
        },
        {
            name: 'Late Submission (if Late)',
            width:"180px",
            cell:(row)=>{return(
                row.status == "Late"?
                <div className=''>
                    <select onChange={async(e)=>{ await handleChange( row.punchId , e.target.value )}} title={!user.isAdmin ? "Only Admins can update" : "Change the dropdown to update"} name="" id="" defaultValue={row.isInformed} disabled={!user.isAdmin} className="text-md px-2 py-1 bg-sky-500 text-white rounded-lg text-center disabled:bg-slate-400">
                        <option value={true}>Yes</option>
                        <option value={false}>No</option>
                    </select>
                </div>
                :
                ""
            )}
            
        },
    ];


    return (
        <div className='flex flex-col'>
            <div className='flex flex-row m-3 justify-end gap-5'>
            {/* date */}
                <input type="date" className='border rounded-lg block p-2 shadow-md'/>
            {/* date  end*/}
            {/* dropdown department */}
            <select defaultValue={0} className="bg-white shadow-md border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5">
                <option value={0}>Year</option>
                <option >1st year</option>
                <option >2nd Year</option>
                <option >3rd year</option>
                <option >4th Year</option>
            </select>

            {/* dropdown department ends */}

            {/* dropdown Year */}

            <select defaultValue={0} className="bg-white shadow-md border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5">
                <option value={0}>Department</option>
                <option>CSE</option>
                <option>ECE</option>
                <option>Mech</option>
                <option>EEE</option>
                <option>Civil</option>
            </select>

            {/* dropdown Year ends */}
            </div>
            <DataTable className='max-w-6xl mx-auto border rounded-lg mt-4'
            columns={columns}
            data={data}
            pagination
            highlightOnHover={true}
            paginationPerPage={"8"}
            />
        </div>
    )
}

export default StudentList
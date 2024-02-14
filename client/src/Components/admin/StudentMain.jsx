import React, { useState } from 'react'
import DataTable from 'react-data-table-component'

const StudentMain = () => {

    const [searchDep  , setSearchDep] = useState();
    const [searchYear  , setSearchYear] = useState();
    const [searchField  , setSearchField] = useState();
    const [Data  , SetData] = useState();

    const columns = [
        {
            name: 'S.no',
            selector: row => row.id,
            sortable: true,
            maxWidth:"10px"
        },
        {
            name: 'Student Name',
            selector: row => row.name,
            sortable: true,
        },
        {
            name: 'Department',
            selector: row => row.department,
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
            selector: row => row.edits,
            sortable: true,
        },
    ];
    
    const data = [
          {
            id: "1",
            name: "tom cruise",
            year: '1954',
            department:"cse",
            edits: "EDIT" + " DELETE" 
        },
        {
            id: "2",
            name: "tom cruise",
            year: '1984',
            department:"cse",
            edits: "EDIT" + " DELETE" 
        },
        {
            id: 3,
            name: "tom cruise",
            year: '1984',
            department:"cse",
            edits: "EDIT" + " DELETE" 
        },
        {
            id: 4,
            name: "tom cruise",
            year: '1984',
            department:"cse",
            edits: "EDIT" + " DELETE" 
        },
        {
            id: 5,
            name: "tom cruise",
            year: '1984',
            department:"cse",
            edits: "EDIT" + " DELETE" 
        },
        {
            id: 6,
            name: "tom cruise",
            year: '1984',
            department:"cse",
            edits: "EDIT" + " DELETE" 
        },
        {
            id: 7,
            name: "tom cruise",
            year: '1984',
            department:"cse",
            edits: "EDIT" + " DELETE" 
        },
        {
            id: 8,
            name: "tom cruise",
            year: '1984',
            department:"cse",
            edits: "EDIT" + " DELETE" 
        },
        {
            id: 9,
            name: "tom cruise",
            year: '1984',
            department:"cse",
            edits: "EDIT" + " DELETE" 
        },
        {
            id: 10,
            name: "tom cruise",
            year: '1984',
            department:"cse",
            edits: "EDIT" + " DELETE" 
        },
        {
            id:11,
            name: "tom cruise",
            year: '1984',
            department:"cse",
            edits: "EDIT" + " DELETE" 
        },
        {
            id: 12,
            name: "tom cruise",
            year: '1984',
            department:"cse",
            edits: "EDIT" + " DELETE" 
        }
    ]

    const handleDepartment = (e) => {
        const filter  = e.target.value;
    }


  return (
    <div>
        <div className='flex justify-end px-[200px] gap-5'>
        {/* <button className='bg-sky-500 text-white px-4 py-1 rounded-md mr-[200px]'>Add student</button> */}
        {/* dropdown Year */}
        <select id="countries" defaultValue={0} onChange={handleDepartment} className="bg-white shadow-md border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5">
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
        </div>
        <DataTable className='max-w-6xl mx-auto border rounded-lg mt-4'
            columns={columns}
            data={data}
            pagination
        />
    </div>
  )
}

export default StudentMain
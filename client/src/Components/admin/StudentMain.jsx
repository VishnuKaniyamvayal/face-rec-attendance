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
    ];
    
    const data = [
          {
            id: "1",
            name: "Favas",
            year: '1954',
            department:"cse"
        },
        {
            id: "2",
            name: "favas ali",
            year: '1984',
            department:"cse"
        },
        {
            id: 3,
            name: "favas ali",
            year: '1984',
            department:"cse"
        },
        {
            id: 4,
            name: "favas ali",
            year: '1984',
            department:"cse"
        },
        {
            id: 5,
            name: "favas ali",
            year: '1984',
            department:"cse"
        },
        {
            id: 6,
            name: "favas ali",
            year: '1984',
            department:"cse"
        },
        {
            id: 7,
            name: "favas ali",
            year: '1984',
            department:"cse"
        },
        {
            id: 8,
            name: "favas ali",
            year: '1984',
            department:"cse"
        },
        {
            id: 9,
            name: "favas ali",
            year: '1984',
            department:"cse"
        },
        {
            id: 10,
            name: "favas ali",
            year: '1984',
            department:"cse"
        },
        {
            id:11,
            name: "favas ali",
            year: '1984',
            department:"cse"
        },
        {
            id: 12,
            name: "favas ali",
            year: '1984',
            department:"cse"
        },
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
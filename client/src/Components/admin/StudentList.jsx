import React from 'react'

const StudentList = () => {
    return (
        <div className='flex flex-col'>
            <div className='flex flex-row m-3 justify-end gap-5'>
            {/* date */}
                <input type="date" className='border rounded-lg block p-2 shadow-md'/>
            {/* date  end*/}
            {/* dropdown department */}
            <select id="countries" defaultValue={0} className="bg-white shadow-md border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5">
                <option value={0}>Year</option>
                <option >1st year</option>
                <option >2nd Year</option>
                <option >3rd year</option>
                <option >4th Year</option>
            </select>

            {/* dropdown department ends */}

            {/* dropdown Year */}

            <select id="countries" defaultValue={0} className="bg-white shadow-md border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5">
                <option value={0}>Department</option>
                <option>CSE</option>
                <option>ECE</option>
                <option>Mech</option>
                <option>EEE</option>
                <option>Civil</option>
            </select>

            {/* dropdown Year ends */}
            </div>
            <table className='table-auto bg-white rounded-md shadow-md my-5 mx-2'>
                <thead className=''>
                    <tr className='py-4'>
                        <th className='py-4'>S.No</th>
                        <th className='py-4'>Student Name</th>
                        <th className='py-4'>Punch Time (if Available)</th>
                        <th className='py-4'>Year</th>
                        <th className='py-4'>Department</th>
                        <th className='py-4'>Status</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className='border'>
                        <td className='py-4'>1</td>
                        <td className='py-4'>John doe</td>
                        <td className='py-4'>2023</td>
                        <td className='py-4'>454</td>
                        <td className='py-4'>CSE</td>
                        <td className='py-4 text-red-500'>Absent</td>
                    </tr>
                    <tr className='border'>
                        <td className='py-4'>1</td>
                        <td className='py-4'>John doe</td>
                        <td className='py-4'>2023</td>
                        <td className='py-4'>454</td>
                        <td className='py-4'>CSE</td>
                        <td className='py-4 text-red-500'>Absent</td>
                    </tr>
                    <tr className='border'>
                        <td className='py-4'>1</td>
                        <td className='py-4'>John doe</td>
                        <td className='py-4'>2023</td>
                        <td className='py-4'>454</td>
                        <td className='py-4'>CSE</td>
                        <td className='py-4 text-green-400'>Present</td>
                    </tr>
                    <tr className='border'>
                        <td className='py-4'>1</td>
                        <td className='py-4'>John doe</td>
                        <td className='py-4'>2023</td>
                        <td className='py-4'>454</td>
                        <td className='py-4'>CSE</td>
                        <td className='py-4 text-orange-400'>Late</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default StudentList
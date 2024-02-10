import React from 'react'
import Cards from '../Components/admin/Cards'
import Header from '../Components/admin/Header'
import Sidebar from '../Components/admin/Sidebar'
import StudentList from '../Components/admin/StudentList'

const AdminPannel = () => {
  return (
    <div className='bg-[#F8F9FE]'>
    <Sidebar/>
    <Header/>
    <Cards/>
    <StudentList/>
    </div>
  )
}

export default AdminPannel
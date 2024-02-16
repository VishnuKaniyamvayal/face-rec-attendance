import React, { useContext, useEffect } from 'react'
import Cards from '../Components/admin/Cards'
import Header from '../Components/admin/Header'
import Sidebar from '../Components/admin/Sidebar'
import StudentList from '../Components/admin/StudentList'
import { AuthContext } from '../Context/AuthContext'
import { useNavigate } from 'react-router-dom'

const AdminPannel = () => {

  const { user } = useContext(AuthContext)

  const navigate = useNavigate();

  useEffect(()=>{
    if(!user)
    {
      navigate("/login");
    }
  })

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
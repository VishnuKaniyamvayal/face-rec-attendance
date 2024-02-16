import React, { useContext, useEffect } from 'react'
import Header from '../Components/admin/Header'
import Sidebar from '../Components/admin/Sidebar'
import StudentMain from '../Components/admin/StudentMain'
import { AuthContext } from '../Context/AuthContext'
import { useNavigate } from 'react-router-dom'

const Students = () => {
 
    const { user } = useContext(AuthContext)

    const navigate = useNavigate();


    useEffect(()=>{
        if(!user)
        {
            navigate("/login")
        }
    })


    return (
        <>
            <Sidebar />
            <Header />
            <StudentMain/>

        </>
    )
}

export default Students
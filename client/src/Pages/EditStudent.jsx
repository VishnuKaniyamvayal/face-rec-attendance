import { useContext, useEffect } from "react";
import EditStudentForm from "../Components/admin/EditStudentForm"
import Header from "../Components/admin/Header";
import Sidebar from "../Components/admin/Sidebar";
import { AuthContext } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";

const EditStudent = ()=>{

    const { user } = useContext(AuthContext)

    const navigate = useNavigate();

    useEffect(()=>{
        if(!user)
     {
      navigate("/login");
     }
    })

    return (
        <>
        <Sidebar/>
        <Header/>        
        <EditStudentForm/>
        </>
    )
}

export default EditStudent
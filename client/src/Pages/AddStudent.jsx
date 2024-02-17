import { useContext, useEffect } from "react";
import AddStudentForm from "../Components/admin/AddStudentForm"
import Header from "../Components/admin/Header";
import Sidebar from "../Components/admin/Sidebar";
import { AuthContext } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";

const AddStudent = ()=>{

    const { user } = useContext(AuthContext)

    const navigate = useNavigate();

    useEffect(()=>{
        if(!user)
        {
            navigate("/login")
        }
    },[])

    return (
        <>
        <Sidebar/>        
        <Header/>
        <AddStudentForm/>
        </>
    )
}

export default AddStudent
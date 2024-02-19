import { useContext, useEffect } from "react";
import AddStaffForm from "../Components/admin/AddStaffForm"
import Header from "../Components/admin/Header";
import Sidebar from "../Components/admin/Sidebar";
import { AuthContext } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";

const AddStaff = ()=>{

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
        { 
        user.isAdmin ?
         
        <AddStaffForm/>
        :
        <div>
            <h1 className="text-blue-500">Only Admins can add Users !</h1>
        </div>
        }
        </>
    )
}

export default AddStaff
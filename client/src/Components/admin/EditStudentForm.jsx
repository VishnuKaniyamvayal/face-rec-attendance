import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios"
const AddStudentForm = () => {

    const { id } = useParams();

    const fetchStudent = async()=>{
        const response = await axios.get(process.env.REACT_APP_BASE_URL + "api/student/getstudent/" + id)
        const student = response.data;
        setDepartment(student.department);
        setStudentName(student.studentName);
        setGender(student.gender);
        setRoll(student.roll);
        setYear(student.year);
    }

    const navigate = useNavigate();

    useEffect(() => {
        fetchStudent();

    }, []);

    const [studentName, setStudentName] = useState("");
    const [roll, setRoll] = useState("");
    const [department, setDepartment] = useState("");
    const [year, setYear] = useState("");
    const [gender, setGender] = useState("");



    const changeName = (e) => { setStudentName(e.target.value) }
    const changeRoll = (e) => { setRoll(e.target.value) }
    const changeDepartment = (e) => { setDepartment(e.target.value) }
    const changeYear = (e) => { setYear(e.target.value);}
    const changeGender = (e) => { setGender(e.target.value);}

    const updateStudent = () =>{
        try {
            const data = {
                studentName,
                roll,
                department,
                year,
                gender,
                su_id : id
            } 
            const response = axios.post(process.env.REACT_APP_BASE_URL + "api/student/updatestudent",data);
            if(response)
            {
                navigate("/students");
            }
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div className="grid grid-cols-1 md:grid-cols-2 px-5">

            <div>

                <h1 className="text-4xl my-5">Add Student</h1>
                <div className="flex flex-col gap-6 justify-start items-center">
                    <div>
                        <label className="font-bold text-left">Student Name:</label><br />
                        <input placeholder="John" className="border border-teal-400 rounded-lg w-[250px] px-3 h-8" type="text" onChange={changeName} value={studentName} />
                    </div>
                    <div>
                        <label className="font-bold text-left">Roll Number:</label><br />
                        <input placeholder="7689889" className="border border-teal-400 rounded-lg w-[250px] px-3 h-8" type="text" onChange={changeRoll} value={roll} />
                    </div>
                    <label className="font-bold text-left">Student Department</label>
                    {/* dropdown Year */}
                    <select value={department} onChange={changeDepartment} className="bg-white shadow-md border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5">
                        <option value={""}>Select</option>
                        <option value={"CSE"}>CSE</option>
                        <option value={"ECE"}>ECE</option>
                        <option value={"MECH"}>MECH</option>
                        <option value={"EEE"}>EEE</option>
                        <option value={"CIVIL"}>CIVIL</option>
                    </select>
                    <label className="font-bold text-left">Student Year</label>
                    <select onChange={changeYear} value={year} className="bg-white shadow-md border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5">
                        <option value={"1st year"}>1st year</option>
                        <option value={"2nd year"}>2st year</option>
                        <option value={"3rd year"}>3st year</option>
                        <option value={"4th year"}>4st year</option>
                    </select>
                    <label className="font-bold text-left">Gender</label>
                    <select onChange={changeGender} value={gender} className="bg-white shadow-md border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5">
                        <option value={""}>Select</option>
                        <option value={"Male"}>Male</option>
                        <option value={"Female"}>Female</option>
                    </select>
                </div>
                <button onClick={()=>{if(window.confirm("Are you sure to Update Record")){updateStudent();}}}  className="mt-6  px-5 py-1 text-xl bg-green-400 hover:bg-green-500 rounded-lg text-white shadow-lg">Update Student</button>
            </div>
        </div>
    )
}

export default AddStudentForm
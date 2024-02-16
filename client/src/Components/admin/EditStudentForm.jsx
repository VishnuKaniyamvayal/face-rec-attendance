import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";

const AddStudentForm = () => {

    const { id } = useParams();

    const navigate = useNavigate()

    const { user } = useContext(AuthContext)

    useEffect(() => {
        if(!user)
        {
            navigate("/login")
        }
        console.log(id)
        // fetch student data from database and append

    }, []);

    const [studentName, setStudentName] = useState("");
    const [roll, setRoll] = useState("");
    const [department, setDepartment] = useState(0);
    const [year, setYear] = useState(0);



    const changeName = (e) => { setStudentName(e.target.value) }
    const changeRoll = (e) => { setRoll(e.target.value) }
    const changeDepartment = (e) => { setDepartment(e.target.value) }
    const changeYear = (e) => { setYear(e.target.value);}


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
                    <select onChange={changeDepartment} defaultValue={department} className="bg-white shadow-md border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5">
                        <option value={0}>Department</option>
                        <option value={1}>CSE</option>
                        <option value={2}>ECE</option>
                        <option value={3}>MECH</option>
                    </select>
                    <label className="font-bold text-left">Student Year</label>
                    <select onChange={changeYear} defaultValue={year} className="bg-white shadow-md border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5">
                        <option value={0}>Year</option>
                        <option value={1}>1st year</option>
                        <option value={2}>1st year</option>
                        <option value={3}>1st year</option>
                        <option value={4}>1st year</option>
                    </select>
                </div>
                <button  className="mt-6  px-5 py-1 text-xl bg-green-400 hover:bg-green-500 rounded-lg text-white shadow-lg">Update Student</button>
            </div>
        </div>
    )
}

export default AddStudentForm
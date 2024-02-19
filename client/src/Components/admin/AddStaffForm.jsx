import React, { useEffect, useState } from "react";
import axios from "axios"

const AddStaffForm = () => {

  const BASE_URL = process.env.REACT_APP_BASE_URL;

  // load the models

  useEffect(() => {

  }, []);

  const [userFullName, setuserFullName] = useState("");
  const [address, setAddress] = useState("");
  const [photo, setPhoto] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [MobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(true);
  const [userType, setUserType] = useState("");

  const [camVisible, setCamVisible] = useState(false);



  const changeName = (e) => { setuserFullName(e.target.value); }
  const changeaddress = (e) => { setAddress(e.target.value); }
  const changePhoto = (e) => { setPhoto(e.target.value); }
  const changeDob = (e) => { setDob(e.target.value); }
  const changeGender = (e) => { setGender(e.target.value) }
  const changeMobile = (e) => { setMobileNumber(e.target.value) }
  const changeUserType = (e) => {
    setUserType(e.target.value);
    if (e.target.value == "Admin") {
      setIsAdmin(true);
    }
    else {
      setIsAdmin(false);
    }
  }

  const handleSubmit = async () => {
    try {
      const data = {
        address,
        photo,
        isAdmin,
        userType,
        userFullName,
        dob,
        gender,
        MobileNumber,
        email,
        password
      }

      const response = await axios.post( BASE_URL + "api/auth/register" , data ) 
      console.log(response)
      
      if(response.status == 200)
      {
        alert("User Added Successfully");
        setuserFullName("")
        setAddress("")
        setPhoto("")
        setDob("")
        setGender("")
        setMobileNumber("")
        setEmail("")
        setPassword("")
        setIsAdmin("")
        setUserType("")
      }
    } catch (error) {
      console.log(error)
    }

  }


  return (
    <div className="grid grid-cols-1 md:grid-cols-2 px-5 gap-5">
        <div className="flex flex-col gap-6 justify-start items-center">
          <h1 className="text-4xl my-5">Add Staff</h1>
          <div>
            <label className="font-bold text-left">Staff Full Name:</label><br />
            <input placeholder="John Doe" className="border border-teal-400 rounded-lg w-[250px] px-3 h-8" type="text" onChange={changeName} value={userFullName} />
          </div>
          <div>
            <label className="font-bold text-left">Address:</label><br />
            <input placeholder="Ex: 2nd street, kvk " className="border border-teal-400 rounded-lg w-[250px] px-3 h-8" type="text" onChange={changeaddress} value={address} />
          </div>
          <div>
            <label className="font-bold text-left">Photo url:</label><br />
            <input placeholder="https://photo.com/url" className="border border-teal-400 rounded-lg w-[250px] px-3 h-8" type="text" onChange={changePhoto} value={photo} />
          </div>
          <div>
            <label className="font-bold text-left">Date of birth</label><br />
            <input placeholder="" className="border border-teal-400 rounded-lg w-[250px] px-3 h-8" type="Date" onChange={changeDob} value={dob} />
          </div>
          <label className="font-bold text-left">Gender</label>
          <select onChange={changeGender} defaultValue={gender} className="bg-white shadow-md border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5">
            <option value={""}>Select</option>
            <option value={"Male"}>Male</option>
            <option value={"Female"}>Female</option>
          </select>
          <div>
            <label className="font-bold text-left">Mobile Number:</label><br />
            <input placeholder="768XXXXXX" className="border border-teal-400 rounded-lg w-[250px] px-3 h-8" type="text" onChange={changeMobile} value={MobileNumber} />
          </div>
        </div>
        <div>

          <div className="flex flex-col justify-start items-center mt-10">
            <label className="font-bold text-left">email</label><br />
            <input placeholder="example@company.com" className="border border-teal-400 rounded-lg w-[250px] px-3 h-8" type="email" onChange={(e) => { setEmail(e.target.value) }} value={email} />
          </div>
          <div>
            <label className="font-bold text-left">Password</label><br />
            <input placeholder="" className="border border-teal-400 rounded-lg w-[250px] px-3 h-8" type="password" onChange={(e) => { setPassword(e.target.value) }} value={password} />
          </div>
          <label className="font-bold text-left my-5">User Type</label>
          {/* dropdown Year */}<br></br>
          <select onChange={changeUserType} defaultValue={userType} className="bg-white shadow-md border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  p-2.5">
            <option value={""}>Select</option>
            <option value={"Admin"}>Admin</option>
            <option value={"Staff"}>Staff</option>
          </select><br></br>
          <button onClick={handleSubmit} className="mt-6  px-5 py-1 text-xl bg-green-400 hover:bg-green-500 rounded-lg text-white shadow-lg">Add Admin</button>
        </div>
    </div>
  )
}

export default AddStaffForm
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../Context/AuthContext.js'
import { useNavigate } from "react-router-dom"




const Login = () => {
    
    const { dispatch } = useContext(AuthContext)
    const [ email , setEmail ] = useState("");
    const [ password , setPassword ] = useState("");
    const [error, setError] = useState("")

    const navigate = useNavigate();

    const API = process.env.REACT_APP_BASE_URL

    const { user } = useContext(AuthContext)

    useEffect(()=>{
        if(user)
        {
            navigate("/dashboard");
            console.log(user)
            // return;
        }
    })

    const handleSubmit = async ()=>{
        dispatch({ type: "LOGIN_START" });
        if( !email || !password )
        {
            alert("Please Fill All Fields");
        }
        else
        {
            try{
                const response =  await axios.post( API+"api/auth/signin" , {
                    email: email,
                    password:password
                } )
                dispatch({ type: "LOGIN_SUCCESS", payload: response.data });
                navigate("/dashboard")
            }
            catch(err)
            {
                dispatch({ type: "LOGIN_FAILURE", payload: err })
                setError("Wrong Password Or Username");                
            }
        }
    }


    return (
        <>
            <div className='flex justify-center h-screen mt-[200px]'>
                <div class="w-full max-w-sm">
                    <h1 className='text-3xl font-semibold'>Admin Login</h1>
                    <form class="bg-white shadow-xl rounded px-8 pt-6 pb-8 mb-4">
                        <div class="mb-4">
                            <label class="block text-gray-700 text-sm font-bold mb-2" for="Email">
                                Email
                            </label>
                            <input value={email} onChange={(e)=>{setEmail(e.target.value)}} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username" />
                        </div>
                        <div class="mb-6">
                            <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
                                Password
                            </label>
                            <input value={password} onChange={(e)=>{setPassword(e.target.value)}} class="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************" />
                        </div>
                        <div class="flex items-center justify-between">
                            <button onClick={handleSubmit} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                                Sign In
                            </button>
                            <a class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
                                Forgot Password?
                            </a>
                        </div>
                            <p className='text-red-500 my-5'>{error}</p>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login
import axios from 'axios';
import React, { useState } from 'react'


const Login = () => {

    const [ userName , setUserName ] = useState("");
    const [ password , setPassword ] = useState("");

    const handleSubmit = ()=>{
        if( !userName || !password )
        {
            alert("Please Fill All Fields");
        }
        else
        {
            // const response = axios.get()
        }
    }


    return (
        <>
            <div className='flex justify-center h-screen mt-[200px]'>
                <div class="w-full max-w-sm">
                    <h1 className='text-3xl font-semibold'>Admin Login</h1>
                    <form class="bg-white shadow-xl rounded px-8 pt-6 pb-8 mb-4">
                        <div class="mb-4">
                            <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                                Username
                            </label>
                            <input value={userName} onChange={(e)=>{setUserName(e.target.value)}} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username" />
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
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login
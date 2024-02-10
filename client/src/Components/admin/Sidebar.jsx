// Sidebar.js

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineDashboard } from "react-icons/ai";
import { PiStudentFill } from "react-icons/pi";
import { GiTeacher } from "react-icons/gi";
import { MdCamera } from "react-icons/md";

const Sidebar = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
        console.log(isSidebarOpen)
    };

    return (
        <div className={`transition-transform transform ${isSidebarOpen ? '' : '-translate-x-[150px]'}`}>
            <div className='bg-white shadow-xl h-screen w-50 fixed '>
                <div className="mt-10 flex flex-col items-center justify-start gap-6">
            <button onClick={toggleSidebar} className="bg-sky-400 ml-2 p-2 opacity-[30%] hover:opacity-[100%] text-white rounded-lg mt-5 shadow-md z-30 focus:outline-none mr-[-290px]">
               {isSidebarOpen ? "CloseSidebar" : "OpenSidebar" }
            </button>
                    <div className='flex items-center px-2'>
                        <Link to="/dashboard" className="block px-4 py-2 text-black hover:bg-gray-100">Dashboard</Link>
                        <AiOutlineDashboard size={30} />
                    </div>
                    <div className='flex items-center px-2'>
                        <Link to="/students" className="block px-4 py-2 text-black hover:bg-gray-100">Students</Link>
                        <PiStudentFill />
                    </div>
                    <div className='flex items-center px-2'>
                        <Link to="/teachers" className="block px-4 py-2 text-black hover:bg-gray-100">Teachers</Link>
                        <GiTeacher />
                    </div>
                    <div className='flex items-center px-2'>
                        <Link to="/attendance" className="block px-4 py-2 text-black hover:bg-gray-100">Attendance</Link>
                        <MdCamera />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;

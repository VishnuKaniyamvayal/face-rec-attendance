import React, { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import * as faceapi from "face-api.js"
import axios from "axios"

const AddStudentForm = () => {

    const webcamRef = useRef(null);

    const BASE_URL = process.env.REACT_APP_BASE_URL;

    // load the models

    useEffect(() => {
        const loadModels = async () => {
            // Load face detection models
            await faceapi.nets.ssdMobilenetv1.loadFromUri('/models');
            await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
            await faceapi.nets.faceRecognitionNet.loadFromUri('/models');
        };

        loadModels();


    }, []);

    const [studentName, setStudentName] = useState("");
    const [roll, setRoll] = useState("");
    const [department, setDepartment] = useState(0);
    const [year, setYear] = useState(0);
    const [faceDescriptor, setFaceDescriptor] = useState();

    const [camVisible, setCamVisible] = useState(false);



    const changeName = (e) => { setStudentName(e.target.value) }
    const changeRoll = (e) => { setRoll(e.target.value) }
    const changeDepartment = (e) => { setDepartment(e.target.value) }
    const changeYear = (e) => { setYear(e.target.value); setCamVisible(true) }


    // function to capture descriptor
    const capture = async () => {

        if (webcamRef.current) {
            const imageSrc = webcamRef.current.getScreenshot();
            const img = new Image();
            img.src = imageSrc;

            img.onload = async () => {
                const detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor();

                if (detections) {
                    setFaceDescriptor(detections.descriptor)
                    console.log("face data stored")
                }
            };
        }
    };

    //   function to add student hash

    function generateRandomHash() {
        return crypto.getRandomValues(new Uint32Array(4)).join('-');
    }

    // indexedDb function
    const openDB = () => {
        return new Promise((resolve, reject) => {
          const request = window.indexedDB.open('FaceDataRC', 1);
      
          request.onerror = (event) => {
            reject('Error opening database');
          };
      
          request.onupgradeneeded = (event) => {
            const db = event.target.result;
      
            // Create an object store only if it doesn't exist
            if (!db.objectStoreNames.contains('Data')) {
              const objectStore = db.createObjectStore('Data', { autoIncrement: true });
            }
          };
      
          request.onsuccess = (event) => {
            const db = event.target.result;
            resolve(db);
          };
        });
      };
      
      const appendDataToDB = async (newDataObject) => {
        try {
          const db = await openDB();
          const transaction = db.transaction(['Data'], 'readwrite');
          const objectStore = transaction.objectStore('Data');
      
          // Retrieve the existing array from IndexedDB
          const getRequest = objectStore.get(1); // Assuming 'id' is the key path
      
          getRequest.onsuccess = (event) => {
      
            // Store the updated array back in IndexedDB using 'put'
            const putRequest = objectStore.put(newDataObject); // No need to provide a key
      
            putRequest.onsuccess = (event) => {
              console.log('Data appended successfully.');
            };
      
            putRequest.onerror = (event) => {
              console.error('Error appending data:', putRequest.error);
            };
          };
      
          getRequest.onerror = (event) => {
            console.error('Error retrieving data:', getRequest.error);
          };
        } catch (error) {
          console.error('Error accessing IndexedDB:', error);
        }
      };
      
      const addStudentToDb = async( data )=>{

      try {
        const response = axios.post(BASE_URL+"api/student/addstudent", data );
      } catch (error) {
        console.log(error)
      }

      }
      
      
      

    //   student add function 
    const handleSubmit = () => {
        if (!studentName || !roll || !year || !department) {
            alert("Please fill all fields");
        }
        else if (!faceDescriptor) {
            setCamVisible(true);
            alert("Please scan your face")
        }
        else {
            // create a hash for student unique id
            var su_id = generateRandomHash();
            var studentData = {
                su_id,
                studentName,
                roll,
                year,
                department,
                faceDescriptor
            }
            var dataToDb = {
                su_id,
                studentName,
                roll,
                year,
                department
            } // face descriptor is not necessary

            appendDataToDB(studentData);
            addStudentToDb(dataToDb);
  
            // console.log("stored")
            setDepartment("");
            setFaceDescriptor();
            setStudentName("");
            setYear("");
            setRoll("");

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
                <button onClick={handleSubmit} className="mt-6  px-5 py-1 text-xl bg-green-400 hover:bg-green-500 rounded-lg text-white shadow-lg">Add Student</button>
                {/* <button onClick={fetchDataFromDB} className="mt-6  px-5 py-1 text-xl bg-green-400 hover:bg-green-500 rounded-lg text-white shadow-lg">Get</button> */}
            </div>
            {/* webcam */}
            <div>
                {
                    camVisible ?
                        <>
                            <Webcam
                                audio={false}
                                ref={webcamRef}
                                screenshotFormat="image/jpeg"
                                videoConstraints={{ facingMode: 'user' }}
                                className="md:w-[1000px] rounded-md "
                            />
                            <button onClick={capture} className="mt-2  px-5 py-1 text-xl bg-sky-400 hover:bg-sky-500 rounded-lg text-white shadow-sm">{faceDescriptor ? "Recan" : "Capture"}</button>

                        </>
                        : ""
                }
            </div>
        </div>
    )
}

export default AddStudentForm
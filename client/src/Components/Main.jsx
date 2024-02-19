import React, { useEffect, useRef, useState } from 'react';
import * as faceapi from 'face-api.js';
import Webcam from 'react-webcam';
import greenBox from '../images/greenBox.png';
import axios from "axios"

const Main = () => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [ face1 , setface ] = useState();
  const [ allDescriptors , setAllDescriptors ] = useState([]);
  const [ faceScanningLoader , setFaceScanningLoader ] = useState(false);

  // confirmation data 

  const [ studentName , setStudentName ] = useState();
  const [ roll , setRoll ] = useState();
  const [ department , setDepartment ] = useState();
  const [ year , setYear ] = useState();
  const [ gender , setGender ] = useState("");
  const [ su_id , setSu_id ] = useState("");

  const addPunch = async() =>{
    try {
      const response = await axios.post(process.env.REACT_APP_BASE_URL + "api/student/addpunch",{ su_id , studentName });
      alert(response.data.message);
      setStudentName("");
    } catch (error) {
      console.log(error)
      console.log("error"+error)
    }
  }

  useEffect(() => {
    const loadModels = async () => {
      // Load face detection models
      await faceapi.nets.ssdMobilenetv1.loadFromUri('/models');
      await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
      await faceapi.nets.faceRecognitionNet.loadFromUri('/models');
    };

    loadModels();
    

  }, []);

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

  const fetchDataFromDB = async () => {
    try {
      console.log("fetchDataFromDB");
      const db = await openDB();
      const transaction = db.transaction(['Data'], 'readonly');
      const objectStore = transaction.objectStore('Data');
  
      // Retrieve the data from the object store
      const getRequest = objectStore.getAll();
  
      getRequest.onsuccess = (event) => {
        const data = getRequest.result;
        setAllDescriptors(data)
        console.log(data)
      };
  
      getRequest.onerror = (event) => {
        console.error('Error retrieving data:', getRequest.error);
      };
    } catch (error) {
      console.error('Error accessing IndexedDB:', error);
    }
  };


  const capture = async () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      const img = new Image();
      img.src = imageSrc;

      img.onload = async () => {
        const detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor();
        
        if (detections) {
          const promise = new Promise((resolve, reject) => {
            setface(detections.descriptor); 
            resolve();
          });
          await promise;
            await promise;
            await fetchDataFromDB();
            console.log ( allDescriptors )
            let closestDescriptor = await findClosestFaceDescriptor( allDescriptors , face1 );
            console.log(closestDescriptor);
            // Punch logic
            setFaceScanningLoader(false)
            setStudentName(closestDescriptor.descriptor.studentName);
            setRoll(closestDescriptor.descriptor.roll);
            setYear(closestDescriptor.descriptor.year)
            setDepartment(closestDescriptor.descriptor.department)
            setGender(closestDescriptor.descriptor.gender)
            setSu_id(closestDescriptor.descriptor.su_id)
        }
      };
    }
  };

  const findClosestFaceDescriptor = async ( descriptorsObjects , queryDescriptor ) => {
    // Ensure descriptors and queryDescriptor are provided
    if (!descriptorsObjects) {
      throw new Error('descriptorsObjects and queryDescriptor are required.');
    }
    if (!queryDescriptor) {
      throw new Error('queryDescriptor are required.');
    }
  
    // Initialize variables to store closest descriptor and distance
    let closestDescriptor;
    let minDistance = Infinity;
  
    // Loop through each descriptor in the array
    for (const descriptorObject of descriptorsObjects) {
      // Calculate Euclidean distance between current descriptor and queryDescriptor
      const distance = faceapi.euclideanDistance(descriptorObject.faceDescriptor , queryDescriptor);
  
      // Update variables if current distance is smaller than the minimum
      if (distance < minDistance) {
        closestDescriptor = descriptorObject;
        minDistance = distance;
      }
    }
  
    // Return the closest face descriptor object and its distance
    return { descriptor: closestDescriptor, distance: minDistance };
  };
  

// // Function to compare two face descriptors
// const areFaceDescriptorsEqual = (descriptor1, descriptor2, distanceThreshold = 0.6) => {
//     // Ensure both descriptors are provided
//     if (!descriptor1 || !descriptor2) {
//       throw new Error('Face descriptors are required for comparison.');
//     }
  
//     // Calculate the Euclidean distance between the two face descriptors
//     const distance = faceapi.euclideanDistance(descriptor1, descriptor2);
  
//     // Compare the distance with the threshold
//     console.log(distance);
//     // return distance < distanceThreshold;
//   };

// const deleteall = ()=>{
// const dbName = 'FaceDataRC';

// const request = indexedDB.deleteDatabase(dbName);

// request.onsuccess = function(event) {
//   console.log('Database deleted:', dbName);
// };

// request.onerror = function(event) {
//   console.error('Error deleting database:', event.error);
// };
// }

  return (
    <div>
      <div className='grid grid-cols-2 mt-5 mx-2 gap-4'>
      <div style={{position:"relative"}}>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        videoConstraints={{ facingMode: 'user' }}
        className="md:w-[1000px] rounded-md border-x-4"
        />
       <img src={greenBox} alt="" style={{position:"absolute",zIndex:"10",top:"10px",left:"0",}} />
      </div>
      {/* details */}
      <>
        <div className='bg-teal-100 rounded-md flex gap-6 justify-start flex-col align-middle pt-5'>
            { !studentName ? 
            <div className=''>
              <h1 onClick={()=>{ setFaceScanningLoader(true); capture()}} className={`mx-auto text-2xl p-5 bg-gray-400 w-[200px] h-[200px] text-center pt-20 rounded-full text-white hover:bg-gray-500 cursor-pointer ${faceScanningLoader?"animate-pulse":""}`}>Scan Face</h1>
            </div>
              :
            <>
            <h2 className='font-bold text-2xl'>Student details</h2>
            <img className='w-[100px] h-[100px] mx-auto rounded-full' src="https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg" alt="" />
            <h5 className='font-semibold'>Sudent Name : {studentName}</h5>
            <h5 className='font-semibold'>Year : {year}</h5>
            <h5 className='font-semibold'>Roll Number : {roll}</h5>
            <h5 className='font-semibold'>Department : {department}</h5>
            <h5 className='font-semibold'>Gender : {gender} </h5>
            
            <p>Are the data above correct ?</p>
            <div>
            <button onClick={addPunch} className='bg-green-400 px-4 py-1 rounded-md mx-4 hover:bg-green-600 hover:text-white ease-in-out'>Confirm</button>
            <button onClick={()=>{setStudentName("")}} className='bg-blue-400 px-4 py-1 rounded-md mx-4 hover:bg-blue-600 hover:text-white ease-in-out'>Rescan</button>
            </div>
            </>
            }
        </div>
    </>
      </div>
       {/* <button onClick={fetchDataFromDB}> Get data </button> */}
       {/* <button onClick={()=>{areFaceDescriptorsEqual( allDescriptors[2].faceDescriptor , face1 )}}> calculate euc</button> */}
       {/* <button onClick={deleteall}> Delete</button> */}
    </div>
  );
};

export default Main;

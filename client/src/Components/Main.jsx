import React, { useEffect, useRef, useState } from 'react';
import * as faceapi from 'face-api.js';
import Webcam from 'react-webcam';

const Main = () => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [ face1 , setface ] = useState();


  useEffect(() => {
    const loadModels = async () => {
      // Load face detection models
      await faceapi.nets.ssdMobilenetv1.loadFromUri('/models');
      await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
      await faceapi.nets.faceRecognitionNet.loadFromUri('/models');
    };

    loadModels();


  }, []);
  // code to store face data in indexed db
  const openDB = () => {
    return new Promise((resolve, reject) => {
      const request = window.indexedDB.open('FaceDataPoints', 1);
  
      request.onerror = (event) => {
        reject('Error opening database');
      };
  
      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        const objectStore = db.createObjectStore('FaceData', { keyPath: 'id' });
      };
  
      request.onsuccess = (event) => {
        const db = event.target.result;
        resolve(db);
      };
    });
  };
  
  const storeDataInDB = async (data) => {
    try {
      const db = await openDB();
      const transaction = db.transaction(['FaceData'], 'readwrite');
      const objectStore = transaction.objectStore('FaceData');
      
      data.forEach((item) => {
        objectStore.add(item);
      });
    } catch (error) {
      console.error('Error storing data in IndexedDB:', error);
    }
  };
  

  
  // To use the functions:
  const yourData = [];
  storeDataInDB(yourData);
  

  


  const capture = async () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      const img = new Image();
      img.src = imageSrc;

      img.onload = async () => {
        const detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor();
        
        if (detections) {
            setface( detections.descriptor )
            console.log('Face Descriptor 1 stored' );
        }
      };
    }
  };


// Function to compare two face descriptors
const areFaceDescriptorsEqual = (descriptor1, descriptor2, distanceThreshold = 0.6) => {
    // Ensure both descriptors are provided
    if (!descriptor1 || !descriptor2) {
      throw new Error('Face descriptors are required for comparison.');
    }
  
    // Calculate the Euclidean distance between the two face descriptors
    const distance = faceapi.euclideanDistance(descriptor1, descriptor2);
  
    // Compare the distance with the threshold
    return distance < distanceThreshold;
  };

  return (
    <div>
      <div className='grid grid-cols-2 mt-5 mx-2 gap-4'>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        videoConstraints={{ facingMode: 'user' }}
        className="md:w-[1000px] rounded-md "
        />
      {/* details */}
      <>
        <div className='bg-teal-100 rounded-md flex gap-6 justify-start flex-col align-middle pt-5'>
            <h2 className='font-bold text-2xl'>Student details</h2>
            <img className='w-[100px] h-[100px] mx-auto rounded-full' src="https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg" alt="" />
            <h5 className='font-semibold'>Sudent Name : {"John"}</h5>
            <h5 className='font-semibold'>Year : {"3rd year"}</h5>
            <h5 className='font-semibold'>Department : {" Computer Science "}</h5>
            <h5 className='font-semibold'>Gender : {"Male"} </h5>
            <p>Are the data above correct ?</p>
            <div>
            <button className='bg-green-400 px-4 py-1 rounded-md mx-4 hover:bg-green-600 hover:text-white ease-in-out'>Confirm</button>
            <button className='bg-blue-400 px-4 py-1 rounded-md mx-4 hover:bg-blue-600 hover:text-white ease-in-out'>Rescan</button>
            </div>
        </div>
    </>
      </div>
       <button onClick={capture}>Capture Face </button>
      {/* <button onClick={handleClick}>Capture</button> */}
    </div>
  );
};

export default Main;

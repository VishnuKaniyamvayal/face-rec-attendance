import express from "express";


const router = express.Router();

router.get( "/getallstudents" , (req,res)=>{
    // code to get all the students
})

router.get( "/getbyyearanddep/:year/:department" , (req,res)=>{
    // code to get all the students
})

router.post( "/addstudent" , (req,res)=>{
    // code to add student
})

router.delete( "/removestudent" , (req,res)=>{
    // code to remove students
})

router.post( "/updatestudent" , (req,res)=>{
    // code to update student
})

router.get( "/getTodayspunches/" , (req,res)=>{
    // code to get all the student punches for today
})

router.post( "/updatepunch/:p_id" , (req,res)=>{
    // code to update punch
})

export default router
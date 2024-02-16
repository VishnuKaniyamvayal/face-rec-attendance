import express from "express";
import Student from "../models/Student";


const router = express.Router();

router.get( "/getallstudents" , (req,res)=>{
    // code to get all the students
})

router.get( "/getbyyearanddep/:year/:department" , (req,res)=>{
    // code to get all the students
})

router.post( "/addstudent" , async (req,res)=>{
    try{
        const student = new Student({
            su_id: req.body.su_id,
            studentName: req.body.studentName,
            roll: req.body.roll,
            studentName : req.body.year,
            department: req.body.department
        })
        const studentres = await student.save();
        res.status(201).json(studentres);
    }
    catch(err)
    {
        res.status(504).send(err);
    }
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
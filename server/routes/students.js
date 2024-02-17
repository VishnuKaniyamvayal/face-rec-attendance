import express from "express";
import Student from "../models/Student.js";


const router = express.Router();

router.get( "/getallstudents" , async (req,res)=>{
    try {
        const students = await Student.find({});
        res.status(200).json(students)
    } catch (error) {
        res.status(504).json("error");
    }
    
})

router.get( "/getstudent/:su_id" , async (req,res)=>{
    try {
        const su_id = req.params.su_id;
        const students = await Student.find({su_id:su_id});
        res.status(200).json(students[0])
    } catch (error) {
        res.status(504).json("error");
    }
    
})

router.get( "/getbyyearanddep/:year/:department" , (req,res)=>{
    // code to get all the students
})

router.post( "/addstudent" , async (req,res)=>{
    try{
        console.log(req.body)
        const student = new Student({
            su_id: req.body.su_id,
            studentName: req.body.studentName,
            roll: req.body.roll,
            year : req.body.year,
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

router.post( "/updatestudent" , async (req,res)=>{
    // code to update student
    try {
        const studentId = req.body.su_id;
        const updates = req.body; 
    
        const student = await Student.findOneAndUpdate(
            { su_id: studentId },
            updates,
            { new: true, runValidators: true } // Optionally return updated document
          );
    
        if (!student) {
            return res.status(404).json({ error: "Student not found" });
        }
        res.status(200).json(student);
        
    } catch (error) {
        res.status(500).json(error);
    }
})

router.delete("/removestudent/:su_id", async (req, res) => {
    try {
      const su_id = req.params.su_id;
  
      const student = await Student.findOneAndRemove({ su_id: su_id });
  
      if (!student) {
        return res.status(404).json({ error: "Student not found" });
      }
  
      res.status(200).json({ message: "Student removed successfully" });
    } catch (error) {
      res.status(500).json(error);
    }
  });

router.get( "/getTodayspunches/" , (req,res)=>{
    // code to get all the student punches for today
})

router.post( "/updatepunch/:p_id" , (req,res)=>{
    // code to update punch
})

export default router
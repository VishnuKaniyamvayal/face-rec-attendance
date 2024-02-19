import express from "express";
import Student from "../models/Student.js";
import Punch from "../models/Punch.js"
import moment from "moment"


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
            gender:req.body.gender,
            year : req.body.year,
            department: req.body.department,
            faceDescriptor:req.body.faceDescriptor
        })
        const students = await student.save();
        res.status(201).json(students);
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

router.post( "/updatepunch/:p_id" , async(req,res)=>{
    // code to update punch
    try {
        const punchId = req.params.p_id;
        const updates = req.body; 
        
        console.log(punchId)

        const punch = await Punch.findOneAndUpdate(
            { _id: punchId },
            updates,
            { new: true, runValidators: true } // Optionally return updated document
          );
    
        if (!punch) {
            return res.status(404).json({ error: "Punch" });
        }
        res.status(200).json(punch);
        
    } catch (error) {
        res.status(500).json(error);
    }
    
})

router.post( "/addpunch" , async (req,res)=>{
    // code to update punch
    try {
        // Check if a punch has already been recorded for the student on the current date
        const existingPunch = await Punch.findOne({
            studentName: req.body.studentName,
            su_id: req.body.su_id,
            createdAt: {
                $gte: moment().startOf('day'), // Check from the beginning of the current day
                $lt: moment().endOf('day') // Check until the end of the current day
            }
        });
        if (existingPunch) {
            // If punch already recorded for today, send a different status
            res.status(201).json({ message: 'Attendance already recorded for today' });
        } else {
            // If punch not recorded for today, save the new punch data
            const punchData = new Punch({
                studentName: req.body.studentName,
                su_id: req.body.su_id
            });
            const response = await punchData.save();
            res.status(201).json({message:"Attendance Recorded"});
        }
    } catch (error) {
        res.status(504).json(error)
        
    }
})


router.get("/getstudentswithstatus", async (req, res) => {
    try {
        // Fetch all students
        const students = await Student.find({});

        // Initialize an array to store student details with status
        const studentsWithStatus = [];

        // Iterate through each student
        for (const student of students) {
            // Find the latest punch for the student on the current date
            const latestPunch = await Punch.findOne({
                su_id: student.su_id,
                createdAt:{
                    $gte: moment().startOf('day'),
                    $lt: moment().endOf('day')
                }
            });

            // If a punch is found
            if (latestPunch) {
                // Assuming 'latestPunch.createdAt' is in UTC
                const punchTimeUTC = moment(latestPunch.createdAt);
                const nineThirtyUTC = moment().startOf('day').add({ hours: 9, minutes: 30 });
                const fourPMUTC = moment().startOf('day').add({ hours: 16, minutes: 0 });

                // Check if punch time is between 9:30 and 16:00 in UTC
                if (punchTimeUTC.isSameOrAfter(nineThirtyUTC) && punchTimeUTC.isBefore(fourPMUTC)) {
                    const hoursLate = punchTimeUTC.diff(nineThirtyUTC, 'hours');
                    studentsWithStatus.push({
                        student: student,
                        status: "Late",
                        hoursLate: hoursLate,
                        punchId: latestPunch._id,
                        isInformed: latestPunch.isInformed
                    });
                } else if (punchTimeUTC.isBefore(nineThirtyUTC)) {
                    // Check if punch is recorded before 9:30 in UTC
                    studentsWithStatus.push({
                        student: student,
                        status: "Present",
                    });
                } else {
                    // Punch time is after 16:00 in UTC
                    studentsWithStatus.push({
                        student: student,
                        status: "Absent",
                    });
                }
            } else {
                // No punch recorded for the student on the current date
                studentsWithStatus.push({
                    student: student,
                    status: "Absent",
                });
            }
        }
        // Send the result as JSON response
        res.status(200).json(studentsWithStatus);
    } catch (error) {
        // Handle errors
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

  
  




export default router
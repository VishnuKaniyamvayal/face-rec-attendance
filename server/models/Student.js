import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema({
    studentName: {
        type: String,
        require: true
    },
    roll: {
        type: String,
        require: true
    },
    year: {
        type: String,
        require: true
    },
    department: {
        type: String,
        require: true
    },
    gender: {
        type: String,
        require: true
    },
    su_id: {
        type: String,
        require: true
    },
},
    {
        timestamps: true
    });

export default mongoose.model("Student", StudentSchema);
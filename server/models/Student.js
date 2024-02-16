import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema({
    studentName: {
        type: String,
        require: true
    },
    studentRoll: {
        type: String,
        require: true
    },
    studentYear: {
        type: String,
        require: true
    },
    studentDepartment: {
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
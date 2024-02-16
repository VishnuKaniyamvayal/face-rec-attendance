import mongoose from "mongoose";

const PunchSchema = new mongoose.Schema({
    studentName: {
        type: String,
        require: true
    },
    su_id: {
        type: String,
        require: true
    }
},
    {
        timestamps: true
    });

export default mongoose.model("Punch", PunchSchema);
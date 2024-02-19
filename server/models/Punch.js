import mongoose from "mongoose";

const PunchSchema = new mongoose.Schema({
    studentName: {
        type: String,
        required: true
    },
    su_id: {
        type: String,
        required: true
    },
    punchTime:
    { type : Date,
    default: Date.now 
    }
},
    {
        timestamps: true
    });

export default mongoose.model("Punch", PunchSchema);
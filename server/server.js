import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import studentRoutes from './routes/students.js';

/* App Config */
dotenv.config();
const app = express();
const port = process.env.PORT || 4000;

/* Middlewares */
app.use(express.json());
app.use(cors());

// static folders
// app.use(express.static('uploads'));

/* API Routes */
app.use("/api/auth", authRoutes);
app.use("/api/Student", studentRoutes);

/* MongoDB connection */
const connectDB = async () => {
  try {
    const conn = await mongoose.connect("mongodb://localhost:27017/sample")
    console.log(`MongoDB Connected: ${conn.connection.host}`)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

connectDB();

app.get("/", (req, res) => {
  res.status(200).send("Welcome to LibraryApp");
});


app.get('/uploads/:filename', (req, res) => {
  const { filename } = req.params;
  const filePath = `uploads/${filename}`;
  res.sendFile(filePath, { root: '.' });
});

/* Port Listening In */
app.listen(port, () => {
  console.log(`Server is running in PORT ${port}`);
});

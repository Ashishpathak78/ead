const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors({
  origin: process.env.FRONTEND_URL || "*" // allow Vercel frontend
}));
app.use(express.json());

// MongoDB connection
mongoose
  .connect(
    "mongodb+srv://ap10ashu_db_user:kJ33n84ITWnvTK8y@cluster0.vknmtyx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Schema and Model
const studentSchema = new mongoose.Schema({
  name: String,
  rollNo: String,
  gender: String,
  skills: String,
});

const Student = mongoose.model("Student", studentSchema);

// Routes
app.post("/api/students", async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.status(201).send({ message: "Student added successfully" });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

app.get("/api/students", async (req, res) => {
  const students = await Student.find();
  res.send(students);
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB using Mongoose
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Doctor Schema
const doctorSchema = new mongoose.Schema({
  name: String,
  speciality: String,
  experience: Number,
  gender: String,
  location: String,
  languages: [String],
  consultationFee: Number,
  image: String, // Assuming image URL for the doctor's profile picture
});

// Doctor Model
const Doctor = mongoose.model('Doctor', doctorSchema);

// Add Doctor API
app.post('/api/add-doctor', async (req, res) => {
  try {
    const newDoctor = new Doctor(req.body);
    await newDoctor.save();
    res.status(201).json({ message: 'Doctor added successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// List Doctors with Filter and Pagination API
app.get('/api/list-doctor-with-filter', async (req, res) => {
  try {
    const { page = 1, limit = 10, gender, location, speciality } = req.query;

    const filter = {};
    if (gender) filter.gender = gender;
    if (location) filter.location = location;
    if (speciality) filter.speciality = speciality;

    const total = await Doctor.countDocuments(filter);
    const doctors = await Doctor.find(filter)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.json({ total, page: Number(page), limit: Number(limit), doctors });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

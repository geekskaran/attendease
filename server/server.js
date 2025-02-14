// File: server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log('MongoDB Connection Error:', err));

// Basic route
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to Attendance System API' });
});

// Routes will be imported here
// app.use('/api/auth', require('./routes/auth.routes'));
// app.use('/api/teachers', require('./routes/teacher.routes'));
// app.use('/api/students', require('./routes/student.routes'));
// app.use('/api/attendance', require('./routes/attendance.routes'));

// Add this route in server.js
app.use('/api/auth', require('./routes/auth.routes'));

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
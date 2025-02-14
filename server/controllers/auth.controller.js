// controllers/auth.controller.js
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

// Generate JWT Token
const generateToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// Register User (Teacher/Student)
exports.signup = async (req, res) => {
    try {
        const {
            userId,
            password,
            role,
            email,
            name,
            rollNumber,
            class: className,
            section,
            subjects,
            bluetoothId,
            teacherName
        } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ userId });
        if (existingUser) {
            return res.status(400).json({ message: 'User ID already exists' });
        }

        // Create user based on role
        const userData = {
            userId,
            password,
            role,
            email,
            name
        };

        if (role === 'student') {
            if (!bluetoothId) {
                return res.status(400).json({ message: 'Bluetooth ID is required for students' });
            }
            Object.assign(userData, {
                rollNumber,
                class: className,
                section,
                subjects,
                bluetoothId
            });
        } else if (role === 'teacher') {
            Object.assign(userData, {
                teacherName: name
            });
        }

        const user = new User(userData);
        await user.save();

        const token = generateToken(user._id);

        res.status(201).json({
            message: 'User registered successfully',
            token,
            user: {
                userId: user.userId,
                role: user.role,
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ message: 'Error in user registration' });
    }
};

// Login User
exports.login = async (req, res) => {
    try {
        const { userId, password, role } = req.body;

        // Find user
        const user = await User.findOne({ userId });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Verify role
        if (user.role !== role) {
            return res.status(401).json({ message: 'Invalid role' });
        }

        // Check password
        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate token
        const token = generateToken(user._id);

        res.json({
            message: 'Login successful',
            token,
            user: {
                userId: user.userId,
                role: user.role,
                name: user.name,
                email: user.email,
                ...(user.role === 'student' && {
                    rollNumber: user.rollNumber,
                    class: user.class,
                    section: user.section,
                    bluetoothId: user.bluetoothId
                })
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Error in login' });
    }
};

// Get Current User Profile
exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('-password');
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching profile' });
    }
};
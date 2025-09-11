const express = require('express');
const User = require('../models/User');
const router = express.Router();

// Signup Route
router.post('/signup', async (req, res) => {
    console.log("Request body:", req.body); // Debugging line
    const { username, email, phoneNumber, password } = req.body;

    try {
        
        if (!/^\d{10}$/.test(phoneNumber)) {
            return res.status(400).json({ message: "Phone number must be 10 digits" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already registered" });
        }

        const newUser = new User({ username, email, phoneNumber, password });
        await newUser.save();

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error("Signup error:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
});

// Login Route remains unchanged
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email, password });
        if (!user) {
            return res.status(400).json({ message: "User not registered" });
        }
        res.json({ message: "Login successful", redirect: "/features" });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

module.exports = router;

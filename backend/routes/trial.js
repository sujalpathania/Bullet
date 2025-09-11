const express = require('express');
const router = express.Router();
const Trialform = require('../models/Trialform'); // Ensure this matches your file name

// POST route to handle trial form submission
router.post('/', async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            phoneNumber,
            address,
            city,
            state,
            pincode,
            preferredDate,
            preferredTime
        } = req.body;

        const newTrial = new Trialform({
            firstName,
            lastName,
            email,
            phoneNumber,
            address,
            city,
            state,
            pincode,
            preferredDate,
            preferredTime
        });

        await newTrial.save();

        res.send(`
            <div style="font-family: Arial; text-align:center; padding:30px; background:#f8f9fa;">
                <h1 style="color:#28a745;">✅ Thank You, ${firstName}!</h1>
                <p>Your trial request has been submitted successfully.</p>
                <p>We will contact you at <strong style="color:#007bff;">${email}</strong>.</p>
                <hr>
                <p><strong>Preferred Date:</strong> ${new Date(preferredDate).toLocaleDateString()}</p>
                <p><strong>Preferred Time:</strong> ${preferredTime}</p>
                <a href="/features" style="display:inline-block; margin-top:20px; padding:10px 20px; background:#007bff; color:white; text-decoration:none; border-radius:5px;">Go Back</a>
            </div>
        `);

    } catch (error) {
        console.error("Trial submission error:", error);

        if (error.code === 11000) {
            return res.send(`
                <div style="font-family: Arial; text-align:center; padding:30px; background:#f8f9fa;">
                    <h1 style="color:red;">⚠ Email already exists!</h1>
                    <a href="/features" style="display:inline-block; margin-top:20px; padding:10px 20px; background:#007bff; color:white; text-decoration:none; border-radius:5px;">Go Back</a>
                </div>
            `);
        }

        res.send(`
            <div style="font-family: Arial; text-align:center; padding:30px; background:#f8f9fa;">
                <h1 style="color:red;">⚠ Server error. Please try again later.</h1>
                <pre>${error.message}</pre>
                <a href="/features" style="display:inline-block; margin-top:20px; padding:10px 20px; background:#007bff; color:white; text-decoration:none; border-radius:5px;">Go Back</a>
            </div>
        `);
    }
});

module.exports = router;

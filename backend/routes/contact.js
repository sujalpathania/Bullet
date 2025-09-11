const express = require('express');
const router = express.Router();
const Contact = require('../models/data'); // make sure this path is correct

// POST route to handle contact form submission
router.post('/', async (req, res) => {
    try {
        // Match the form input names
        const { name, email, message } = req.body;

        // Validate required fields
        // if (!name || !email || !message) {
        //     return res.send(`
        //         <div style="font-family: Arial; text-align:center; padding:30px; background:#f8f9fa;">
        //             <h1 style="color:red;">⚠ All fields are required!</h1>
        //             <a href="/contact" style="display:inline-block; margin-top:20px; padding:10px 20px; background:#007bff; color:white; text-decoration:none; border-radius:5px;">Go Back</a>
        //         </div>
        //     `);
        // }

        // Create a new contact document
        const newContact = new Contact({
            fullname: name, // Save as fullname in DB
            email,
            message
        });

        // Save to database
        await newContact.save();

        // Send thank-you page
        res.send(`
          <div style="font-family: Arial; text-align:center; padding:30px; background:#f8f9fa;">
            <h1 style="color:#28a745;">✅ Thank You, ${name}!</h1>
            <p>Your message has been received.</p>
            <p>We will contact you at <strong style="color:#007bff;">${email}</strong> soon.</p>
            <hr>
            <p><strong>Your Message:</strong> ${message}</p>
            <a href="/" style="display:inline-block; margin-top:20px; padding:10px 20px; background:#007bff; color:white; text-decoration:none; border-radius:5px;">Go Back</a>
          </div>
        `);

    } catch (error) {
        console.error(error);

        // Handle duplicate email error
        if (error.code === 11000) {
            return res.send(`
                <div style="font-family: Arial; text-align:center; padding:30px; background:#f8f9fa;">
                    <h1 style="color:red;">⚠ Email already exists!</h1>
                    <a href="/contact" style="display:inline-block; margin-top:20px; padding:10px 20px; background:#007bff; color:white; text-decoration:none; border-radius:5px;">Go Back</a>
                </div>
            `);
        }

        res.send(`
            <div style="font-family: Arial; text-align:center; padding:30px; background:#f8f9fa;">
                <h1 style="color:red;">⚠ Server error. Please try again later.</h1>
                <a href="/contact" style="display:inline-block; margin-top:20px; padding:10px 20px; background:#007bff; color:white; text-decoration:none; border-radius:5px;">Go Back</a>
            </div>
        `);
    }
});

module.exports = router;

// Initiate Express Router
import express from 'express';
import Form from '../models/formModel.js';

const router = express.Router();

// POST Route for Form Submission
router.post('/submit', async (req, res) => {
    try {
        const newForm = new Form(req.body);  // Save form data to your MongoDB collection
        await newForm.save();
        res.status(201).json({ message: 'Form submitted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error submitting form' });
    }
});

export default router;

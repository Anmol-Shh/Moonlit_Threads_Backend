import { sendEmail } from '../utils/mailer.js';

export const sendTestEmail = async (req, res) => {
    try {
        const { to, subject, text } = req.body;

        if (!to || !subject || !text) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        await sendEmail(to, subject, text);

        res.status(200).json({ message: 'Email sent successfully!' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to send email', details: error.message });
    }
};

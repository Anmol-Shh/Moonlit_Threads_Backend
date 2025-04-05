import nodemailer from 'nodemailer';
const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'earline.pacocha44@ethereal.email',
        pass: '5NN5utqrs7NcztFVpf'
    }
});


export const sendEmail = async (to, subject, text, html = '') => {
    try {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to,
            subject,
            text,
            html
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
        return info;
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
};

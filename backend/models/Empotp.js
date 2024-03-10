const mongoose = require('mongoose');

const empotpSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    otp: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        expires: 600, // Set the expiration time to 10 minutes (600 seconds)
    },
});

const empotp = mongoose.model('EmployeeOTP', empotpSchema);
module.exports = empotp;

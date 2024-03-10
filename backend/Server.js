const express = require('express');
const mongoose = require('mongoose');
const clc = require('cli-color');
const cors = require('cors');
const multer = require('multer');
const csv = require('csvtojson');
const EmployeeModel = require('./models/Employees');
const adminrouter = require('./routes/adminRoutes');
const employeeRouter = require('./routes/employeeRoutes');
const dotenv = require('dotenv').config();
const empotp = require('./models/Empotp')
const app = express();
const PORT = process.env.PORT || 3000;
const sendotp = require('./utils/Sendotp')
const genotp = require('./utils/otp')

// Middleware   
app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI_COMPASS)
.then(() => console.log(clc.yellow.underline('Connected to Database Successfully')))
.catch(err => console.log(clc.red(` Error while connecting to Database: ${err.message}`)));

app.use("/admin",adminrouter)

app.use("/employee",employeeRouter)

// Multer configuration for file upload
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, './uploads');
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.originalname);
//   }
// });

// const upload = multer({ storage });

// // Route for uploading CSV file
// app.post('/admin/uploadcsv', upload.single('csvFile'), async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ error: 'No file uploaded' });
//     }

//     const jsonArray = await csv().fromFile(req.file.path);
//     await EmployeeModel.insertMany(jsonArray);
//     console.log('Added to Database');
//     return res.send('Added to Database Successfully');
//   } catch (error) {
//     console.error('Error adding data:', error);
//     return res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// Start the server



app.post('/sendotp/:ID', async (req, res) => {
  try {
    const employeeID  = req.params.ID; // Get employeeID from URL
    const employee = await EmployeeModel.findOne({ EmployeeID: employeeID });
    console.log(employee)
    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }

    const  email  = employee.EmployeeMailID;
    const aotp = genotp();

    // Create OTP document
    const newEmpotp = await empotp.create({ email: email, otp: aotp, createdAt: Date.now() });
    console.log('OTP document created:', newEmpotp);

    // Send OTP via email
    const sent_to = email;
    const sent_from = process.env.EMAIL_USER;
    const reply_to = email;
    await sendotp(aotp, sent_to, sent_from, reply_to);

    res.status(200).json({ success: true, message: "OTP Email sent successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


app.post('/api/verifyotp/:ID', async (req, res) => {
  try {
    const { otp } = req.body; // Extract OTP from the request body
    const employeeID = req.params.ID; // Get employeeID from URL
    const employee = await EmployeeModel.findOne({ EmployeeID: employeeID });

    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }

    const email = employee.EmployeeMailID; 
    console.log("Employee Email:", email); // Log email to check if it's correct

    const user = await empotp.findOne({ email: email });
    console.log("User Data:", user); // Log user data to check if it's correct

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const storedOtp = user.otp;
    console.log("Stored OTP:", storedOtp);
    console.log("Given OTP:", otp);

    if (otp === storedOtp) {
      // OTP is correct
      await empotp.deleteOne({ email: email });
      return res.status(200).json({ success: true, message: "OTP verification successful" });
    } else {
      // Incorrect OTP
      return res.status(400).json({ error: "Incorrect OTP" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});



app.listen(PORT, () => {
  console.log(`Server is running on Port ${PORT}`);
});

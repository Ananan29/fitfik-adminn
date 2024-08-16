// const authMiddleware = require("./../Middlewares/checkAuthToken"); // Assuming you have some kind of authentication middleware

const express = require('express');
const router = express.Router();
// const authMiddleware = require('../middleware/authMiddleware');
// const User = require('../models/UserSchema'); // Adjust the path as needed
const mongoose = require('mongoose');
// Assuming you have a middleware to authenticate users
// router.use(authMiddleware);

// // Get user profile
// router.get('/getdata', async (req, res) => {
//     try {
//         const user = await User.findById(req.userId); // Assuming user ID is stored in req.user.id
//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }
//         res.json(user);
//     } catch (error) {
//         console.error('Error fetching profile:', error); // Detailed error log
//         res.status(500).json({ message: 'Server error' });
//     }
// });

// Update user profile
// router.put('/', async (req, res) => {
//     let { name, email, password, height, weight, age, goal } = req.body;
//     // console.log("name, email, password, age, height, weight, weightGoal",name, email, password, age, height, weight, weightGoal)
//     // console.log("req",req.body)
//     weight= [
//         {
//             weight: weight,
//             unit: "kg",
//             date: Date.now()
//         }
//     ]
//     height= [
//         {
//             height: height,
//             date: Date.now(),
//             unit: "cm"
//         }
//     ]
//     // gender,
//     // dob,
//     // goal,
//     // activityLevel
//     try {
//         let user = await User.findById(req.userId);
//         console.log("user:",user)
//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }

//         user.name = name || user.name;
//         user.email = email || user.email;
//         if (password) {
//             user.password = password; // Ensure you hash the password before saving
//         }
//         user.age = age || user.age;
//         user.height = height || user.height;
//         user.weight = weight || user.weight;
//         user.goal = goal || user.goal;

//         await user.save();
//         res.json({ message: 'Profile updated successfully', user });
//     } catch (error) {
//         console.error('Error updating profile:', error); // Detailed error log
//         res.status(500).json({ message: 'Server error' });
//     }
// });
const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String,
    date: { type: Date, default: Date.now }
});
const Contact = mongoose.model('Contact', contactSchema);
router.post('/', async (req, res) => {
    try {
        const message = new Contact(req.body);
        await message.save();
        console.log(message)
        res.status(201).json({ message: 'Message received' });
    } catch (error) {
        console.error('Error contacting:', error); // Detailed error log
        res.status(500).json({ message: 'Server error' });
    }
});
router.get('/', async (req, res) => {
    try {
        const contact = await Contact.find({});
        // res.json(createResponse(true, 'Contact fetched successfully', contact));
        res.status(404).json({ message: 'Contact fetched successfully',contact });
    } catch (err) {
        // res.json(createResponse(false, err.message));
        res.status(500).json({ message: 'Server error'+err.message });
    }
});
module.exports = router;


// const app = express();

// app.use(cors());
// app.use(express.json());

// // Connect to MongoDB
// mongoose.connect('mongodb://localhost:27017/contactDB', { useNewUrlParser: true, useUnifiedTopology: true });

// // Define a schema and model for contact messages




// // API endpoint to handle contact form submissions
// app.post('/api/contact', async (req, res) => {
//     try {
//         const contactMessage = new Contact(req.body);
//         await contactMessage.save();
//         res.status(201).json({ message: 'Message received!' });
//     } catch (error) {
//         res.status(500).json({ error: 'Error saving message' });
//     }
// });

// app.listen(5000, () => {
//     console.log('Server is running on port 5000');
// });
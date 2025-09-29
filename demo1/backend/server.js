const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB connect
mongoose.connect('mongodb+srv://shah:123@cluster0.b45ori7.mongodb.net/ecom?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB Connected'))
    .catch((err) => console.log(err));

// Schema
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    mobile: String
});
const User = mongoose.model('User', userSchema);

// API to save data
app.post('/submit', async (req, res) => {
    try {
        const { name, email, mobile } = req.body;
        const user = new User({ name, email, mobile });
        await user.save();
        res.json({ message: 'Data Saved Successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error saving data' });
    }
});

app.listen(5000, () => console.log('Server running on port 5000'));



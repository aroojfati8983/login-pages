const User = require('../models/User');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function login(req, res) {
    try {
        const { email, password } = req.body;
        
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        
        const token = jwt.sign(
            { id: user._id, email: user.email, role: user.role },
            process.env.JWT_SECRET || 'secret123',
            { expiresIn: '1h' }
        );
        
        res.status(200).json({
            message: "Login successful",
            token: token,
            user: {
                _id: user._id,
                username: user.name,
                email: user.email,
                role: user.role
            }
        });
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Server error" });
    }
}

module.exports = { login };
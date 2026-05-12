const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

const signUpRoute = require('./src/routes/signup');
const loginRoute = require('./src/routes/login');

dotenv.config();

const app = express();
const port = process.env.PORT ||5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// ROOT ROUTE
app.get('/', (req, res) => {
    res.send('Backend server is running! 🚀');
});

// API Routes
app.use('/api/signup', signUpRoute);
app.use('/api/login', loginRoute);

// 404 handler - for unknown routes (CHANGED THIS)
app.use((req, res) => {
    res.status(404).json({ message: `Route ${req.originalUrl} not found` });
});

// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
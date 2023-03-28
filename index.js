const express = require('express');
const routesAuth = require('./routes/auth');
const cors = require('cors');
const { dbConnection } = require('./db/config');
require('dotenv').config();


const app = express();

// Database
dbConnection();

// Public HTML
app.use(express.static('public'));

// Cors
app.use(cors());

// Parse Body
app.use(express.json());

// Routes
app.use('/api/auth', routesAuth);

app.listen(process.env.PORT, () => {
    // console.log(process.env);
    console.log(`Server running in port ${process.env.PORT}...`);
});

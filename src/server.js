import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
// import DevelopRouter from './routers/develop.js';
import SecuredRouter from './routers/secured.js';

// env init
dotenv.config();

// app init
const app = express();

// middleware
app.use(cors());
app.use(express.json());

// routing
// if (process.env.SERVER_MODE === 'development')
//     app.use('/dev', DevelopRouter);

app.use('/app', SecuredRouter);

// error handling
app.use((err, req, res, next) => {
    res.status(500).send({ error: true, message: 'Internal server error!' });
});

// server init
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log('Server is running on port: ' + PORT);
});

// database connection
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(err => {
        console.error('Error connecting to Mongo: ', err.message);
    });

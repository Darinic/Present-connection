const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

require ('dotenv').config();

const thoughtsRoutes = require('./routes/thoughts-routes');
const authRoutes = require('./routes/auth-routes');

const app = express();

app.use(bodyParser.json());   

app.use(cors());

app.use('/api/thoughts', thoughtsRoutes);
app.use('/api/auth', authRoutes);

const port = process.env.PORT || 5000;
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.zpejne2.mongodb.net/${process.env.DB_NAME}`)
.then(() => {
    app.listen(port, () => 
        console.log("connected to database and server listening on port 5000!"));
})
.catch(err => {
    console.log(err);
})


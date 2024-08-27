const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const usersRoutes = require('./routes/usersRoutes');
const authRoutes = require('./routes/AuthRoutes');


const app = express();
app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json());
mongoose.connect('mongodb+srv://medaminegh50:Aminegh90@pfedb.90fe3.mongodb.net/?retryWrites=true&w=majority');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'erreur de connection a mongodb'));
db.once('open', () => {
    console.log('connecte a mongodb');
});


app.use('/api', usersRoutes);
app.use('/api', authRoutes);
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({
        error: 'Internal server Error',
    });
});

app.listen(3001, () => {
    console.log('serveur en ecoute sur le port 3001');
});
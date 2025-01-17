const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const http = require('http'); // Required for Socket.IO integration
const usersRoutes = require('./routes/usersRoutes');
const authRoutes = require('./routes/AuthRoutes');
const projectRoutes = require('./routes/ProjectRoutes');
const issueRoutes = require('./routes/IssueRoutes');
const sprintRoutes = require('./routes/SprintRoutes');
const teamRoutes = require('./routes/TeamRoutes');
const backlogRoutes = require('./routes/BacklogRoutes');
const backlogItemsRoutes = require('./routes/BacklogItemsRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const templateRoutes = require('./routes/TemplateRoutes');

const { initSocket } = require('./notification');

const app = express();
const server = http.createServer(app); // Create an HTTP server

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect('mongodb+srv://medaminegh50:Aminegh90@pfedb.90fe3.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

// Initialize Socket.IO
initSocket(server);

// Define Routes
app.use('/api/notifications', notificationRoutes);
app.use('/api', usersRoutes);
app.use('/api', teamRoutes);
app.use('/api', authRoutes);
app.use('/api', projectRoutes);
app.use('/api', issueRoutes);
app.use('/api', sprintRoutes);
app.use('/api', teamRoutes);
app.use('/api', backlogRoutes);
app.use('/api', backlogItemsRoutes);
app.use('/api', templateRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        error: 'Internal Server Error',
    });
});

// Start Server
server.listen(3001, () => {
    console.log('Server is listening on port 3001');
});
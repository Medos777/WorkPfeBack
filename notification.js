const { Server } = require("socket.io");

// Store connected users
const connectedUsers = {}; // { userId: [socketId1, socketId2] }

let io;

// Initialize Socket.IO
const initSocket = (httpServer) => {
    io = new Server(httpServer, {
        cors: {
            origin: "*", // Update this for production
            methods: ["GET", "POST"],
        },
    });

    io.on("connection", (socket) => {
        console.log(`User connected: ${socket.id}`);

        // Register user
        socket.on("registerUser", (userId) => {
            if (!userId) {
                console.warn("Invalid userId during registration");
                return;
            }
            if (!connectedUsers[userId]) {
                connectedUsers[userId] = [];
            }
            if (!connectedUsers[userId].includes(socket.id)) {
                connectedUsers[userId].push(socket.id);
                console.log(`User registered: ${userId} -> ${socket.id}`);
            }
        });

        // Handle disconnection
        socket.on("disconnect", () => {
            console.log(`User disconnected: ${socket.id}`);
            for (const userId in connectedUsers) {
                connectedUsers[userId] = connectedUsers[userId].filter(
                    (id) => id !== socket.id
                );
                if (connectedUsers[userId].length === 0) {
                    delete connectedUsers[userId];
                    console.log(`User unregistered: ${userId}`);
                }
            }
        });
    });

    // Graceful shutdown
    process.on("SIGINT", () => io.close(() => console.log("Socket.IO server closed.")));
};

// Validate notification payload
const isValidNotification = (notification) => {
    return notification && notification.recipient && notification.message;
};

// Send a notification to a specific user
const sendNotification = (notification) => {
    if (!isValidNotification(notification)) {
        console.warn("Invalid notification payload.");
        return;
    }
    const timestampedNotification = {
        ...notification,
        timestamp: new Date().toISOString(),
    };
    const socketIds = connectedUsers[notification.recipient] || [];
    socketIds.forEach((socketId) => {
        io.to(socketId).emit("receiveNotification", timestampedNotification);
        console.log(`Notification sent to user ${notification.recipient}`);
    });
};

// Broadcast a notification to all users
const broadcastNotification = (notification) => {
    if (!notification || !notification.message) {
        console.warn("Invalid broadcast payload.");
        return;
    }
    const timestampedNotification = {
        ...notification,
        timestamp: new Date().toISOString(),
    };
    io.emit("receiveNotification", timestampedNotification);
    console.log("Broadcast notification sent to all users.");
};

module.exports = {
    initSocket,
    sendNotification,
    broadcastNotification,
};

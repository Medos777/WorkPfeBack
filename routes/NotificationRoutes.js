// notificationRoutes.js
const express = require('express');
const router = express.Router();
const notificationController = require('../controller/notificationController');

// Create a new notification
router.post('/', notificationController.createNotification);

// Get notifications for a specific user
router.get('/:userId', notificationController.getNotifications);

// Mark a notification as read
router.put('/:id/read', notificationController.markAsRead);

// Delete a notification
router.delete('/:id', notificationController.deleteNotification);

module.exports = router;

// notificationController.js
const notificationService = require('../service/NotificationService');

const createNotification = async (req, res) => {
    try {
        const notification = await notificationService.createAndSendNotification(req.body);
        res.status(201).json(notification);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getNotifications = async (req, res) => {
    try {
        const notifications = await notificationService.getUserNotifications(req.params.userId);
        res.status(200).json(notifications);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const markAsRead = async (req, res) => {
    try {
        const notification = await notificationService.markNotificationAsRead(req.params.id);
        res.status(200).json(notification);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const deleteNotification = async (req, res) => {
    try {
        await notificationService.deleteNotification(req.params.id);
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    createNotification,
    getNotifications,
    markAsRead,
    deleteNotification,
};

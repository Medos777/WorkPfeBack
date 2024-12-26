// notificationService.js
const notificationRepository = require('../repository/notificationRepository');
const { sendNotification } = require('../notification'); // Socket.IO functions

const createAndSendNotification = async (data) => {
    const notification = await notificationRepository.createNotification(data);
    sendNotification(notification); // Broadcast using Socket.IO
    return notification;
};

const getUserNotifications = async (userId) => {
    return await notificationRepository.getNotificationsForUser(userId);
};

const markNotificationAsRead = async (notificationId) => {
    return await notificationRepository.markAsRead(notificationId);
};

const deleteNotification = async (notificationId) => {
    return await notificationRepository.deleteNotification(notificationId);
};

module.exports = {
    createAndSendNotification,
    getUserNotifications,
    markNotificationAsRead,
    deleteNotification,
};

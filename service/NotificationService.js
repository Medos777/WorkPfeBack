const NotificationRepository = require('../repository/NotificationRepository');
const { sendNotification } = require('../notification');

const createAndSendNotification = async (data) => {
    const notification = await NotificationRepository.createNotification(data);
    sendNotification(notification);
    return notification;
};

const getUserNotifications = async (userId) => {
    return await NotificationRepository.getNotificationsForUser(userId);
};

const markNotificationAsRead = async (notificationId) => {
    return await NotificationRepository.markAsRead(notificationId);
};

const deleteNotification = async (notificationId) => {
    return await NotificationRepository.deleteNotification(notificationId);
};

module.exports = {
    createAndSendNotification,
    getUserNotifications,
    markNotificationAsRead,
    deleteNotification,
};

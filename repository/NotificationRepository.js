// notificationRepository.js
const Notification = require('../model/Notification'); // Import Notification model

const createNotification = async (data) => {
    const notification = new Notification(data);
    return await notification.save();
};

const getNotificationsForUser = async (userId) => {
    return await Notification.find({ recipient: userId }).sort({ createdAt: -1 });
};

const markAsRead = async (notificationId) => {
    return await Notification.findByIdAndUpdate(notificationId, { read: true }, { new: true });
};

const deleteNotification = async (notificationId) => {
    return await Notification.findByIdAndDelete(notificationId);
};

module.exports = {
    createNotification,
    getNotificationsForUser,
    markAsRead,
    deleteNotification,
};

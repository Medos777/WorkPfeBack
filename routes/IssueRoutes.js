const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const issueController = require('../controller/IssueController');

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/attachments/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    },
    fileFilter: (req, file, cb) => {
        const allowedTypes = ['.jpg', '.jpeg', '.png', '.pdf', '.doc', '.docx'];
        const ext = path.extname(file.originalname).toLowerCase();
        if (allowedTypes.includes(ext)) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type'));
        }
    }
});

// Basic CRUD routes
router.get('/issues', issueController.findAll);
router.get('/issues/:id', issueController.findById);
router.post('/issues', issueController.create);
router.put('/issues/:id', issueController.update);
router.delete('/issues/:id', issueController.delete);

// Project related routes
router.get('/issues/project/:projectId', issueController.findByProject);

// Epic related routes
router.get('/issues/epic/:epicId', issueController.findByEpic);

// Sprint related routes
router.get('/issues/sprint/:sprintId', issueController.findBySprint);

// Comment routes
router.post('/issues/:id/comments', issueController.addComment);

// Attachment routes
router.post(
    '/issues/:id/attachments',
    upload.single('attachment'),
    issueController.addAttachment
);

// Time tracking routes
router.post('/issues/:id/timetracking', issueController.updateTimeTracking);

// Error handling middleware
router.use((err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({
                message: 'File size too large. Maximum size is 5MB'
            });
        }
    }
    
    if (err.message === 'Invalid file type') {
        return res.status(400).json({
            message: 'Invalid file type. Allowed types: jpg, jpeg, png, pdf, doc, docx'
        });
    }
    
    next(err);
});

module.exports = router;
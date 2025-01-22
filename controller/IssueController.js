const issueService = require('../service/IssueService');

class IssueController {
    async findAll(req, res, next) {
        try {
            const options = {
                populate: req.query.populate === 'true'
            };
            const issues = await issueService.findAll(options);
            res.status(200).json(issues);
        } catch (error) {
            next(error);
        }
    }

    async findById(req, res, next) {
        try {
            const options = {
                populate: req.query.populate === 'true'
            };
            const issue = await issueService.findById(req.params.id, options);
            if (!issue) {
                return res.status(404).json({ message: 'Issue not found' });
            }
            res.status(200).json(issue);
        } catch (error) {
            next(error);
        }
    }

    async findByProject(req, res, next) {
        try {
            const options = {
                populate: req.query.populate === 'true'
            };
            const issues = await issueService.findByProject(req.params.projectId, options);
            if (!issues || issues.length === 0) {
                return res.status(404).json({ message: 'No issues found for this project' });
            }
            res.status(200).json(issues);
        } catch (error) {
            next(error);
        }
    }

    async findByEpic(req, res, next) {
        try {
            const options = {
                populate: req.query.populate === 'true'
            };
            const issues = await issueService.findByEpic(req.params.epicId, options);
            if (!issues || issues.length === 0) {
                return res.status(404).json({ message: 'No issues found for this epic' });
            }
            res.status(200).json(issues);
        } catch (error) {
            next(error);
        }
    }

    async findBySprint(req, res, next) {
        try {
            const options = {
                populate: req.query.populate === 'true'
            };
            const issues = await issueService.findBySprint(req.params.sprintId, options);
            if (!issues || issues.length === 0) {
                return res.status(404).json({ message: 'No issues found for this sprint' });
            }
            res.status(200).json(issues);
        } catch (error) {
            next(error);
        }
    }

    async create(req, res, next) {
        try {
            console.log('Creating issue with data:', req.body);
            const issue = await issueService.create(req.body);
            console.log('Issue created successfully:', issue);
            res.status(201).json(issue);
        } catch (error) {
            console.error('Error in issue creation:', error);
            if (error.name === 'ValidationError') {
                return res.status(400).json({
                    message: 'Validation Error',
                    details: Object.values(error.errors).map(err => err.message)
                });
            }
            if (error.code === 11000) {
                return res.status(409).json({
                    message: 'Duplicate key error',
                    details: error.keyValue
                });
            }
            res.status(500).json({
                message: 'Error creating issue',
                error: error.message,
                stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
            });
        }
    }

    async update(req, res, next) {
        try {
            const issue = await issueService.update(req.params.id, req.body);
            if (!issue) {
                return res.status(404).json({ message: 'Issue not found' });
            }
            res.status(200).json(issue);
        } catch (error) {
            if (error.message.includes('Update data cannot be empty')) {
                return res.status(400).json({ message: error.message });
            }
            next(error);
        }
    }

    async delete(req, res, next) {
        try {
            const issue = await issueService.delete(req.params.id);
            if (!issue) {
                return res.status(404).json({ message: 'Issue not found' });
            }
            res.status(200).json({ message: 'Issue deleted successfully' });
        } catch (error) {
            next(error);
        }
    }

    async addComment(req, res, next) {
        try {
            const { content, author } = req.body;
            const issue = await issueService.addComment(req.params.id, { content, author });
            if (!issue) {
                return res.status(404).json({ message: 'Issue not found' });
            }
            res.status(200).json(issue);
        } catch (error) {
            next(error);
        }
    }

    async addAttachment(req, res, next) {
        try {
            const attachment = {
                filename: req.file.originalname,
                path: req.file.path,
                uploadedBy: req.user._id,
                uploadedAt: new Date()
            };
            const issue = await issueService.addAttachment(req.params.id, attachment);
            if (!issue) {
                return res.status(404).json({ message: 'Issue not found' });
            }
            res.status(200).json(issue);
        } catch (error) {
            next(error);
        }
    }

    async updateTimeTracking(req, res, next) {
        try {
            const issue = await issueService.updateTimeTracking(req.params.id, req.body);
            if (!issue) {
                return res.status(404).json({ message: 'Issue not found' });
            }
            res.status(200).json(issue);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new IssueController();

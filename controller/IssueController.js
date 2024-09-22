const issueService = require('../service/IssueService');

module.exports = {
    async findAll(req, res, next) {
        try {
            const issues = await issueService.findAll();
            res.status(200).json(issues);
        } catch (error) {
            next(error);
        }
    },

    async findById(req, res, next) {
        try {
            const issue = await issueService.findById(req.params.id);
            if (!issue) {
                return res.status(404).json({ message: 'issue not found' });
            }
            res.status(200).json(issue);
        } catch (error) {
            next(error);
        }
    },

    async findByProject(req, res, next) {
        try {
            const IssueProject = await issueService.findByProject(req.params.project);
            if (!IssueProject || IssueProject.length === 0) {
                return res.status(404).json({ message: 'No Issue found with the specified project' });
            }
            res.status(200).json(IssueProject);
        } catch (error) {
            console.error('Error finding issue by project:', error.message);
            next(error);
        }
    },

    async create(req, res, next) {
        try {
            const issue = await issueService.create(req.body);
            res.status(201).json(issue);
        } catch (error) {
            console.error('Error creating issue:', error.message);
            next(error);
        }
    },

    async update(req, res, next) {
        try {
            const issue = await issueService.update(req.params.id, req.body);
            if (!issue) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json(issue);
        } catch (error) {
            next(error);
        }
    },

    async delete(req, res, next) {
        try {
            const result = await issueService.delete(req.params.id);
            if (!result) {
                return res.status(404).json({ message: 'issue not found' });
            }
            res.status(200).json({ message: 'issue deleted successfully', result });
        } catch (error) {
            console.error('Error deleting user:', error.message);
            next(error);
        }
    }
};

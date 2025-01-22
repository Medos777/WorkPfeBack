const Issue = require('../model/Issue');
const Project = require('../model/Project');

class IssueRepository {
    async findAll(options = {}) {
        try {
            const query = Issue.find();
            
            if (options.populate) {
                query.populate('assignee reporter project sprint epic watchers');
            }
            
            return await query.exec();
        } catch (e) {
            throw new Error(`Unable to retrieve Issues: ${e.message}`);
        }
    }

    async findById(id, options = {}) {
        try {
            const query = Issue.findById(id);
            
            if (options.populate) {
                query.populate('assignee reporter project sprint epic watchers');
            }
            
            return await query.exec();
        } catch (e) {
            throw new Error(`Unable to retrieve Issue: ${e.message}`);
        }
    }

    async findByProject(projectId, options = {}) {
        try {
            const query = Issue.find({ project: projectId });
            
            if (options.populate) {
                query.populate('assignee reporter sprint epic watchers');
            }
            
            return await query.exec();
        } catch (e) {
            throw new Error(`Unable to find Issues by Project: ${e.message}`);
        }
    }

    async findByEpic(epicId, options = {}) {
        try {
            const query = Issue.find({ epic: epicId });
            
            if (options.populate) {
                query.populate('assignee reporter project sprint watchers');
            }
            
            return await query.exec();
        } catch (e) {
            throw new Error(`Unable to find Issues by Epic: ${e.message}`);
        }
    }

    async findBySprint(sprintId, options = {}) {
        try {
            const query = Issue.find({ sprint: sprintId });
            
            if (options.populate) {
                query.populate('assignee reporter project epic watchers');
            }
            
            return await query.exec();
        } catch (e) {
            throw new Error(`Unable to find Issues by Sprint: ${e.message}`);
        }
    }

    async create(data) {
        try {
            // Generate issue key if not provided
            if (!data.key) {
                const project = await Project.findById(data.project);
                if (!project) {
                    throw new Error(`Project with id ${data.project} not found`);
                }
                const issueCount = await Issue.countDocuments({ project: data.project });
                data.key = `${project.projectKey}-${issueCount + 1}`;
            }

            const newIssue = new Issue(data);
            const savedIssue = await newIssue.save();

            // Update project's issues array
            const project = await Project.findById(data.project);
            if (!project) {
                throw new Error(`Project with id ${data.project} not found`);
            }

            // Initialize issues array if it doesn't exist
            if (!project.issues) {
                project.issues = [];
            }

            project.issues.push(savedIssue._id);
            await project.save();

            return savedIssue;
        } catch (e) {
            console.error('Error creating issue:', e);
            throw new Error(`Unable to create Issue: ${e.message}`);
        }
    }

    async update(id, data) {
        try {
            const updatedIssue = await Issue.findByIdAndUpdate(
                id,
                { ...data, updatedAt: new Date() },
                { new: true, runValidators: true }
            ).populate('assignee reporter project sprint epic watchers');
            
            return updatedIssue;
        } catch (e) {
            throw new Error(`Unable to update Issue: ${e.message}`);
        }
    }

    async delete(id) {
        try {
            const issue = await Issue.findById(id);
            if (!issue) {
                throw new Error('Issue not found');
            }

            // Remove issue reference from project
            const project = await Project.findById(issue.project);
            if (project) {
                project.issues = project.issues.filter(issueId => issueId.toString() !== id);
                await project.save();
            }

            return await Issue.findByIdAndDelete(id);
        } catch (e) {
            throw new Error(`Unable to delete Issue: ${e.message}`);
        }
    }

    async addComment(issueId, comment) {
        try {
            return await Issue.findByIdAndUpdate(
                issueId,
                { $push: { comments: comment } },
                { new: true, runValidators: true }
            ).populate('comments.author');
        } catch (e) {
            throw new Error(`Unable to add comment: ${e.message}`);
        }
    }

    async addAttachment(issueId, attachment) {
        try {
            return await Issue.findByIdAndUpdate(
                issueId,
                { $push: { attachments: attachment } },
                { new: true, runValidators: true }
            );
        } catch (e) {
            throw new Error(`Unable to add attachment: ${e.message}`);
        }
    }

    async updateTimeTracking(issueId, timeData) {
        try {
            return await Issue.findByIdAndUpdate(
                issueId,
                {
                    $set: {
                        originalEstimate: timeData.originalEstimate,
                        remainingEstimate: timeData.remainingEstimate,
                        timeSpent: timeData.timeSpent
                    }
                },
                { new: true, runValidators: true }
            );
        } catch (e) {
            throw new Error(`Unable to update time tracking: ${e.message}`);
        }
    }
}

module.exports = new IssueRepository();
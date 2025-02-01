const EpicRepository = require('../repository/EpicRepository');
const ProjectRepository = require('../repository/ProjectRepository');
const IssueRepository = require('../repository/IssueRepository');

class EpicService {
    async createEpic(epicData) {
        try {
            // Validate required fields
            if (!epicData.name) {
                throw new Error('Epic name is required');
            }
            if (!epicData.owner) {
                throw new Error('Epic owner is required');
            }

            // Normalize status and priority
            epicData.status = epicData.status?.toLowerCase() || 'to do';
            epicData.priority = epicData.priority?.toLowerCase() || 'medium';

            // Validate enum values
            const validStatuses = ['to do', 'in progress', 'done'];
            const validPriorities = ['highest', 'high', 'medium', 'low', 'lowest'];

            if (!validStatuses.includes(epicData.status)) {
                throw new Error('Invalid status value');
            }
            if (epicData.priority && !validPriorities.includes(epicData.priority)) {
                throw new Error('Invalid priority value');
            }

            let epicToCreate = { ...epicData };

            // Handle project-related data
            if (epicToCreate.project) {
                try {
                    const project = await ProjectRepository.findById(epicToCreate.project);
                    if (project) {
                        // Generate key using project name
                        const nextNumber = await this.getNextEpicNumber(project._id);
                        epicToCreate.key = `${project.projectName.substring(0, 3).toUpperCase()}-E${nextNumber}`;
                    } else {
                        // If project not found, create epic without project
                        delete epicToCreate.project;
                        const timestamp = Date.now();
                        epicToCreate.key = `EPIC-${timestamp}`;
                    }
                } catch (error) {
                    // If there's an error finding the project, create epic without project
                    delete epicToCreate.project;
                    const timestamp = Date.now();
                    epicToCreate.key = `EPIC-${timestamp}`;
                }
            } else {
                // For epics without project, use a timestamp-based key
                const timestamp = Date.now();
                epicToCreate.key = `EPIC-${timestamp}`;
                // Ensure project is undefined
                delete epicToCreate.project;
            }

            console.log('Creating epic with data:', epicToCreate);

            // Créer l'epic
            const createdEpic = await EpicRepository.create(epicToCreate);

            // Mettre à jour les issues si elles sont fournies
            if (epicToCreate.issues && epicToCreate.issues.length > 0) {
                console.log('Updating issues for epic:', createdEpic._id);
                const updatePromises = epicToCreate.issues.map(issueId =>
                    IssueRepository.update(issueId, { epic: createdEpic._id })
                );
                await Promise.all(updatePromises);
            }

            // Récupérer l'epic avec les issues mises à jour
            const populatedEpic = await EpicRepository.findById(createdEpic._id);
            return populatedEpic;

        } catch (error) {
            console.error('Error in createEpic:', error);
            throw error;
        }
    }

    async getNextEpicNumber(projectId) {
        try {
            const epics = await EpicRepository.findAll({ project: projectId });
            return epics.length + 1;
        } catch (error) {
            console.error('Error in getNextEpicNumber:', error);
            throw error;
        }
    }

    async getEpicByProjectId(projectId) {
        try {
            return await EpicRepository.findByProjectId(projectId);
        } catch (error) {
            console.error('Error in getEpicByProjectId:', error);
            throw error;
        }   
    }

    async getAllEpics(filters = {}) {
        try {
            return await EpicRepository.findAll(filters);
        } catch (error) {
            console.error('Error in getAllEpics:', error);
            throw error;
        }
    }

    async getEpicById(id) {
        try {
            const epic = await EpicRepository.findById(id);
            if (!epic) {
                throw new Error('Epic not found');
            }
            return epic;
        } catch (error) {
            console.error('Error in getEpicById:', error);
            throw error;
        }
    }

    async getEpicsByProject(projectId) {
        try {
            // Verify project exists
            const project = await ProjectRepository.findById(projectId);
            if (!project) {
                throw new Error('Project not found');
            }
            return await EpicRepository.findAll({ project: projectId });
        } catch (error) {
            console.error('Error in getEpicsByProject:', error);
            throw error;
        }
    }

    async updateEpic(id, updateData) {
        try {
            // Get current epic to compare issues
            const currentEpic = await EpicRepository.findById(id);
            if (!currentEpic) {
                throw new Error('Epic not found');
            }

            // Update the epic
            const epic = await EpicRepository.update(id, updateData);

            // Handle issues updates
            const currentIssues = new Set(currentEpic.issues?.map(i => i.toString()) || []);
            const newIssues = new Set(updateData.issues || []);

            // Remove epic reference from issues that were removed
            const removedIssues = [...currentIssues].filter(x => !newIssues.has(x));
            await Promise.all(removedIssues.map(async (issueId) => {
                try {
                    await IssueRepository.update(issueId, { $unset: { epic: "" } });
                } catch (err) {
                    console.error(`Error removing epic reference from issue ${issueId}:`, err);
                }
            }));

            // Add epic reference to new issues
            const addedIssues = [...newIssues].filter(x => !currentIssues.has(x));
            await Promise.all(addedIssues.map(async (issueId) => {
                try {
                    await IssueRepository.update(issueId, { epic: id });
                } catch (err) {
                    console.error(`Error adding epic reference to issue ${issueId}:`, err);
                }
            }));

            return epic;
        } catch (error) {
            console.error('Error in updateEpic:', error);
            throw error;
        }
    }

    async deleteEpic(id) {
        try {
            // Get epic to remove references
            const epic = await EpicRepository.findById(id);
            if (!epic) {
                throw new Error('Epic not found');
            }

            // Remove epic reference from all associated issues
            if (epic.issues && epic.issues.length > 0) {
                await Promise.all(epic.issues.map(async (issueId) => {
                    try {
                        await IssueRepository.update(issueId, { $unset: { epic: "" } });
                    } catch (err) {
                        console.error(`Error removing epic reference from issue ${issueId}:`, err);
                    }
                }));
            }

            // Delete the epic
            const deletedEpic = await EpicRepository.delete(id);
            return deletedEpic;
        } catch (error) {
            console.error('Error in deleteEpic:', error);
            throw error;
        }
    }

    async updateEpicProgress(id) {
        try {
            const epic = await EpicRepository.findById(id);
            if (!epic) {
                throw new Error('Epic not found');
            }
            
            // Calculate progress based on issues
            // This is a placeholder - implement actual progress calculation logic
            const progress = 0; // Calculate actual progress
            
            return await EpicRepository.update(id, { progress });
        } catch (error) {
            console.error('Error in updateEpicProgress:', error);
            throw error;
        }
    }

    async addWatcher(epicId, userId) {
        try {
            const epic = await EpicRepository.findById(epicId);
            if (!epic) {
                throw new Error('Epic not found');
            }

            if (!epic.watchers) {
                epic.watchers = [];
            }

            if (!epic.watchers.includes(userId)) {
                epic.watchers.push(userId);
                return await EpicRepository.update(epicId, { watchers: epic.watchers });
            }
            return epic;
        } catch (error) {
            console.error('Error in addWatcher:', error);
            throw error;
        }
    }

    async removeWatcher(epicId, userId) {
        try {
            const epic = await EpicRepository.findById(epicId);
            if (!epic) {
                throw new Error('Epic not found');
            }

            if (epic.watchers) {
                epic.watchers = epic.watchers.filter(id => id.toString() !== userId.toString());
                return await EpicRepository.update(epicId, { watchers: epic.watchers });
            }
            return epic;
        } catch (error) {
            console.error('Error in removeWatcher:', error);
            throw error;
        }
    }
}

module.exports = new EpicService();
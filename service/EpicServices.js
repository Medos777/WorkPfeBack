const EpicRepository = require('../repository/EpicRepository');
const ProjectRepository = require('../repository/ProjectRepository');

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

            // Create epic using repository
            const epic = await EpicRepository.create(epicToCreate);
            return epic;
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
            const epic = await EpicRepository.update(id, updateData);
            if (!epic) {
                throw new Error('Epic not found');
            }
            return epic;
        } catch (error) {
            console.error('Error in updateEpic:', error);
            throw error;
        }
    }

    async deleteEpic(id) {
        try {
            const epic = await EpicRepository.delete(id);
            if (!epic) {
                throw new Error('Epic not found');
            }
            return epic;
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
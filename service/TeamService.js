const teamRepository = require('../repository/TeamRepository');

module.exports={
    async getAll(){
        return await teamRepository.getAll();
    },
    async createTeam(teamData) {
        return await teamRepository.createTeam(teamData);
    },

    async getTeam(teamId) {
        return await teamRepository.getTeam(teamId);
    },

    async updateTeam(teamId, updates) {
        return await teamRepository.updateTeam(teamId, updates);
    },

    async deleteTeam(teamId) {
        return await teamRepository.deleteTeam(teamId);
    },

    async addMember(teamId, userId) {
        return await teamRepository.addMember(teamId, userId);
    },

    async removeMember(teamId, userId) {
        return await teamRepository.removeMember(teamId, userId);
    },

    async assignToProject(teamId, projectId) {
        return await teamRepository.assignToProject(teamId, projectId);
    }
}
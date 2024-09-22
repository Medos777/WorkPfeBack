const Team = require('../model/Team');
module.exports={
    async getAll(){
        return await Team.find();
    },
    async createTeam(teamData) {
        const team = new Team(teamData);
        return await team.save();
    },

    async getTeam(teamId) {
        return await Team.findById(teamId).populate('teamLead').populate('members').populate('projects');
    },

    async updateTeam(teamId, updates) {
        return await Team.findByIdAndUpdate(teamId, updates, { new: true });
    },

    async deleteTeam(teamId) {
        return await Team.findByIdAndDelete(teamId);
    },

    async addMember(teamId, userId) {
        const team = await Team.findById(teamId);
        team.members.push(userId);
        return await team.save();
    },

    async removeMember(teamId, userId) {
        const team = await Team.findById(teamId);
        team.members = team.members.filter((member) => member.toString() !== userId.toString());
        return await team.save();
    },

    async assignToProject(teamId, projectId) {
        const team = await Team.findById(teamId);
        team.projects.push(projectId);
        return await team.save();
    }
}

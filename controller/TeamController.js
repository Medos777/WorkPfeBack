// controllers/TeamController.js
const teamService = require('../service/TeamService');

module.exports={

async  getAll(req, res, next) {
    try {
        const teams = await teamService.getAll();
        res.status(200).json(teams);
    }catch (e){
        next(e);
    }
    },
    async createTeam(req, res) {
        try {
            const team = await teamService.createTeam(req.body);
            res.status(201).json(team);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    async getTeam(req, res) {
        try {
            const team = await teamService.getTeam(req.params.id);
            if (!team) {
                return res.status(404).json({ message: 'Team not found' });
            }
            res.json(team);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    async updateTeam(req, res) {
        try {
            const team = await teamService.updateTeam(req.params.id, req.body);
            if (!team) {
                return res.status(404).json({ message: 'Team not found' });
            }
            res.json(team);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    async deleteTeam(req, res) {
        try {
            const team = await teamService.deleteTeam(req.params.id);
            if (!team) {
                return res.status(404).json({ message: 'Team not found' });
            }
            res.json({ message: 'Team deleted' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    async addMember(req, res) {
        try {
            const team = await teamService.addMember(req.params.id, req.body.userId);
            res.json(team);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    async removeMember(req, res) {
        try {
            const team = await teamService.removeMember(req.params.id, req.body.userId);
            res.json(team);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    async assignToProject(req, res) {
        try {
            const team = await teamService.assignToProject(req.params.id, req.body.projectId);
            res.json(team);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}


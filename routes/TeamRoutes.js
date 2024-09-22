// routes/teamRoutes.js
const express = require('express');
const teamController = require('../controller/TeamController');
const issueController = require("../controller/IssueController");

const router = express.Router();

// Create a new team
router.post('/teams', teamController.createTeam);

router.get('/teams',teamController.getAll);
// Get a team by ID
router.get('teams/:id', teamController.getTeam);

// Update a team by ID
router.put('teams/:id', teamController.updateTeam);

// Delete a team by ID
router.delete('teams/:id', teamController.deleteTeam);

// Add a member to a team
router.post('teams/:id/members', teamController.addMember);

// Remove a member from a team
router.delete('teams/:id/members', teamController.removeMember);

// Assign a team to a project
router.post('teams/:id/projects', teamController.assignToProject);

module.exports = router;
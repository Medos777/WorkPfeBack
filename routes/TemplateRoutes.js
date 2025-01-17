const express = require('express');
const router = express.Router();
const templateController = require('../controller/TemplateController');

router.get('/template/all', templateController.getAllTemplates);
router.get('/template/default', templateController.getDefaultTemplates);
router.get('/template/type/:type', templateController.getTemplatesByType);
router.get('/template/:id', templateController.getTemplateById);
router.post('/template/create', templateController.createTemplate);
router.put('/template/update/:id', templateController.updateTemplate);
router.delete('/template/delete/:id', templateController.deleteTemplate);
router.post('/template/:id/clone', templateController.cloneTemplate);

module.exports = router;
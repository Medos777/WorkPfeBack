const backlogItemService = require('../service/BacklogItemsService');

class BacklogItemController {
    async createBacklogItem(req, res) {
        try {
            const newItem = await backlogItemService.createBacklogItem(req.body);
            res.status(201).json(newItem);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async getBacklogItemById(req, res) {
        try {
            const backlogItem = await backlogItemService.getBacklogItemById(req.params.id);
            res.status(200).json(backlogItem);
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    }

    async updateBacklogItem(req, res) {
        try {
            const updatedItem = await backlogItemService.updateBacklogItem(req.params.id, req.body);
            res.status(200).json(updatedItem);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async deleteBacklogItem(req, res) {
        try {
            await backlogItemService.deleteBacklogItem(req.params.id);
            res.status(204).send();
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    }

    async getAllBacklogItems(req, res) {
        try {
            const items = await backlogItemService.getAllBacklogItems();
            res.status(200).json(items);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new BacklogItemController();

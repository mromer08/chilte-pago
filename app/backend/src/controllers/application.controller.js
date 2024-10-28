import ApplicationService from '../services/application.service.js';

class ApplicationController {
    async createApplication(req, res) {
        const { name, paymentMethodId } = req.body;
        const userId = req.session.user.id;

        if (!name || !userId) {
            return res.status(400).json({ message: 'name, userId, and status are required.' });
        }

        try {
            const newApplication = await ApplicationService.createApplication({
                name,
                userId,
                paymentMethodId
            });
            res.status(201).json(newApplication);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getApplicationById(req, res) {
        const { id } = req.params;
        try {
            const application = await ApplicationService.getApplicationById(id);
            if (!application) return res.status(404).json({ message: 'Application not found' });
            res.json(application);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getAllApplications(req, res) {
        try {
            const applications = await ApplicationService.getAllApplications();
            res.json(applications);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async updateApplication(req, res) {
        const { id } = req.params;
        try {
            const updatedApplication = await ApplicationService.updateApplication(id, req.body);
            res.json(updatedApplication);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async deleteApplication(req, res) {
        const { id } = req.params;
        try {
            await ApplicationService.deleteApplication(id);
            res.status(204).json();
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

export default new ApplicationController();

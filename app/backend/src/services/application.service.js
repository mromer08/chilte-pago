import {Application} from '../models/index.js';
import crypto from 'crypto';

class ApplicationService {
    generateClientId() {
        return crypto.randomBytes(16).toString('hex');
    }

    generateSecretKey() {
        return crypto.randomBytes(32).toString('hex');
    }

    async createApplication(data) {
        let clientId;
        let secretKey;
        let existingApp;

        do {
            clientId = this.generateClientId();
            secretKey = this.generateSecretKey();

            existingApp = await Application.findOne({ where: { clientId } });
        } while (existingApp); // Asegura que clientId no esté duplicado

        const application = await Application.create({
            ...data,
            clientId,
            secretKey,
        });
        return application;
    }

    async getApplicationById(id) {
        const application = await Application.findByPk(id);
        return application;
    }

    async getAllApplications() {
        const applications = await Application.findAll();
        return applications;
    }

    async updateApplication(id, updates) {
        const application = await Application.findByPk(id);
        if (!application) throw new Error('Application not found');

        await application.update(updates);
        return application;
    }

    async deleteApplication(id) {
        const application = await Application.findByPk(id);
        if (!application) throw new Error('Application not found');

        await application.destroy();
        return application;
    }

    async getApplicationByClientId(clientId) {
        const application = await Application.findOne({ where: { clientId } });
        return application;
    }
}

export default new ApplicationService();

import express from 'express';
import ApplicationController from '../controllers/application.controller.js';

const router = express.Router();

router.post('/', ApplicationController.createApplication);
router.get('/', ApplicationController.getAllApplications);
router.get('/:id', ApplicationController.getApplicationById);
router.put('/:id', ApplicationController.updateApplication);
router.delete('/:id', ApplicationController.deleteApplication);

export default router;

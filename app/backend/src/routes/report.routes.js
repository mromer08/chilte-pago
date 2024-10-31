import express from 'express';
import ReportController from '../controllers/report.controller.js';

const router = express.Router();

// Ruta para obtener el total de comisiones
router.get('/commissions', ReportController.getTotalCommissions);
router.get('/total-users', ReportController.getTotalUsers);

export default router;

import express from 'express';
import CompanyController from '../controllers/CompanyController.js';

const router = express.Router();

router.post('/', CompanyController.createCompany);
router.get('/', CompanyController.getAllCompanies);
router.get('/:code', CompanyController.getCompanyByCode);
router.put('/:code', CompanyController.updateCompany);
router.delete('/:code', CompanyController.deleteCompany);

export default router;

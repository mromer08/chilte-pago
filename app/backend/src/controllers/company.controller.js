import companyService from "../services/company.service"; 

class CompanyController {
    // Controlador para crear empresa
    async createCompany(req, res) {
        try {
            const newCompany = await companyService.createCompany(req.body);
            res.status(201).json(newCompany);
        } catch (error) {
            res.status(error.status || 500).json({ message: error.message });
        }
    }

    // Controlador para obtener todas las empresas
    async getAllCompanies(req, res) {
        try {
            const companies = await companyService.getAllCompanies();
            res.status(200).json(companies);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    // Controlador para obtener empresa por código
    async getCompanyByCode(req, res) {
        try {
            const company = await companyService.getCompanyByCode(req.params.code);
            res.status(200).json(company);
        } catch (error) {
            res.status(error.status || 500).json({ message: error.message });
        }
    }

    // Controlador para actualizar empresa
    async updateCompany(req, res) {
        try {
            const updatedCompany = await companyService.updateCompany(req.params.code, req.body);
            res.status(200).json(updatedCompany);
        } catch (error) {
            res.status(error.status || 500).json({ message: error.message });
        }
    }

    // Controlador para eliminar empresa
    async deleteCompany(req, res) {
        try {
            const result = await companyService.deleteCompany(req.params.code);
            res.status(200).json(result);
        } catch (error) {
            res.status(error.status || 500).json({ message: error.message });
        }
    }
}

export default new CompanyController();

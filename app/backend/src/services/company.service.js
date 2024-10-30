import {Company} from '../models/index.js';
import jwt from 'jsonwebtoken';

class CompanyService {
    // Crear nueva empresa
    async createCompany(data) {
        const { code, secretKey, name, status = 'ACTIVO', userId = null } = data;

        // Verificar si ya existe una empresa con el mismo código
        const existingCompany = await Company.findOne({ where: { code } });
        if (existingCompany) {
            throw { status: 409, message: 'Company code already in use' };
        }

        // Crear y retornar la nueva empresa
        const newCompany = await Company.create({ code, secretKey, name, status, userId });
        return newCompany;
    }

    // Obtener todas las empresas
    async getAllCompanies() {
        return await Company.findAll();
    }

    // Obtener empresa por código
    async getCompanyByCode(code) {
        const company = await Company.findOne({ where: { code } });
        if (!company) {
            throw { status: 404, message: 'Company not found' };
        }
        return company;
    }

    // Actualizar empresa por código
    async updateCompany(code, data) {
        const company = await Company.findOne({ where: { code } });
        if (!company) {
            throw { status: 404, message: 'Company not found' };
        }

        // Actualizar los datos de la empresa y guardar
        await company.update(data);
        return company;
    }

    // Eliminar empresa por código
    async deleteCompany(code) {
        const company = await Company.findOne({ where: { code } });
        if (!company) {
            throw { status: 404, message: 'Company not found' };
        }

        // Eliminar la empresa
        await company.destroy();
        return { message: 'Company deleted successfully' };
    }

    async authenticateCompany(companyId, secretKey) {
        if (!companyId || !secretKey) {
            throw { status: 400, message: 'Company ID and secret key are required.' };
        }
    
        // Buscar la compañía por su ID
        const company = await Company.findOne({ where: { code: companyId } });
        if (!company) {
            throw { status: 404, message: 'Company not found' };
        }
    
        // Validar la clave secreta
        if (company.secretKey !== secretKey) {
            throw { status: 401, message: 'Incorrect secret key' };
        }
    
        // Generar el token JWT
        const token = jwt.sign(
            { code: company.code, name: company.name, userId: company.userId },
            process.env.COMPANY_TOKEN_SECRET,
            { expiresIn: '1d' }
        );
    
        return { token };
    }
}

export default new CompanyService();

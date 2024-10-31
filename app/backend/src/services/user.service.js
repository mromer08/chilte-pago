import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { User, Role, Company } from '../models/index.js';
import tokenService from './token.service.js';
import { sequelize } from '../config/db.config.js';

class UserService {
    async createUser(data) {
        const { firstname, lastname, companyCode, password, username, roleId = 2000 } = data;
    
        // Verificar si la empresa existe
        const company = await Company.findOne({ where: { code: companyCode } });
        if (!company) {
            throw { status: 404, message: 'Company not found' };
        }
    
        // Generar el email en base al username y la información de la empresa
        const email = `${username}${companyCode}@${company.name}.com`;
    
        // Verificar si el email ya está en uso
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            throw { status: 409, message: 'Email already in use' };
        }
    
        // Hashear la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);
    
        // Verificar si el rol existe
        const role = await Role.findByPk(roleId);
        if (!role) {
            throw { status: 500, message: 'Default role CLIENTE not found' };
        }
    
        // Crear y retornar el nuevo usuario
        const newUser = await User.create({
            firstname,
            lastname,
            email,
            password: hashedPassword,
            roleId: role.id,
        });
    
        return newUser;
    }
    

    async getAllUsers() {
        try {
            return await User.findAll();
        } catch (error) {
            throw new Error('Error fetching users: ' + error.message);
        }
    }

    async getUserById(id) {
        try {
            const user = await User.findByPk(id, {
                attributes: { exclude: ['password'] }
            });
            if (!user) throw new Error('User not found');
            return user;
        } catch (error) {
            throw new Error('Error fetching user: ' + error.message);
        }
    }

    async deleteUser(id) {
        const t = await sequelize.transaction(); // Iniciar una transacción
    
        try {
            const user = await User.findByPk(id);
            if (!user) throw new Error('User not found');
    
            // Verificar el balance del usuario
            if (user.balance > 0) {
                throw {status:400, message: 'No se puede eliminar el usuario. La cuenta debe estar sin fondos.'};
            }
    
            await user.destroy({ transaction: t }); // Eliminar al usuario dentro de la transacción
            await t.commit(); // Confirmar la transacción
            return { message: 'User deleted successfully' };
        } catch (error) {
            await t.rollback(); // Revertir la transacción en caso de error
            throw new Error('Error deleting user: ' + error.message);
        }
    }

    async findUserByEmail(email) {
        try {
            return await User.findOne({ where: { email }, include: Role });
        } catch (error) {
            throw new Error('Error deleting user: ' + error.message);
        }
    }

    async verifyPassword(inputPassword, userPassword) {
        return await bcrypt.compare(inputPassword, userPassword);
    }

    async authenticateUser (email, password) {
        if (!email || !password) {
            throw { status: 400, message: 'Email and password are required.' };
        }
    
        const user = await this.findUserByEmail(email);
        if (!user) {
            throw { status: 404, message: 'User not found' };
        }
    
        const isMatch = await this.verifyPassword(password, user.password);
        if (!isMatch) {
            throw { status: 401, message: 'Incorrect password' };
        }
    
        const token = jwt.sign(
            { id: user.id, role: user.Role.id },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '1d' }
        );
    
        const refreshToken = jwt.sign(
            { id: user.id },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        );
    
        await tokenService.createToken({ userId: user.id, tokenString: refreshToken });
    
        return { token, role: user.Role.id, fullname: `${user.firstname} ${user.lastname}`, balance:user.balance };
    };

    async updatePassword (userId, currentPassword, newPassword) {
        const user = await User.findByPk(userId);
        if (!user) {
            throw new Error(`User with ID ${userId} not found`);
        }
    
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            throw new Error('Current password is incorrect.');
        }
    
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedNewPassword;
        await user.save();
        return { message: 'Password updated successfully.' };
    };

    async updateUser (userId, updates) {
        const user = await User.findByPk(userId, { attributes: { exclude: ['password'] } });
        if (!user) {
            throw new Error(`No user found with ID ${userId}.`);
        }
    
        // Actualizar campos
        user.firstname = updates.firstname || user.firstname;
        user.lastname = updates.lastname || user.lastname;
    
        await user.save();
        return user;
    };
}

export default new UserService();

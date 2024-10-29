import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { User, Role } from '../models/index.js';
import tokenService from './token.service.js';

class UserService {
    async createUser(data) {
        const { firstname, lastname, email, password, roleId=2000 } = data;

        // Check if the user already exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            throw { status: 409, message: 'Email already in use' };
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Find the role
        const role = await Role.findByPk(roleId);
        if (!role) {
            throw { status: 500, message: 'Default role CLIENTE not found' };
        }

        // Create and return new user
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
            const user = await User.findByPk(id);
            if (!user) throw new Error('User not found');
            return user;
        } catch (error) {
            throw new Error('Error fetching user: ' + error.message);
        }
    }

    async updateUser(id, data) {
        try {
            const user = await User.findByPk(id);
            if (!user) throw new Error('User not found');
            return await user.update(data);
        } catch (error) {
            throw new Error('Error updating user: ' + error.message);
        }
    }

    async deleteUser(id) {
        try {
            const user = await User.findByPk(id);
            if (!user) throw new Error('User not found');
            await user.destroy();
            return { message: 'User deleted successfully' };
        } catch (error) {
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
    
        return { token, role: user.Role.id, fullname: `${user.firstname} ${user.lastname}` };
    };
}

export default new UserService();

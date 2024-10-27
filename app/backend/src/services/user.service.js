import bcrypt from 'bcrypt';
import { User, Role } from '../models/index.js';

class UserService {
    async createUser(data) {
        try {
            const { name, lastname, email, password, roleId } = data;

            // Check if the user already exists
            const existingUser = await User.findOne({ where: { email } });
            if (existingUser) throw new Error('Email already in use');

            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Find the customer role
            const role = await Role.findByPk(roleId);
            if (!role) throw new Error('Default role CLIENTE not found');

            // Create and return new user
            return await User.create({
                name,
                lastname,
                email,
                password: hashedPassword,
                roleId: role.id
            });

        } catch (error) {
            throw new Error('Error creating user: ' + error.message);
        }
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
}

export default new UserService();

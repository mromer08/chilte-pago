import UserService from '../services/user.service.js';

class UserController {
    async createUser(req, res) {
        // Desestructurar los campos requeridos del cuerpo de la solicitud
        const { email, name, lastname, password, status, roleId=2000 } = req.body;

        // Verificar que todos los campos obligatorios estén presentes
        if (!email || !name || !lastname || !password || !status) {
            return res.status(400).json({ message: 'All required fields must be provided: email, name, lastname, password, status, and roleId.' });
        }
        try {
            const user = await UserService.createUser(req.body);
            res.status(201).json(user);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getAllUsers(req, res) {
        try {
            const users = await UserService.getAllUsers();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getUserById(req, res) {
        try {
            const { id } = req.params;
            const user = await UserService.getUserById(id);
            res.status(200).json(user);
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    }

    async updateUser(req, res) {
        try {
            const { id } = req.params;
            const updatedUser = await UserService.updateUser(id, req.body);
            res.status(200).json(updatedUser);
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    }

    async deleteUser(req, res) {
        try {
            const { id } = req.params;
            const result = await UserService.deleteUser(id);
            res.status(200).json(result);
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    }
}

export default new UserController();

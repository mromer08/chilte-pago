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

    async findUserByEmail(req, res) {
        const { email } = req.params;

        try {
            // Llamar al método del servicio que busca el usuario por email
            const user = await UserService.findUserByEmail(email);

            // Verificar si se encontró el usuario
            if (!user) {
                return res.status(404).json({ message: 'Usuario no encontrado', exists:false });
            }

            // Responder con los datos del usuario encontrado
            return res.status(200).json({exists:true, message: 'Usuario encontrado'});
        } catch (error) {
            // Manejar errores y enviar respuesta de error
            return res.status(500).json({ message: 'Error al buscar el usuario', error: error.message });
        }
    }
}

export default new UserController();

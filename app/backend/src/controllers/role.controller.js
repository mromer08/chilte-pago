import RoleService from '../services/role.service.js';

class RoleController {
    async createRole(req, res) {
        try {
            const role = await RoleService.createRole(req.body);
            res.status(201).json(role);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getAllRoles(req, res) {
        try {
            const roles = await RoleService.getAllRoles();
            res.status(200).json(roles);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getRoleById(req, res) {
        try {
            const { id } = req.params;
            const role = await RoleService.getRoleById(id);
            res.status(200).json(role);
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    }

    async updateRole(req, res) {
        try {
            const { id } = req.params;
            const updatedRole = await RoleService.updateRole(id, req.body);
            res.status(200).json(updatedRole);
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    }

    async deleteRole(req, res) {
        try {
            const { id } = req.params;
            const result = await RoleService.deleteRole(id);
            res.status(200).json(result);
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    }
}

export default new RoleController();

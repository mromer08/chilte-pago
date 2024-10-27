import { Role } from "../models/index.js";

class RoleService {
    async createRole(data) {
        try {
            const role = await Role.create(data);
            return role;
        } catch (error) {
            throw new Error('Error creating role: ' + error.message);
        }
    }

    async getAllRoles() {
        try {
            return await Role.findAll();
        } catch (error) {
            throw new Error('Error fetching roles: ' + error.message);
        }
    }

    async getRoleById(id) {
        try {
            const role = await Role.findByPk(id);
            if (!role) throw new Error('Role not found');
            return role;
        } catch (error) {
            throw new Error('Error fetching role: ' + error.message);
        }
    }

    async updateRole(id, data) {
        try {
            const role = await Role.findByPk(id);
            if (!role) throw new Error('Role not found');
            return await role.update(data);
        } catch (error) {
            throw new Error('Error updating role: ' + error.message);
        }
    }

    async deleteRole(id) {
        try {
            const role = await Role.findByPk(id);
            if (!role) throw new Error('Role not found');
            await role.destroy();
            return { message: 'Role deleted successfully' };
        } catch (error) {
            throw new Error('Error deleting role: ' + error.message);
        }
    }
}

export default new RoleService();

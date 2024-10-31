import express from 'express';
import UserController from '../controllers/user.controller.js';
import verifyRoles from '../middlewares/verifyRoles.middleware.js';
import { ADMIN, CUSTOMER } from '../config/roles.config.js';

const router = express.Router();

router.post('/', UserController.createUser);
router.get('/', verifyRoles(ADMIN), UserController.getAllUsers);
router.get('/:id', UserController.getUserById);
router.put('/:id', verifyRoles(CUSTOMER, ADMIN), UserController.updateUser);
router.delete('/:id',verifyRoles(CUSTOMER, ADMIN), UserController.deleteUser);

export default router;

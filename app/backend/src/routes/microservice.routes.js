import express from 'express';
import verifyAppJWT from '../middlewares/verifyAppJWT.middleware.js';
import userController from '../controllers/user.controller.js';


const router = express.Router();
router.get('/:email', verifyAppJWT, userController.findUserByEmail);

export default router;

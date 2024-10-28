import jwt from 'jsonwebtoken';

import userService from "../services/user.service.js";
import tokenService from '../services/token.service.js';
import applicationService from '../services/application.service.js';

export const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required.' });
    }

    try {
        // Find user by email
        const user = await userService.findUserByEmail(email);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Verify password
        const isMatch = await userService.verifyPassword(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Incorrect password' });
        }

        // Create JWT token
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

        await tokenService.createToken({userId: user.id, tokenString: refreshToken});

        res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 }); //secure: true add in production
        res.json({ token });
     
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const register = async (req, res) => {
    const { name, lastname, email, password } = req.body;

    if (!name || !lastname || !email || !password) {
        return res.status(400).json({ message: 'Name, lastname, email, and password are required.' });
    }

    try {
        const user = await userService.createUser({ name, lastname, email, password, roleId: 2000 });

        res.status(201).json({ success: `New user ${email} registered!` });
    } catch (error) {
        // Manejo de errores según el tipo de error
        if (error.message === 'Email already in use') {
            return res.status(409).json({ message: error.message });
        }
        res.status(500).json({ message: error.message });
    }
};

export const refreshTokenHandler = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;

    const foundToken = await tokenService.findTokenByTokenString(refreshToken);
    const foundUser = await userService.getUserById(foundToken.userId);
    if (!foundUser) return res.sendStatus(403); //Forbidden 
    // evaluate jwt 
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err || foundUser.id !== decoded.id) return res.sendStatus(403);
            const role = foundUser.role;
            const accessToken = jwt.sign(
                { id: user.id, role: user.Role.id },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '1d' }
            );
            res.json({ role, accessToken })
        }
    );
}

export const validateApplication = async (req, res) => {
    const { clientId, secretKey } = req.body;

    // Validar que ambos campos están presentes
    if (!clientId || !secretKey) {
        return res.status(400).json({ message: 'clientId and secretKey are required.' });
    }

    try {
        // Buscar la aplicación por clientId
        const application = await applicationService.getApplicationByClientId(clientId);
        if (!application) {
            return res.status(404).json({ message: 'Application not found' });
        }

        // Verificar que la secretKey coincida y que la aplicación esté activa
        if (application.secretKey !== secretKey) {
            return res.status(401).json({ message: 'Invalid secret key' });
        }
        if (application.status !== 'ACTIVO') {
            return res.status(403).json({ message: 'Application is not active' });
        }

        // Generar token JWT específico para la aplicación
        const token = jwt.sign(
            { applicationId: application.id, name: application.name },
            process.env.APP_TOKEN_SECRET,
            { expiresIn: '1d' }
        );

        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
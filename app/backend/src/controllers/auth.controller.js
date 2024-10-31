import jwt from 'jsonwebtoken';

import userService from "../services/user.service.js";
import tokenService from '../services/token.service.js';
import companyService from '../services/company.service.js';

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const { token, role, fullname, balance } = await userService.authenticateUser(email, password);
        return res.json({ token, role, fullname, balance:Number(balance) });
    } catch (error) {
        console.log(error)
        return res.status(error.status || 500).json({ message: error.message || 'Login Failed' });
    }
};

export const register = async (req, res) => {
    const { firstname, lastname, companyCode, password, username } = req.body;
    console.log(req.body);

    // Validar que los datos requeridos estén presentes
    if (!firstname || !lastname || !companyCode || !password || !username) {
        return res.status(400).json({ message: 'Firstname, lastname, companyCode, password, and username are required.' });
    }

    try {
        const user = await userService.createUser({ firstname, lastname, companyCode, password, username, roleId: 2000 });
        res.status(201).json({ success: `New user ${user.email} registered!` });
        
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message });
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

export const validateCompany = async (req, res) => {
    const { code, secretKey } = req.body;

    // Validar campos obligatorios
    if (!code || !secretKey) {
        return res.status(400).json({ message: 'Company ID and secret key are required.' });
    }

    try {
        // Autenticar la compañía
        const { token, companyName } = await companyService.authenticateCompany(code, secretKey);
        res.status(200).json({ token, companyName });
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message });
    }
};
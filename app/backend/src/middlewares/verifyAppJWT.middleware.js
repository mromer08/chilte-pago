import jwt from 'jsonwebtoken';

const verifyAppJWT = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401); // Unauthorized if no token

    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.COMPANY_TOKEN_SECRET, (err, decoded) => {
        if (err) return res.sendStatus(401); // Unauthorized if invalid token
        // Guardar applicationId en req.session.app.id
        req.session = {
            company: {
                id: decoded.code,
                name:decoded.name,
                userId:decoded.userId
            }
        };

        next(); // Proceed to the next middleware or route handler
    });
};

export default verifyAppJWT;
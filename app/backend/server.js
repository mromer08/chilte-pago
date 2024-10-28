import express from 'express';
import cors from 'cors';
import { authRoutes, paymentMethodRoutes, roleRoutes, userRoutes } from './src/routes/index.js';
import verifyJWT from './src/middlewares/verifyJWT.middleware.js'
const server = express();

server.use(express.json());
server.use(cors());

// built-in middleware to handle urlencoded form data
server.use(express.urlencoded({ extended: false }));

// built-in middleware for json 
server.use(express.json());

const api = '/api/v1';
server.use(`${api}/auth`, authRoutes);
server.use(`${api}/role`, roleRoutes);
server.use(`${api}/user`, userRoutes);
server.use(verifyJWT);
server.use(`${api}/payment-method`, paymentMethodRoutes);



server.all('api/*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    } else if (req.accepts('json')) {
        res.json({ "error": "404 Not Found" });
    } else {
        res.type('txt').send("404 Not Found");
    }
});

export default server;
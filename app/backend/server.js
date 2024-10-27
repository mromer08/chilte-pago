import express from 'express';
import cors from 'cors';

const server = express();

server.use(express.json());
server.use(cors());

// built-in middleware to handle urlencoded form data
server.use(express.urlencoded({ extended: false }));

// built-in middleware for json 
server.use(express.json());

const api = '/api';

// server.use(`${api}/static`, staticRouter);

// server.use(`${api}/auth`, authRouter);
// server.use(`${api}/category`, categoryRouter);
// server.use(`${api}/product`, productRouter);
// server.use(`${api}/store-settings`, storeSettingsRouter);
// // the user needs to be login
// server.use(verifyJWT);
// server.use(`${api}/order`, orderRouter);
// server.use(`${api}/bill`, billRouter);
// server.use(`${api}/credit-card`, creditCardRouter);
// server.use(`${api}/notification`, notificationRouter);
// server.use(`${api}/address`, addressRouter);
// server.use(`${api}/permission-type`, permissionTypeRouter);
// server.use(`${api}/role`, roleRouter);
// server.use(`${api}/user`, userRouter);

// server.use(`${api}/report`, reportRouter);


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
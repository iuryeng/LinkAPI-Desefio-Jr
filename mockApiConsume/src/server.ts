/** src/server.ts */
import dotenv from 'dotenv';
import http from 'http';
import express, { Express } from 'express';
import morgan from 'morgan';
import routes from './routes/users';

const exec = require('child_process').exec
const router: Express = express();

/** Logging */
router.use(morgan('dev'));

/** Takes care of JSON data */
router.use(express.json());

/** Roles Api */
router.use((req, res, next) => {
    // set the CORS policy
    res.header('Access-Control-Allow-Origin', '*');
    // set the CORS headers
    res.header('Access-Control-Allow-Headers', 'origin, X-Requested-With, Content-Type,Accept, Authorization');
    // set the CORS method headers
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET');
        return res.status(200).json({});
    }
    next();
});

/** Parse the request */
router.use(express.urlencoded({ extended: false }));

/** Routes */
router.use('/', routes);

/** Error handling */
router.use((req, res, next) => {
    const error = new Error('not found');
    return res.status(404).json({
        message: error.message
    });
});

/** Server */
dotenv.config();
const httpServer = http.createServer(router);
const PORT: any = process.env.PORT;
httpServer.listen(PORT, () => console.log(` ✔️  Server started on port ${PORT}`));

//send sign for kill port after and close http server
process.on('SIGINT', () => {
    httpServer.close(() =>{
        exec(`npx kill-port ${PORT}`)
    })
})



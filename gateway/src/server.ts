/** src/server.ts */
import dotenv from 'dotenv';
import http from 'http';
import express, { application, Express } from 'express';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import swaggerDocs from '../swagger.json';
import { resolve } from 'path';
import { readFileSync } from 'fs';
import * as yaml  from 'js-yaml';
import routes from './routes/users';

const pathFile = resolve(process.cwd(), 'config.yml')
const readConfig = readFileSync(pathFile, { encoding: 'utf8' })
const config = yaml.load(readConfig, { json: true })
const router: Express = express();

/** Logging */
router.use(morgan('dev'));

/** Takes care of JSON data */
router.use(express.json());

/** Parse the request */
router.use(express.urlencoded({ extended: false }));

/** Route default  */
router.get('/', (req, res)=>{
    return res.json({
        message: 'Running application'
    });
});

/** Router gateway proxy users and mockapi subprocess */
router.use('/', routes);

/** Swagger documentation */
router.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

/** Error handling */
router.use((req, res) => {
    const error = new Error('not found');
    return res.status(404).json({
        message: error.message
    });
});

/**Services used print */
console.log(pathFile);
console.log(readConfig);

/** Server */
dotenv.config();
const httpServer = http.createServer(router);
const PORT: any = process.env.PORT;
httpServer.listen(PORT, () => console.log(`🎁 Gateway started on port ${PORT}`));



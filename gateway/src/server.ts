/** src/server.ts */
import http from 'http';
import express, { application, Express } from 'express';
import morgan from 'morgan';
import { resolve } from 'path'
import { readFileSync } from 'fs'
import * as yaml  from 'js-yaml'
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

/** Route defaut  */
router.get('/', (req, res)=>{
    return res.json({
        message: 'Running application'
    });
});

/** Router gateway proxy users and mockapi subprocess */
router.use('/', routes);

/** Error handling */
router.use((req, res) => {
    const error = new Error('not found');
    return res.status(404).json({
        message: error.message
    });
});

/**Services used print */
console.log(pathFile)
console.log(readConfig)

/** Server */
const httpServer = http.createServer(router);
const PORT: any = process.env.PORT ?? 3030;
httpServer.listen(PORT, () => console.log(`🎁 Gateway started on port ${PORT}`));



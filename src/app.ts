import * as express from 'express';
import * as favicon from 'express-favicon';
import * as morgan from 'morgan';
import * as bodyParser from 'body-parser';
import * as errorHandler from 'errorhandler';
import * as path from 'path';
import {HttpError} from './error/index';
import {Router} from 'express';
import {NextFunction} from 'express';
import {Request} from 'express';
import {Response} from 'express';
import {Application} from 'express';
import {ObservatoryRoutes} from './routes/routes';
import { getLogger } from './libs/log';


export class App {
    express: Application;
    observatoryRoutes: ObservatoryRoutes;

    constructor() {
        this.express = express();
        this.initServer();
        this.observatoryRoutes = new ObservatoryRoutes(this);

    }

    initServer() {
        this.express.use(favicon(__dirname + '/public/favicon.ico'));

        if (this.express.get('env') === 'development') {
            this.express.use(morgan('dev'));
        } else {
            this.express.use(morgan('default'));
        }

        this.express.use(express.urlencoded({extended: true}));

        this.express.use(bodyParser.json());       // to support JSON-encoded bodies
        this.express.use(bodyParser.urlencoded({     // to support URL-encoded bodies
            extended: true
        }));

        this.express.use(express.static(path.join(__dirname, 'public')));

        this.express.use(function (req: Request, res: Response, next: NextFunction) {

            // Website you wish to allow to connect
           // res.setHeader('Access-Control-Allow-Origin', 'https://observatory-ui.herokuapp.com');
             res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

            // Request methods you wish to allow
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

            // Request headers you wish to allow
            res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

            // Set to true if you need the website to include cookies in the requests sent
            // to the API (e.g. in case you use sessions)
            res.setHeader('Access-Control-Allow-Credentials', 'false');

            // Pass to next layer of middleware
            next();
        });

        this.express.use(function (err: any, req: Request, res: Response, next: NextFunction) {
            if (typeof err === 'number') {
                err = new HttpError(err['message'], res.status);
            }
            const sendHttpError = () => {
                res.status(err.status);
                if (req.headers['x-requested-with'] === 'XMLHttpRequest') {
                    res.json(err);
                } else {
                    res.render("error", {error: err});
                }
            };
            if (err instanceof HttpError) {
                sendHttpError();
            } else {
                if (this.express.get('env') === 'development') {
                    errorHandler()(err, req, res, next);
                } else {
                    getLogger(module).error(err);
                    err = new HttpError(err.message, 500);
                    sendHttpError();
                }
            }
        });

    }

}

import * as express from 'express';
import {Express} from 'express';

class App {
    express: Express;
    constructor() {
        this.express = express();
        this.testMethod();
    }

    testMethod() {
        const router = express.Router();
        router.get('/', (req, res) => {
            res.json({
                message: 'Hello World!'
            })
        });
        this.express.use('/', router)
    }

}

export default new App().express;
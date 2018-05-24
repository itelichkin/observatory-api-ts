import * as express from 'express';

export class App {
    public express;

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
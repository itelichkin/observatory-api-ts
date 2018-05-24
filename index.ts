import * as express from 'express';

export class App {
    express;
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

const app = new App().express;

const port = process.env.PORT || 3000;

app.listen(port, (err) => {
    if (err) {
        return console.log(err)
    }

    return console.log(`server is listening on ${port}`)
});
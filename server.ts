import { App } from './src/app';

const app = new App().express;
const port = process.env.PORT || 3000;

app.listen(port, (err) => {
    if (err) {
        return console.log(err)
    }

    return console.log(`server is listening on ${port}`)
});
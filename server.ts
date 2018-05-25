import {App} from './src/app';
const config = require('./src/config/index');
const app = new App().express;
const port = process.env.PORT || config.get('port');


app.listen(port, (err) => {
    if (err) {
        return console.log(err)
    }
    return console.log(`server is listening on ${port}`)
});
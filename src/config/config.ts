import * as path from 'path';
import * as nconf from 'nconf';

module.exports = nconf.argv()
    .env()
    .file({file: path.join(__dirname,'config.json')});

import * as nconf from 'nconf';
import * as path from 'path';


class Config {
    nconf;

    constructor() {
        this.nconf = nconf;
        this.nconf.argv().env().file({ file: path.join(__dirname, 'config.json') });
    }
}

export const config = new Config().nconf;

/*
const nconf = require('nconf');
const path = require('path');

nconf.argv()
    .env()
    .file({ file: path.join(__dirname, 'config.json') });

module.exports = nconf;*/

import * as _mongoose from 'mongoose';
const config = require('../config/config');

class MongooseLib {
    mongoose;

    constructor() {
        this.mongoose = _mongoose;
        this.mongoose.connect(config.mongoose.uri, config.mongoose.server);
    }
}

export const mongoose = new MongooseLib().mongoose;
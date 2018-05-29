import * as _mongoose from 'mongoose';
const config = require('../config/index');


class MongooseLib {
    mongoose;

    constructor() {
        this.mongoose = _mongoose;
        this.mongoose.connect(config.get('mongoose:uri'), config.get('mongoose:options'));
    }
}

export const mongoose = new MongooseLib().mongoose;
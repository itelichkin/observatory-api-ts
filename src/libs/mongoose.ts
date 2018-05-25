import * as _mongoose from 'mongoose';
import {config} from '../config/config';


class MongooseLib {
    mongoose: _mongoose.Mongoose;

    constructor() {
    this.mongoose = _mongoose;
    this.mongoose.connect('mongodb://localhost/observatory')
    }
}

export const mongoose = new MongooseLib().mongoose;
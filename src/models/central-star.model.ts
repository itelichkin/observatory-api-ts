import {Schema} from 'mongoose';
import * as mongoose from 'mongoose'


export class CentralStarModel {
    private _centralStarDataSchema;
    centralStarDataSchema;

    constructor() {
        this._centralStarDataSchema = new Schema({
            id: Schema.Types.ObjectId,
            name: {
                type: String,
                unique: true,
                required: true
            },
            weight: Number,
            speed: Number,
            discoverer: String,
            systemId: String,
            position: {
                x: Number,
                y: Number
            },
            size: {
                width: Number,
                height: Number
            },
            type: String,
            imageName: String
        });
        this.centralStarDataSchema = mongoose.model('CentralStarDataSchema', this._centralStarDataSchema);
    }
}


import {Schema} from 'mongoose';
import * as mongoose from 'mongoose'


export class GalaxyModel {
    private _galaxyDataSchema;
    galaxyDataSchema;

    constructor() {
        this._galaxyDataSchema = new Schema({
            id: Schema.Types.ObjectId,
            name: {
                type: String,
                unique: true,
                required: true
            },
            weight: Number,
            speed: Number,
            discoverer: String,
            position: {
                x: Number,
                y: Number
            },
            diameter: String,
            numberOfStars: String,
            thickness: String,
            type: String,
        });
        this.galaxyDataSchema = mongoose.model('GalaxyDataSchema', this._galaxyDataSchema);
    }
}


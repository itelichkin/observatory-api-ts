import {Schema} from 'mongoose';
import * as mongoose from 'mongoose'


export class PlanetModel {
    private _planetDataSchema;
    planetDataSchema;

    constructor() {
        this._planetDataSchema = new Schema({
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
            imageName: String,
            parentRadius: Number,
            angle: Number,
            orbitSpeed: Number,
            observers: [String]
        });
        this.planetDataSchema = mongoose.model('PlanetDataSchema', this._planetDataSchema);
    }
}


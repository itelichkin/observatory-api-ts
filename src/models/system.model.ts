import {Schema} from 'mongoose';
import * as mongoose from 'mongoose'


export class SystemModelModel {
    private _systemDataSchema;
    systemDataSchema;

    constructor() {
        this._systemDataSchema = new Schema({
            id: Schema.Types.ObjectId,
            name: {
                type: String,
                unique: true,
                required: true
            },
            weight: Number,
            speed: Number,
            discoverer: String,
            galaxyId: String,
            position: {
                x: Number,
                y: Number
            },
            type: String,
            imageName: String,
            age: String,
            starsAmount: String,
            planetsAmount: String,
            dwarfPlanetAmount: String,
            satellitesAmount: String,
            smallBodyAmount: String,
            cometAmount: String
        });
        this.systemDataSchema = mongoose.model('SystemDataSchema', this._systemDataSchema);
    }
}


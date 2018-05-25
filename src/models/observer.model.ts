import {Schema} from 'mongoose';
import * as mongoose from 'mongoose'


export class ObserverModel {
    private _observerDataSchema;
    observerDataSchema;

    constructor() {
        this._observerDataSchema = new Schema({
            id: Schema.Types.ObjectId,
            name: {
                type: String,
                unique: true,
                required: true
            },
            observablePlanets: [String],
        });
        this.observerDataSchema = mongoose.model('ObserverDataSchema', this._observerDataSchema);
    }
}


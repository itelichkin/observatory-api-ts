/*
import {Schema} from 'mongoose';
import * as mongoose from 'mongoose'


export class UniverseModel {
    private _universeDataSchema;
    universeDataSchema;

    constructor() {
        this._universeDataSchema = new Schema({
            id: Schema.Types.ObjectId,
            name: {
                type: String,
                unique: true,
                required: true
            },
            weight: String,
            speed: String,
            discoverer: String,
            position: {
                x: Number,
                y: Number
            },
            galaxiesAmount: Number,
            age: String,
            averageTemperature: String,
            diameter: String,
            type: {
                type: String,
                required: true
            },
        });
        this.universeDataSchema = mongoose.model('UniverseDataSchema', this._universeDataSchema);
    }
}


*/



import { Document, Schema, Model, model} from "mongoose";
import { mongoose } from '../libs/mongoose';


export const UniverseDataSchema = new Schema({
    id: Schema.Types.ObjectId,
    name: {
        type: String,
        unique: true,
        required: true
    },
    weight: String,
    speed: String,
    discoverer: String,
    position: {
        x: Number,
        y: Number
    },
    galaxiesAmount: Number,
    age: String,
    averageTemperature: String,
    diameter: String,
    type: {
        type: String,
        required: true
    },
});


export const UniverseModel = mongoose.model('UniverseDataSchema', UniverseDataSchema);
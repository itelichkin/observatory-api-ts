import { Schema} from "mongoose";
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
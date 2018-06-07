import { Schema} from "mongoose";
import { mongoose } from '../libs/mongoose';


export const PlanetsDataSchema = new Schema({
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

export const PlanetModel = mongoose.model('PlanetsDataSchema', PlanetsDataSchema);


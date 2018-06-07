import { Schema} from "mongoose";
import { mongoose } from '../libs/mongoose';


export const SystemsDataSchema = new Schema({
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

export const SystemModel = mongoose.model('SystemsDataSchema', SystemsDataSchema);

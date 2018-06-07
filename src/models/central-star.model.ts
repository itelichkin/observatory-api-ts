import { Schema} from "mongoose";
import { mongoose } from '../libs/mongoose';

export const CentralStarsDataSchema = new Schema({
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

export const CentralStarModel = mongoose.model('CentralStarsDataSchema', CentralStarsDataSchema);

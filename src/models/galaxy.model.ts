import { Schema} from "mongoose";
import { mongoose } from '../libs/mongoose';


export const GalaxiesDataSchema = new Schema({
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

export const GalaxyModel = mongoose.model('GalaxiesDataSchema', GalaxiesDataSchema);


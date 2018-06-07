import { Schema} from "mongoose";
import { mongoose } from '../libs/mongoose';

export const ObserversDataSchema = new Schema({
    id: Schema.Types.ObjectId,
    name: {
        type: String,
        unique: true,
        required: true
    },
    observablePlanets: [String],
});

export const ObserverModel = mongoose.model('ObserversDataSchema', ObserversDataSchema);


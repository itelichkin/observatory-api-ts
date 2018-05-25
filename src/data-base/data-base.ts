import * as async from 'async';
import {mongoose} from '../libs/mongoose';
import {Schema} from 'mongoose';
import {UniverseModel} from '../models/universe.model';


export class DataBase {
    private universeDataSchema;
    private universeSchema: Schema;
    private universe;
    private observatorySchema: Schema;
    observatory;

    constructor() {
        this.initUniversal();
        this.initObservatory();
    }


    initUniversal() {
        const generateUniverseData = this.generateUniverseData;
        this.universeSchema = new Schema();
        this.universeSchema.statics.getUniverse = function () {
            return new Promise((resolve, reject) => {
                UniverseModel.find({}, function (err, res) {
                    if (err) {
                        return new Error(err)
                    }
                    if (res && res.length > 0) {
                        resolve(generateUniverseData(res[0]));
                    } else {
                        resolve(null);
                    }
                });
            });
        };
        this.universe = mongoose.model('Universe', this.universeSchema);
    }

    generateUniverseData(univ) {
        return {
            id: univ._id,
            name: univ.name,
            weight: univ.weight,
            speed: univ.speed,
            discoverer: univ.discoverer,
            position: {
                x: univ.position.x,
                y: univ.position.y
            },
            galaxiesAmount: univ.galaxiesAmount,
            age: univ.age,
            averageTemperature: univ.averageTemperature,
            diameter: univ.diameter,
            type: univ.type,
        }
    }

    initObservatory() {
        this.observatorySchema = new Schema({
            universe: Object
        });
        const observatoryModel = mongoose.model('ObservatoryModel', this.observatorySchema);
        this.observatory = new observatoryModel({
            universe: this.universe
        });
    }
}
import * as async from 'async';
import {mongoose} from '../libs/mongoose';
import {Schema} from 'mongoose';
import {UniverseModel} from '../models/universe.model';
import {GalaxyModel} from '../models/galaxy.model';
import {SystemModel} from '../models/system.model';
import {CentralStarModel} from '../models/central-star.model';
import {PlanetModel} from '../models/planet.model';
import {ObserverModel} from '../models/observer.model';


export class DataBase {
    private universeSchema: Schema;
    private galaxiesSchema: Schema;
    private systemsSchema: Schema;
    private centralStarsSchema: Schema;
    private planetsSchema: Schema;
    private observersSchema: Schema;
    private universe;
    private galaxies;
    private systems;
    private centralStars;
    private planets;
    private observers;
    private observatorySchema: Schema;
    observatory;

    constructor() {
        this.initUniverse();
        this.initGalaxy();
        this.initSystems();
        this.initCentralStars();
        this.initPlanets();
        this.initObservers();
        this.initObservatory();
    }


    initUniverse() {
        const generateUniverseData = this.generateUniverseData;
        this.universeSchema = new Schema();
        this.universeSchema.statics.getUniverse = () => {
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

    initGalaxy() {
        const generateGalaxyData = this.generateGalaxyData;
        const generateSystemData = this.generateSystemData;
        this.galaxiesSchema = new Schema();
        this.galaxiesSchema.statics.getGalaxies = function () {
            return new Promise((resolve, reject) => {
                GalaxyModel.find({}, function (err, res) {
                    if (err) {
                        return new Error(err)
                    }
                    let _galaxies = [];
                    if (res) {
                        res.forEach((gal) => {
                            const galaxy = generateGalaxyData(gal);
                            _galaxies.push(galaxy);
                        });
                    }
                    resolve(_galaxies);
                });
            });
        };
        this.galaxiesSchema.statics.getGalaxyById = (id) => {
            return new Promise((resolve, reject) => {
                GalaxyModel.findOne({_id: id}, function (err, data) {
                    if (err) {
                        return new Error(err)
                    }
                    let galaxy = null;
                    if (data) {
                        galaxy = generateGalaxyData(data);
                    }
                    resolve(galaxy);
                });
            });
        };
        this.galaxiesSchema.statics.getSystemsByGalaxyId = (id) => {
            return new Promise((resolve, reject) => {
                SystemModel.find({galaxyId: id}, function (err, data) {
                    if (err) {
                        return new Error(err)
                    }
                    const systems = [];
                    if (data) {
                        data.forEach((system) => {
                            systems.push(generateSystemData(system))
                        });
                    }
                    resolve(systems);
                });
            });
        };

        this.galaxies = mongoose.model('Galaxies', this.galaxiesSchema);
    }

    generateGalaxyData(gal) {
        return {
            id: gal._id,
            name: gal.name,
            weight: gal.weight,
            speed: gal.speed,
            discoverer: gal.discoverer,
            position: {
                x: gal.position.x,
                y: gal.position.y
            },
            diameter: gal.diameter,
            numberOfStars: gal.numberOfStars,
            thickness: gal.thickness,
            type: gal.type
        }
    }

    initSystems() {
        const generateSystemData = this.generateSystemData;
        const generateStarData = this.generateStarData;
        const generatePlanetData = this.generatePlanetData;
        this.systemsSchema = new Schema();

        this.systemsSchema.statics.getSystems = () => {
            return new Promise((resolve, reject) => {
                SystemModel.find({}, function (err, res) {
                    if (err) {
                        return new Error(err)
                    }
                    const _systems = [];
                    if (res) {
                        res.forEach((sys) => {
                            const system = generateSystemData(sys);
                            _systems.push(system);
                        });
                    }
                    resolve(_systems);
                });
            });
        };

        this.systemsSchema.statics.getSystemById = (id) => {
            return new Promise((resolve, reject) => {
                SystemModel.findOne({_id: id}, function (err, data) {
                    if (err) {
                        return new Error(err)
                    }
                    let system;
                    if (data) {
                        system = generateSystemData(data);
                    }
                    resolve(system);
                });
            });
        };

        this.systemsSchema.statics.getCentralStarsBySystemId = (id) => {
            return new Promise((resolve, reject) => {
                CentralStarModel.find({systemId: id}, function (err, data) {
                    if (err) {
                        return new Error(err)
                    }
                    const stars = [];
                    if (data) {
                        data.forEach((star) => {
                            stars.push(generateStarData(star))
                        });
                    }
                    resolve(stars);
                });
            });
        };

        this.systemsSchema.statics.getPlanetsBySystemId = (id) => {
            return new Promise((resolve, reject) => {
                PlanetModel.find({systemId: id}, function (err, data) {
                    if (err) {
                        return new Error(err)
                    }
                    const planets = [];
                    if (data && data.length > 0) {
                        data.forEach((planet) => {
                            planets.push(generatePlanetData(planet))
                        });
                    }
                    resolve(planets);
                });
            });
        };

        this.systems = mongoose.model('Systems', this.systemsSchema);
    }

    generateSystemData(sys) {
        return {
            id: sys._id,
            name: sys.name,
            weight: sys.weight,
            speed: sys.speed,
            discoverer: sys.discoverer,
            galaxyId: sys.galaxyId,
            position: {
                x: sys.position.x,
                y: sys.position.y
            },
            type: sys.type,
            imageName: sys.imageName,
            age: sys.age,
            starsAmount: sys.starsAmount,
            planetsAmount: sys.planetsAmount,
            dwarfPlanetAmount: sys.dwarfPlanetAmount,
            satellitesAmount: sys.satellitesAmount,
            smallBodyAmount: sys.smallBodyAmount,
            cometAmount: sys.cometAmount
        }
    }

    initCentralStars() {
        const generateStarData = this.generateStarData;
        this.centralStarsSchema = new Schema();
        this.centralStarsSchema.statics.getCentralStars = () => {
            return new Promise((resolve, reject) => {
                CentralStarModel.find({}, function (err, res) {
                    if (err) {
                        return new Error(err)
                    }
                    const _centralStars = [];
                    if (res) {
                        res.forEach((center) => {
                            const star = generateStarData(center);
                            _centralStars.push(star);
                        });
                    }
                    resolve(_centralStars)
                });
            });
        };

        this.centralStarsSchema.statics.getCentralStarById = (id) => {
            return new Promise((resolve, reject) => {
                CentralStarModel.findOne({_id: id}, function (err, data) {
                    if (err) {
                        return new Error(err)
                    }
                    let star = null;
                    if (data) {
                        star = generateStarData(data);
                    }
                    resolve(star);
                });
            });
        };
        this.centralStars = mongoose.model('CentralStars', this.centralStarsSchema);
    }

    generateStarData(center) {
        return {
            id: center._id,
            name: center.name,
            weight: center.weight,
            speed: center.speed,
            discoverer: center.discoverer,
            systemId: center.systemId,
            position: {
                x: center.position.x,
                y: center.position.y
            },
            size: {
                width: center.size.width,
                height: center.size.height
            },
            type: center.type,
            imageName: center.imageName
        };
    }

    initPlanets() {
        const generatePlanetData = this.generatePlanetData;
        this.planetsSchema = new Schema();
        this.planetsSchema.statics.getPlanets = () => {
            return new Promise((resolve, reject) => {
                PlanetModel.find({}, function (err, res) {
                    if (err) {
                        return new Error(err)
                    }
                    const _planets = [];
                    if (res) {
                        res.forEach((plan) => {
                            const planet = generatePlanetData(plan);
                            _planets.push(planet);
                        });
                    }
                    resolve(_planets);
                })
            });
        };

        this.planetsSchema.statics.getPlanetById = (id) => {
            return new Promise((resolve, reject) => {
                PlanetModel.findOne({_id: id}, function (err, data) {
                    if (err) {
                        return new Error(err)
                    }
                    let planet = null;
                    if (data) {
                        planet = generatePlanetData(data);
                    }
                    resolve(planet);
                });
            });
        };
        this.planets = mongoose.model('Planets', this.planetsSchema);
    }

    generatePlanetData(plan) {
        return {
            id: plan._id,
            name: plan.name,
            weight: plan.weight,
            speed: plan.speed,
            discoverer: plan.discoverer,
            systemId: plan.systemId,
            position: {
                x: plan.position.x,
                y: plan.position.y
            },
            size: {
                width: plan.size.width,
                height: plan.size.height
            },
            type: plan.type,
            imageName: plan.imageName,
            parentRadius: plan.parentRadius,
            angle: plan.angle,
            orbitSpeed: plan.orbitSpeed,
            observers: plan.observers
        };
    }

    initObservers() {
        this.observersSchema = new Schema();
        this.observersSchema.statics.getObservers = () => {
            return new Promise((resolve, reject) => {
                ObserverModel.find({}, function (err, data) {
                    if (err) {
                        return new Error(err)
                    }
                    const observers = [];
                    if (data && data.length > 0) {
                        data.forEach((observer) => {
                            observers.push({
                                id: observer._id,
                                name: observer['name'],
                                observablePlanets: observer['observablePlanets']
                            });
                        })
                    }
                    resolve(observers);
                });
            });
        };

        this.observersSchema.statics.setObservers = (data) => {
            const observerId = data['observerId'];
            const planetId = data['planetId'];
            return new Promise((resolve, reject) => {
                ObserverModel.findOne({_id: observerId}, function (err, data) {
                    if (err) {
                        return new Error(err)
                    }
                    if (data) {
                        if (data['observablePlanets'] && data['observablePlanets'].length > 0) {
                            let isExist = false;
                            data['observablePlanets'].some((planet) => {
                                if (planet === planetId) {
                                    isExist = true;
                                    return true;
                                }
                            });
                            if (!isExist) {
                                data['observablePlanets'].push(planetId);
                                data.save();
                            }
                        } else {
                            data['observablePlanets'].push(planetId);
                            data.save();
                        }
                    }
                });
                PlanetModel.findOne({_id: planetId}, function (err, data) {
                    if (err) {
                        return new Error(err)
                    }
                    if (data) {
                        if (data['observers'] && data['observers'].length > 0) {
                            let isExist = false;
                            data['observers'].some((observer) => {
                                if (observer === observerId) {
                                    isExist = true;
                                    return true;
                                }
                            });
                            if (!isExist) {
                                data['observers'].push(observerId);
                                data.save();
                            }
                        } else {
                            data['observers'].push(observerId);
                            data.save();
                        }
                        resolve({modify: true})
                    } else {
                        resolve({modify: false})
                    }

                });
            });
        };
        this.observers = mongoose.model('Observers', this.observersSchema);
    }

    initObservatory() {
        this.observatorySchema = new Schema({
            universe: Object,
            galaxies: Object,
            systems: Object,
            centralStars: Object,
            planets: Object,
            observers: Object,
        });

        this.observatorySchema.methods.getAllSpaceObjects = async () => {
            const universe = [await this.observatory.universe.getUniverse()];
            const galaxies = await this.observatory.galaxies.getGalaxies();
            const systems = await this.observatory.systems.getSystems();
            const centralStars = await this.observatory.centralStars.getCentralStars();
            const planets = await this.observatory.planets.getPlanets();
            return universe.concat(galaxies, systems, centralStars, planets);
        };

        this.observatorySchema.methods.getObjectById = async (id, type) => {
            return this.getSpaceObject(id, type, null);
        };

        this.observatorySchema.methods.createSpaceObject = async (data) => {
            let result;
            switch (data.type) {
                case 'Universe':
                    const universe = new mongoose.models.UniverseDataSchema(data);
                    universe.save();
                    result = true;
                    break;
                case 'Galaxy':
                    const galaxy = new mongoose.models.GalaxiesDataSchema(data);
                    galaxy.save();
                    result = true;
                    break;
                case 'System':
                    const system = new mongoose.models.SystemsDataSchema(data);
                    system.save();
                    result = true;
                    break;
                case 'Star':
                    const star = new mongoose.models.CentralStarsDataSchema(data);
                    star.save();
                    result = true;
                    break;
                case 'Planet':
                    const planet = new mongoose.models.PlanetsDataSchema(data);
                    planet.save();
                    result = true;
                    break;
                default:
                    result = false;
            }
            return result;
        };

        this.observatorySchema.methods.editObjectById = async (data) => {
            const callBack = (object) => {
                switch (data.type) {
                    case 'Universe':
                    case 'Galaxy':
                    case 'System':
                    case 'Star':
                    case 'Planet':
                        for (const key in data) {
                            if (data.hasOwnProperty(key)) {
                                if (key !== 'id' && key !== '_id' && !!object[key] && key !== 'type') {
                                    object[key] = data[key];
                                }
                            }
                        }
                        object.save();
                        break;
                }
            };
            return this.getSpaceObject(data.id, data.type, callBack);
        };

        this.observatorySchema.methods.removeObject = async (id, type) => {
            const callBack = (object) => {
                switch (type) {
                    case 'Universe':
                    case 'Galaxy':
                    case 'System':
                    case 'Star':
                    case 'Planet':
                        object.remove();
                        break;
                }
            };
            return this.getSpaceObject(id, type, callBack);
        };


        const observatoryModel = mongoose.model('ObservatoryModel', this.observatorySchema);
        this.observatory = new observatoryModel({
            universe: this.universe,
            galaxies: this.galaxies,
            systems: this.systems,
            centralStars: this.centralStars,
            planets: this.planets,
            observers: this.observers
        });
    }

    async getSpaceObject(id, type, callBack) {
        return new Promise(async (resolve, reject) => {
            let object = null;
            switch (type) {
                case 'Universe':
                    const generateUniverseData = this.generateUniverseData;
                    const universe = await this.observatory.universe.getUniverse();
                    if (universe.id.toString() === id.toString()) object = generateUniverseData(universe);
                    break;
                case 'Galaxy':
                    const generateGalaxyData = this.generateGalaxyData;
                    await GalaxyModel.findOne({_id: id}, function (err, data) {
                        if (err) {
                            return new Error(err)
                        } else {
                            if (data && !callBack) {
                                object = generateGalaxyData(data);
                            } else if (data && callBack) {
                                callBack(data);
                                object = true;
                            } else {
                                object = null;
                            }
                        }
                    });
                    break;
                case 'System':
                    const generateSystemData = this.generateSystemData;
                    await SystemModel.findOne({_id: id}, function (err, data) {
                        if (err) {
                            return new Error(err)
                        } else {
                            if (data && !callBack) {
                                object = generateSystemData(data);
                            } else if (data && callBack) {
                                callBack(data);
                                object = true;
                            } else {
                                object = null;
                            }
                        }
                    });
                    break;
                case 'Star':
                    const generateStarData = this.generateStarData;
                    await CentralStarModel.findOne({_id: id}, function (err, data) {
                        if (err) {
                            return new Error(err)
                        } else {
                            if (data && !callBack) {
                                object = generateStarData(data);
                            } else if (data && callBack) {
                                callBack(data);
                                object = true;
                            } else {
                                object = null;
                            }
                        }
                    });
                    break;
                case 'Planet':
                    const generatePlanetData = this.generatePlanetData;
                    await PlanetModel.findOne({_id: id}, function (err, data) {
                        if (err) {
                            return new Error(err)
                        } else {
                            if (data && !callBack) {
                                object = generatePlanetData(data);
                            } else if (data && callBack) {
                                callBack(data);
                                object = true;
                            } else {
                                object = null;
                            }
                        }
                    });
                    break;
                default:
                    object = null;
            }
            resolve(object)
        });
    }
}
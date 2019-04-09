import {App} from '../app';
import {DataBase} from '../data-base/index'
import {NextFunction} from 'express';
import {Request} from 'express';
import {Response} from 'express';
import {ObservatoryType} from '../types/observatory-type';

export class ObservatoryRoutes {
    public app;

    constructor(app: App) {
        this.app = app.express;
        const observatory: ObservatoryType = new DataBase().observatory;
        this.loadRoutes(observatory);
    }

    loadRoutes(observatory: ObservatoryType) {
        this.globalRoute(observatory);
        this.universeRoute(observatory);
        this.galaxyRoute(observatory);
        this.systemRoute(observatory);
        this.centralStarRoute(observatory);
        this.planetRoute(observatory);
        this.observerRoute(observatory);
    }

    globalRoute(observatory: ObservatoryType) {
        this.app.get('/space-objects', async function (req: Request, res: Response, next: NextFunction) {
            let allObjects;
            try {
                allObjects = await observatory.getAllSpaceObjects();
                res.send(allObjects)
            } catch (e) {
                next(e)
            }
        });

        this.app.delete('/space-object', async function (req, res, next) {
            const id = req.query.id;
            const type = req.query.type;
            if (!id || !type) {
                res.status(400);
                res.send(!id ? 'No id' : 'No type');
                return;
            } else if (typeof id !== 'string' || typeof type !== 'string') {
                res.status(400);
                res.send(typeof id !== 'string' ? 'Id is not a string' : 'Type is not a string');
                return;
            }
            let object;
            try {
                object = await observatory.removeObject(id, type);
                res.send({removed: !!object});
            } catch (e) {
                next(e)
            }
        });

        this.app.get('/space-object', async function (req, res, next) {
            const id = req.query.id;
            const type = req.query.type;
            if (!id || !type) {
                res.status(400);
                res.send(!id ? 'No id' : 'No type');
                return;
            } else if (typeof id !== 'string' || typeof type !== 'string') {
                res.status(400);
                res.send(typeof id !== 'string' ? 'Id is not a string' : 'Type is not a string');
                return;
            }
            let object;
            try {
                object = await observatory.getObjectById(id, type);
                res.send(object)
            } catch (e) {
                next(e)
            }
        });

        this.app.post('/space-object', async function (req, res, next) {
            if (!req.body['type'] || !req.body['name']) {
                res.status(400);
                res.send('Wrong data');
                return;
            }
            let object;
            try {
                object = await observatory.editObjectById(req.body);
                res.send({modify: !!object});
            } catch (e) {
                next(e)
            }
        });

        this.app.post('/space-objects', async function (req, res, next) {
            if (!req.body['type'] || !req.body['name']) {
                res.status(400);
                res.send('Wrong data');
                return;
            }
            let object;
            try {
                object = await observatory.createSpaceObject(req.body);
                res.send({saved: !!object});
            } catch (e) {
                next(e)
            }
        });


    }

    universeRoute(observatory: ObservatoryType) {
        this.app.get('/universe', async function (req, res, next) {
            let universe;
            try {
                universe = await observatory.universe.getUniverse();
                res.send(universe);
            } catch (e) {
                next(e)
            }
        });
    }

    galaxyRoute(observatory: ObservatoryType) {
        this.app.get('/galaxies', async function (req, res, next) {
            let galaxies;
            try {
                galaxies = await observatory.galaxies.getGalaxies();
                res.send(galaxies);
            } catch (e) {
                next(e)
            }
        });

        this.app.get('/galaxy', async function (req, res, next) {
            const id = req.query.id;
            if (!id) {
                res.status(400);
                res.send('No id');
                return;
            } else if (typeof id !== 'string') {
                res.status(400);
                res.send('Id is not a string');
                return;
            }
            let galaxy;
            try {
                galaxy = await observatory.galaxies.getGalaxyById(id);
                res.send(galaxy);
            } catch (e) {
                next(e)
            }
        });

        this.app.get('/galaxy/systems', async function (req, res, next) {
            const id = req.query.id;
            if (!id) {
                res.status(400);
                res.send('No id');
                return;
            } else if (typeof id !== 'string') {
                res.status(400);
                res.send('Id is not a string');
                return;
            }
            let galaxy;
            try {
                galaxy = await observatory.galaxies.getSystemsByGalaxyId(id);
                res.send(galaxy);
            } catch (e) {
                next(e)
            }
        });
    }

    systemRoute(observatory: ObservatoryType) {
        this.app.get('/systems', async function (req, res, next) {
            let systems;
            try {
                systems = await observatory.systems.getSystems();
                res.send(systems);
            } catch (e) {
                next(e)
            }
        });

        this.app.get('/system', async function (req, res, next) {
            const id = req.query.id;
            if (!id) {
                res.status(400);
                res.send('No id');
                return;
            } else if (typeof id !== 'string') {
                res.status(400);
                res.send('Id is not a string');
                return;
            }
            let system;
            try {
                system = await observatory.systems.getSystemById(id);
                res.send(system);
            } catch (e) {
                next(e)
            }
        });

        this.app.get('/system/central-stars', async function (req, res, next) {
            const id = req.query.id;
            if (!id) {
                res.status(400);
                res.send('No id');
                return;
            } else if (typeof id !== 'string') {
                res.status(400);
                res.send('Id is not a string');
                return;
            }
            let stars;
            try {
                stars = await observatory.systems.getCentralStarsBySystemId(id);
                res.send(stars);
            } catch (e) {
                next(e)
            }
        });

        this.app.get('/system/planets', async function (req, res, next) {
            const id = req.query.id;
            if (!id) {
                res.status(400);
                res.send('No id');
                return;
            } else if (typeof id !== 'string') {
                res.status(400);
                res.send('Id is not a string');
                return;
            }
            let planets;
            try {
                planets = await observatory.systems.getPlanetsBySystemId(id);
                res.send(planets);
            } catch (e) {
                next(e)
            }
        });
    }

    centralStarRoute(observatory: ObservatoryType) {
        this.app.get('/central-star/', async function (req, res, next) {
            const id = req.query.id;
            if (!id) {
                res.status(400);
                res.send('No id');
                return;
            } else if (typeof id !== 'string') {
                res.status(400);
                res.send('Id is not a string');
                return;
            }
            let star;
            try {
                star = await observatory.centralStars.getCentralStarById(id);
                res.send(star);
            } catch (e) {
                next(e)
            }
        });

        this.app.get('/central-stars', async function (req, res, next) {
            let centralStars;
            try {
                centralStars = await observatory.centralStars.getCentralStars();
                res.send(centralStars);
            } catch (e) {
                next(e)
            }
        });
    }

    planetRoute(observatory: ObservatoryType) {
        this.app.get('/planets', async function (req, res, next) {
            let planets;
            try {
                planets = await observatory.planets.getPlanets();
                res.send(planets);
            } catch (e) {
                next(e)
            }
        });

        this.app.get('/planet', async function (req, res, next) {
            const id = req.query.id;
            if (!id) {
                res.status(400);
                res.send('No id');
                return;
            } else if (typeof id !== 'string') {
                res.status(400);
                res.send('Id is not a string');
                return;
            }
            let planet;
            try {
                planet = await observatory.planets.getPlanetById(id);
                res.send(planet);
            } catch (e) {
                next(e)
            }
        });
    }

    observerRoute(observatory: ObservatoryType) {
        this.app.get('/observers', async function (req, res, next) {
            let observers;
            try {
                observers = await observatory.observers.getObservers();
                res.send(observers);
            } catch (e) {
                next(e)
            }
        });

        this.app.post('/observers', async function (req, res, next) {
            let observers;
            try {
                observers = await observatory.observers.setObservers(req.body);
                res.send(observers);
            } catch (e) {
                next(e)
            }
        });
    }

}

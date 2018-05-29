import {App} from '../app';
import {DataBase} from '../data-base/index'
import {NextFunction} from 'express';
import {Request} from 'express';
import {Response} from 'express';


export class ObservatoryRoutes {
    public app;
    observatory;

    constructor(app: App) {
        this.app = app.express;
        this.observatory = new DataBase().observatory;
        this.loadRoutes(this.observatory);
    }

    loadRoutes(observatory) {

        this.app.get('/space-objects', async function (req: Request, res: Response, next: NextFunction) {
            let allObjects;
            try {
                console.log('space-objects')
                /* allObjects = await observatoryDB.getAllSpaceObjects();*/
                res.send({name: 'space-objects'})
            } catch (e) {
                next(e)
            }
        });

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
}

/*export function ObservatoryRoutes (_app) {
    const app = _app;
    app.get('/space-objects', async function (req: Request, res: Response, next: NextFunction) {
        let allObjects;
        try {
            console.log('space-objects')
            /!*allObjects = await observatoryDB.getAllSpaceObjects();*!/
            res.send({name: 'space-objects'})
        } catch (e) {
            next(e)
        }
    });

}*/
